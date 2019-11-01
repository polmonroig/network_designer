// declare the namespace for this layer_designer
var layer_designer = {};
var defaultRouter = new draw2d.layout.connection.SplineConnectionRouter();

layer_designer.Application = Class.extend(
{
    NAME : "layer_designer.Application",

    /**
     * @constructor
     *
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function()
    {


	      this.view    = new layer_designer.View("canvas");
          this.toolbar = new layer_designer.Toolbar("toolbar",  this.view );
          this.view.installEditPolicy(new MyInterceptorPolicy());
          //this.view.installEditPolicy(new CopyInterceptorPolicy());
          this.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: this.createConnection
          }));
	       // layout FIRST the body
	       this.appLayout = $('#container').layout({
	   	     west: {
	              resizable:false,
	              closable:true,
	              resizeWhileDragging:false,
	              paneSelector: "#navigation"
	            },
	            center: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#content"
                },
                east:{
                    resizable:false,
  	              closable:true,
  	              resizeWhileDragging:false,
  	              paneSelector: "#configure"
                }
	       });

	       //
	       this.contentLayout = $('#content').layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: "#canvas"
	            }
	       });
	},
    createConnection: function(){

	    var conn = new draw2d.Connection();
	    conn.setRouter(defaultRouter);
	    conn.setOutlineStroke(1);
	    conn.setOutlineColor("#303030");
	    conn.setStroke(3);
	    conn.setRadius(5);
	    conn.setColor('#26a69a');
        getPortConnections();
	    return conn;
	},

    layout:function(){
        this.appLayout.resizeAll();
    }
});
