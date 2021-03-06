// Generated by CoffeeScript 1.12.7

/**
* An enumeration of different management modes describing how a layout should
* handle its sub-objects coming from a data-source.
*
* @module ui
* @class LayoutManagementMode
* @memberof ui
* @constructor
* @static
* @final
 */

(function() {
  var LayoutManagementMode;

  LayoutManagementMode = (function() {
    function LayoutManagementMode() {}

    LayoutManagementMode.initialize = function() {

      /**
      * All sub-objects are created at setup time.
      * @property NORMAL
      * @type number
      * @static
      * @final
       */
      this.NORMAL = 0;

      /**
      * The sub-objects are created at update time and only those which are currently visible.
      * @property JUST_IN_TIME
      * @type number
      * @static
      * @final
       */
      return this.JUST_IN_TIME = 1;
    };


    /**
    * Gets the constant number value from a specified human-readable string.
    * @method fromString
    * @param {string} s - The management mode as string. Can be "normal" or "just_in_time".
    * @return {number} The constant number value.
    * @static
    * @final
     */

    LayoutManagementMode.fromString = function(s) {
      switch (s) {
        case "normal":
          return 0;
        case "just_in_time":
          return 1;
        default:
          return 0;
      }
    };

    return LayoutManagementMode;

  })();

  LayoutManagementMode.initialize();

  ui.LayoutManagementMode = LayoutManagementMode;

}).call(this);
