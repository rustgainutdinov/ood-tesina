import {IShapeFrame, ShapeType} from "../IShapeFrame";
import {ICommand} from "../CommandExecutor";
import {ICanvas} from "../ICanvas";


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