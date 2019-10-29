var app = null;

var layer_attributes = {
    'Input' : [['shape', [0, 0]], ['batch_size', 0], ['name', 'None'], ['dtype', 'None']],
    'Output' : [],
    'Flatten' : [],
    'Unflatten' : [],
    'Conv1D' : [['in_channels', 0]],
    'Conv2D' : [['in_channels', 0], ['out_channels', 0], ['kernel_size', [0, 0]], ['stride', [1, 1]], ['padding', 0], ['dilation', 1], ['bias',true]],
    'Dense' : [['in_features', 0], ['out_features', 0], ['bias', true], ['kernel_init', 'default'], ['bias_init', 'default']]
};

var layer_counter = {
    'Input' : 0,
    'Output' : 0,
    'Conv1D' : 0,
    'Conv2D' : 0,
    'Dense' : 0,
    'Flatten' : 0,
    'Unflatten' : 0
};

//var tensorflow_layer_attributes = {
//    conv1d : {

//    },
//    conv2d : {

//    },

//    dense : {

//    }
//}


document.addEventListener("DOMContentLoaded",function () {

     app  = new layer_designer.Application();

      app.view.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
      app.view.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy());
      app.view.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy());
      app.view.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy());


});


function getPortConnections(){
    var ports = app.view.getAllPorts().data;
    for(var i = 0; i < ports.length; ++i){
        if(ports[i].connections.data.length > 0){
            console.log(ports[i].name);
        }
    }
}


function dropDownFunction() {
  $(".layer-dropdown").css({"visibility": "visible"})
}


