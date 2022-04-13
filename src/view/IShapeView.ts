import {IShapeFrame} from "../domain/IShapeFrame";

export interface IShapeView {
    onMouseDown(x: number, y: number): void

    onMouseUp(x: number, y: number): void

    isPointInShape(x: number, y: number): boolean

    render(): void

    doOnShapeMoved(shape: IShapeFrame): void
}

export type PointView = {
    x: number,
    y: number,
}
