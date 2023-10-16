import type {PanZoomOptions} from 'panzoom'
import {normalizeSelector} from "@/utils";
import {createApp} from "vue";
import SvgEditorVueComponent from "@/components/svg-editor/component/index.vue";


interface svgEditorOptions extends PanZoomOptions {
    //暂时写一个
    data: any
}

class SvgEditor {

    targetDom: HTMLElement | null = null
    options: svgEditorOptions = {
        data: null
    }
    app: any = null

    constructor(selector: string | HTMLElement, options?: svgEditorOptions) {
        const [targetDom, err] = normalizeSelector(selector);
        if (err) {
            console.error(err)
            return
        }
        this.targetDom = targetDom;
        if (options) this.options = options;
    }

    init() {
        this.app = createApp(SvgEditorVueComponent);
        this.app.mount(this.targetDom);
    }

    destroy() {
        this.app.unmount();
        this.targetDom!.remove();
        this.app = null;
        this.targetDom = null;
    }

}

export {
    SvgEditor
}
