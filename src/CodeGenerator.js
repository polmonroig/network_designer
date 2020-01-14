/**
 * This class is made to convert the visual graph into a file
 * */



class CodeGenerator{

    constructor(){
        this.graph = null;
        this.template = null;
        this.PYTORCH = 0;
        this.TENSORFLOW = 1;
    }

    setGraph(graph){
        this.graph = graph;
    }

    setTemplate(template){
        if(this.PYTORCH === template){
            this.template = new PytorchTemplate();
        }
        else if(this.TENSORFLOW === template){
            this.template = new TensorflowTemplate();
        }
    }

    getFile(){
        // generate file from graph

        // return file
        this.template.getFile();
    }

}