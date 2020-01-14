'use strict';
/**
 * This files include the class that describe a file
 * template, a file template has different features.
 * There are two types of templates, a tensorflow template
 * and a pytorch template.
 *
 * Each template contains the structure of a file
 * you can add layers and layer calls to the class
 * finally you can build the file and save it
 *
 * */

class Template{
    constructor(){

        // this is the required imports
        this.imports = "";

        // this is the header of the class
        this.head = "class Model(";
        this.subclass = "";
        this.headEnd = "):\n";
        // this is the constructor of the class
        this.init = "def __init__(self):\n" +
                    "    super(Model, self).__init__()\n";
        this.layers = "";
        this.layerNames = [];
        this.initEnd = "\n";

        // this is the forward or call function
        this.call = "def ";
        this.callName = "";
        this.callParameters = "(self, x):\n";
        this.calls = "";
        this.callEnd = "return x \n";
        this.file = "";
    }

    addLayer(parameters){
        this.layers += "";
    }

    addCalls(){
        for(let i = 0; i < this.layerNames.length; ++i){
            thi
        }
    }

    // this class concatenates all the strings
    build(){
        this.head = this.head + this.subclass + this.headEnd;
        this.init = this.init + this.layers + this.initEnd;
        this.call = this.call + this.callName + this.callParameters + this.calls + this.callEnd; // needs
        this.file = this.head + this.init + this.call;
    }

    getFile(){
        return this.file;
    }
}


class TensorflowTemplate extends Template{
    constructor(){
        super();
        this.imports = "from tensorflow.keras import Model\n";
        this.subclass = "Model";
    }

    addLayer(parameters) {

    }
}


class PytorchTemplate extends Template{
    constructor(){
        super();
        this.imports = "import torch.nn as nn\n";
        this.subclass = "nn.Module";
    }

    addLayer(parameters) {
        this.layers += "layer = nn.Linear()\n";
        this.layerNames.push("layer");
    }
}