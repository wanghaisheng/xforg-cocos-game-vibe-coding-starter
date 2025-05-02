import { _decorator, Button, Node } from 'cc';
import BaseView from '../../../../../../../extensions/app/assets/base/BaseView';
import { app } from '../../../../../../app/app';
const { ccclass, property } = _decorator;
@ccclass('PaperGameIndex')
export class PaperGameIndex extends BaseView {
    @property(Node)
    goto: Node;

    @property(Node)
    pop: Node;

    // 初始化的相关逻辑写在这
    onLoad() {
        this.goto.on(Button.EventType.CLICK, () => {
            app.manager.ui.show({
                name: 'PageOver'
            });
        });
        this.pop.on(Button.EventType.CLICK, () => {
            app.manager.ui.show({
                name: 'PopTip',
                data: this.viewName
            });
        });
    }
}