var HoverConnection = draw2d.Connection.extend({

    init: function ( sourcePort, targetPort) {
        var self = this;
        this._super({
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            radius: 5,
            source: sourcePort,
            target: targetPort,
            stroke: 1.35
        });

        this.on("dragEnter", function (emitter, event) {
            self.attr({
                outlineColor: "#303030",
                outlineStroke: 2,
                color: "#00a8f0"
            });
        });
        this.on("dragLeave", function (emitter, event) {
            self.attr({
                outlineColor: "#303030",
                outlineStroke: 0,
                color: "#000000"
            });
        });
    },

    delegateTarget: function(draggedFigure) {
        return this;
    }
});
