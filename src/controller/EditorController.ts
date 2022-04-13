import {IShapeFrame, Point, ShapeType} from "../domain/IShapeFrame";
import {Editor} from "../domain/Editor";
import {ICanvas} from "../domain/ICanvas";

export class EditorController {
    private editor: Editor;

    constructor() {
        this.editor = new Editor();
    }

    addRectangle(): void {
        this.editor.getCanvas().storeShape(ShapeType.Rectangle)
    }

    addCircle(): void {
        this.editor.getCanvas().storeShape(ShapeType.Circle)
    }

    addTriangle(): void {
        this.editor.getCanvas().storeShape(ShapeType.Triangle)
    }

    undo(): void {
        this.editor.undo()
    }

    redo(): void {
        this.editor.redo()
    }

    resizeShapeFrame(id: number, leftTop: Point, rightBottom: Point): void {
        let shape = this.editor.getCanvas().getShape(id)
        if (shape == undefined) {
            return
        }
        shape.resize(leftTop, rightBottom)
    }

    moveShapeFrame(id: number, leftTop: Point): void {
        let shape = this.editor.getCanvas().getShape(id)
        if (shape == undefined) {
            return
        }
        shape.move(leftTop)
    }

    getCanvas(): ICanvas {
        return this.editor.getCanvas()
    }
}