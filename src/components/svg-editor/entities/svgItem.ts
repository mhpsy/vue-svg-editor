import type {CSSProperties, SVGAttributes} from "vue";

interface Transformation {
    type: string;
    values: number[];
}

interface svgItemOptions {
    id: string,
    name: string,
    attributes?: SVGAttributes;
    transformations?: Transformation[];
    data?: svgItemGetData;// 这里存放额外的信息 用来拉取数据
}

interface svgItemGetData {
    path?: string//获取的路径
    type?: "img" | "text"
    default?: any//替换的值
    style?: CSSProperties | null//如果被替换成了 foreignObject 之后 要包含的 样式 样式会包在id里面
}

class SvgItem {
    tag: string = '';//标签
    id: string = '';//id
    attributes: SVGAttributes = {};//属性
    transformations: Transformation[] = [];//变换
    parent: SVGElement | null = null;//父级
    children: SvgItem[] = [];//包含的对象
    data: svgItemGetData | null = null;//额外的信息

    constructor(tag: string, options?: svgItemOptions) {
        this.tag = tag;
        options && this.setOptions(options);
    }

    setOptions(options: svgItemOptions) {
        this.attributes = options.attributes || {};
        this.transformations = options.transformations || [];
        this.data = options.data || null
    }

    setParent(parent: SVGElement) {
        this.parent = parent;
    }

    setChildren(children: SvgItem[]) {
        this.children = children;
    }

    addChild(child: SvgItem) {
        console.log(child)
        this.children.push(child);
    }

    removeChild(child: SvgItem) {
        this.children = this.children.filter(item => item !== child);
    }

    render(parent?: SVGElement): SVGElement {
        const thisElement = document.createElementNS('http://www.w3.org/2000/svg', this.tag);
        thisElement.id = this.id;
        thisElement["__mh-svg-editor__"] = this;

        if (this.data) {
            //如果有data的情况
            return thisElement
        }

        Object.entries(this.attributes).forEach(([key, value]) => {
            thisElement.setAttribute(key, value as string);
        })
        this.transformations.forEach(item => {
            thisElement.setAttribute(item.type, item.values.join(' '));
        })

        //当前item里面的parent是最大的 只要有 就会渲染在里面
        const appendParent = this.parent || parent || thisElement

        console.log(appendParent)

        this.children.forEach(item => {
            //这里也是给外面的svg挂载
            appendParent.appendChild(item.render(appendParent));
        })

        appendParent.appendChild(thisElement);
        return thisElement;
    }

}


export {
    SvgItem
}