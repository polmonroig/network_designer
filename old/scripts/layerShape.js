

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

var layerShape = draw2d.SetFigure.extend({

   NAME: "layerShape",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:160,height:70},attr), setter, getter);
     var port;
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(50.00000000000001, -1.2608955223880907));
     port.setConnectionDirection();
     port.setBackgroundColor("#8B8C8C");
     port.setName("inputPort_" + current_layer_index);
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(50.00000000000001, 99.60835820895521));
     port.setConnectionDirection();
     port.setBackgroundColor("#8B8C8C");
     port.setName("outputPort_" + current_layer_index);
     port.setMaxFanOut(20);
     this.setResizeable(false);
     this.persistPorts=false;
     this.index = current_layer_index;
     this.name = null;
   },


   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 166;
      this.originalHeight= 67;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L166,0 L166,67 L0,67");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M0,8Q0,0 8, 0L158,0Q166,0 166, 8L166,59Q166,67 158, 67L8,67Q0,67 0, 59L0,8');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        this.label = this.canvas.paper.text(0,0,'layer_name');
        this.label.attr({"x":77.296875,"y":37,"text-anchor":"start","text":this.name,"font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        this.label.data("name","Label");

        current_layer_index += 1;
        return this.canvas.paper.setFinish();
   },

   applyAlpha: function()
   {
   },

   layerGet: function(name, attributes)
   {
      if(this.svgNodes===null) return null;

      var result=null;
      this.svgNodes.some(function(shape){
         if(shape.data("name")===name){
            result=shape;
         }
         return result!==null;
      });

      return result;
   },

   layerAttr: function(name, attributes)
   {
     if(this.svgNodes===null) return;

     this.svgNodes.forEach(function(shape){
             if(shape.data("name")===name){
                  shape.attr(attributes);
             }
     });
   },

   layerShow: function(name, flag, duration)
   {
      if(this.svgNodes===null) return;

      if(duration){
        this.svgNodes.forEach(function(node){
            if(node.data("name")===name){
                if(flag){
                    node.attr({ opacity : 0 }).show().animate({ opacity : 1 }, duration);
                }
                else{
                    node.animate({ opacity : 0 }, duration, function () { this.hide() });
                }
            }
        });
      }
      else{
          this.svgNodes.forEach(function(node){
              if(node.data("name")===name){
                   if(flag){node.show();}
                   else{node.hide();}
               }
           });
      }
   },

    calculate: function()
    {
    },

    onStart: function()
    {
    },

    onStop:function()
    {
    },

    getParameterSettings: function()
    {
        return [];
    },

    onClick: function(){
        $("#name").val(this.name);
        selected_layer = this.index;
    },

    /**
     * @method
     */
    addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();

        // add all decorations to the memento
        //
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i,json){
            // create the figure stored in the JSON
            var figure =  eval("new "+json.type+"()");

            // apply all attributes
            figure.attr(json);

            // instantiate the locator
            var locator =  eval("new "+json.locator+"()");

            // add the new figure as child to this figure
            this.add(figure, locator);
        },this));
    }
});
