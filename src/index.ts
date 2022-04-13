import {EditorController} from "./controller/EditorController";
import {EditorView} from "./view/EditorView";

function main() {
    let canvasEl = document.getElementById("canvas")
    if (canvasEl === null) {
        return
    }
    let editorController = new EditorController();
    let editorView = new EditorView(<HTMLCanvasElement>canvasEl, editorController)
    editorView.render()
}

main();