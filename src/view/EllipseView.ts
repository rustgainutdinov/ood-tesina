import {ShapeView} from "./ShapeView";

export class EllipseView extends ShapeView {
    private readonly color: string = "#00FF00"

    isPointInShape(x: number, y: number): boolean {
        return this.leftTop.x < x && this.leftTop.y < y && this.rightBottom.x > x && this.rightBottom.y > y
    }

    render(): void {
        this.context2D.beginPath();
        this.context2D.ellipse(this.leftTop.x + this.width() / 2, this.leftTop.y + this.width() / 2, this.width() / 2,this.height() / 2, Math.PI / 4, 0, 2 * Math.PI);
        this.context2D.lineWidth = 0;
        this.context2D.fillStyle = this.color;
        this.context2D.fill();
        super.render()
    }
}