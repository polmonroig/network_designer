var LEFT_LOCATOR  = new draw2d.layout.locator.TopLocator();
var RIGHT_LOCATOR = new draw2d.layout.locator.BottomLocator();
var whiteColor = new draw2d.util.Color(0xEC,0xF9,0xFF);

draw2d.setCanvasSVGPostion = function setSVGPosition() {
  $("#Canvas svg").css('position','');
}

draw2d.policy.canvas.ShowGridEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

      NAME : "draw2d.policy.canvas.ShowGridEditPolicy",

});

draw2d.shape.basic.Rectangle.networkLayer = draw2d.shape.basic.Rectangle.extend({

  NAME : "draw2d.shape.basic.Rectangle.networkLayer",   // required for JSON I/O

  init : function(type, file)
  {

      this._super({width:250, height:60, radius:10, bgColor:whiteColor, resizeable:false});

      this.outputShape = new draw2d.shape.basic.Label({text:"", stroke:0, fontSize:18})
      this.add (this.outputShape, RIGHT_LOCATOR)
      this.label = new draw2d.shape.basic.Label({text:"", stroke:0, fontSize:18});
      this.label.onClick = function () { this.getParent().fireEvent("click");$("input").blur();};
      this.label.onDoubleClick = function () { this.getParent().onDoubleClick()};
      this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
      if (type) {
        if (type != "Input") {
          this.createPort("input", LEFT_LOCATOR);
        }
        if (type != "Output") {
        this.createPort("output", RIGHT_LOCATOR);
        }
      }
    if (file) {
      var end = file.indexOf(".svg")
      this.pngFile = file.substring(0,end) + ".png"
      var icon = new draw2d.shape.basic.Image({height:40, width:40, selectable:false, resizeable:false, path:this.pngFile})
      icon.onClick = function(){this.getParent().fireEvent("click");$("input").blur();}
      icon.onDoubleClick = function () { this.getParent().onDoubleClick()};
      this.add(icon, new draw2d.layout.locator.XYRelPortLocator(5,15));
    }
    this.kbdPolicy=null
  },
  setFocus: function() {
    $("input").blur();
  },
  setLabel: function (text) {
    if (text.length > 16) {
      this.label.setFontSize(12)
    }
    this.label.setText (text);
  },

  setOutputShape: function(text) {
    this.outputShape.setText (text);
  },

  setUserData: function (dict) {
    this._super(dict)
    this.setLabel(dict.name)
  },

  getPersistentAttributes: function () {
    var memento = this._super();

    memento.ports = [];

    this.getPorts().each(function(i,port){
      memento.ports.push({
        name   : port.getName(),
        port   : port.NAME,
        locator: port.getLocator().NAME
      });
    });

    memento.label = this.label.getText()
    memento.iconFile = this.pngFile

    return memento;
  },
  setPersistentAttributes: function (memento) {
    this._super(memento);
    this.resetChildren();

    this.outputShape = new draw2d.shape.basic.Label({text:"", stroke:0, fontSize:18});
    this.add(this.outputShape, RIGHT_LOCATOR);
    this.label = new draw2d.shape.basic.Label({text:memento.label, stroke:0, fontSize:18});
    if (memento.label.length > 16) {
      this.label.setFontSize(12)
    }
    this.add(this.label, new draw2d.layout.locator.CenterLocator(this));
    this.label.onClick = function () { this.getParent().fireEvent("click");$("input").blur();};
    this.label.onDoubleClick = function () { this.getParent().onDoubleClick()};
    var icon = new draw2d.shape.basic.Image({height:40, width:40, selectable:false, resizeable:false, path:memento.iconFile})
    icon.onClick = function () { this.getParent().fireEvent("click");$("input").blur();};
    icon.onDoubleClick = function () { this.getParent().onDoubleClick()};
    this.pngFile = memento.iconFile
    this.add(icon, new draw2d.layout.locator.XYRelPortLocator(5,15));

  },
  onDoubleClick: function () {

    this.getCanvas().editPolicy.each((i,policy)=>{
      if(policy instanceof draw2d.policy.canvas.KeyboardPolicy){
          policy.onKeyDown(this.getCanvas(), 67, false, true);
          policy.onKeyDown(this.getCanvas(), 86, false, true);
      }
    });
  }
 });

draw2d.myCreationConnection = function () {
  var con = new draw2d.Connection();
  con.setRouter (new draw2d.layout.connection.SplineConnectionRouter());
  return con;
}

showLayerParameters = function(){
  if($("#LayerParameter").css('display') == 'none'){
    $("#LayerParameter").css('display','block');
  }
}

hideLayerParameters = function(){
  if($("#LayerParameter").css('display') == 'block'){
    $("#LayerParameter").css('display','none');
  }
}

$(document).on('click', '#Canvas svg', function(event){
  $("input").blur();
  target = $(event.target);
  if(target.is('rect') || target.is('image') || target.is('tspan'))
    showLayerParameters();
  else
    hideLayerParameters();
});
