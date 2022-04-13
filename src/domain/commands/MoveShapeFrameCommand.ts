import {ICommand} from "../CommandExecutor";
import {IShapeFrame, Point} from "../IShapeFrame";


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