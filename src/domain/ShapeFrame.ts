import {IShapeFrame, Point, ShapeType} from "./IShapeFrame";

export class ShapeFrame implements IShapeFrame {
    private readonly id: number;
    private leftTop: Point;
    private rightBottom: Point;
    private readonly type: ShapeType;
    private readonly onShapeResizedHandlers: { (shape: IShapeFrame): void }[] = [];
    private readonly onShapeMovedHandlers: { (shape: IShapeFrame): void }[] = [];

    constructor(id: number, leftTop: Point, rightBottom: Point, type: ShapeType) {
        this.id = id;
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
        this.type = type;
    }

    getId(): number {
        return this.id;
    }

    getLeftTop(): Point {
        return this.leftTop;
    }

    getRightBottom(): Point {
        return this.rightBottom;
    }

    getType(): ShapeType {
        return this.type;
    }

    move(leftTop: Point): void {
        this.rightBottom.x += leftTop.x - this.leftTop.x;
        this.rightBottom.y += leftTop.y - this.leftTop.y;
        this.leftTop = {...leftTop};
        this.onShapeMovedHandlers.forEach(handler => handler(this))
    }

    resize(leftTop: Point, rightBottom: Point): void {
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
        this.onShapeResizedHandlers.forEach(handler => handler(this))
    }

    doOnShapeResized(fn: (shape: IShapeFrame) => void) {
        this.onShapeResizedHandlers.push(fn)
    }

    doOnShapeMoved(fn: (shape: IShapeFrame) => void) {
        this.onShapeMovedHandlers.push(fn)
    }
}