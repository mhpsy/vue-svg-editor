<script setup lang="ts">
import {fromEvent, Observer, scan} from "rxjs";
import {onMounted} from "vue";

const init = () => {
    const testEl = document.querySelector("#test");
    fromEvent(testEl as HTMLElement, "click")
        .pipe(
            scan((acc: number, cur: Event) => {
                return acc + 1
            }, 0),
        )
        .subscribe((res: number) => {
            console.log(res)
        })
}

onMounted(() => {
    init()
})

</script>

<template>
    <div id="test" style="height: 100px;width: 100px;background-color: #777;"></div>
</template>

<style scoped>

</style>