//svg element attributes width height x y
interface svgPositioningOptions {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}

//the starting and ending coordinates of the mouse event
interface mousePositioningOptions {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export type {
    svgPositioningOptions,
    mousePositioningOptions
}