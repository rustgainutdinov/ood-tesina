import {IShapeFrame, Point, ShapeType} from "./IShapeFrame";
import {MoveShapeFrameCommand, ResizeShapeFrameCommand} from "./Commands";
import {ICommandExecutor} from "./CommandExecutor";

export class ShapeFrameWithCommandExecutor implements IShapeFrame {
    private commandExecutor: ICommandExecutor;
    private readonly shape: IShapeFrame;

    constructor(commandExecutor: ICommandExecutor, shape: IShapeFrame) {
        this.commandExecutor = commandExecutor;
        this.shape = shape;
    }

    getId(): number {
        return this.shape.getId();
    }

    getLeftTop(): Point {
        return this.shape.getLeftTop();
    }

    getRightBottom(): Point {
        return this.shape.getRightBottom();
    }

    getType(): ShapeType {
        return this.shape.getType();
    }

    move(leftTop: Point): void {
        this.commandExecutor.Execute(new MoveShapeFrameCommand(this.shape, leftTop))
    }

    resize(leftTop: Point, rightBottom: Point): void {
        this.commandExecutor.Execute(new ResizeShapeFrameCommand(this.shape, leftTop, rightBottom))
    }

    doOnShapeMoved(fn: (shape: IShapeFrame) => void): void {
        this.shape.doOnShapeMoved(fn)
    }

    doOnShapeResized(fn: (shape: IShapeFrame) => void): void {
        this.shape.doOnShapeResized(fn)
    }
}