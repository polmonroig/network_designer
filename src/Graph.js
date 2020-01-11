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
        // graph contains information of the graph distribution
        this.graph = new Array(this.nNodes);
        // fill array contents
        for(let i = 0; i < this.nNodes; ++i){
            let id = data[i].index;
            this.nodes[id] = new Node(id, data[i]);
            // initialize empty array
            this.graph = [];
            let connections = data[i].outputPorts.data[0].connections.data;
            for(let j = 0; j < connections.length; ++j){
                let targetNode = connections[j].targetPort.parent;
                this.graph[id].add(targetNode.index);
            }
        }






    }



}