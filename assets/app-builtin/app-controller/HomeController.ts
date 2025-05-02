import BaseController from '../../../extensions/app/assets/base/BaseController';
export class HomeController extends BaseController<HomeController, {
    // 定义了事件，并同时定义参数列表和返回值
    Refresh1: (a: string) => any
    Refresh2: (a: string) => any // Refresh2是一个完全内部的事件，因为没有写对外暴露的接口
}>() {
    /**
     * 对外暴露的变量，外部只能读，内部才可以写
     */
    test = 0;

    /**
     * 对外暴露的接口，外部调用refresh方法时，会触发Refresh1事件
     * @param name 
     */
    refresh(name: string) {
        this.test = 1; // 内部可以写
        this.emit(HomeController.Event.Refresh1, name);
    }
}