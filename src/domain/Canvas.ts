import {IShapeFrame, ShapeType} from "./IShapeFrame";
import {ICanvas, IShapeCreator} from "./ICanvas";

export class Canvas implements ICanvas {
    private shapeCreator: IShapeCreator;
    private shapes: Map<number, IShapeFrame> = new Map<number, IShapeFrame>();
    private deletedShapes: Map<number, IShapeFrame> = new Map<number, IShapeFrame>();
    private onShapeAddedHandlers: { (canvas: IShapeFrame): void }[] = [];
    private onShapeRemovedHandlers: { (canvas: IShapeFrame): void }[] = [];


    constructor(shapeCreator: IShapeCreator) {
        this.shapeCreator = shapeCreator;
    }

    storeShape(type: ShapeType, id?: number): void {
        let shapeFrame: IShapeFrame
        if (id) {
            shapeFrame = this.deletedShapes.get(id)
            this.deletedShapes.delete(id)
        } else {
            shapeFrame = this.shapeCreator.create(type, id)
        }
        this.shapes.set(shapeFrame.getId(), shapeFrame)
        this.onShapeAddedHandlers.forEach(handler => handler(shapeFrame))
    }

    removeShape(id: number): void {
        let shapeFrame = this.shapes.get(id)
        this.shapes.delete(id)
        this.deletedShapes.set(id, shapeFrame)
        this.onShapeRemovedHandlers.forEach(handler => handler(shapeFrame))
    }

    getShape(id: number): IShapeFrame | undefined {
        return this.shapes.get(id)
    }

    doOnShapeAdded(fn: (shape: IShapeFrame) => void): () => void {
        this.onShapeAddedHandlers.push(fn);
        let last = this.onShapeAddedHandlers.length - 1;
        return () => this.onShapeAddedHandlers.splice(last, 1);
    }

    doOnShapeRemoved(fn: (canvas: IShapeFrame) => void): () => void {
        this.onShapeRemovedHandlers.push(fn);
        let last = this.onShapeRemovedHandlers.length - 1;
        return () => this.onShapeAddedHandlers.splice(last, 1);
    }
}