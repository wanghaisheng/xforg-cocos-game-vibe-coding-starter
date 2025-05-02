import BaseView from '@/extensions/app/assets/base/BaseView';
import { app } from '@/app/app';
import { _decorator, Button, Sprite, Label, Node, Prefab, instantiate, tween, Vec3, Color } from 'cc';
const { ccclass, property } = _decorator;

const fiveTypes = ['wood', 'fire', 'earth', 'metal', 'water'] as const;
type FiveType = typeof fiveTypes[number];

@ccclass('GameView')
export class GameView extends BaseView {
    @property(Button)
    pauseBtn: Button = null;
    @property(Label)
    goalLabel: Label = null;
    @property(Label)
    stepLabel: Label = null;
    @property(Sprite)
    panda: Sprite = null;
    @property(Label)
    statusLabel: Label = null;
    @property(Sprite)
    fiveBarFillWood: Sprite = null;
    @property(Sprite)
    fiveBarFillFire: Sprite = null;
    @property(Sprite)
    fiveBarFillEarth: Sprite = null;
    @property(Sprite)
    fiveBarFillMetal: Sprite = null;
    @property(Sprite)
    fiveBarFillWater: Sprite = null;
    @property(Node)
    boardArea: Node = null;
    @property(Prefab)
    gridCellPrefab: Prefab = null;
    @property(Node)
    blockGroupArea: Node = null;
    @property(Prefab)
    blockGroupPrefab: Prefab = null;
    @property(Button)
    toolBtn1: Button = null;
    @property(Button)
    toolBtn2: Button = null;
    @property(Button)
    toolBtn3: Button = null;

    score: number = 0;
    boardData: number[][] = []; // 8x8 棋盘数据，初始化时填充
    boardCellNodes: Node[][] = []; // 8x8 棋盘格子节点
    scorePool: Record<FiveType, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
    energyPool: Record<FiveType, number> = { wood: 50, fire: 50, earth: 50, metal: 50, water: 50 };

    protected onShow(params: any) {
        this.goalLabel.string = '目标：消除所有方块';
        this.stepLabel.string = '步数：30';
        this.statusLabel.string = '熊猫状态：平衡';
        this.generateBoard();
        this.generateBlockGroups();
        this.registerEvents();
        this.updateFiveBars(this.energyPool);
    }

    private generateBoard() {
        // 示例：生成8x8棋盘格子
        this.boardArea.removeAllChildren();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const cell = instantiate(this.gridCellPrefab);
                cell.parent = this.boardArea;
                // 设置格子坐标、样式等
            }
        }
    }

    private generateBlockGroups() {
        // 生成3个可拖拽的块组
        this.blockGroupArea.removeAllChildren();
        for (let i = 0; i < 3; i++) {
            const group = instantiate(this.blockGroupPrefab);
            group.parent = this.blockGroupArea;
            // 设置块组形状、五行类型等
        }
    }

    private registerEvents() {
        if (this.pauseBtn) this.pauseBtn.node.on('click', this.onPause, this);
        if (this.toolBtn1) this.toolBtn1.node.on('click', this.onTool1, this);
        if (this.toolBtn2) this.toolBtn2.node.on('click', this.onTool2, this);
        if (this.toolBtn3) this.toolBtn3.node.on('click', this.onTool3, this);
    }

    private onPause() {
        // 弹出暂停菜单
    }

    private onTool1() {
        // 使用道具1
    }
    private onTool2() {
        // 使用道具2
    }
    private onTool3() {
        // 使用道具3
    }

    private updateFiveBars(energies: Record<FiveType, number>) {
        // energies 范围0-100，更新五行能量条显示
        if (this.fiveBarFillWood) this.fiveBarFillWood.fillRange = energies.wood / 100;
        if (this.fiveBarFillFire) this.fiveBarFillFire.fillRange = energies.fire / 100;
        if (this.fiveBarFillEarth) this.fiveBarFillEarth.fillRange = energies.earth / 100;
        if (this.fiveBarFillMetal) this.fiveBarFillMetal.fillRange = energies.metal / 100;
        if (this.fiveBarFillWater) this.fiveBarFillWater.fillRange = energies.water / 100;
    }

    private isRowFull(y: number): boolean {
        for (let x = 0; x < 8; x++) {
            if (this.boardData[y][x] === 0) return false;
        }
        return true;
    }

    private isColFull(x: number): boolean {
        for (let y = 0; y < 8; y++) {
            if (this.boardData[y][x] === 0) return false;
        }
        return true;
    }

    private getRowCells(y: number): Node[] {
        return this.boardCellNodes[y];
    }

    private getColCells(x: number): Node[] {
        return this.boardCellNodes.map(row => row[x]);
    }

    private onBlockGroupPlaced() {
        const { combo, eliminatedCells } = this.checkAndEliminate();
        if (eliminatedCells.length > 0) {
            this.lockInput();
            // 1. 计算五行分数和能量
            const { fiveScore, fiveEnergy } = this.calcFiveElementScoreAndEnergy(eliminatedCells);
            // 2. 更新分数池和能量池
            for (const type of fiveTypes) {
                this.scorePool[type] += fiveScore[type];
                this.energyPool[type] = Math.min(100, this.energyPool[type] + fiveEnergy[type]);
            }
            // 3. 总分为五行分数池之和+Combo加成
            const totalScore = fiveTypes.reduce((sum, t) => sum + fiveScore[t], 0) + combo * 20;
            this.addScore(totalScore);
            // 4. 刷新能量条
            this.updateFiveBars(this.energyPool);
            this.playEliminateAnim(eliminatedCells, combo, () => {
                this.unlockInput();
                this.generateBlockGroups();
            });
        } else {
            this.generateBlockGroups();
        }
    }

    private checkAndEliminate(): { combo: number, eliminatedCells: Node[] } {
        let combo = 0;
        let eliminatedCells: Node[] = [];
        let eliminatedRows: number[] = [];
        let eliminatedCols: number[] = [];
        for (let y = 0; y < 8; y++) {
            if (this.isRowFull(y)) {
                combo++;
                eliminatedRows.push(y);
                eliminatedCells.push(...this.getRowCells(y));
            }
        }
        for (let x = 0; x < 8; x++) {
            if (this.isColFull(x)) {
                combo++;
                eliminatedCols.push(x);
                eliminatedCells.push(...this.getColCells(x));
            }
        }
        // 去重 eliminatedCells（兼容低版本ts）
        eliminatedCells = eliminatedCells.filter((cell, idx, arr) => arr.indexOf(cell) === idx);
        for (const y of eliminatedRows) for (let x = 0; x < 8; x++) this.boardData[y][x] = 0;
        for (const x of eliminatedCols) for (let y = 0; y < 8; y++) this.boardData[y][x] = 0;
        return { combo, eliminatedCells };
    }

    private playEliminateAnim(cells: Node[], combo: number, onComplete: () => void) {
        let finished = 0;
        for (const cell of cells) {
            tween(cell)
                .to(0.2, { scale: new Vec3(1.2, 1.2, 1) })
                .to(0.2, { scale: new Vec3(0, 0, 1), opacity: 0 })
                .call(() => {
                    cell.active = false;
                    finished++;
                    if (finished === cells.length) {
                        onComplete && onComplete();
                    }
                })
                .start();
        }
        this.showComboScoreEffect(combo, cells);
    }

    private showComboScoreEffect(combo: number, cells: Node[]) {
        if (combo <= 1) return;
        const pos = cells[0].getWorldPosition();
        const comboNode = new Node();
        const label = comboNode.addComponent(Label);
        label.string = `Combo x${combo}! +${combo * 100}`;
        label.fontSize = 40 + combo * 5;
        label.color = combo >= 5 ? Color.RED : Color.YELLOW;
        comboNode.setPosition(pos);
        this.node.addChild(comboNode);
        tween(comboNode)
            .by(0.8, { position: new Vec3(0, 80, 0), opacity: 0 })
            .call(() => comboNode.destroy())
            .start();
    }

    private addScore(amount: number) {
        this.score += amount;
        this.stepLabel.string = `分数：${this.score}`;
    }

    // 工具函数：五行分数与能量计算
    private calcFiveElementScoreAndEnergy(eliminatedCells: Node[], baseScore = 10) {
        // 统计五行数量
        const fiveTypeCount: Record<FiveType, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        for (const cell of eliminatedCells) {
            const t = cell['type'] as FiveType;
            if (fiveTypes.indexOf(t) !== -1) fiveTypeCount[t]++;
        }
        // 相生与相克关系
        const shengPairs: [FiveType, FiveType][] = [['wood','fire'],['fire','earth'],['earth','metal'],['metal','water'],['water','wood']];
        const kePairs: [FiveType, FiveType][] = [['wood','earth'],['earth','water'],['water','fire'],['fire','metal'],['metal','wood']];
        // 分数池和能量池
        const fiveScore: Record<FiveType, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        const fiveEnergy: Record<FiveType, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
        // 先统计基础分数和能量
        for (const type of fiveTypes) {
            fiveScore[type] = fiveTypeCount[type] * baseScore;
            fiveEnergy[type] = fiveTypeCount[type] * 2;
        }
        // 相生加成（分数+20%，能量+1/格）
        for (const [a, b] of shengPairs) {
            if (fiveTypeCount[a] > 0 && fiveTypeCount[b] > 0) {
                fiveScore[b] = Math.round(fiveScore[b] * 1.2);
                fiveEnergy[b] += fiveTypeCount[b]; // 每个被生元素+1
            }
        }
        // 相克减益（分数-20%，能量-1/格，最低为0）
        for (const [a, b] of kePairs) {
            if (fiveTypeCount[a] > 0 && fiveTypeCount[b] > 0) {
                fiveScore[b] = Math.round(fiveScore[b] * 0.8);
                fiveEnergy[b] = Math.max(0, fiveEnergy[b] - fiveTypeCount[b]);
            }
        }
        return { fiveScore, fiveEnergy };
    }

    // 输入锁定相关（可后续完善）
    private lockInput() {
        // TODO: 实现输入锁定逻辑
    }
    private unlockInput() {
        // TODO: 实现输入解锁逻辑
    }

    // 拖拽、消除、熊猫状态等核心逻辑可在此基础上逐步实现
} 