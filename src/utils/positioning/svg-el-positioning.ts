import type {svgPositioningOptions, mousePositioningOptions} from "@/utils/positioning/type";

//get svgPositioningOptions by mouse starts and end coordinates
function getSvgPositioningOptions(mousePositioningOptions: mousePositioningOptions): svgPositioningOptions {
    const {startX, startY, endX, endY} = mousePositioningOptions;
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);
    return {x, y, width, height};
}

export {
    getSvgPositioningOptions
}