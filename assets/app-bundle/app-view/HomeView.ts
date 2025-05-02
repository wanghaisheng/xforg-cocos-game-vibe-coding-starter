import BaseView from '../../../../extensions/app/assets/base/BaseView';
import { app } from '../../../app/app';
import { _decorator, Button, Sprite, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HomeView')
export class HomeView extends BaseView {
    @property(Button)
    startButton: Button = null;

    @property(Sprite)
    panda: Sprite = null;

    @property(Label)
    welcomeLabel: Label = null;

    @property(Label)
    coinLabel: Label = null;

    @property(Label)
    powerLabel: Label = null;

    @property(Button)
    settingBtn: Button = null;

    @property(Button)
    shopBtn: Button = null;

    @property(Button)
    signBtn: Button = null;

    @property(Button)
    achievementBtn: Button = null;

    protected onShow(params: any) {
        this.refreshCurrency();
        if (this.welcomeLabel) this.welcomeLabel.string = '欢迎回来，少侠！';
        this.registerEvents();
    }

    private refreshCurrency() {
        // 示例：从全局数据获取货币和体力
        if (this.coinLabel && app.model.player) this.coinLabel.string = app.model.player.coin.toString();
        if (this.powerLabel && app.model.player) this.powerLabel.string = app.model.player.power.toString();
    }

    private registerEvents() {
        if (this.startButton) this.startButton.node.on('click', this.onStartGame, this);
        if (this.settingBtn) this.settingBtn.node.on('click', this.onOpenSetting, this);
        if (this.shopBtn) this.shopBtn.node.on('click', this.onOpenShop, this);
        if (this.signBtn) this.signBtn.node.on('click', this.onOpenSign, this);
        if (this.achievementBtn) this.achievementBtn.node.on('click', this.onOpenAchievement, this);
    }

    private onStartGame() {
        app.manager.ui.show('MapView'); // 或直接进入 GameView
        app.manager.ui.hide('HomeView');
    }

    private onOpenSetting() {
        app.manager.ui.show('SettingsView');
    }

    private onOpenShop() {
        app.manager.ui.show('ShopView');
    }

    private onOpenSign() {
        // 打开签到界面
    }

    private onOpenAchievement() {
        // 打开成就界面
    }
} 