import {ICommand} from "../CommandExecutor";
import {IShapeFrame, Point} from "../IShapeFrame";


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