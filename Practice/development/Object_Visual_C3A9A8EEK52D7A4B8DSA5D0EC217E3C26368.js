// Generated by CoffeeScript 1.12.7
(function() {
  var Object_Visual,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Object_Visual = (function(superClass) {
    extend(Object_Visual, superClass);


    /**
    * The base class for all regular visual game objects. 
    *
    * @module 
    * @class Object_Visual
    * @extends gs.Object_Base
    * @memberof vn
    * @constructor
     */

    function Object_Visual(data) {
      Object_Visual.__super__.constructor.call(this);

      /**
      * Indiciates if the game object is visible on screen.
      * @property visible
      * @type boolean
       */
      this.visible = true;

      /**
      * The object's destination rectangle on screen.
      * @property dstRect
      * @type gs.Rect
       */
      this.dstRect = new Rect(data != null ? data.x : void 0, data != null ? data.y : void 0);

      /**
      * The object's origin.
      * @property origin
      * @type gs.Point
       */
      this.origin = new gs.Point(0, 0);

      /**
      * The object's offset.
      * @property offset
      * @type gs.Point
       */
      this.offset = new gs.Point(0, 0);

      /**
      * The object's anchor-point. For example: An anchor-point with 0,0 places the object with its top-left corner
      * at its position but with an 0.5, 0.5 anchor-point the object is placed with its center. An anchor-point of 1,1
      * places the object with its lower-right corner.
      * @property anchor
      * @type gs.Point
       */
      this.anchor = new gs.Point(0.0, 0.0);

      /**
      * The position anchor point. For example: An anchor-point with 0,0 places the object with its top-left corner
      * at its position but with an 0.5, 0.5 anchor-point the object will be placed with its center. An anchor-point of 1,1
      * will place the object with its lower-right corner. It has not effect on the object's rotation/zoom anchor. For that, take
      * a look at <b>anchor</b> property.
      *
      * @property positionAnchor
      * @type gs.Point
       */
      this.positionAnchor = new gs.Point(0, 0);

      /**
      * The object's zoom-setting for x and y axis. The default value is
      * { x: 1.0, y: 1.0 }
      * @property zoom
      * @type gs.Point
       */
      this.zoom = (data != null ? data.zoom : void 0) || new gs.Point(1.0, 1.0);

      /**
      * The object's z-index controls rendering-order/image-overlapping. An object with a smaller z-index is rendered
      * before an object with a larger index. For example: To make sure a game object is always on top of the screen, it
      * should have the largest z-index of all game objects.
      * @property zIndex
      * @type number
       */
      this.zIndex = 700;

      /**
      * The object's blend mode controls how the blending of the object's visual representation is calculated.
      * @property blendMode
      * @type number
      * @default gs.BlendMode.NORMAL
       */
      this.blendMode = gs.BlendMode.NORMAL;

      /**
      * The object's viewport.
      * @property viewport
      * @type gs.Viewport
       */
      this.viewport = Graphics.viewport;

      /**
      * The object's motion-blur settings.
      * @property motionBlur
      * @type gs.MotionBlur
       */
      this.motionBlur = new gs.MotionBlur();

      /**
      * Contains different kinds of shader effects which can be activated for the object.
      * @property effects
      * @type gs.EffectCollection
       */
      this.effects = new gs.EffectCollection();

      /**
      * The object's opacity to control transparency. For example: 0 = Transparent, 255 = Opaque, 128 = Semi-Transparent.
      * @property opacity
      * @type number
       */
      this.opacity = 255;
    }


    /**
    * Restores the game object from a data-bundle.
    *
    * @method restore
    * @param {Object} data - The data-bundle.
     */

    Object_Visual.prototype.restore = function(data) {
      if (data.components) {
        this.componentsFromDataBundle(data);
      }
      Object.mixin(this, data);
      this.dstRect = gs.Rect.fromObject(data.dstRect);
      return this.motionBlur = gs.MotionBlur.fromObject(data.motionBlur);
    };

    return Object_Visual;

  })(gs.Object_Base);

  gs.Object_Visual = Object_Visual;

}).call(this);