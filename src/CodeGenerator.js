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

    generate(){
        // add graph data
        let variables = ["x"];
        for(let i = 0; i < this.graph.nNodes; ++i){
            // add layer
            this.template.addLayer(this.graph.nodes[i]);
            // add connections (calls)
            // get next layer and remove from queue
            let layer = this.graph.heap.top();
            this.graph.heap.pop();
            variables.push(variables[0] + i);
            this.template.addCall(variables[i], variables[i + 1], layer);

        }


        // finally build the file
        this.template.build();
    }

    getFile(){
        return this.template.getFile();
    }

}