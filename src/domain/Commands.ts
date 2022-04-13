import {IShapeFrame, Point, ShapeType} from "./IShapeFrame";
import {ICommand} from "./CommandExecutor";
import {ICanvas} from "./ICanvas";


export class AddShapeFrameCommand implements ICommand {
    private canvas: ICanvas;
    private readonly shapeType: ShapeType;
    private shapeId?: number = undefined;
    private readonly unsubscribe: () => void

    constructor(canvas: ICanvas, shapeType: ShapeType) {
        this.canvas = canvas;
        this.shapeType = shapeType;
        this.unsubscribe = this.canvas.doOnShapeAdded(this.doOnShapeAdded.bind(this))
    }

    UnExecute(): void {
        this.canvas.removeShape(this.shapeId)
    }

    Execute(): void {
        this.canvas.storeShape(this.shapeType, this.shapeId)
    }

    private doOnShapeAdded(shape: IShapeFrame): void {
        this.unsubscribe()
        if (!this.shapeId) {
            this.shapeId = shape.getId()
        }
    }
}

export class ResizeShapeFrameCommand implements ICommand {
    private readonly shape: IShapeFrame;
    private readonly newLeftTop: Point;//TODO: завести rect, где буду хранить 2 точки
    private readonly newRightBottom: Point;
    private readonly previousLeftTop: Point;
    private readonly previousRightBottom: Point;

    constructor(shape: IShapeFrame, newLeftTop: Point, newRightBottom: Point) {
        this.shape = shape;
        this.newLeftTop = newLeftTop;
        this.newRightBottom = newRightBottom;
        this.previousLeftTop = shape.getLeftTop();
        this.previousRightBottom = shape.getRightBottom();
    }

    UnExecute(): void {
        this.shape.resize(this.previousLeftTop, this.previousRightBottom)
    }

    Execute(): void {
        this.shape.resize(this.newLeftTop, this.newRightBottom)
    }
}

export class MoveShapeFrameCommand implements ICommand {
    private readonly shape: IShapeFrame;
    private readonly newLeftTop: Point;
    private readonly previousLeftTop: Point;

    constructor(shape: IShapeFrame, newLeftTop: Point) {
        this.shape = shape;
        this.newLeftTop = newLeftTop;
        this.previousLeftTop = shape.getLeftTop();
    }

    UnExecute(): void {
        this.shape.move(this.previousLeftTop)
    }

    Execute(): void {
        this.shape.move(this.newLeftTop)
    }
}