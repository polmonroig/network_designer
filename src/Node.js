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
        this.value = 0;
    }

    getValue(){
        return this.value;
    }

    addReference(){
        this.value++;
    }

    getID(){
        return this.id;
    }
}