import { _decorator, Button, Node } from 'cc';
import BaseView from '../../../../../../../extensions/app/assets/base/BaseView';
import { HomeController } from '../../../../../../app-builtin/app-controller/HomeController';
import { app } from '../../../../../../app/app';
const { ccclass, property } = _decorator;
@ccclass('PaperHomeIndex')
export class PaperHomeIndex extends BaseView.BindController(HomeController) {
    @property(Node)
    goto: Node;

    @property(Node)
    pop: Node;

    // 初始化的相关逻辑写在这
    onLoad() {
        this.goto.on(Button.EventType.CLICK, () => {
            app.manager.ui.show({
                name: 'PageGame'
            });
        });
        this.pop.on(Button.EventType.CLICK, () => {
            app.manager.ui.show({
                name: 'PopTip',
                data: this.viewName
            });
        });
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        // 这里延迟一下，等PageHome初始化完成再触发事件
        this.scheduleOnce(() => {
            // 通过单例只能访问对外暴露的接口
            app.controller.home.refresh('PaperHomeIndex');

            // 通过绑定的controller实例访问内部事件
            this.controller.emit(HomeController.Event.Refresh2, 'PaperHomeIndex');

            // 报错，外部不可写
            // app.controller.home.test = 1;

            // 正确，内部可写
            this.controller.test = 10;
        });
    }
}