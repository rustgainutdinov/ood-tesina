import {EditorController} from "../controller/EditorController";

export enum MenuItemViewType {
    undo,
    redo,
    createRect,
    createCircle,
    createTriangle,
}

export class MenuItemView {
    private context2D: CanvasRenderingContext2D;
    private readonly leftTopX: number;
    private editorController: EditorController;
    private readonly type: MenuItemViewType;
    private readonly sideSize = 60;
    private readonly backgroundColor = "#FFFF00"
    private readonly borderColor = "#000000"

    constructor(context2D: CanvasRenderingContext2D, leftTopX: number, editorController: EditorController, type: MenuItemViewType) {
        this.context2D = context2D;
        this.leftTopX = leftTopX;
        this.editorController = editorController;
        this.type = type;
    }

    onMouseDown(x: number, y: number): void {
        if (this.isPointInShape(x, y)) {
            switch (this.type) {
                case MenuItemViewType.createRect:
                    this.editorController.addRectangle();
                    return
                case MenuItemViewType.createCircle:
                    this.editorController.addCircle();
                    return
                case MenuItemViewType.createTriangle:
                    this.editorController.addTriangle();
                    return
                case MenuItemViewType.undo:
                    this.editorController.undo()
                    return
                case MenuItemViewType.redo:
                    this.editorController.redo()
            }
        }
    }

    render(): void {
        this.context2D.fillStyle = this.backgroundColor;
        this.context2D.strokeStyle = this.borderColor;
        this.context2D.lineWidth = 4;
        this.context2D.fillRect(this.leftTopX, 0, this.sideSize, this.sideSize);
        this.context2D.beginPath();
        this.context2D.rect(this.leftTopX + 2, 2, this.sideSize, this.sideSize);
        this.context2D.stroke();
        this.context2D.fillStyle = this.borderColor;
        this.context2D.font = "48px serif";
        let printedSymbol;
        switch (this.type) {
            case MenuItemViewType.createRect:
                printedSymbol = "▯"
                break;
            case MenuItemViewType.createCircle:
                printedSymbol = "●"
                break;
            case MenuItemViewType.createTriangle:
                printedSymbol = "◂"
                break;
            case MenuItemViewType.undo:
                printedSymbol = "<"
                break;
            case MenuItemViewType.redo:
                printedSymbol = ">"
                break
        }
        this.context2D.fillText(printedSymbol, this.leftTopX + 20, 45);
    }

    private isPointInShape(x: number, y: number): boolean {
        return this.leftTopX < x && 0 < y && this.leftTopX + this.sideSize > x && this.sideSize > y
    }
}