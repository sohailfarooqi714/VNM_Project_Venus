// Generated by CoffeeScript 1.12.7
(function() {
  var Component_Visual,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Component_Visual = (function(superClass) {
    extend(Component_Visual, superClass);


    /**
    * The base class for all components displaying an object on screen.
    * @module gs
    * @class Component_Visual
    * @extends gs.Component
    * @memberof gs
    * @constructor
     */

    function Component_Visual() {
      Component_Visual.__super__.constructor.apply(this, arguments);
    }


    /**
    * Updates the origin-point of the game object.
    * @method updateOrigin
     */

    Component_Visual.prototype.updateOrigin = function() {
      var ox, oy, p;
      ox = 0;
      oy = 0;
      if (this.object.parent != null) {
        p = this.object.parent;
        while ((p != null) && (p.dstRect != null)) {
          ox += p.dstRect.x + p.offset.x;
          oy += p.dstRect.y + p.offset.y;
          p = p.parent;
        }
      }
      ox += this.object.offset.x;
      oy += this.object.offset.y;
      this.object.origin.x = ox;
      return this.object.origin.y = oy;
    };


    /**
    * Updates the origin and the destination-rectangle from a layout-rectangle if present.
    * @method update
     */

    Component_Visual.prototype.update = function() {
      var ref;
      Component_Visual.__super__.update.apply(this, arguments);
      this.updateOrigin();
      if ((this.object.layoutRect != null) && (((ref = this.object.parent) != null ? ref.dstRect : void 0) != null)) {
        if (this.object.layoutRect.x) {
          this.object.dstRect.x = this.object.layoutRect.x(this.object.parent.dstRect.width);
        }
        if (this.object.layoutRect.y) {
          this.object.dstRect.y = this.object.layoutRect.y(this.object.parent.dstRect.height);
        }
        if (this.object.layoutRect.width) {
          this.object.dstRect.width = this.object.layoutRect.width(this.object.parent.dstRect.width);
        }
        if (this.object.layoutRect.height) {
          return this.object.dstRect.height = this.object.layoutRect.height(this.object.parent.dstRect.height);
        }
      }
    };

    return Component_Visual;

  })(gs.Component);

  gs.Component_Visual = Component_Visual;

}).call(this);