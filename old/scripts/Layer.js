

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
        this._super({width:250, height:60, radius:10, bgColor:new draw2d.util.Color(0xE8,0xE8,0xE8), resizeable:false});
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
        console.log("onDrop")
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
        $('#configure').empty();
        $('#configure').append('Name: <input id="name" type="text" name="" value="' + this.label.text + '"><br>');
        for(var i = 0; i < this.attributes.length; ++i){
            if(this.attributes[i][1].length > 1){
                $('#configure').append(this.attributes[i][0] + ': <input type="text" name="" value="' + this.attributes[i][0] + '"><br>');
                $('#configure').append('     <input type="text" name="" value="' + this.attributes[i][1] + '"><br>');
            }
            else{
                $('#configure').append(this.attributes[i][0] + ': <input type="text" name="" value="' + this.attributes[i][1] + '"><br>');
            }

        }
        $('#name').on('input', function() {
            var layers = app.view.getFigures().data;
            for(var i = 0; i < layers.length; ++i){
                if(layers[i].index == selected_layer){
                    layers[i].setLabel($("#name").val());
                }
            }
        });
        selected_layer = this.index;
    }

});
