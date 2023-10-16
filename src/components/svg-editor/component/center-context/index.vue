<script setup lang="ts">

import {SvgItem} from "@/components/svg-editor/entities/svgItem";
import {onMounted, ref, watchEffect} from "vue";

interface propsI {
    showItem: SvgItem,
    selectItem: SvgItem | null
}

const emit = defineEmits(["update:selectItem"])
const props = defineProps<propsI>()
const mainSvg = ref<SVGElement | null>(null);
onMounted(() => {
    props.showItem.parent = mainSvg.value as SVGElement
    //渲染当前展示的item
    props.showItem.render(mainSvg.value as SVGElement)
    addMouseDownAndMoveEvent(mainSvg.value as any as HTMLElement)
})

//给svg添加拖动画方块的能力
let isSpaceDown = ref(false);
//是否按下 ctrl
let isCtrlDown = ref(false);

function handleSpaceDown() {
    isSpaceDown.value = true;
}

function handleSpaceUp() {
    isSpaceDown.value = false;
}

const isDrag = ref(false);
const startX = ref(0)
const startY = ref(0);
const lastX = ref(0)
const lastY = ref(0)

interface getAttributesI {
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
}

interface getAttributesRes {
    x: number,
    y: number,
    width: number,
    height: number
}

//处理开始和结束的位置
function getAttributes(options: getAttributesI): getAttributesRes {
    const {startX, startY, lastX, lastY} = options;
    return {
        x: Math.min(startX, lastX),
        y: Math.min(startY, lastY),
        width: Math.abs(startX - lastX),
        height: Math.abs(startY - lastY),
    }
}

function addMouseDownAndMoveEvent(dom: HTMLElement) {
    if (!dom) return
    dom.addEventListener("mousedown", (e) => {
        isDrag.value = true;
        const {clientX, clientY} = e;
        const domRect = dom.getBoundingClientRect();
        startX.value = clientX - domRect.left;
        startY.value = clientY - domRect.top;
    });

    dom.addEventListener("mousemove", (e) => {
        if (!isDrag.value) return;
        lastX.value = e.clientX - dom.getBoundingClientRect().left;
        lastY.value = e.clientY - dom.getBoundingClientRect().top;
        console.log(lastX.value, lastY.value)
    });

    dom.addEventListener("mouseup", (e) => {
        isDrag.value = false;
        const {clientX, clientY} = e;
        const domRect = dom.getBoundingClientRect();
        lastX.value = clientX - domRect.left;
        lastY.value = clientY - domRect.top;

        props.showItem.addChild(
            new SvgItem(
                "rect",
                {
                    name: "root-svg-1",
                    id: "rect-1",
                    attributes: {
                        ...getAttributes(
                            {
                                startX: startX.value,
                                startY: startY.value,
                                lastX: lastX.value,
                                lastY: lastY.value
                            }
                        ),
                        fill: "#000000",
                    }
                }
            )
        )
        props.showItem.render(dom)
    });

}

const clickItem = (e) => {
    console.log(e)
    e.target.classList.add("selected")
    console.log(e.target["__mh-svg-editor__"])
}

</script>

<template>
    <svg @click="e=>clickItem(e)" ref="mainSvg" id="main-svg" width="1000" height="1000"
         style="border: 1px solid #000;">
    </svg>
</template>

<style scoped>
.selected {
    stroke: #409eff;
    stroke-width: 1px;
    stroke-dasharray: 5, 5;
    fill: transparent;
}
</style>