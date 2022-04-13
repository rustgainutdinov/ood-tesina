import {IShapeFrame, ShapeType} from "../domain/IShapeFrame";
import {EditorController} from "../controller/EditorController";
import {IShapeView} from "./IShapeView";
import {MenuView} from "./MenuView";
import {RectangleView} from "./RectangleView";
import {EllipseView} from "./EllipseView";
import {TriangleView} from "./TriangleView";

export class EditorView {
    private readonly context2D: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly editorController: EditorController;
    private width: number = 1000;
    private height: number = 800;
    private shapes: Map<number, IShapeView> = new Map<number, IShapeView>()
    private menu: MenuView

    constructor(canvas: HTMLCanvasElement, editorController: EditorController) {
        this.canvas = canvas;
        let context2D = this.canvas.getContext("2d");
        if (context2D == undefined) {
            throw new Error("incorrect canvas element")
        }
        this.context2D = context2D;
        this.editorController = editorController;
        this.initEventListeners();
        this.initDomainEventHandlers();
        this.menu = new MenuView(this.canvas, this.context2D, this.editorController)
    }

    private initEventListeners() {
        this.canvas.addEventListener("mousedown", event => this.onMouseDown(event.x, event.y));
        this.canvas.addEventListener("mouseup", event => this.onMouseUp(event.x, event.y));
    }

    private initDomainEventHandlers() {
        this.editorController.getCanvas().doOnShapeAdded(this.onShapeAdded.bind(this))
        this.editorController.getCanvas().doOnShapeRemoved(this.doOnShapeRemoved.bind(this))
    }

    render() {
        this.context2D.clearRect(0, 0, this.width, this.height)
        this.context2D.fillStyle = "#EEEEEE";
        this.context2D.fillRect(0, 0, this.width, this.height)
        Array.from(this.shapes.values()).reverse().forEach(shape => shape.render())
        this.menu.render()
    }

    private onMouseDown(x: number, y: number): void {
        let wasActiveShape = false;
        this.shapes.forEach(shape => {
            if (shape.isPointInShape(x, y) && wasActiveShape) {
                return;
            }
            if (shape.isPointInShape(x, y)) {
                wasActiveShape = true;
            }
            shape.onMouseDown(x, y)
        })
    }

    private onMouseUp(x: number, y: number): void {
        let wasActiveShape = false;
        this.shapes.forEach(shape => {
            if (shape.isPointInShape(x, y) && wasActiveShape) {
                return;
            }
            if (shape.isPointInShape(x, y)) {
                wasActiveShape = true;
            }
            shape.onMouseUp(x, y)
        })
    }

    private onShapeAdded(shape: IShapeFrame): void {
        let shapeView: IShapeView
        switch (shape.getType()) {
            case ShapeType.Rectangle:
                shapeView = new RectangleView(this.context2D, shape, this.editorController, this.onShapeChanged.bind(this))
                break;
            case ShapeType.Circle:
                shapeView = new EllipseView(this.context2D, shape, this.editorController, this.onShapeChanged.bind(this))
                break;
            case ShapeType.Triangle:
                shapeView = new TriangleView(this.context2D, shape, this.editorController, this.onShapeChanged.bind(this))
                break;
        }
        this.shapes.set(shape.getId(), shapeView)
        this.render()
    }

    private doOnShapeRemoved(shape: IShapeFrame): void {
        this.shapes.delete(shape.getId())
        this.render()
    }

    private onShapeChanged(): void {
        this.render();
    }
}