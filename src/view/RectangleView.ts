import {ShapeView} from "./ShapeView";

export class RectangleView extends ShapeView {
    private readonly color: string = "#FF0000"

    isPointInShape(x: number, y: number): boolean {
        return this.leftTop.x < x && this.leftTop.y < y && this.rightBottom.x > x && this.rightBottom.y > y
    }

    render(): void {
        this.context2D.fillStyle = this.color;
        this.context2D.fillRect(this.leftTop.x, this.leftTop.y, this.width(), this.height())
        super.render()
    }
}