export type Point = {
    x: number,
    y: number,
}

export enum ShapeType {
    Rectangle,
    Circle,
    Triangle
}

//TODO: подумать на счет имени
export interface IShapeFrame {
    getId(): number

    resize(leftTop: Point, rightBottom: Point): void //TODO: обьединить resize и move - не буду делать

    move(leftTop: Point): void

    getLeftTop(): Point

    getRightBottom(): Point

    getType(): ShapeType

    doOnShapeResized(fn: (shape: IShapeFrame) => void): void //TODO: добавить возврат функции для совершения отписки

    doOnShapeMoved(fn: (shape: IShapeFrame) => void): void
}