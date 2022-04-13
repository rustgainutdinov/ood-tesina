import {PointView} from "./IShapeView";

export class ResizingFrameView {
    private _parentLefTop: PointView;
    private context2D: CanvasRenderingContext2D;
    private _parentWidth: number;
    private _parentHeight: number;
    private readonly size = 10;

    constructor(parentLefTop: PointView, context2D: CanvasRenderingContext2D, parentWidth: number, parentHeight: number) {
        this._parentLefTop = parentLefTop;
        this.context2D = context2D;
        this._parentWidth = parentWidth;
        this._parentHeight = parentHeight;
    }

    set parentHeight(value: number) {
        this._parentHeight = value;
    }

    set parentWidth(value: number) {
        this._parentWidth = value;
    }

    set parentLefTop(value: PointView) {
        this._parentLefTop = value;
    }

    render() {

    }

    isPointInCross(x: number, y: number): boolean {
        return
    }
}