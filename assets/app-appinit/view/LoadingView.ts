import BaseView from '../../../../extensions/app/assets/base/BaseView';
import { app } from '../../../app/app';
import { _decorator, ProgressBar, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingView')
export class LoadingView extends BaseView {
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    @property(Label)
    tipLabel: Label = null;

    @property(Node)
    pandaNode: Node = null;

    // 可选：小贴士区域
    // @property(Label)
    // tipsLabel: Label = null;

    protected beforeShow(next: (err?: string) => void, data?: any) {
        // 初始化进度条和提示
        if (this.progressBar) this.progressBar.progress = 0;
        if (this.tipLabel) this.tipLabel.string = '正在加载，请稍候...';
        // 可添加熊猫动画初始化
        next();
    }

    protected onShow(params: any) {
        // 启动资源加载流程
        this.loadResources();
    }

    private loadResources() {
        // 示例：模拟异步加载
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.03;
            if (this.progressBar) this.progressBar.progress = Math.min(progress, 1);
            if (progress >= 1) {
                clearInterval(interval);
                // 加载完成，跳转到主菜单
                app.manager.ui.show('HomeView');
                app.manager.ui.hide('LoadingView');
            }
        }, 30);
    }
} 