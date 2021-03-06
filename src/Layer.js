

var createConnection=function(sourcePort, targetPort){

    var conn= new draw2d.Connection({
        router:new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
        stroke:2,
        color:"#00a8f0",
        radius:20,
        outlineColor:"#30ff30",
        source:sourcePort,
        target:targetPort
    });

    // since version 3.5.6
    //
    conn.on("dragEnter", function(emitter, event){
      conn.attr({
        outlineStroke:2
      });
    });
    conn.on("dragLeave", function(emitter, event){
      conn.attr({
        outlineStroke:0
      });
    });

    return conn;

};

var layer_name = "layer_";
var current_layer_index = 0;
var selected_layer = -1;

Layer = draw2d.shape.basic.Rectangle.extend({
    NAME : "Layer",

    init : function(type, file){
        this._super({width:250, height:60, radius:12, bgColor:new draw2d.util.Color(0xE8,0xE8,0xE8), resizeable:false, stroke:0});

        this.output =  new draw2d.shape.basic.Label({text:"", stroke:0, fontSize:18});
        this.add(this.output, new draw2d.layout.locator.BottomLocator());
        this.label = new draw2d.shape.basic.Label({text:"", stroke:0, fontSize:18});
        this.label.onClick = function () {
            this.getParent().fireEvent("click");$("input").blur();

        };
        this.add(this.label, new draw2d.layout.locator.CenterLocator(this));

        this.type = type;
        this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.createPort("output", new draw2d.layout.locator.BottomLocator());
        if(!file)file = "images/sample.png";
        var icon = new draw2d.shape.basic.Image({height:40, width:40, selectable:false, resizeable:false, path:file})
        icon.onClick = function(){
            this.getParent().fireEvent("click");$("input").blur();
        };
        this.add(icon, new draw2d.layout.locator.XYRelPortLocator(5,15));
        this.index = current_layer_index;
        this.attributes = null;
        this.type = null;
        this.inputShape = [];
        this.outputShape = [];
        this.activation = false;
    },

    getType: function(){
        return this.type;
    },

    setFocus: function() {
      $("input").blur();
    },
    setLabel: function (text) {
      if (text.length > 16) {
        this.label.setFontSize(12)
      }
      else{
          this.label.setFontSize(16);
      }
      this.label.setText (text);
    },
    onDrop:function(dropTarget, x, y, shiftKey, ctrlKey){
        // Activate a "smart insert" If the user drop this figure on connection
        //
        if(dropTarget instanceof draw2d.Connection){
            let oldSource = dropTarget.getSource();
            let oldTarget = dropTarget.getTarget();

            let stack = this.getCanvas().getCommandStack();

            let cmd = new draw2d.command.CommandReconnect(dropTarget);
            cmd.setNewPorts(oldSource, this.getInputPort(0));
            stack.execute(cmd);

            let additionalConnection = createConnection();
            cmd = new draw2d.command.CommandConnect(oldTarget,this.getOutputPort(0));
            cmd.setConnection(additionalConnection);
            stack.execute(cmd);
        }
    },

    onClick: function(){
        selected_layer = this.index;
        $('#configure').empty();

        $('#configure').append(`
            <div class="row">
                <div class="input-field col s6">
                    <input id="name" class="validate" type="text" name="" value=` + this.label.text + `></input>
                    <label class="active" for="email">Name</label>
                </div>
            </div>`);
        for(var i = 0; i < this.attributes.length; ++i){

            $('#configure').append(`
                <div class="row">
                    <div class="input-field col s6">
                        <input id="`+ i +`" class="validate" type="text" name="" value="`+ this.attributes[i][1] + `">
                        <label class="active" for="email">` + this.attributes[i][0] + `</label>
                    </div>
                </div>`);


        }

        $("#name").on('input', function() {
            var layers = app.view.getFigures().data;
            for(var i = 0; i < layers.length; ++i){
                if(layers[i].index == selected_layer){
                    layers[i].setLabel($("#name").val());
                }
            }
        });
        for(var i = 0; i < this.attributes.length; ++i){
            this.onAttributeInput(i);
        }



    },
    onAttributeInput: function(attributeName){
        var id = '#' + attributeName;
        $(id).on('input', () => {
            var layers = app.view.getFigures().data;
            for(var i = 0; i < layers.length; ++i){
                if(layers[i].index == selected_layer){
                    layers[i].attributes[parseInt(attributeName)][1] = $(id).val();
                    this.setInputShape();
                    this.setOutputShape();
                    getPortConnections();
                }
            }
        });
    },

    getInputShape: function(){
        return this.inputShape;
    },

    getOutputShape: function(){
        return this.outputShape;
    },

    setInputShape: function(){
        if(this.type == "Dense"){
            this.inputShape = [this.attributes[0][1]];
        }
        else if(this.type == "Input"){
            this.inputShape = [this.attributes[0][1]];
        }
    },

    setOutputShape: function(){
        if(this.type == "Dense"){
            this.outputShape = [this.attributes[1][1]];
        }
        else if(this.type == "Input"){
            this.outputShape = [this.attributes[0][1]];
        }
    },

    isActivation: function(){
        return this.activation;
    }

});
