/**
 * This class is made to convert the visual graph into a file
 * */

SPACE = " ";
ENDLINE = "\n";

class CodeGenerator{

    constructor(){
        this.graph = null;
        this.template = "";
    }

    setGraph(graph){
        this.graph = graph;
    }

    addLine(parameters){

    }

    generatePytorchFile(){
        let file = this.template;

        return file;
    }

}