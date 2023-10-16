//归一化选择器
function normalizeSelector(selector: string | HTMLElement): [HTMLElement | null, Error | null] {
    if (typeof selector === 'string') {
        const element = document.querySelector(selector);
        if (!element) return [null, new Error('selector is not exist')];
        return [element as HTMLElement, null];
    } else if (selector instanceof HTMLElement) {
        return [selector, null];
    } else {
        return [null, new Error('selector must be a string or HTMLElement')];
    }
}

export {
    normalizeSelector,
}