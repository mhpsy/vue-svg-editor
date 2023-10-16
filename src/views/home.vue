<script setup lang="ts">
import {onMounted, ref} from "vue";

import {SvgEditor} from "@/components/svg-editor";

const target = ref<HTMLElement | null>(null)

onMounted(() => {
    console.log(target.value)
    const svgEditor = new SvgEditor(target.value as HTMLElement)
    svgEditor.init()
})

</script>

<template>
    <div class="svg-editor-box">
        <div class="svg-editor-target" ref="target"></div>
    </div>
</template>

<style scoped lang="scss">
.svg-editor-box {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .svg-editor-target {
        width: 100%;
        height: 100%;
    }
}
</style>
