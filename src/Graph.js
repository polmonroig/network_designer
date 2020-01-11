/**
 * The graph class converts the visual network into a
 * structured graph to enable an easier navigability for
 * a later code generation
 * */
class Graph{
    constructor(data){
        // save the number of nodes in the graph
        this.nNodes = data.length;
        // nodes contains information of each node
        this.nodes = new Array(this.nNodes);
        for(let i = 0; i < this.nNodes; ++i){
            this.nodes[i] = new Node(i, data[i]);
        }
        // graph contains information of the graph distribution
        this.graph = new Array(this.nNodes);




    }



}