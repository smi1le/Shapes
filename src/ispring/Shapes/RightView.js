goog.provide("ispring.shapes.RightView");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.RightView = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._viewList = [];

            /**@private {?number}*/
            this._numberVariableShape = null;

            /**@private {?boolean}*/
            this._isShapeSelected = false;

            /**@private {number}*/
            this._width = (document.documentElement.clientWidth / 2) - ispring.shapes.LeftView.INDENT * 2;

            /**@private {number}*/
            this._height = document.documentElement.clientHeight - ispring.shapes.LeftView.TOP - ispring.shapes.LeftView.INDENT;

            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate((document.documentElement.clientWidth / 2) + 10, 100);

            /**@private {!Element}*/
            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.id = "rightView";
            goog.style.setPosition(this._body, this._position);
            goog.style.setSize(this._body, new goog.math.Size(this._width, this._height));
            document.body.appendChild(this._body);
        },

        /**
         * @public
         * @param detail
         */
        addView:function(detail)
        {
            var view;
            if (detail.type == "rectangle") {
                view = new ispring.shapes.RectangleView(detail.key);
            }
            else if(detail.type == "circle")
            {
                view = new ispring.shapes.CircleView(detail.key);
            }
            goog.array.insert(this._viewList, view);
            this.draw();
        },

        /**
         * @public
         * @param key
         * @returns {number|*|goog.math.Coordinate|Array|goog.positioning.AbstractPosition|!goog.math.Coordinate}
         */
        getShapeByIndex:function(key)
        {
            for (var i = 0; i != this._viewList.length; ++i) {
                if (key == this._viewList[i].getKey())
                {
                    return this._viewList[i];
                }
            }
        },

        /**
         * @public
         */
        draw:function()
        {
            var background = "";
            for(var i = 0; i != this._viewList.length; ++i)
            {
                var view = this._viewList[i];
                var position = null;
                var size = null;
                if (view.getType() == "rectangle") {
                    position = (view.getPosition().x - ispring.shapes.LeftView.INDENT) + "px " +
                        (view.getPosition().y - ispring.shapes.LeftView.TOP) + "px";
                    size = view.getSize().width + "px " + view.getSize().height + "px";
                    background += "linear-gradient(-45deg, #ba3e23, #f7941e) " + position + " / " + size;
                }
                else if (view.getType() == "circle")
                {
                    position = (view.getPosition().x - ispring.shapes.LeftView.INDENT - this._width / 2 + view.getSize().width / 2) + "px " +
                        (view.getPosition().y - ispring.shapes.LeftView.TOP - this._height / 2 + view.getSize().height / 2) + "px";
                    background += "radial-gradient(circle closest-side, " + " #333 " +  view.getRadius() + "px, white 1px, white 5px, transparent 6px)"
                        + position;
                }
                // position - передает центральные координаты
                // #333 10px - задает цвет и радиус шарика
                // Остальное - для отрисовки некоего контура, чтобы лучше отрисовывало
                // background += "radial-gradient(circle closest-side, " + " #333 10px, white 11px, white 30px) "
                //     + position;
                if (i + 1 != this._viewList.length)
                {
                    background += ", ";
                }

            }
            this._body.style.background = background;
            this._body.style.backgroundRepeat = "no-repeat";
        },

        /**
         * @public
         */
        removeLastShape:function()
        {
            this._viewList.splice(this._viewList.length - 1);
            this.draw();
        },

        redraw:function(e) {
            for (var i = 0; i != this._viewList.length; ++i)
            {
                if (e.shape.getKey() == this._viewList[i].getKey())
                {
                    this._viewList[i].setPosition(e.shape.getPosition());
                    this._viewList[i].setSize(e.shape.getSize());
                }
            }
            this.draw();
        },

        resizeShape:function(shape)
        {
            for (var i = 0; i != this._viewList.length; ++i)
            {
                if (shape.getKey() == this._viewList[i].getKey())
                {
                    this._viewList[i].setPosition(shape.getPosition());
                    this._viewList[i].setSize(shape.getSize());
                }
            }
            this.draw();
        }
    })
});
