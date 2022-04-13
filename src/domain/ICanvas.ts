import {IShapeFrame, ShapeType} from "./IShapeFrame";

export interface ICanvas {//TODO: добавиить получение списка фигур
    storeShape(type: ShapeType, id?: number): void

    removeShape(id: number): void

    getShape(id: number): IShapeFrame | undefined

    doOnShapeAdded(fn: (shape: IShapeFrame) => void): () => void

    doOnShapeRemoved(fn: (canvas: IShapeFrame) => void): () => void
}

export interface IShapeCreator {
    create(type: ShapeType, id?: number): IShapeFrame
}