import { _decorator } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
const { ccclass, property } = _decorator;

@ccclass('PageGame')
export class PageGame extends BaseView {
    // 子界面列表，数组顺序为子界面排列顺序
    protected miniViews: IMiniViewNames = ['PaperGameIndex'];

    protected beforeShow(next: (error?: string) => void, data?: any) {
        // 加载子界面
        this.showMiniViews({
            views: ['PaperGameIndex'],
            onFinish: next
        });
    }
}