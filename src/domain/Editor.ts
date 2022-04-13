import {ICanvas} from "./ICanvas";
import {UndoableCommandExecutor} from "./CommandExecutor";
import {ShapeCreator} from "./ShapeCreator";
import {CanvasWithCommandExecutor} from "./CanvasWithCommandExecutor";
import {Canvas} from "./Canvas";

export class Editor {
    private readonly canvas: ICanvas;
    private readonly undoableCommandExecutor: UndoableCommandExecutor;

    constructor() {
        this.undoableCommandExecutor = new UndoableCommandExecutor();
        let canvas = new Canvas(new ShapeCreator(this.undoableCommandExecutor));
        this.canvas = new CanvasWithCommandExecutor(this.undoableCommandExecutor, canvas);
    }

    getCanvas(): ICanvas {
        return this.canvas
    }

    undo(): void {
        this.undoableCommandExecutor.Undo()
    }

    redo(): void {
        this.undoableCommandExecutor.Redo()
    }
}