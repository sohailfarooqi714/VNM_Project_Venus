// Generated by CoffeeScript 1.12.7
(function() {
  var Component_AnimationExecutor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Component_AnimationExecutor = (function(superClass) {
    extend(Component_AnimationExecutor, superClass);


    /**
    * An animation-handler component allows a UI game object to execute
    * a flow of animations. For more information about UI animations, see help-file.
    * 
    * @module ui
    * @class Component_AnimationExecutor
    * @extends gs.Component
    * @memberof ui
    * @constructor
     */

    function Component_AnimationExecutor() {
      Component_AnimationExecutor.__super__.constructor.apply(this, arguments);

      /**
      * @property initialized
      * @type boolean
      * @protected
       */
      this.initialized = false;

      /**
      * @property waitCounter
      * @type number
      * @protected
       */
      this.waitCounter = 0;

      /**
      * @property pointer
      * @type number
      * @protected
       */
      this.pointer = 0;
      this.repeat = false;
    }


    /**
    * Initializes the animation-handler.
    * 
    * @method setup
     */

    Component_AnimationExecutor.prototype.setup = function() {
      this.initialized = true;
      return null;
    };

    Component_AnimationExecutor.prototype.execute = function(animation, callback) {
      this.animation = animation;
      this.callback = callback;
      this.pointer = 0;
      return this.waitCounter = 0;
    };

    Component_AnimationExecutor.prototype.stop = function() {
      return this.animation = null;
    };


    /**
    * Starts the specified animation.
    * 
    * @method startAnimation
    * @param {Object} animation - The animation to start.
    * @param {gs.Object_Base} target - The target object of the animation.
    * @protected
     */

    Component_AnimationExecutor.prototype.startAnimation = function(animation, duration, target, animator) {
      var easing, mask, record, value;
      switch (animation.type) {
        case "sound":
          AudioManager.playSound(animation.sound);
          break;
        case "maskTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          mask = {
            value: animation.value,
            graphic: {
              name: animation.mask
            },
            vague: animation.vague,
            sourceType: 0
          };
          animator.maskTo(mask, duration, easing);
          break;
        case "changeImages":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.changeImages(animation.images, duration, easing);
          break;
        case "playAnimation":
          record = RecordManager.animations[animation.animationId];
          if (record != null) {
            animator.playAnimation(record);
          }
          break;
        case "changeTo":
          value = ui.Component_BindingHandler.fieldValue(target, animation.value);
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.change(value, animation.field, duration, easing);
          break;
        case "blendTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.blendTo(animation.opacity, duration, easing);
          break;
        case "colorTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.colorTo(Color.fromArray(animation.color), duration, easing);
          break;
        case "tintTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.tintTo(Tone.fromArray(animation.tone), duration, easing);
          break;
        case "moveTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.moveTo(animation.position[0], animation.position[1], duration, easing);
          break;
        case "rotate":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.rotate(0, animation.speed, duration, easing);
          break;
        case "rotateTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.rotateTo(animation.angle, duration, easing);
          break;
        case "moveBy":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.moveBy(this.object.dstRect.x + animation.position[0], this.object.dstRect.y + animation.position[1], duration, easing);
          break;
        case "zoomTo":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.zoomTo(animation.zoom[0] / 100, animation.zoom[1] / 100, duration, easing);
          break;
        case "scroll":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.scroll(animation.speed[0], animation.speed[1], 0, easing);
          break;
        case "move":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.move(animation.speed[0], animation.speed[1], duration, easing);
          break;
        case "shake":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          return animator.shake({
            x: animation.range[0],
            y: animation.range[1]
          }, animation.speed, duration, easing);
        case "appear":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.appear(target.dstRect.x, target.dstRect.y, animation.animation, easing, duration);
          break;
        case "disappear":
          easing = animation.easing ? gs.Easings.fromString(animation.easing) : null;
          animator.disappear(animation.animation, easing, duration);
      }
      if (this.object.visual) {
        if (duration === 0) {
          return this.object.visual.update();
        }
      } else if (this.object.behavior) {
        if (duration === 0) {
          return this.object.behavior.update();
        }
      }
    };


    /**
    * Processes the animation flow.
    * 
    * @method processAnimation
    * @param {Object} descriptor - The animation-descriptor containing the animation-flow.
    * @protected
     */

    Component_AnimationExecutor.prototype.processAnimation = function() {
      var animation, duration;
      while (this.animation && this.pointer < this.animation.flow.length) {
        animation = this.animation.flow[this.pointer];
        this.pointer++;
        if (animation.executed) {
          continue;
        }
        if (!this.object.animator) {
          this.object.animator = new gs.Component_Animator();
          this.object.addComponent(this.object.animator);
        }
        duration = ui.Component_FormulaHandler.fieldValue(this.object, animation.duration || 0, true);
        this.startAnimation(animation, duration, this.object, this.object.animator);
        animation.executed = true;
        if (animation.wait) {
          if (animation.type != null) {
            this.waitCounter = duration;
          } else {
            this.waitCounter = animation.wait;
          }
          break;
        }
      }
      return null;
    };


    /**
    * Updates the animations.
    * 
    * @method updateAnimations
     */

    Component_AnimationExecutor.prototype.updateAnimation = function() {
      if (this.waitCounter > 0) {
        this.waitCounter--;
        return;
      }
      if (this.pointer >= this.animation.flow.length) {
        this.pointer = 0;
        if (typeof this.callback === "function") {
          this.callback(this.object);
        }
        if (!this.repeat) {
          this.animation = null;
        }
      }
      if (this.animation) {
        this.processAnimation(this.animation);
      }
      return null;
    };


    /**
    * Updates the animation-handler.
    * 
    * @method update
     */

    Component_AnimationExecutor.prototype.update = function() {
      this.object.needsUpdate = true;
      if (this.animation) {
        return this.updateAnimation();
      }
    };

    return Component_AnimationExecutor;

  })(gs.Component);

  ui.Component_AnimationExecutor = Component_AnimationExecutor;

}).call(this);
