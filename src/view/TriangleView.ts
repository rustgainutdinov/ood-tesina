import {ShapeView} from "./ShapeView";

export class TriangleView extends ShapeView {
    private readonly color: string = "#0000FF"

    isPointInShape(x: number, y: number): boolean {
        return this.leftTop.x < x && this.leftTop.y < y && this.rightBottom.x > x && this.rightBottom.y > y
    }

    render(): void {
        this.context2D.beginPath();
        this.context2D.moveTo(this.leftTop.x + this.width() / 2, this.leftTop.y)
        this.context2D.lineTo(this.rightBottom.x, this.rightBottom.y)
        this.context2D.lineTo(this.leftTop.x, this.rightBottom.y)
        this.context2D.closePath();
        this.context2D.fillStyle = this.color;
        this.context2D.fill()
        super.render()
    }
}