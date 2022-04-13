import {IShapeView, PointView} from "./IShapeView";
import {EditorController} from "../controller/EditorController";
import {MovingCrossView} from "./MovingCrossView";
import {IShapeFrame} from "../domain/IShapeFrame";

export enum ViewState {
    Static,
    Active,
    Moving,
    Resizing
}

export abstract class ShapeView implements IShapeView {
    protected state: ViewState = ViewState.Static
    protected readonly context2D: CanvasRenderingContext2D
    protected leftTop: PointView
    protected rightBottom: PointView
    private editorController: EditorController;
    private readonly id: number;
    private readonly onShapeChanged: () => void;
    private readonly movingCrossView: MovingCrossView

    constructor(canvas: CanvasRenderingContext2D, leftTop: PointView, rightBottom: PointView, editorController: EditorController, id: number, onShapeChanged: () => void) {
        this.context2D = canvas;
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
        this.editorController = editorController;
        this.id = id;
        this.onShapeChanged = onShapeChanged;
        this.movingCrossView = new MovingCrossView(leftTop, this.context2D, this.rightBottom.x - this.leftTop.x, this.rightBottom.y - this.leftTop.y)
    }

    abstract isPointInShape(x: number, y: number): boolean

    onMouseDown(x: number, y: number): void {
        let pointInShape = this.isPointInShape(x, y)
        if (pointInShape && this.state === ViewState.Moving) {
            return
        }
        if (pointInShape && this.state === ViewState.Active && this.movingCrossView.isPointInCross(x, y)) {
            this.state = ViewState.Moving
            return
        }
        if (pointInShape) {
            this.state = ViewState.Active;

        } else {
            this.state = ViewState.Static
        }
        this.onShapeChanged()
    }

    onMouseUp(x: number, y: number): void {
        if (this.state === ViewState.Moving) {
            this.editorController.moveShapeFrame(this.id, {x: x - this.width() / 2, y: y - this.height() / 2})
        }
    }

    render(): void {
        if (this.state === ViewState.Active || this.state === ViewState.Moving) {
            this.movingCrossView.render()
        }
    }

    protected width() {
        return this.rightBottom.x - this.leftTop.x
    }

    protected height() {
        return this.rightBottom.y - this.leftTop.y
    }

    doOnShapeMoved(shape: IShapeFrame): void {
        if (shape.getId() !== this.id) {
            return
        }
        this.leftTop = {...shape.getLeftTop()}
        this.rightBottom = {...shape.getRightBottom()}
        this.state = ViewState.Active;
        this.movingCrossView.parentLefTop = {...shape.getLeftTop()};
        this.onShapeChanged()
    }
}