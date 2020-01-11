let app = null;

let layer_attributes = {
    'Input' : [['shape', "0, 0"], ['batch_size', "0"], ['name', 'None'], ['dtype', 'None']],
    'Output' : [],
    'Flatten' : [],
    'Unflatten' : [],
    'Conv1D' : [['in_channels', "0"]],
    'Conv2D' : [['in_channels', "0"], ['out_channels', "0"], ['kernel_size', "0, 0"], ['stride', "1, 1"], ['padding', "0"], ['dilation', "1"], ['bias',"true"]],
    'Dense' : [['in_features', "0"], ['out_features', "0"], ['bias', "true"], ['kernel_init', "0"], ['bias_init', "0"]],
    'VGG19': [],
    'Sigmoid': [],
    'ReLU': [],
    'LeakyReLU': [],
    'Tanh': []
};

let layer_counter = {
    'Input' : 0,
    'Output' : 0,
    'Conv1D' : 0,
    'Conv2D' : 0,
    'Dense' : 0,
    'Flatten' : 0,
    'Unflatten' : 0,
    'VGG19': 0,
    'Sigmoid': 0,
    'ReLU': 0,
    'LeakyReLU': 0,
    'Tanh': 0
};




function download(filename, text) {

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}



//var tensorflow_layer_attributes = {
//    conv1d : {

//    },
//    conv2d : {

//    },

//    dense : {

//    }
//}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
    }
    return true;
}


document.addEventListener("DOMContentLoaded",function () {

    document.getElementById("pytorch-button").addEventListener("click", function(){
        // Generate download of hello.txt file with some content
        var text = "import torch";
        var filename = "network.py";

        download(filename, text);
    }, false);

     app  = new layer_designer.Application();

      app.view.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
      app.view.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy());
      app.view.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy());
      app.view.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy());

      //======================
      // Download popup
      var modal = document.getElementById("download-popup");
      var btn = document.getElementById("download");
      var span = document.getElementsByClassName("close")[0];

      btn.onclick = function() {
        modal.style.display = "block";
      }
      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      //============================
});



function correctConnection(outLayer, inLayer){
    if(outLayer.isActivation() || inLayer.isActivation()){
        return true;
    }
    var shapeOut = outLayer.getOutputShape();
    var shapeIn = inLayer.getInputShape();
    return arraysEqual(shapeIn, shapeOut);
}


function getPortConnections(){
    var ports = app.view.getAllPorts().data;
    for(var i = 0; i < ports.length; ++i){
        if(ports[i].connections.data.length > 0){
            if(ports[i].name.slice(0, -1) == "output"){
                var outLayer = ports[i].parent;
                for(var j = 0; j < ports[i].connections.data.length; ++j){
                    var inLayer = ports[i].connections.data[j].targetPort.parent;
                    if(correctConnection(outLayer, inLayer)){
                        ports[i].connections.data[j].setColor(new draw2d.util.Color("#26a69a"));
                    }
                    else{
                        console.log("Incorrect connection");
                        console.log("Expected: " + inLayer.getInputShape());
                        console.log("Found: " + outLayer.getOutputShape());
                        ports[i].connections.data[j].setColor(new draw2d.util.Color("#bd6459"));
                    }
                }
            }
        }
    }
}


function dropDownFunction() {
  $(".layer-dropdown").css({"visibility": "visible"})
}

// This function is for debugging purposes !!!
function debug(){
    let network = new Graph(app.view.getFigures().data);
    return network;
}