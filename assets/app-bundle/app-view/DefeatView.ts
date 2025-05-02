import BaseView from '@/extensions/app/assets/base/BaseView';
import { _decorator, Button, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DefeatView')
export class DefeatView extends BaseView {
  @property(Label) titleLabel: Label = null;
  @property(Node) pandaAnim: Node = null;
  @property(Node) scoreInfo: Node = null;
  @property(Sprite) reasonBg: Sprite = null;
  @property(Label) reasonLabel: Label = null;
  @property(Button) btnRetry: Button = null;
  @property(Button) btnBack: Button = null;
  @property(Button) btnContinue: Button = null; // 可选

  protected onShow(params: { score: number, energy: any, reason: string, canContinue?: boolean }) {
    this.titleLabel.string = '失败';
    this.showScoreInfo(params.score, params.energy);
    this.reasonLabel.string = params.reason || '';
    this.playPandaDefeatAnim();
    this.btnRetry.node.on('click', this.onRetry, this);
    this.btnBack.node.on('click', this.onBack, this);
    if (this.btnContinue) {
      this.btnContinue.node.active = !!params.canContinue;
      this.btnContinue.node.on('click', this.onContinue, this);
    }
  }
  private showScoreInfo(score: number, energy: any) {
    // TODO: 填充分数、能量等Label/Sprite
    // 可遍历scoreInfo下的Label节点赋值
  }
  private playPandaDefeatAnim() {
    // TODO: 播放熊猫失落动画（Spine/帧动画/切换Sprite）
  }
  private onRetry() {
    this.closeSelf();
    // TODO: 重新开始本关
  }
  private onBack() {
    this.closeSelf();
    // TODO: 返回主页或地图
  }
  private onContinue() {
    this.closeSelf();
    // TODO: 续关逻辑
  }
  private closeSelf() {
    this.node.active = false;
    // 或 app.manager.ui.hide('DefeatView');
  }
} 