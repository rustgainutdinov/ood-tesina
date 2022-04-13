import {IShapeFrame, ShapeType} from "./IShapeFrame";
import {ICanvas} from "./ICanvas";
import {ICommandExecutor} from "./CommandExecutor";
import {AddShapeFrameCommand} from "./Commands";

export class CanvasWithCommandExecutor implements ICanvas {
    private commandExecutor: ICommandExecutor;
    private readonly canvas: ICanvas;

    constructor(commandExecutor: ICommandExecutor, canvas: ICanvas) {
        this.commandExecutor = commandExecutor;
        this.canvas = canvas;
    }

    storeShape(type: ShapeType, id?: number): void {
        this.commandExecutor.Execute(new AddShapeFrameCommand(this.canvas, type))
    }

    doOnShapeAdded(fn: (shape: IShapeFrame) => void): () => void {
        return this.canvas.doOnShapeAdded(fn)
    }

    doOnShapeRemoved(fn: (canvas: IShapeFrame) => void): () => void {
        return this.canvas.doOnShapeRemoved(fn)
    }

    getShape(id: number): IShapeFrame | undefined {
        return this.canvas.getShape(id);
    }

    removeShape(id: number): void {
        this.canvas.removeShape(id);
    }
}