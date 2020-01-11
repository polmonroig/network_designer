/**
 *  A node class contains information of a node in
 *  a graph, such as its name, id, config, etc.
 * */
class Node{
    constructor(id, info){
        this.id = id;
        this.name = info.label.text;
        this.type = info.type;
        this.attributes = info.attributes;
        this.info = info;
    }

    getID(){
        return this.id;
    }
}