var Component_Animator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_Animator = (function(superClass) {
  extend(Component_Animator, superClass);


  /**
  * An animator-component allows to execute different kind of animations 
  * on a game object. The animations are using the game object's 
  * dstRect & offset-property to execute.
  *
  * @module gs
  * @class Component_Animator
  * @extends gs.Component
  * @memberof gs
  * @constructor
   */

  function Component_Animator() {
    Component_Animator.__super__.constructor.apply(this, arguments);
    this.moveAnimation = new gs.Component_MoveAnimation();
    this.pathAnimation = new gs.Component_PathAnimation();
    this.zoomAnimation = new gs.Component_ZoomAnimation();
    this.blendAnimation = new gs.Component_BlendAnimation();
    this.blurAnimation = new gs.Component_BlurAnimation();
    this.pixelateAnimation = new gs.Component_PixelateAnimation();
    this.wobbleAnimation = new gs.Component_WobbleAnimation();
    this.colorAnimation = new gs.Component_ColorAnimation();
    this.imageAnimation = new gs.Component_ImageAnimation();
    this.frameAnimation = new gs.Component_FrameAnimation();
    this.fieldAnimation = new gs.Component_FieldAnimation();
    this.shakeAnimation = new gs.Component_ShakeAnimation();
    this.tintAnimation = new gs.Component_TintAnimation();
    this.rotateAnimation = new gs.Component_RotateAnimation();
    this.maskAnimation = new gs.Component_MaskAnimation();
    this.l2dAnimation = new gs.Component_Live2DAnimation();

    /**
    * Standard Callback Routine
    * @property callback
    * @type function
    * @private
     */
    this.callback = function(object, animation) {
      return object.removeComponent(animation);
    };
    this.onBlendFinish = function(object, animation, callback) {
      object.removeComponent(animation);
      return typeof callback === "function" ? callback(object) : void 0;
    };
  }

  Component_Animator.accessors("isAnimating", {
    get: function() {
      return this.object;
    }

    /**
    * Updates the animator.
    *
    * @method update
     */
  });

  Component_Animator.prototype.update = function() {
    var ref, ref1;
    Component_Animator.__super__.update.apply(this, arguments);
    if (((ref = this.object.mask) != null ? (ref1 = ref.source) != null ? ref1.videoElement : void 0 : void 0) != null) {
      return this.object.mask.source.update();
    }
  };


  /**
  * Moves the game object with a specified speed.
  *
  * @method move
  * @param {number} speedX The speed on x-axis in pixels per frame.
  * @param {number} speedY The speed on y-axis in pixels per frame.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type used for the animation.
   */

  Component_Animator.prototype.move = function(speedX, speedY, duration, easingType) {
    this.object.addComponent(this.moveAnimation);
    this.moveAnimation.move(speedX, speedY, duration, easingType, this.callback);
    return this.moveAnimation;
  };


  /**
  * Moves the game object to a specified position.
  *
  * @method moveTo
  * @param {number} x The x-coordinate of the position.
  * @param {number} y The y-coordinate of the position.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.moveTo = function(x, y, duration, easingType) {
    this.object.addComponent(this.moveAnimation);
    this.moveAnimation.moveTo(x, y, duration, easingType, this.callback);
    return this.moveAnimation;
  };


  /**
  * Moves the game object along a path.
  *
  * @method movePath
  * @param {Object} path The path to follow.
  * @param {gs.AnimationLoopType} loopType The loop-Type.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {Object[]} effects Optional array of effects executed during the path-movement like playing a sound.
   */

  Component_Animator.prototype.movePath = function(path, loopType, duration, easingType, effects) {
    var c;
    c = this.object.findComponent("Component_PathAnimation");
    if (c != null) {
      c.loopType = loopType;
    } else {
      this.object.addComponent(this.pathAnimation);
      this.pathAnimation.start(path, loopType, duration, easingType, effects, this.callback);
    }
    return this.pathAnimation;
  };


  /**
  * Scrolls the game object with a specified speed.
  *
  * @method scroll
  * @param {number} speedX The speed on x-axis in pixels per frame.
  * @param {number} speedY The speed on y-axis in pixels per frame.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type used for the animation.
   */

  Component_Animator.prototype.scroll = function(speedX, speedY, duration, easingType) {
    this.object.addComponent(this.moveAnimation);
    this.moveAnimation.scroll(speedX, speedY, duration, easingType, this.callback);
    return this.moveAnimation;
  };


  /**
  * Scrolls the game object to a specified position.
  *
  * @method scrollTo
  * @param {number} x The x-coordinate of the position.
  * @param {number} y The y-coordinate of the position.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.scrollTo = function(x, y, duration, easingType) {
    this.object.addComponent(this.moveAnimation);
    this.moveAnimation.scrollTo(x, y, duration, easingType, this.callback);
    return this.moveAnimation;
  };


  /**
  * Scrolls the game object along a path.
  *
  * @method scrollPath
  * @param {Object} path The path to follow.
  * @param {gs.AnimationLoopType} loopType The loop-Type.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.scrollPath = function(path, loopType, duration, easingType) {
    this.object.addComponent(this.pathAnimation);
    this.pathAnimation.scroll(path, loopType, duration, easingType, this.callback);
    return this.pathAnimation;
  };


  /**
  * Zooms a game object to specified size.
  *
  * @method zoomTo
  * @param {number} x The x-axis zoom-factor.
  * @param {number} y The y-axis zoom-factor.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.zoomTo = function(x, y, duration, easingType) {
    this.object.addComponent(this.zoomAnimation);
    this.zoomAnimation.start(x, y, duration, easingType, this.callback);
    return this.zoomAnimation;
  };


  /**
  * Blends a game object to specified opacity.
  *
  * @method blendTo
  * @param {number} opacity The target opacity.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback called if blending is finished.
   */

  Component_Animator.prototype.blendTo = function(opacity, duration, easingType, callback) {
    this.blendAnimation.stop();
    this.object.addComponent(this.blendAnimation);
    this.blendAnimation.start(opacity, duration, easingType, gs.CallBack("onBlendFinish", this, callback));
    return this.blendAnimation;
  };


  /**
  * Animates a Live2D model parameter of a Live2D game object to a specified value.
  *
  * @method blendTo
  * @param {string} param The name of the parameter to animate.
  * @param {number} value The target value.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback called if blending is finished.
   */

  Component_Animator.prototype.l2dParameterTo = function(param, value, duration, easingType, callback) {
    this.object.addComponent(this.l2dAnimation);
    this.l2dAnimation.start(param, value, duration, easingType, gs.CallBack("onBlendFinish", this, callback));
    return this.l2dAnimation;
  };


  /**
  * Blurs a game object to specified blur-power.
  *
  * @method blurTo
  * @param {number} power The target blur-power.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.blurTo = function(power, duration, easingType) {
    this.object.addComponent(this.blurAnimation);
    this.blurAnimation.start(power, duration, easingType);
    return this.blurAnimation;
  };


  /**
  * Pixelates a game object to specified pixel-size/block-size
  *
  * @method pixelateTo
  * @param {number} width - The target block-width
  * @param {number} height - The target block-height
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.pixelateTo = function(width, height, duration, easingType) {
    this.object.addComponent(this.pixelateAnimation);
    this.pixelateAnimation.start(width, height, duration, easingType);
    return this.pixelateAnimation;
  };


  /**
  * Wobbles a game object to specified wobble-power and wobble-speed.
  *
  * @method wobbleTo
  * @param {number} power The target wobble-power.
  * @param {number} speed The target wobble-speed.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.wobbleTo = function(power, speed, duration, easingType) {
    this.object.addComponent(this.wobbleAnimation);
    this.wobbleAnimation.start(power, speed, duration, easingType);
    return this.wobbleAnimation;
  };


  /**
  * Colors a game object to a specified target color.
  *
  * @method colorTo
  * @param {Color} color The target color.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.colorTo = function(color, duration, easingType) {
    this.object.addComponent(this.colorAnimation);
    this.colorAnimation.start(color, duration, easingType, this.callback);
    return this.colorAnimation;
  };


  /**
  * An image animation runs from left to right using the game object's
  * image-property.
  *
  * @method changeImages
  * @param {Array} images An array of image names.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.changeImages = function(images, duration, easingType) {
    this.object.addComponent(this.imageAnimation);
    this.imageAnimation.start(images, duration, easingType, this.callback);
    return this.imageAnimation;
  };


  /**
  * A frame animation which modifies the game object's srcRect property
  * a play an animation.
  *
  * @method changeFrames
  * @param {gs.Rect[]} frames An array of source rectangles (frames).
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */


  /**
  * A frame animation which modifies the game object's srcRect property
  * a play an animation.
  *
  * @method playAnimation
  * @param {gs.Rect[]} frames An array of source rectangles (frames).
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.playAnimation = function(animationRecord) {
    this.frameAnimation.refresh(animationRecord);
    this.object.addComponent(this.frameAnimation);
    this.frameAnimation.start(this.callback);
    return this.frameAnimation;
  };


  /**
  * Changes a field of the game object to a specified value.
  *
  * @method change
  * @param {number} Value The target value.
  * @param {string} field The name of the field/property.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.change = function(value, field, duration, easingType) {
    this.object.addComponent(this.fieldAnimation);
    this.fieldAnimation.start(value, field, duration, easingType, this.callback);
    return this.fieldAnimation;
  };


  /**
  * Shakes the game object horizontally using the game object's offset-property.
  *
  * @method shake
  * @param {gs.Range} range The horizontal shake-range.
  * @param {number} speed The shake speed.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.shake = function(range, speed, duration, easing) {
    this.object.addComponent(this.shakeAnimation);
    this.shakeAnimation.start(range, speed, duration, easing, this.callback);
    return this.shakeAnimation;
  };


  /**
  * Tints the game object to a specified tone.
  *
  * @method tintTo
  * @param {Tone} tone The target tone.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.tintTo = function(tone, duration, easingType) {
    this.object.addComponent(this.tintAnimation);
    this.tintAnimation.start(tone, duration, easingType, this.callback);
    return this.tintAnimation;
  };


  /**
  * Rotates the game object around its anchor-point.
  *
  * @method rotate
  * @param {gs.RotationDirection} direction The rotation-direction.
  * @param {number} speed The rotation speed in degrees per frame.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.rotate = function(direction, speed, duration, easingType) {
    this.object.addComponent(this.rotateAnimation);
    this.rotateAnimation.rotate(direction, speed, duration, easingType, this.callback);
    return this.rotateAnimation;
  };


  /**
  * Rotates the game object around its anchor-point to a specified angle.
  *
  * @method rotateTo
  * @param {number} angle The target angle.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
   */

  Component_Animator.prototype.rotateTo = function(angle, duration, easingType) {
    this.object.addComponent(this.rotateAnimation);
    this.rotateAnimation.rotateTo(angle, duration, easingType, this.callback);
    return this.rotateAnimation;
  };


  /**
  * Lets a game object appear on screen using a masking-effect.
  *
  * @method maskIn
  * @param {gs.Mask} mask The mask used for the animation.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.maskIn = function(mask, duration, easing, callback) {
    this.object.addComponent(this.maskAnimation);
    this.maskAnimation.maskIn(mask, duration, easing, function(object, animation) {
      object.removeComponent(animation);
      return typeof callback === "function" ? callback(object) : void 0;
    });
    return this.maskAnimation;
  };


  /**
  * Description follows...
  *
  * @method maskTo
  * @param {gs.Mask} mask The mask used for the animation.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.maskTo = function(mask, duration, easing, callback) {
    this.object.addComponent(this.maskAnimation);
    this.maskAnimation.maskTo(mask, duration, easing, function(object, animation) {
      object.removeComponent(animation);
      return typeof callback === "function" ? callback(object) : void 0;
    });
    return this.maskAnimation;
  };


  /**
  * Lets a game object disappear from screen using a masking-effect.
  *
  * @method maskOut
  * @param {gs.Mask} mask The mask used for the animation.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.maskOut = function(mask, duration, easing, callback) {
    this.object.addComponent(this.maskAnimation);
    this.maskAnimation.maskOut(mask, duration, easing, function(object, animation) {
      object.removeComponent(animation);
      return typeof callback === "function" ? callback(object) : void 0;
    });
    return this.maskAnimation;
  };


  /**
  * Lets a game object appear on screen from left, top, right or bottom using 
  * a move-animation
  *
  * @method moveIn
  * @param {number} x The x-coordinate of the target-position.
  * @param {number} y The y-coordinate of the target-position.
  * @param {number} type The movement-direction from where the game object should move-in.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.moveIn = function(x, y, type, duration, easing, callback) {
    this.object.addComponent(this.moveAnimation);
    this.moveAnimation.moveIn(x, y, type, duration, easing, function(object, animation) {
      object.removeComponent(animation);
      return typeof callback === "function" ? callback(object) : void 0;
    });
    return this.moveAnimation;
  };


  /**
  * Lets a game object disappear from screen to the left, top, right or bottom using 
  * a move-animation
  *
  * @method moveOut
  * @param {number} type The movement-direction in which the game object should move-out.
  * @param {number} duration The duration in frames.
  * @param {Object} easingType The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.moveOut = function(type, duration, easing, callback) {
    this.object.addComponent(this.moveAnimation);
    this.moveAnimation.moveOut(type, duration, easing, function(object, animation) {
      object.removeComponent(animation);
      return typeof callback === "function" ? callback(object) : void 0;
    });
    return this.moveAnimation;
  };


  /**
  * Lets a game object appear on screen using blending.
  *
  * @method show
  * @param {number} duration The duration in frames.
  * @param {Object} easing The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.show = function(duration, easing, callback) {
    var ref;
    this.object.opacity = 0;
    if ((ref = this.object.visual) != null) {
      ref.update();
    }
    return this.blendTo(255, duration, easing, callback);
  };


  /**
  * Lets a game object disappear from screen using blending.
  *
  * @method hide
  * @param {number} duration The duration in frames.
  * @param {Object} easing The easing-type.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.hide = function(duration, easing, callback) {
    return this.blendTo(0, duration, easing, callback);
  };


  /**
  * Changes visible-property to true. This method is deprecated.
  * 
  * @method open
  * @deprecated
   */

  Component_Animator.prototype.open = function() {
    return this.object.visible = true;
  };


  /**
  * Changes visible-property to false. This method is deprecated.
  * 
  * @method close
  * @deprecated
   */

  Component_Animator.prototype.close = function() {
    return this.object.visible = false;
  };


  /**
  * Flashes the game object.
  *
  * @method flash
  * @param {Color} color The flash-color.
  * @param {number} duration The duration in frames.
   */

  Component_Animator.prototype.flash = function(color, duration) {
    this.object.color = color;
    color = new Color(color);
    color.alpha = 0;
    return this.colorTo(color, duration, gs.Easings.EASE_LINEAR[gs.EasingTypes.EASE_IN]);
  };


  /**
  * Lets a game object appear on screen using a specified animation.
  *
  * @method appear
  * @param {number} x The x-coordinate of the target-position.
  * @param {number} y The y-coordinate of the target-position.
  * @param {gs.AppearAnimationInfo} animation The animation info-object.
  * @param {Object} easing The easing-type.
  * @param {number} duration The duration in frames.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.appear = function(x, y, animation, easing, duration, callback) {
    easing = easing || gs.Easings.EASE_LINEAR[gs.EasingTypes.EASE_IN];
    this.object.visible = true;
    if (animation.type === gs.AnimationTypes.MOVEMENT) {
      return this.moveIn(x, y, animation.movement, duration, easing, callback);
    } else if (animation.type === gs.AnimationTypes.MASKING) {
      return this.maskIn(animation.mask, duration, easing, callback);
    } else {
      return this.show(duration, easing, callback);
    }
  };


  /**
  * Lets a game object disappear from screen using a specified animation.
  *
  * @method disappear
  * @param {gs.AppearAnimationInfo} animation The animation info-object.
  * @param {Object} easing The easing-type.
  * @param {number} duration The duration in frames.
  * @param {function} [callback] An optional callback-function called when the animation is finished.
   */

  Component_Animator.prototype.disappear = function(animation, easing, duration, callback) {
    this.object.visible = true;
    if (animation.type === gs.AnimationTypes.MOVEMENT) {
      return this.moveOut(animation.movement, duration, easing, callback);
    } else if (animation.type === gs.AnimationTypes.MASKING) {
      return this.maskOut(animation.mask, duration, easing, callback);
    } else {
      return this.hide(duration, easing, callback);
    }
  };

  return Component_Animator;

})(gs.Component);

gs.Animator = Component_Animator;

gs.Component_Animator = Component_Animator;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEsa0JBQUE7RUFBQTs7O0FBQU07Ozs7QUFDRjs7Ozs7Ozs7Ozs7O0VBV2EsNEJBQUE7SUFDVCxxREFBQSxTQUFBO0lBRUEsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxFQUFFLENBQUMsdUJBQUgsQ0FBQTtJQUNyQixJQUFDLENBQUEsYUFBRCxHQUFxQixJQUFBLEVBQUUsQ0FBQyx1QkFBSCxDQUFBO0lBQ3JCLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsRUFBRSxDQUFDLHVCQUFILENBQUE7SUFDckIsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxFQUFFLENBQUMsd0JBQUgsQ0FBQTtJQUN0QixJQUFDLENBQUEsYUFBRCxHQUFxQixJQUFBLEVBQUUsQ0FBQyx1QkFBSCxDQUFBO0lBQ3JCLElBQUMsQ0FBQSxpQkFBRCxHQUF5QixJQUFBLEVBQUUsQ0FBQywyQkFBSCxDQUFBO0lBQ3pCLElBQUMsQ0FBQSxlQUFELEdBQXVCLElBQUEsRUFBRSxDQUFDLHlCQUFILENBQUE7SUFDdkIsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxFQUFFLENBQUMsd0JBQUgsQ0FBQTtJQUN0QixJQUFDLENBQUEsY0FBRCxHQUFzQixJQUFBLEVBQUUsQ0FBQyx3QkFBSCxDQUFBO0lBQ3RCLElBQUMsQ0FBQSxjQUFELEdBQXNCLElBQUEsRUFBRSxDQUFDLHdCQUFILENBQUE7SUFDdEIsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxFQUFFLENBQUMsd0JBQUgsQ0FBQTtJQUN0QixJQUFDLENBQUEsY0FBRCxHQUFzQixJQUFBLEVBQUUsQ0FBQyx3QkFBSCxDQUFBO0lBQ3RCLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsRUFBRSxDQUFDLHVCQUFILENBQUE7SUFDckIsSUFBQyxDQUFBLGVBQUQsR0FBdUIsSUFBQSxFQUFFLENBQUMseUJBQUgsQ0FBQTtJQUN2QixJ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RUFBZ0IsTUFBaEIsRUFBd0IsUUFBeEIsRUFIQzs7RUFKRTs7OztHQW5pQmtCLEVBQUUsQ0FBQzs7QUE2aUJwQyxFQUFFLENBQUMsUUFBSCxHQUFjOztBQUNkLEVBQUUsQ0FBQyxrQkFBSCxHQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuI1xuIyAgIFNjcmlwdDogQ29tcG9uZW50X0FuaW1hdG9yXG4jXG4jICAgJCRDT1BZUklHSFQkJFxuI1xuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5jbGFzcyBDb21wb25lbnRfQW5pbWF0b3IgZXh0ZW5kcyBncy5Db21wb25lbnRcbiAgICAjIyMqXG4gICAgKiBBbiBhbmltYXRvci1jb21wb25lbnQgYWxsb3dzIHRvIGV4ZWN1dGUgZGlmZmVyZW50IGtpbmQgb2YgYW5pbWF0aW9ucyBcbiAgICAqIG9uIGEgZ2FtZSBvYmplY3QuIFRoZSBhbmltYXRpb25zIGFyZSB1c2luZyB0aGUgZ2FtZSBvYmplY3QncyBcbiAgICAqIGRzdFJlY3QgJiBvZmZzZXQtcHJvcGVydHkgdG8gZXhlY3V0ZS5cbiAgICAqXG4gICAgKiBAbW9kdWxlIGdzXG4gICAgKiBAY2xhc3MgQ29tcG9uZW50X0FuaW1hdG9yXG4gICAgKiBAZXh0ZW5kcyBncy5Db21wb25lbnRcbiAgICAqIEBtZW1iZXJvZiBnc1xuICAgICogQGNvbnN0cnVjdG9yXG4gICAgIyMjXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIFxuICAgICAgICBAbW92ZUFuaW1hdGlvbiA9IG5ldyBncy5Db21wb25lbnRfTW92ZUFuaW1hdGlvbigpXG4gICAgICAgIEBwYXRoQW5pbWF0aW9uID0gbmV3IGdzLkNvbXBvbmVudF9QYXRoQW5pbWF0aW9uKClcbiAgICAgICAgQHpvb21BbmltYXRpb24gPSBuZXcgZ3MuQ29tcG9uZW50X1pvb21BbmltYXRpb24oKVxuICAgICAgICBAYmxlbmRBbmltYXRpb24gPSBuZXcgZ3MuQ29tcG9uZW50X0JsZW5kQW5pbWF0aW9uKClcbiAgICAgICAgQGJsdXJBbmltYXRpb24gPSBuZXcgZ3MuQ29tcG9uZW50X0JsdXJBbmltYXRpb24oKVxuICAgICAgICBAcGl4ZWxhdGVBbmltYXRpb24gPSBuZXcgZ3MuQ29tcG9uZW50X1BpeGVsYXRlQW5pbWF0aW9uKClcbiAgICAgICAgQHdvYmJsZUFuaW1hdGlvbiA9IG5ldyBncy5Db21wb25lbnRfV29iYmxlQW5pbWF0aW9uKClcbiAgICAgICAgQGNvbG9yQW5pbWF0aW9uID0gbmV3IGdzLkNvbXBvbmVudF9Db2xvckFuaW1hdGlvbigpXG4gICAgICAgIEBpbWFnZUFuaW1hdGlvbiA9IG5ldyBncy5Db21wb25lbnRfSW1hZ2VBbmltYXRpb24oKVxuICAgICAgICBAZnJhbWVBbmltYXRpb24gPSBuZXcgZ3MuQ29tcG9uZW50X0ZyYW1lQW5pbWF0aW9uKClcbiAgICAgICAgQGZpZWxkQW5pbWF0aW9uID0gbmV3IGdzLkNvbXBvbmVudF9GaWVsZEFuaW1hdGlvbigpXG4gICAgICAgIEBzaGFrZUFuaW1hdGlvbiA9IG5ldyBncy5Db21wb25lbnRfU2hha2VBbmltYXRpb24oKVxuICAgICAgICBAdGludEFuaW1hdGlvbiA9IG5ldyBncy5Db21wb25lbnRfVGludEFuaW1hdGlvbigpXG4gICAgICAgIEByb3RhdGVBbmltYXRpb24gPSBuZXcgZ3MuQ29tcG9uZW50X1JvdGF0ZUFuaW1hdGlvbigpXG4gICAgICAgIEBtYXNrQW5pbWF0aW9uID0gbmV3IGdzLkNvbXBvbmVudF9NYXNrQW5pbWF0aW9uKClcbiAgICAgICAgQGwyZEFuaW1hdGlvbiA9IG5ldyBncy5Db21wb25lbnRfTGl2ZTJEQW5pbWF0aW9uKClcbiAgICAgICAgXG4gICAgICAgICMjIypcbiAgICAgICAgKiBTdGFuZGFyZCBDYWxsYmFjayBSb3V0aW5lXG4gICAgICAgICogQHByb3BlcnR5IGNhbGxiYWNrXG4gICAgICAgICogQHR5cGUgZnVuY3Rpb25cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAjIyNcbiAgICAgICAgQGNhbGxiYWNrID0gKG9iamVjdCwgYW5pbWF0aW9uKSAtPiBvYmplY3QucmVtb3ZlQ29tcG9uZW50KGFuaW1hdGlvbilcbiAgICAgICAgXG4gICAgICAgIEBvbkJsZW5kRmluaXNoID0gKG9iamVjdCwgYW5pbWF0aW9uLCBjYWxsYmFjaykgLT4gXG4gICAgICAgICAgICBvYmplY3QucmVtb3ZlQ29tcG9uZW50KGFuaW1hdGlvbilcbiAgICAgICAgICAgIGNhbGxiYWNrPyhvYmplY3QpXG4gICAgICAgIFxuICAgICAgICBcbiAgICBAYWNjZXNzb3JzIFwiaXNBbmltYXRpbmdcIiwgZ2V0OiAtPiBAb2JqZWN0XG4gICAgIyMjKlxuICAgICogVXBkYXRlcyB0aGUgYW5pbWF0b3IuXG4gICAgKlxuICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAjIyNcbiAgICB1cGRhdGU6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIFxuICAgICAgICBpZiBAb2JqZWN0Lm1hc2s/LnNvdXJjZT8udmlkZW9FbGVtZW50P1xuICAgICAgICAgICAgQG9iamVjdC5tYXNrLnNvdXJjZS51cGRhdGUoKVxuICAgICAgICBcbiAgICAjIyMqXG4gICAgKiBNb3ZlcyB0aGUgZ2FtZSBvYmplY3Qgd2l0aCBhIHNwZWNpZmllZCBzcGVlZC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG1vdmVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFggVGhlIHNwZWVkIG9uIHgtYXhpcyBpbiBwaXhlbHMgcGVyIGZyYW1lLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkWSBUaGUgc3BlZWQgb24geS1heGlzIGluIHBpeGVscyBwZXIgZnJhbWUuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZSB1c2VkIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgICMjI1xuICAgIG1vdmU6IChzcGVlZFgsIHNwZWVkWSwgZHVyYXRpb24sIGVhc2luZ1R5cGUpIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBtb3ZlQW5pbWF0aW9uKVxuICAgICAgICBAbW92ZUFuaW1hdGlvbi5tb3ZlKHNwZWVkWCwgc3BlZWRZLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSwgQGNhbGxiYWNrKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEBtb3ZlQW5pbWF0aW9uXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIE1vdmVzIHRoZSBnYW1lIG9iamVjdCB0byBhIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG1vdmVUb1xuICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgXG4gICAgbW92ZVRvOiAoeCwgeSwgZHVyYXRpb24sIGVhc2luZ1R5cGUpIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBtb3ZlQW5pbWF0aW9uKVxuICAgICAgICBAbW92ZUFuaW1hdGlvbi5tb3ZlVG8oeCwgeSwgZHVyYXRpb24sIGVhc2luZ1R5cGUsIEBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAbW92ZUFuaW1hdGlvblxuICAgIFxuICAgICMjIypcbiAgICAqIE1vdmVzIHRoZSBnYW1lIG9iamVjdCBhbG9uZyBhIHBhdGguXG4gICAgKlxuICAgICogQG1ldGhvZCBtb3ZlUGF0aFxuICAgICogQHBhcmFtIHtPYmplY3R9IHBhdGggVGhlIHBhdGggdG8gZm9sbG93LlxuICAgICogQHBhcmFtIHtncy5BbmltYXRpb25Mb29wVHlwZX0gbG9vcFR5cGUgVGhlIGxvb3AtVHlwZS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICogQHBhcmFtIHtPYmplY3RbXX0gZWZmZWN0cyBPcHRpb25hbCBhcnJheSBvZiBlZmZlY3RzIGV4ZWN1dGVkIGR1cmluZyB0aGUgcGF0aC1tb3ZlbWVudCBsaWtlIHBsYXlpbmcgYSBzb3VuZC5cbiAgICAjIyMgIFxuICAgIG1vdmVQYXRoOiAocGF0aCwgbG9vcFR5cGUsIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBlZmZlY3RzKSAtPlxuICAgICAgICBjID0gQG9iamVjdC5maW5kQ29tcG9uZW50KFwiQ29tcG9uZW50X1BhdGhBbmltYXRpb25cIilcbiAgICAgICAgXG4gICAgICAgIGlmIGM/XG4gICAgICAgICAgICBjLmxvb3BUeXBlID0gbG9vcFR5cGVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQHBhdGhBbmltYXRpb24pXG4gICAgICAgICAgICBAcGF0aEFuaW1hdGlvbi5zdGFydChwYXRoLCBsb29wVHlwZSwgZHVyYXRpb24sIGVhc2luZ1R5cGUsIGVmZmVjdHMsIEBjYWxsYmFjaylcbiAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gQHBhdGhBbmltYXRpb25cbiAgICBcbiAgICAjIyMqXG4gICAgKiBTY3JvbGxzIHRoZSBnYW1lIG9iamVjdCB3aXRoIGEgc3BlY2lmaWVkIHNwZWVkLlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2Nyb2xsXG4gICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRYIFRoZSBzcGVlZCBvbiB4LWF4aXMgaW4gcGl4ZWxzIHBlciBmcmFtZS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFkgVGhlIHNwZWVkIG9uIHktYXhpcyBpbiBwaXhlbHMgcGVyIGZyYW1lLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUgdXNlZCBmb3IgdGhlIGFuaW1hdGlvbi5cbiAgICAjIyNcbiAgICBzY3JvbGw6IChzcGVlZFgsIHNwZWVkWSwgZHVyYXRpb24sIGVhc2luZ1R5cGUpIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBtb3ZlQW5pbWF0aW9uKVxuICAgICAgICBAbW92ZUFuaW1hdGlvbi5zY3JvbGwoc3BlZWRYLCBzcGVlZFksIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBAY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQG1vdmVBbmltYXRpb25cbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogU2Nyb2xscyB0aGUgZ2FtZSBvYmplY3QgdG8gYSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAgKlxuICAgICogQG1ldGhvZCBzY3JvbGxUb1xuICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24uXG4gICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSBwb3NpdGlvbi5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgXG4gICAgc2Nyb2xsVG86ICh4LCB5LCBkdXJhdGlvbiwgZWFzaW5nVHlwZSkgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQG1vdmVBbmltYXRpb24pXG4gICAgICAgIEBtb3ZlQW5pbWF0aW9uLnNjcm9sbFRvKHgsIHksIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBAY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQG1vdmVBbmltYXRpb25cbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogU2Nyb2xscyB0aGUgZ2FtZSBvYmplY3QgYWxvbmcgYSBwYXRoLlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2Nyb2xsUGF0aFxuICAgICogQHBhcmFtIHtPYmplY3R9IHBhdGggVGhlIHBhdGggdG8gZm9sbG93LlxuICAgICogQHBhcmFtIHtncy5BbmltYXRpb25Mb29wVHlwZX0gbG9vcFR5cGUgVGhlIGxvb3AtVHlwZS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgXG4gICAgc2Nyb2xsUGF0aDogKHBhdGgsIGxvb3BUeXBlLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSkgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQHBhdGhBbmltYXRpb24pXG4gICAgICAgIEBwYXRoQW5pbWF0aW9uLnNjcm9sbChwYXRoLCBsb29wVHlwZSwgZHVyYXRpb24sIGVhc2luZ1R5cGUsIEBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAcGF0aEFuaW1hdGlvblxuICAgIFxuICAgICAgICBcbiAgICAjIyMqXG4gICAgKiBab29tcyBhIGdhbWUgb2JqZWN0IHRvIHNwZWNpZmllZCBzaXplLlxuICAgICpcbiAgICAqIEBtZXRob2Qgem9vbVRvXG4gICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgeC1heGlzIHpvb20tZmFjdG9yLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHktYXhpcyB6b29tLWZhY3Rvci5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgICAgIFxuICAgIHpvb21UbzogKHgsIHksIGR1cmF0aW9uLCBlYXNpbmdUeXBlKSAtPlxuICAgICAgICBAb2JqZWN0LmFkZENvbXBvbmVudChAem9vbUFuaW1hdGlvbilcbiAgICAgICAgQHpvb21BbmltYXRpb24uc3RhcnQoeCwgeSwgZHVyYXRpb24sIGVhc2luZ1R5cGUsIEBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAem9vbUFuaW1hdGlvblxuICAgICAgICBcbiAgICBcbiAgICAjIyMqXG4gICAgKiBCbGVuZHMgYSBnYW1lIG9iamVjdCB0byBzcGVjaWZpZWQgb3BhY2l0eS5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGJsZW5kVG9cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcGFjaXR5IFRoZSB0YXJnZXQgb3BhY2l0eS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayBjYWxsZWQgaWYgYmxlbmRpbmcgaXMgZmluaXNoZWQuIFxuICAgICMjIyAgICBcbiAgICBibGVuZFRvOiAob3BhY2l0eSwgZHVyYXRpb24sIGVhc2luZ1R5cGUsIGNhbGxiYWNrKSAtPlxuICAgICAgICBAYmxlbmRBbmltYXRpb24uc3RvcCgpXG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBibGVuZEFuaW1hdGlvbilcbiAgICAgICAgQGJsZW5kQW5pbWF0aW9uLnN0YXJ0KG9wYWNpdHksIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBncy5DYWxsQmFjayhcIm9uQmxlbmRGaW5pc2hcIiwgdGhpcywgY2FsbGJhY2spKSBcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAYmxlbmRBbmltYXRpb25cbiAgICAgXG4gICAgIyMjKlxuICAgICogQW5pbWF0ZXMgYSBMaXZlMkQgbW9kZWwgcGFyYW1ldGVyIG9mIGEgTGl2ZTJEIGdhbWUgb2JqZWN0IHRvIGEgc3BlY2lmaWVkIHZhbHVlLlxuICAgICpcbiAgICAqIEBtZXRob2QgYmxlbmRUb1xuICAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gYW5pbWF0ZS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgdGFyZ2V0IHZhbHVlLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIGNhbGxlZCBpZiBibGVuZGluZyBpcyBmaW5pc2hlZC4gXG4gICAgIyMjXG4gICAgbDJkUGFyYW1ldGVyVG86IChwYXJhbSwgdmFsdWUsIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBjYWxsYmFjaykgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQGwyZEFuaW1hdGlvbilcbiAgICAgICAgQGwyZEFuaW1hdGlvbi5zdGFydChwYXJhbSwgdmFsdWUsIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBncy5DYWxsQmFjayhcIm9uQmxlbmRGaW5pc2hcIiwgdGhpcywgY2FsbGJhY2spKSBcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAbDJkQW5pbWF0aW9uXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIEJsdXJzIGEgZ2FtZSBvYmplY3QgdG8gc3BlY2lmaWVkIGJsdXItcG93ZXIuXG4gICAgKlxuICAgICogQG1ldGhvZCBibHVyVG9cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3dlciBUaGUgdGFyZ2V0IGJsdXItcG93ZXIuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZS5cbiAgICAjIyMgICAgIFxuICAgIGJsdXJUbzogKHBvd2VyLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSkgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQGJsdXJBbmltYXRpb24pXG4gICAgICAgIEBibHVyQW5pbWF0aW9uLnN0YXJ0KHBvd2VyLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSkgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQGJsdXJBbmltYXRpb25cbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogUGl4ZWxhdGVzIGEgZ2FtZSBvYmplY3QgdG8gc3BlY2lmaWVkIHBpeGVsLXNpemUvYmxvY2stc2l6ZVxuICAgICpcbiAgICAqIEBtZXRob2QgcGl4ZWxhdGVUb1xuICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gVGhlIHRhcmdldCBibG9jay13aWR0aFxuICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFRoZSB0YXJnZXQgYmxvY2staGVpZ2h0XG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZS5cbiAgICAjIyMgICAgIFxuICAgIHBpeGVsYXRlVG86ICh3aWR0aCwgaGVpZ2h0LCBkdXJhdGlvbiwgZWFzaW5nVHlwZSkgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQHBpeGVsYXRlQW5pbWF0aW9uKVxuICAgICAgICBAcGl4ZWxhdGVBbmltYXRpb24uc3RhcnQod2lkdGgsIGhlaWdodCwgZHVyYXRpb24sIGVhc2luZ1R5cGUpIFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEBwaXhlbGF0ZUFuaW1hdGlvblxuICAgICAgICBcbiAgICAjIyMqXG4gICAgKiBXb2JibGVzIGEgZ2FtZSBvYmplY3QgdG8gc3BlY2lmaWVkIHdvYmJsZS1wb3dlciBhbmQgd29iYmxlLXNwZWVkLlxuICAgICpcbiAgICAqIEBtZXRob2Qgd29iYmxlVG9cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb3dlciBUaGUgdGFyZ2V0IHdvYmJsZS1wb3dlci5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCBUaGUgdGFyZ2V0IHdvYmJsZS1zcGVlZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgICAgXG4gICAgd29iYmxlVG86IChwb3dlciwgc3BlZWQsIGR1cmF0aW9uLCBlYXNpbmdUeXBlKSAtPlxuICAgICAgICBAb2JqZWN0LmFkZENvbXBvbmVudChAd29iYmxlQW5pbWF0aW9uKVxuICAgICAgICBAd29iYmxlQW5pbWF0aW9uLnN0YXJ0KHBvd2VyLCBzcGVlZCwgZHVyYXRpb24sIGVhc2luZ1R5cGUpIFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEB3b2JibGVBbmltYXRpb25cbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogQ29sb3JzIGEgZ2FtZSBvYmplY3QgdG8gYSBzcGVjaWZpZWQgdGFyZ2V0IGNvbG9yLlxuICAgICpcbiAgICAqIEBtZXRob2QgY29sb3JUb1xuICAgICogQHBhcmFtIHtDb2xvcn0gY29sb3IgVGhlIHRhcmdldCBjb2xvci5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgXG4gICAgY29sb3JUbzogKGNvbG9yLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSkgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQGNvbG9yQW5pbWF0aW9uKVxuICAgICAgICBAY29sb3JBbmltYXRpb24uc3RhcnQoY29sb3IsIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBAY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQGNvbG9yQW5pbWF0aW9uXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIEFuIGltYWdlIGFuaW1hdGlvbiBydW5zIGZyb20gbGVmdCB0byByaWdodCB1c2luZyB0aGUgZ2FtZSBvYmplY3Qnc1xuICAgICogaW1hZ2UtcHJvcGVydHkuXG4gICAgKlxuICAgICogQG1ldGhvZCBjaGFuZ2VJbWFnZXNcbiAgICAqIEBwYXJhbSB7QXJyYXl9IGltYWdlcyBBbiBhcnJheSBvZiBpbWFnZSBuYW1lcy5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgICAgIFxuICAgIGNoYW5nZUltYWdlczogKGltYWdlcywgZHVyYXRpb24sIGVhc2luZ1R5cGUpIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBpbWFnZUFuaW1hdGlvbilcbiAgICAgICAgQGltYWdlQW5pbWF0aW9uLnN0YXJ0KGltYWdlcywgZHVyYXRpb24sIGVhc2luZ1R5cGUsIEBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAaW1hZ2VBbmltYXRpb25cbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogQSBmcmFtZSBhbmltYXRpb24gd2hpY2ggbW9kaWZpZXMgdGhlIGdhbWUgb2JqZWN0J3Mgc3JjUmVjdCBwcm9wZXJ0eVxuICAgICogYSBwbGF5IGFuIGFuaW1hdGlvbi5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGNoYW5nZUZyYW1lc1xuICAgICogQHBhcmFtIHtncy5SZWN0W119IGZyYW1lcyBBbiBhcnJheSBvZiBzb3VyY2UgcmVjdGFuZ2xlcyAoZnJhbWVzKS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyAgICAgIFxuICAgICNjaGFuZ2VGcmFtZXM6IChmcmFtZXMsIGR1cmF0aW9uLCBlYXNpbmdUeXBlKSAtPlxuICAgICMgICAgYW5pbWF0aW9uID0gbmV3IGdzLkNvbXBvbmVudF9GcmFtZUFuaW1hdGlvbigpXG4gICAgIyAgICBAb2JqZWN0LmFkZENvbXBvbmVudChhbmltYXRpb24pXG4gICAgIyAgICBhbmltYXRpb24uc3RhcnQoZnJhbWVzLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSwgQGNhbGxiYWNrKVxuICAgICAgIFxuICAgICMjIypcbiAgICAqIEEgZnJhbWUgYW5pbWF0aW9uIHdoaWNoIG1vZGlmaWVzIHRoZSBnYW1lIG9iamVjdCdzIHNyY1JlY3QgcHJvcGVydHlcbiAgICAqIGEgcGxheSBhbiBhbmltYXRpb24uXG4gICAgKlxuICAgICogQG1ldGhvZCBwbGF5QW5pbWF0aW9uXG4gICAgKiBAcGFyYW0ge2dzLlJlY3RbXX0gZnJhbWVzIEFuIGFycmF5IG9mIHNvdXJjZSByZWN0YW5nbGVzIChmcmFtZXMpLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgIyMjICAgICBcbiAgICBwbGF5QW5pbWF0aW9uOiAoYW5pbWF0aW9uUmVjb3JkKSAtPlxuICAgICAgICBAZnJhbWVBbmltYXRpb24ucmVmcmVzaChhbmltYXRpb25SZWNvcmQpXG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBmcmFtZUFuaW1hdGlvbilcbiAgICAgICAgQGZyYW1lQW5pbWF0aW9uLnN0YXJ0KEBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAZnJhbWVBbmltYXRpb25cbiAgICAgICBcbiAgICAjIyMqXG4gICAgKiBDaGFuZ2VzIGEgZmllbGQgb2YgdGhlIGdhbWUgb2JqZWN0IHRvIGEgc3BlY2lmaWVkIHZhbHVlLlxuICAgICpcbiAgICAqIEBtZXRob2QgY2hhbmdlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gVmFsdWUgVGhlIHRhcmdldCB2YWx1ZS5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZCBUaGUgbmFtZSBvZiB0aGUgZmllbGQvcHJvcGVydHkuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZS5cbiAgICAjIyMgICBcbiAgICBjaGFuZ2U6ICh2YWx1ZSwgZmllbGQsIGR1cmF0aW9uLCBlYXNpbmdUeXBlKSAtPlxuICAgICAgICBAb2JqZWN0LmFkZENvbXBvbmVudChAZmllbGRBbmltYXRpb24pXG4gICAgICAgIEBmaWVsZEFuaW1hdGlvbi5zdGFydCh2YWx1ZSwgZmllbGQsIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBAY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQGZpZWxkQW5pbWF0aW9uXG4gICAgICAgXG4gICAgIyMjKlxuICAgICogU2hha2VzIHRoZSBnYW1lIG9iamVjdCBob3Jpem9udGFsbHkgdXNpbmcgdGhlIGdhbWUgb2JqZWN0J3Mgb2Zmc2V0LXByb3BlcnR5LlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2hha2VcbiAgICAqIEBwYXJhbSB7Z3MuUmFuZ2V9IHJhbmdlIFRoZSBob3Jpem9udGFsIHNoYWtlLXJhbmdlLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkIFRoZSBzaGFrZSBzcGVlZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZ1R5cGUgVGhlIGVhc2luZy10eXBlLlxuICAgICMjIyBcbiAgICBzaGFrZTogKHJhbmdlLCBzcGVlZCwgZHVyYXRpb24sIGVhc2luZykgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQHNoYWtlQW5pbWF0aW9uKVxuICAgICAgICBAc2hha2VBbmltYXRpb24uc3RhcnQocmFuZ2UsIHNwZWVkLCBkdXJhdGlvbiwgZWFzaW5nLCBAY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQHNoYWtlQW5pbWF0aW9uXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIFRpbnRzIHRoZSBnYW1lIG9iamVjdCB0byBhIHNwZWNpZmllZCB0b25lLlxuICAgICpcbiAgICAqIEBtZXRob2QgdGludFRvXG4gICAgKiBAcGFyYW0ge1RvbmV9IHRvbmUgVGhlIHRhcmdldCB0b25lLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgIyMjIFxuICAgIHRpbnRUbzogKHRvbmUsIGR1cmF0aW9uLCBlYXNpbmdUeXBlKSAtPlxuICAgICAgICBAb2JqZWN0LmFkZENvbXBvbmVudChAdGludEFuaW1hdGlvbilcbiAgICAgICAgQHRpbnRBbmltYXRpb24uc3RhcnQodG9uZSwgZHVyYXRpb24sIGVhc2luZ1R5cGUsIEBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAdGludEFuaW1hdGlvblxuICAgIFxuICAgICMjIypcbiAgICAqIFJvdGF0ZXMgdGhlIGdhbWUgb2JqZWN0IGFyb3VuZCBpdHMgYW5jaG9yLXBvaW50LlxuICAgICpcbiAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgKiBAcGFyYW0ge2dzLlJvdGF0aW9uRGlyZWN0aW9ufSBkaXJlY3Rpb24gVGhlIHJvdGF0aW9uLWRpcmVjdGlvbi5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCBUaGUgcm90YXRpb24gc3BlZWQgaW4gZGVncmVlcyBwZXIgZnJhbWUuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZS5cbiAgICAjIyMgXG4gICAgcm90YXRlOiAoZGlyZWN0aW9uLCBzcGVlZCwgZHVyYXRpb24sIGVhc2luZ1R5cGUpIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEByb3RhdGVBbmltYXRpb24pXG4gICAgICAgIEByb3RhdGVBbmltYXRpb24ucm90YXRlKGRpcmVjdGlvbiwgc3BlZWQsIGR1cmF0aW9uLCBlYXNpbmdUeXBlLCBAY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQHJvdGF0ZUFuaW1hdGlvblxuICAgIFxuICAgICMjIypcbiAgICAqIFJvdGF0ZXMgdGhlIGdhbWUgb2JqZWN0IGFyb3VuZCBpdHMgYW5jaG9yLXBvaW50IHRvIGEgc3BlY2lmaWVkIGFuZ2xlLlxuICAgICpcbiAgICAqIEBtZXRob2Qgcm90YXRlVG9cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgdGFyZ2V0IGFuZ2xlLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgIyMjIFxuICAgIHJvdGF0ZVRvOiAoYW5nbGUsIGR1cmF0aW9uLCBlYXNpbmdUeXBlKSAtPlxuICAgICAgICBAb2JqZWN0LmFkZENvbXBvbmVudChAcm90YXRlQW5pbWF0aW9uKVxuICAgICAgICBAcm90YXRlQW5pbWF0aW9uLnJvdGF0ZVRvKGFuZ2xlLCBkdXJhdGlvbiwgZWFzaW5nVHlwZSwgQGNhbGxiYWNrKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEByb3RhdGVBbmltYXRpb25cbiAgICAgICAgXG4gICAgIyMjKlxuICAgICogTGV0cyBhIGdhbWUgb2JqZWN0IGFwcGVhciBvbiBzY3JlZW4gdXNpbmcgYSBtYXNraW5nLWVmZmVjdC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG1hc2tJblxuICAgICogQHBhcmFtIHtncy5NYXNrfSBtYXNrIFRoZSBtYXNrIHVzZWQgZm9yIHRoZSBhbmltYXRpb24uXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZS5cbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2stZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC4gXG4gICAgIyMjICAgICBcbiAgICBtYXNrSW46IChtYXNrLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjaykgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQG1hc2tBbmltYXRpb24pXG4gICAgICAgIEBtYXNrQW5pbWF0aW9uLm1hc2tJbihtYXNrLCBkdXJhdGlvbiwgZWFzaW5nLCAob2JqZWN0LCBhbmltYXRpb24pIC0+IG9iamVjdC5yZW1vdmVDb21wb25lbnQoYW5pbWF0aW9uKTsgY2FsbGJhY2s/KG9iamVjdCk7KVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEBtYXNrQW5pbWF0aW9uXG4gICAgIFxuICAgICMjIypcbiAgICAqIERlc2NyaXB0aW9uIGZvbGxvd3MuLi5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG1hc2tUb1xuICAgICogQHBhcmFtIHtncy5NYXNrfSBtYXNrIFRoZSBtYXNrIHVzZWQgZm9yIHRoZSBhbmltYXRpb24uXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdUeXBlIFRoZSBlYXNpbmctdHlwZS5cbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2stZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC4gXG4gICAgIyMjICAgICBcbiAgICBtYXNrVG86IChtYXNrLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjaykgLT5cbiAgICAgICAgQG9iamVjdC5hZGRDb21wb25lbnQoQG1hc2tBbmltYXRpb24pXG4gICAgICAgIEBtYXNrQW5pbWF0aW9uLm1hc2tUbyhtYXNrLCBkdXJhdGlvbiwgZWFzaW5nLCAob2JqZWN0LCBhbmltYXRpb24pIC0+IG9iamVjdC5yZW1vdmVDb21wb25lbnQoYW5pbWF0aW9uKTsgY2FsbGJhY2s/KG9iamVjdCk7KVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEBtYXNrQW5pbWF0aW9uXG4gICAgICAgIFxuICAgICMjIypcbiAgICAqIExldHMgYSBnYW1lIG9iamVjdCBkaXNhcHBlYXIgZnJvbSBzY3JlZW4gdXNpbmcgYSBtYXNraW5nLWVmZmVjdC5cbiAgICAqXG4gICAgKiBAbWV0aG9kIG1hc2tPdXRcbiAgICAqIEBwYXJhbSB7Z3MuTWFza30gbWFzayBUaGUgbWFzayB1c2VkIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrLWZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBhbmltYXRpb24gaXMgZmluaXNoZWQuIFxuICAgICMjIyAgXG4gICAgbWFza091dDogKG1hc2ssIGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrKSAtPlxuICAgICAgICBAb2JqZWN0LmFkZENvbXBvbmVudChAbWFza0FuaW1hdGlvbilcbiAgICAgICAgQG1hc2tBbmltYXRpb24ubWFza091dChtYXNrLCBkdXJhdGlvbiwgZWFzaW5nLCAob2JqZWN0LCBhbmltYXRpb24pIC0+IG9iamVjdC5yZW1vdmVDb21wb25lbnQoYW5pbWF0aW9uKTsgY2FsbGJhY2s/KG9iamVjdCk7KVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEBtYXNrQW5pbWF0aW9uXG5cbiAgICAjIyMqXG4gICAgKiBMZXRzIGEgZ2FtZSBvYmplY3QgYXBwZWFyIG9uIHNjcmVlbiBmcm9tIGxlZnQsIHRvcCwgcmlnaHQgb3IgYm90dG9tIHVzaW5nIFxuICAgICogYSBtb3ZlLWFuaW1hdGlvblxuICAgICpcbiAgICAqIEBtZXRob2QgbW92ZUluXG4gICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSB0YXJnZXQtcG9zaXRpb24uXG4gICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSB0YXJnZXQtcG9zaXRpb24uXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZSBUaGUgbW92ZW1lbnQtZGlyZWN0aW9uIGZyb20gd2hlcmUgdGhlIGdhbWUgb2JqZWN0IHNob3VsZCBtb3ZlLWluLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrLWZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBhbmltYXRpb24gaXMgZmluaXNoZWQuIFxuICAgICMjIyAgXG4gICAgbW92ZUluOiAoeCwgeSwgdHlwZSwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBtb3ZlQW5pbWF0aW9uKVxuICAgICAgICBAbW92ZUFuaW1hdGlvbi5tb3ZlSW4oeCwgeSwgdHlwZSwgZHVyYXRpb24sIGVhc2luZywgKG9iamVjdCwgYW5pbWF0aW9uKSAtPiBcbiAgICAgICAgICAgIG9iamVjdC5yZW1vdmVDb21wb25lbnQoYW5pbWF0aW9uKVxuICAgICAgICAgICAgY2FsbGJhY2s/KG9iamVjdCkpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gQG1vdmVBbmltYXRpb25cbiAgICAgIFxuICAgICMjIypcbiAgICAqIExldHMgYSBnYW1lIG9iamVjdCBkaXNhcHBlYXIgZnJvbSBzY3JlZW4gdG8gdGhlIGxlZnQsIHRvcCwgcmlnaHQgb3IgYm90dG9tIHVzaW5nIFxuICAgICogYSBtb3ZlLWFuaW1hdGlvblxuICAgICpcbiAgICAqIEBtZXRob2QgbW92ZU91dFxuICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgVGhlIG1vdmVtZW50LWRpcmVjdGlvbiBpbiB3aGljaCB0aGUgZ2FtZSBvYmplY3Qgc2hvdWxkIG1vdmUtb3V0LlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nVHlwZSBUaGUgZWFzaW5nLXR5cGUuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrLWZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBhbmltYXRpb24gaXMgZmluaXNoZWQuIFxuICAgICMjIyAgICBcbiAgICBtb3ZlT3V0OiAodHlwZSwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spIC0+XG4gICAgICAgIEBvYmplY3QuYWRkQ29tcG9uZW50KEBtb3ZlQW5pbWF0aW9uKVxuICAgICAgICBAbW92ZUFuaW1hdGlvbi5tb3ZlT3V0KHR5cGUsIGR1cmF0aW9uLCBlYXNpbmcsIChvYmplY3QsIGFuaW1hdGlvbikgLT4gXG4gICAgICAgICAgICBvYmplY3QucmVtb3ZlQ29tcG9uZW50KGFuaW1hdGlvbilcbiAgICAgICAgICAgIGNhbGxiYWNrPyhvYmplY3QpXG4gICAgICAgIClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBAbW92ZUFuaW1hdGlvblxuICAgICAgICBcbiAgICAjIyMqXG4gICAgKiBMZXRzIGEgZ2FtZSBvYmplY3QgYXBwZWFyIG9uIHNjcmVlbiB1c2luZyBibGVuZGluZy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNob3dcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZyBUaGUgZWFzaW5nLXR5cGUuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrLWZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBhbmltYXRpb24gaXMgZmluaXNoZWQuIFxuICAgICMjIyAgXG4gICAgc2hvdzogKGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrKSAtPlxuICAgICAgICBAb2JqZWN0Lm9wYWNpdHkgPSAwXG4gICAgICAgIEBvYmplY3QudmlzdWFsPy51cGRhdGUoKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIEBibGVuZFRvKDI1NSwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spXG4gICAgIFxuICAgICMjIypcbiAgICAqIExldHMgYSBnYW1lIG9iamVjdCBkaXNhcHBlYXIgZnJvbSBzY3JlZW4gdXNpbmcgYmxlbmRpbmcuXG4gICAgKlxuICAgICogQG1ldGhvZCBoaWRlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmcgVGhlIGVhc2luZy10eXBlLlxuICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjay1mdW5jdGlvbiBjYWxsZWQgd2hlbiB0aGUgYW5pbWF0aW9uIGlzIGZpbmlzaGVkLiBcbiAgICAjIyMgICAgIFxuICAgIGhpZGU6IChkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjaykgLT5cbiAgICAgICAgcmV0dXJuIEBibGVuZFRvKDAsIGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrKVxuICAgICAgIFxuICAgICMjIypcbiAgICAqIENoYW5nZXMgdmlzaWJsZS1wcm9wZXJ0eSB0byB0cnVlLiBUaGlzIG1ldGhvZCBpcyBkZXByZWNhdGVkLlxuICAgICogXG4gICAgKiBAbWV0aG9kIG9wZW5cbiAgICAqIEBkZXByZWNhdGVkXG4gICAgIyMjICAgXG4gICAgb3BlbjogLT4gQG9iamVjdC52aXNpYmxlID0geWVzXG4gICAgXG4gICAgIyMjKlxuICAgICogQ2hhbmdlcyB2aXNpYmxlLXByb3BlcnR5IHRvIGZhbHNlLiBUaGlzIG1ldGhvZCBpcyBkZXByZWNhdGVkLlxuICAgICogXG4gICAgKiBAbWV0aG9kIGNsb3NlXG4gICAgKiBAZGVwcmVjYXRlZFxuICAgICMjIyAgIFxuICAgIGNsb3NlOiAtPiBAb2JqZWN0LnZpc2libGUgPSBub1xuICAgIFxuICAgICMjIypcbiAgICAqIEZsYXNoZXMgdGhlIGdhbWUgb2JqZWN0LlxuICAgICpcbiAgICAqIEBtZXRob2QgZmxhc2hcbiAgICAqIEBwYXJhbSB7Q29sb3J9IGNvbG9yIFRoZSBmbGFzaC1jb2xvci5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaGUgZHVyYXRpb24gaW4gZnJhbWVzLlxuICAgICMjI1xuICAgIGZsYXNoOiAoY29sb3IsIGR1cmF0aW9uKSAtPlxuICAgICAgICBAb2JqZWN0LmNvbG9yID0gY29sb3JcbiAgICAgICAgY29sb3IgPSBuZXcgQ29sb3IoY29sb3IpXG4gICAgICAgIGNvbG9yLmFscGhhID0gMFxuICAgICAgICByZXR1cm4gQGNvbG9yVG8oY29sb3IsIGR1cmF0aW9uLCBncy5FYXNpbmdzLkVBU0VfTElORUFSW2dzLkVhc2luZ1R5cGVzLkVBU0VfSU5dKVxuICAgIFxuICAgICMjIypcbiAgICAqIExldHMgYSBnYW1lIG9iamVjdCBhcHBlYXIgb24gc2NyZWVuIHVzaW5nIGEgc3BlY2lmaWVkIGFuaW1hdGlvbi5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGFwcGVhclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgdGFyZ2V0LXBvc2l0aW9uLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgdGFyZ2V0LXBvc2l0aW9uLlxuICAgICogQHBhcmFtIHtncy5BcHBlYXJBbmltYXRpb25JbmZvfSBhbmltYXRpb24gVGhlIGFuaW1hdGlvbiBpbmZvLW9iamVjdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmcgVGhlIGVhc2luZy10eXBlLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIFRoZSBkdXJhdGlvbiBpbiBmcmFtZXMuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrLWZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBhbmltYXRpb24gaXMgZmluaXNoZWQuIFxuICAgICMjIyAgICAgIFxuICAgIGFwcGVhcjogKHgsIHksIGFuaW1hdGlvbiwgZWFzaW5nLCBkdXJhdGlvbiwgY2FsbGJhY2spIC0+XG4gICAgICAgIGVhc2luZyA9IGVhc2luZyB8fCBncy5FYXNpbmdzLkVBU0VfTElORUFSW2dzLkVhc2luZ1R5cGVzLkVBU0VfSU5dXG4gICAgICAgIEBvYmplY3QudmlzaWJsZSA9IHllc1xuXG4gICAgICAgIGlmIGFuaW1hdGlvbi50eXBlID09IGdzLkFuaW1hdGlvblR5cGVzLk1PVkVNRU5UXG4gICAgICAgICAgICBAbW92ZUluKHgsIHksIGFuaW1hdGlvbi5tb3ZlbWVudCwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spXG4gICAgICAgIGVsc2UgaWYgYW5pbWF0aW9uLnR5cGUgPT0gZ3MuQW5pbWF0aW9uVHlwZXMuTUFTS0lOR1xuICAgICAgICAgICAgQG1hc2tJbihhbmltYXRpb24ubWFzaywgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBzaG93KGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrKVxuICAgIFxuICAgICMjIypcbiAgICAqIExldHMgYSBnYW1lIG9iamVjdCBkaXNhcHBlYXIgZnJvbSBzY3JlZW4gdXNpbmcgYSBzcGVjaWZpZWQgYW5pbWF0aW9uLlxuICAgICpcbiAgICAqIEBtZXRob2QgZGlzYXBwZWFyXG4gICAgKiBAcGFyYW0ge2dzLkFwcGVhckFuaW1hdGlvbkluZm99IGFuaW1hdGlvbiBUaGUgYW5pbWF0aW9uIGluZm8tb2JqZWN0LlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVhc2luZyBUaGUgZWFzaW5nLXR5cGUuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gVGhlIGR1cmF0aW9uIGluIGZyYW1lcy5cbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gQW4gb3B0aW9uYWwgY2FsbGJhY2stZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC4gXG4gICAgIyMjICAgICAgIFxuICAgIGRpc2FwcGVhcjogKGFuaW1hdGlvbiwgZWFzaW5nLCBkdXJhdGlvbiwgY2FsbGJhY2spIC0+XG4gICAgICAgIEBvYmplY3QudmlzaWJsZSA9IHllc1xuICAgICAgICBpZiBhbmltYXRpb24udHlwZSA9PSBncy5BbmltYXRpb25UeXBlcy5NT1ZFTUVOVFxuICAgICAgICAgICAgQG1vdmVPdXQoYW5pbWF0aW9uLm1vdmVtZW50LCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjaylcbiAgICAgICAgZWxzZSBpZiBhbmltYXRpb24udHlwZSA9PSBncy5BbmltYXRpb25UeXBlcy5NQVNLSU5HXG4gICAgICAgICAgICBAbWFza091dChhbmltYXRpb24ubWFzaywgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBoaWRlKGR1cmF0aW9uLCBlYXNpbmcsIGNhbGxiYWNrKVxuICAgICAgICBcblxuZ3MuQW5pbWF0b3IgPSBDb21wb25lbnRfQW5pbWF0b3JcbmdzLkNvbXBvbmVudF9BbmltYXRvciA9IENvbXBvbmVudF9BbmltYXRvciJdfQ==
//# sourceURL=Component_Animator_144.js