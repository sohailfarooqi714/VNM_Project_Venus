var Component_TestBedBehavior,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component_TestBedBehavior = (function(superClass) {
  extend(Component_TestBedBehavior, superClass);


  /**
  * A test bed scene behavior. Here you can play around with Visual Novel Maker's 
  * game engine to get a better feeling for everything.
   */

  function Component_TestBedBehavior() {
    Component_TestBedBehavior.__super__.constructor.call(this);
  }


  /**
  * Initializes the scene.
   */

  Component_TestBedBehavior.prototype.initialize = function() {
    return Component_TestBedBehavior.__super__.initialize.apply(this, arguments);
  };


  /**
  * Disposes the scene.
   */

  Component_TestBedBehavior.prototype.dispose = function() {
    return Component_TestBedBehavior.__super__.dispose.apply(this, arguments);
  };


  /**
  * Prepares all visual game objects for the scene.
   */

  Component_TestBedBehavior.prototype.prepareVisual = function() {};


  /**
  * Prepares all data for the scene and loads the necessary graphic and audio resources.
   */

  Component_TestBedBehavior.prototype.prepareData = function() {};


  /**
  * Update the scene's content.
   */

  Component_TestBedBehavior.prototype.updateContent = function() {};

  return Component_TestBedBehavior;

})(gs.Component_SceneBehavior);

gs.Component_LayoutSceneBehavior = Component_TestBedBehavior;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQUEseUJBQUE7RUFBQTs7O0FBQU07Ozs7QUFDRjs7Ozs7RUFJYSxtQ0FBQTtJQUNULHlEQUFBO0VBRFM7OztBQUViOzs7O3NDQUdBLFVBQUEsR0FBWSxTQUFBO1dBQ1IsMkRBQUEsU0FBQTtFQURROzs7QUFFWjs7OztzQ0FHQSxPQUFBLEdBQVMsU0FBQTtXQUNMLHdEQUFBLFNBQUE7RUFESzs7O0FBR1Q7Ozs7c0NBR0EsYUFBQSxHQUFlLFNBQUEsR0FBQTs7O0FBRWY7Ozs7c0NBR0EsV0FBQSxHQUFhLFNBQUEsR0FBQTs7O0FBRWI7Ozs7c0NBR0EsYUFBQSxHQUFlLFNBQUEsR0FBQTs7OztHQS9CcUIsRUFBRSxDQUFDOztBQWlDM0MsRUFBRSxDQUFDLDZCQUFILEdBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiNcclxuIyAgIFNjcmlwdDogQ29tcG9uZW50X1Rlc3RCZWRCZWhhdmlvclxyXG4jXHJcbiMgICBQdXQgeW91ciBuYW1lIGhlcmVcclxuI1xyXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY2xhc3MgQ29tcG9uZW50X1Rlc3RCZWRCZWhhdmlvciBleHRlbmRzIGdzLkNvbXBvbmVudF9TY2VuZUJlaGF2aW9yXHJcbiAgICAjIyMqXHJcbiAgICAqIEEgdGVzdCBiZWQgc2NlbmUgYmVoYXZpb3IuIEhlcmUgeW91IGNhbiBwbGF5IGFyb3VuZCB3aXRoIFZpc3VhbCBOb3ZlbCBNYWtlcidzIFxyXG4gICAgKiBnYW1lIGVuZ2luZSB0byBnZXQgYSBiZXR0ZXIgZmVlbGluZyBmb3IgZXZlcnl0aGluZy5cclxuICAgICMjI1xyXG4gICAgY29uc3RydWN0b3I6IC0+XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgIyMjKlxyXG4gICAgKiBJbml0aWFsaXplcyB0aGUgc2NlbmUuIFxyXG4gICAgIyMjXHJcbiAgICBpbml0aWFsaXplOiAtPlxyXG4gICAgICAgIHN1cGVyXHJcbiAgICAjIyMqXHJcbiAgICAqIERpc3Bvc2VzIHRoZSBzY2VuZS5cclxuICAgICMjIyAgXHJcbiAgICBkaXNwb3NlOiAtPlxyXG4gICAgICAgIHN1cGVyXHJcbiAgICAgICAgXHJcbiAgICAjIyMqXHJcbiAgICAqIFByZXBhcmVzIGFsbCB2aXN1YWwgZ2FtZSBvYmplY3RzIGZvciB0aGUgc2NlbmUuXHJcbiAgICAjIyMgIFxyXG4gICAgcHJlcGFyZVZpc3VhbDogLT5cclxuICAgICAgICBcclxuICAgICMjIypcclxuICAgICogUHJlcGFyZXMgYWxsIGRhdGEgZm9yIHRoZSBzY2VuZSBhbmQgbG9hZHMgdGhlIG5lY2Vzc2FyeSBncmFwaGljIGFuZCBhdWRpbyByZXNvdXJjZXMuXHJcbiAgICAjIyMgXHJcbiAgICBwcmVwYXJlRGF0YTogLT5cclxuICAgIFxyXG4gICAgIyMjKlxyXG4gICAgKiBVcGRhdGUgdGhlIHNjZW5lJ3MgY29udGVudC5cclxuICAgICMjIyAgICAgICAgIFxyXG4gICAgdXBkYXRlQ29udGVudDogLT5cclxuICAgIFxyXG5ncy5Db21wb25lbnRfTGF5b3V0U2NlbmVCZWhhdmlvciA9IENvbXBvbmVudF9UZXN0QmVkQmVoYXZpb3IiXX0=
//# sourceURL=Component_TestBedBehavior_184.js