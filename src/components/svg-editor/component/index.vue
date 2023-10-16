<script setup lang="ts">
import leftControl from "./left-control/index.vue"
import centerContext from "./center-context/index.vue"
import rightControl from "./right-control/index.vue"
import {ref} from "vue";
import {SvgItem} from "@/components/svg-editor/entities/svgItem";
// interface controlI {
// }
// interface propsI {
//     control: controlI
// }
// const props = defineProps<>()

/**
 * 传入的options
 * 1. control 也就是控制面板的一些东西
 */

const allRootItems = ref<SvgItem[]>([]);
//画板
const rootSvg: SvgItem = new SvgItem(
    "rect",
    {
        id:"0",
        name: "root-svg-1",
        attributes: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: "#000000",
        }
    }
);

const selectItem = ref<SvgItem | null>(null);
</script>

<template>
    <div class="mh-svg-box">
        <div class="mh-svg-inner">
            <left-control></left-control>
            <div class="mh-svg-box">
                <center-context
                    :showItem="rootSvg"
                    v-model:select-item="selectItem"
                ></center-context>
            </div>
            <right-control></right-control>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mh-svg-box {
    width: 100%;
    height: 100%;
    background-color: #777777;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .mh-svg-inner {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 50px 1fr 150px;

        .mh-svg-box {
            background-color: #fff;.selected{
            stroke: #409eff;
    stroke-width: 1px;
    stroke-dasharray: 5, 5;
     fill: transparent;
        }
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

}
</style>