/**
 * This class is made to convert the visual graph into a file
 * */
class CodeGenerator{

    constructor(){
        this.graph = null;
        this.template = "";
    }

    setGraph(graph){
        this.graph = graph;
    }

    generatePytorchFile(){
        let file = this.template;

        return file;
    }

}