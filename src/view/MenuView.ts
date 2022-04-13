import {EditorController} from "../controller/EditorController";
import {MenuItemView, MenuItemViewType} from "./MenuItemView";

export class MenuView {
    private readonly editorController: EditorController;
    private canvas: HTMLCanvasElement;
    private readonly context2D: CanvasRenderingContext2D;
    private items: MenuItemView[] = []

    constructor(canvas: HTMLCanvasElement, context2D: CanvasRenderingContext2D, editorController: EditorController) {
        this.canvas = canvas;
        this.context2D = context2D;
        this.editorController = editorController;
        this.initEventListeners()
        this.initItems()
    }

    render() {
        this.items.forEach(item => item.render())
    }

    private initEventListeners() {
        this.canvas.addEventListener("mousedown", event => this.onMouseDown(event.x, event.y));
    }

    private initItems() {
        this.items.push(new MenuItemView(this.context2D, 0, this.editorController, MenuItemViewType.createRect))
        this.items.push(new MenuItemView(this.context2D, 60, this.editorController, MenuItemViewType.createCircle))
        this.items.push(new MenuItemView(this.context2D, 120, this.editorController, MenuItemViewType.createTriangle))
        this.items.push(new MenuItemView(this.context2D, 180, this.editorController, MenuItemViewType.undo))
        this.items.push(new MenuItemView(this.context2D, 240, this.editorController, MenuItemViewType.redo))
    }

    private onMouseDown(x: number, y: number): void {
        this.items.forEach(item => item.onMouseDown(x, y))
    }
}