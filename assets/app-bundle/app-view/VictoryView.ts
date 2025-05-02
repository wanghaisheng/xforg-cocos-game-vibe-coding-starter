import BaseView from '@/extensions/app/assets/base/BaseView';
import { _decorator, Button, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VictoryView')
export class VictoryView extends BaseView {
  @property(Label) titleLabel: Label = null;
  @property(Node) pandaAnim: Node = null;
  @property(Node) starGroup: Node = null;
  @property(Node) scoreInfo: Node = null;
  @property(Node) rewardGroup: Node = null;
  @property(Button) btnContinue: Button = null;
  @property(Button) btnRetry: Button = null;
  @property(Button) btnBack: Button = null;

  protected onShow(params: { score: number, stars: number, rewards: any, energy: any }) {
    this.titleLabel.string = '胜利';
    this.showStars(params.stars);
    this.showScoreInfo(params.score, params.energy);
    this.showRewards(params.rewards);
    this.playPandaVictoryAnim();
    this.btnContinue.node.on('click', this.onContinue, this);
    this.btnRetry.node.on('click', this.onRetry, this);
    this.btnBack.node.on('click', this.onBack, this);
  }
  private showStars(stars: number) {
    if (!this.starGroup) return;
    for (let i = 0; i < this.starGroup.children.length; i++) {
      const star = this.starGroup.children[i].getComponent(Sprite);
      if (star) star.spriteFrame = i < stars ? /*高亮*/ null : /*灰*/ null;
      // TODO: 替换为实际SpriteFrame
    }
  }
  private showScoreInfo(score: number, energy: any) {
    // TODO: 填充分数、能量等Label/Sprite
    // 可遍历scoreInfo下的Label节点赋值
  }
  private showRewards(rewards: any) {
    // TODO: 填充奖励内容
    // 可遍历rewardGroup下的节点赋值
  }
  private playPandaVictoryAnim() {
    // TODO: 播放熊猫胜利动画（Spine/帧动画/切换Sprite）
  }
  private onContinue() {
    this.closeSelf();
    // TODO: 跳转下一关或地图
  }
  private onRetry() {
    this.closeSelf();
    // TODO: 重新开始本关
  }
  private onBack() {
    this.closeSelf();
    // TODO: 返回主页或地图
  }
  private closeSelf() {
    this.node.active = false;
    // 或 app.manager.ui.hide('VictoryView');
  }
} 