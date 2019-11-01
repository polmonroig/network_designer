

const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}


layer_designer.View = draw2d.Canvas.extend({

	init:function(id){
		this._super(id);

		this.setScrollArea("#"+id);

		this.currentDropConnection = null;
	},

    /**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     *
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    {
    },

    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");

		figure.type = droppedDomNode.text();
		figure.setLabel(droppedDomNode.text() + "_" + layer_counter[droppedDomNode.text()]);

		figure.attributes = deepCopy(layer_attributes[droppedDomNode.text()]);
		figure.setInputShape();
		figure.setOutputShape();
        current_layer_index++;
        layer_counter[droppedDomNode.text()]++;
		if(droppedDomNode.text() == "Sigmoid" ||
		   droppedDomNode.text() == "ReLU" ||
		   droppedDomNode.text() == "LeakyReLU" ||
		   droppedDomNode.text() == "Tanh" ){
		    figure.activation = true;
	   	}

		getPortConnections();
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
		figure.onClick();
    },

});
