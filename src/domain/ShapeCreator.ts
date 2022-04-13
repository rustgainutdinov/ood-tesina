import {IShapeFrame, Point, ShapeType} from "./IShapeFrame";
import {ShapeFrameWithCommandExecutor} from "./ShapeFrameWithCommandExecutor";
import {IShapeCreator} from "./ICanvas";
import {ICommandExecutor} from "./CommandExecutor";
import {ShapeFrame} from "./ShapeFrame";

export class ShapeCreator implements IShapeCreator {
    private readonly commandExecutor: ICommandExecutor;
    private nextId: number = 1;
    private readonly leftTopX = 100;
    private readonly leftTopY = 100;
    private readonly rightBottomX = 300;
    private readonly rightBottomY = 300;

    constructor(commandExecutor: ICommandExecutor) {
        this.commandExecutor = commandExecutor;
    }

    create(type: ShapeType, id?: number): IShapeFrame {
        id = id ? id : this.nextId
        this.nextId++
        let shapeFrame = new ShapeFrame(id, {x: this.leftTopX, y: this.leftTopY}, {
            x: this.rightBottomX,
            y: this.rightBottomY
        }, type);
        return new ShapeFrameWithCommandExecutor(this.commandExecutor, shapeFrame)
    }
}