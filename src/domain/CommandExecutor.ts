export interface ICommand { //TODO: выделить абстракции в отдельный файл
    Execute(): void

    UnExecute(): void //TODO: UnExecute
}

export interface ICommandExecutor {
    Execute(command: ICommand): void
}

export class UndoableCommandExecutor implements ICommandExecutor {
    private commands: ICommand[] = [];
    private currentCommandIndex: number = -1;

    Execute(command: ICommand): void {
        this.commands.splice(this.currentCommandIndex, this.commands.length - 1 - this.currentCommandIndex);
        command.Execute();
        this.commands.push(command);
        this.currentCommandIndex++;
    }

    Undo() {
        if (this.currentCommandIndex < 0) {
            return;
        }
        this.commands[this.currentCommandIndex].UnExecute();
        this.currentCommandIndex--;
    }

    Redo() {
        if (this.currentCommandIndex >= this.commands.length - 1) {
            return;
        }
        this.currentCommandIndex++;
        this.commands[this.currentCommandIndex].Execute();
    }
}