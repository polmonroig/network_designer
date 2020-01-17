/**
 *  A node class contains information of a node in
 *  a graph, such as its name, id, config, etc.
 * */
class Node{
    constructor(){
        this.value = 0;
        this.name = null;
        this.type = null;
        this.attributes = null;
        this.info = null;
    }

    setInfo(info){
        this.name = info.label.text;
        this.type = info.type;
        this.attributes = info.attributes;
        this.info = info;
    }

    getValue(){
        return this.value;
    }

    addReference(){
        this.value++;
    }

}