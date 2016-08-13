goog.provide("ispring.shapes.Controller");

// goog.require("ispring.shapes.Rectangle");
// goog.require("ispring.shapes.RectangleView");
goog.require("ispring.shapes.EventType");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.Controller = goog.defineClass(null, {
        constructor:function(model, leftView)
        {
            /**@private {ispring.shapes.ShapesModel}*/
            this._model = model;

            /**@private {ispring.shapes.LeftView}*/
            this._leftView = leftView;


            this._isFigureSelected = false;

            /**@private {!Element}*/
            var btn = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn.id = "btn";
            btn.type = "submit";
            btn.value = "Нажми меня";
            goog.style.setPosition(btn, new goog.math.Coordinate(300, 0));
            goog.style.setSize(btn, new goog.math.Size(100, 50));
            document.body.appendChild(btn);
            btn.addEventListener("click", goog.bind(this._createShape, this));

            // var event = new Event('click');
            document.addEventListener(ispring.shapes.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._leftView.addView(e.detail);
            }, this), false);

            document.body.addEventListener(goog.events.EventType.MOUSEDOWN, goog.bind(function(e){
                this._isFigureSelected = true;
                console.log("|*********************************************|");
                console.log("window.event.clientX = " + window.event.clientX);
                console.log("window.event.clientY = " + window.event.clientY);
                // alert("проверка");
                console.log("|*********************************************|");
                this._model.checkBox();
            }, this), false);

            document.body.addEventListener(goog.events.EventType.MOUSEUP, goog.bind(function(e){
                this._model.stopMoveTimer();
            }, this), false);

            document.addEventListener(ispring.shapes.EventType.MOVE, goog.bind(function(e) {
                console.log("yes");
                this._leftView.moveShape(e.detail);
            }, this), false);
        },

        /** 
         * @private
         */
        _createShape:function()
        {
            this._model.addShape();
            // this._model.addShape(triangle);
        },
    })
});
