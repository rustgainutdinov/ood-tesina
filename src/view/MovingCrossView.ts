import {PointView} from "./IShapeView";

export class MovingCrossView {
    private _parentLefTop: PointView;
    private context2D: CanvasRenderingContext2D;
    private _parentWidth: number;
    private _parentHeight: number;
    private readonly size = 25;

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
        this.context2D.fillStyle = "#000000"
        this.context2D.fillRect(this._parentLefTop.x + this._parentWidth / 2 - this.size, this._parentLefTop.y + this._parentHeight / 2 - 2, this.size * 2, 4)
        this.context2D.fillRect(this._parentLefTop.x + this._parentWidth / 2 - 2, this._parentLefTop.y + this._parentHeight / 2 - this.size, 4, this.size * 2)
        this.context2D.closePath()
    }

    isPointInCross(x: number, y: number): boolean {
        return this._parentLefTop.x + this._parentWidth / 2 - this.size < x
            && this._parentLefTop.x + this._parentWidth / 2 + this.size > x
            && this._parentLefTop.y + this._parentHeight / 2 - this.size < y
            && this._parentLefTop.y + this._parentHeight / 2 + this.size > y
    }
}