// Generated by CoffeeScript 1.12.7
(function() {
  var ResourceManager, ResourceManagerContext;

  ResourceManagerContext = (function() {

    /**
    * If associated to a gs.ResourceManager, a resource context registers all loaded resources
    * resources. If gs.ResourceManager needs to dispose resources, it will only dispose
    * resource associated if the current context.
    *
    * By default, each game scene creates it's own resource context to only dispose resources
    * created by itself.
    *
    * @module gs
    * @class ResourceManager
    * @memberof gs
    * @constructor
     */
    function ResourceManagerContext() {

      /**
      * All resources associated with this context.
      * @property resources
      * @type Object[]
      * @readOnly
       */
      this.resources = [];
    }


    /**
    * Converts the resource context into a data-bundle for serialization. The data-bundle will only contain
    * the names of the resources associated with this context but not the resource-data itself.
    * @method toDataBundle
    * @return {string[]} An array of resource names associated with this context.
     */

    ResourceManagerContext.prototype.toDataBundle = function() {
      return this.resources.select(function(r) {
        return r.name;
      });
    };


    /**
    * Initializes the resource context from a data-bundle. Any already existing resource associations
    * with this context will be deleted.
    * @method fromDataBundle
     */

    ResourceManagerContext.prototype.fromDataBundle = function(data, resourcesByPath) {
      return this.resources = data.select(function(n) {
        return {
          name: n,
          data: resourcesByPath[n]
        };
      });
    };


    /**
    * Adds the specified resource to the context.
    * @method add
    * @param {string} name - A unique name for the resource like the file-path for example.
    * @param {gs.Bitmap|gs.AudioBuffer|gs.Video|gs.Live2DModel} data - The resource data like a gs.Bitmap object for example.
     */

    ResourceManagerContext.prototype.add = function(name, resource) {
      return this.resources.push({
        name: name,
        data: resource
      });
    };


    /**
    * Removes the resource with the specified name from the context.
    * @method remove
    * @param {string} name - The name of the resource to remove. For Example: The file name.
     */

    ResourceManagerContext.prototype.remove = function(name) {
      return this.resources.remove(this.resources.first(function(r) {
        return r.name === name;
      }));
    };

    return ResourceManagerContext;

  })();

  gs.ResourceManagerContext = ResourceManagerContext;

  ResourceManager = (function() {

    /**
    * Manages the resources of the game like graphics, audio, fonts, etc. It
    * offers a lot of methods to easily access game resources and automatically
    * caches them. So if an image is requested a second time it will be taken
    * from the cache instead of loading it again.
    *
    * @module gs
    * @class ResourceManager
    * @memberof gs
    * @constructor
     */
    function ResourceManager() {

      /**
      * Current resource context. All loaded resources will be associated with it. If current context
      * is set to <b>null</b>, the <b>systemContext</b> is used instead.
      * @property context
      * @type gs.ResourceManagerContext
      * @protected
       */
      this.context_ = null;

      /**
      * System resource context. All loaded system resources are associated with this context. Resources
      * which are associated with the system context are not disposed until the game ends.
      * @property context
      * @type gs.ResourceManagerContext
       */
      this.systemContext = this.createContext();

      /**
      * Holds in-memory created bitmaps.
      * @property customBitmapsByKey
      * @type Object
      * @protected
       */
      this.customBitmapsByKey = {};

      /**
      * Caches resources by file path.
      * @property resourcesByPath
      * @type Object
      * @protected
       */
      this.resourcesByPath = {};

      /**
      * Caches resources by file path and HUE.
      * @property resourcesByPath
      * @type Object
      * @protected
       */
      this.resourcesByPathHue = {};

      /**
      * Stores all loaded resources.
      * @property resources
      * @type Object[]
       */
      this.resources = [];

      /**
      * Indicates if all requested resources are loaded.
      * @property resourcesLoaded
      * @type boolean
       */
      this.resourcesLoaded = true;

      /**
      * @property events
      * @type gs.EventEmitter
       */
      this.events = new gs.EventEmitter();
    }


    /**
    * Current resource context. All loaded resources will be associated with it. If current context
    * is set to <b>null</b>, the <b>systemContext</b> is used instead.
    * @property context
    * @type gs.ResourceManagerContext
     */

    ResourceManager.accessors("context", {
      set: function(v) {
        return this.context_ = v;
      },
      get: function() {
        var ref;
        return (ref = this.context_) != null ? ref : this.systemContext;
      }
    });


    /**
    * Creates a new resource context. Use <b>context</b> to set the new created context
    * as current context.
    *
    * @method createContext
     */

    ResourceManager.prototype.createContext = function() {
      return new gs.ResourceManagerContext();
    };


    /**
    * Disposes all bitmap resources associated with the current context.
    *
    * @method disposeBitmaps
     */

    ResourceManager.prototype.disposeBitmaps = function() {
      var j, len, ref, resource, results;
      ref = this.context.resources;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        resource = ref[j];
        if (resource.data instanceof gs.Bitmap) {
          resource.data.dispose();
          this.resources.remove(this.resources.first((function(r) {
            var result;
            result = r.filePath === resource.data.filePath;
            if (result) {
              r.dispose();
            }
            return result;
          })));
          this.resources.remove(resource.data);
          if (resource.name) {
            this.resourcesByPath[resource.name] = null;
            results.push(delete this.resourcesByPath[resource.name]);
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };


    /**
    * Disposes all video resources associated with the current context.
    *
    * @method disposeVideos
     */

    ResourceManager.prototype.disposeVideos = function() {
      var j, len, ref, resource, results;
      ref = this.context.resources;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        resource = ref[j];
        if (resource.data instanceof gs.Video) {
          resource.data.dispose();
          this.resources.remove(resource.data);
          this.resourcesByPath[resource.name] = null;
          results.push(delete this.resourcesByPath[resource.name]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };


    /**
    * Disposes all audio resources associated with the current context.
    *
    * @method disposeAudio
     */

    ResourceManager.prototype.disposeAudio = function() {
      var j, len, ref, resource, results;
      AudioManager.dispose(this.context);
      ref = this.context.resources;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        resource = ref[j];
        if (resource.data instanceof GS.AudioBuffer || resource instanceof GS.AudioBufferStream) {
          resource.data.dispose();
          this.resources.remove(resource.data);
          this.resourcesByPath[resource.name] = null;
          results.push(delete this.resourcesByPath[resource.name]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };


    /**
    * Disposes all Live2D resources associated with the current context.
    *
    * @method disposeLive2D
     */

    ResourceManager.prototype.disposeLive2D = function() {
      var j, len, ref, resource, results;
      ref = this.context.resources;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        resource = ref[j];
        if (resource.data instanceof gs.Live2DModel) {
          resource.data.dispose();
          this.resources.remove(resource.data);
          this.resourcesByPath[resource.name] = null;
          results.push(delete this.resourcesByPath[resource.name]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };


    /**
    * Disposes all resources.
    *
    * @method dispose
     */

    ResourceManager.prototype.dispose = function() {
      this.disposeBitmaps();
      this.disposeVideos();
      this.disposeAudio();
      this.disposeLive2D();
      return this.context = this.systemContext;
    };


    /**
    * Loads all custom fonts in Graphics/Fonts folder.
    *
    * @method loadFonts
     */

    ResourceManager.prototype.loadFonts = function() {
      var resource;
      resource = {
        loaded: false
      };
      this.resources.push(resource);
      this.resourcesByPath["Graphics/Fonts"] = resource;
      return gs.Font.loadCustomFonts((function(_this) {
        return function(error) {
          _this.resourcesByPath["Graphics/Fonts"].loaded = true;
          if (error) {
            return _this.resourcesByPath["Graphics/Fonts"].error = true;
          }
        };
      })(this));
    };


    /**
    * Gets a custom created bitmap by key.
    *
    * @method getCustomBitmap
    * @param {String} key - The key for the bitmap to get.
    * @return {gs.Bitmap} The bitmap or <b>null</b> if no bitmap exists for the specified key.
     */

    ResourceManager.prototype.getCustomBitmap = function(key) {
      return this.customBitmapsByKey[key];
    };


    /**
    * Sets a custom created bitmap for a specified key.
    *
    * @method setCustomBitmap
    * @param {String} key - The key for the bitmap to set.
    * @param {gs.Bitmap} bitmap - The bitmap to set.
     */

    ResourceManager.prototype.setCustomBitmap = function(key, bitmap) {
      this.customBitmapsByKey[key] = bitmap;
      if (bitmap.loaded == null) {
        this.resources.push(bitmap);
        return this.resourcesLoaded = false;
      }
    };


    /**
    * Adds a custom created bitmap to the resource manager.
    *
    * @method addCustomBitmap
    * @param {gs.Bitmap} bitmap - The bitmap to add.
     */

    ResourceManager.prototype.addCustomBitmap = function(bitmap) {
      return this.context.resources.push({
        name: "",
        data: bitmap
      });
    };


    /**
    * Gets a Live2D model.
    *
    * @method getLive2DModel
    * @param {String} filePath - Path to the Live2D model file.
    * @return {gs.Live2DModel} The Live2D model or <b>null</b> if no model exists at the specified file path.
     */

    ResourceManager.prototype.getLive2DModel = function(filePath) {
      var profile, result;
      result = this.resourcesByPath[filePath];
      if ((result == null) || result.disposed) {
        profile = LanguageManager.profile;
        result = new gs.Live2DModel(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null));
        this.resourcesByPath[filePath] = result;
        this.resources.push(result);
        this.resourcesLoaded = false;
        this.context.resources.push({
          name: filePath,
          data: result
        });
      }
      return result;
    };


    /**
    * Gets a font.
    *
    * @method getFont
    * @param {String} name - The name of the font to get.
    * @param {number} size - The size of the font to get.
    * @return {gs.Font} The font or <b>null</b> if no font with the specified name exists.
     */

    ResourceManager.prototype.getFont = function(name, size) {
      var result;
      result = new Font(name, size);
      this.resources.push(result);
      this.resourcesLoaded = false;
      return result;
    };


    /**
    * Gets a video.
    *
    * @method getVideo
    * @param {String} filePath - Path to the video file.
    * @return {gs.Video} The video or <b>null</b> if no video exists at the specified file path.
     */

    ResourceManager.prototype.getVideo = function(filePath) {
      var profile, result;
      if (filePath.endsWith("/")) {
        return null;
      }
      result = this.resourcesByPath[filePath];
      if ((result == null) || result.disposed) {
        profile = LanguageManager.profile;
        result = new gs.Video(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null));
        this.resourcesByPath[filePath] = result;
        this.resources.push(result);
        this.resourcesLoaded = false;
        this.context.resources.push({
          name: filePath,
          data: result
        });
      }
      return result;
    };


    /**
    * Gets a bitmap.
    *
    * @method getBitmap
    * @param {String} filePath - Path to the bitmap file.
    * @param {number} hue - The bitmap's hue. The bitmap will be loaded and then recolored.
    * @return {gs.Bitmap} The bitmap or <b>null</b> if no bitmap exists at the specified file path.
     */

    ResourceManager.prototype.getBitmap = function(filePath, hue) {
      var hueBitmap, profile, result;
      if (filePath.endsWith("/")) {
        return null;
      }
      hue = hue || 0;
      result = this.resourcesByPath[filePath] || this.customBitmapsByKey[filePath];
      if (result == null) {
        profile = LanguageManager.profile;
        result = new Bitmap(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null), false);
        result.hue = hue;
        result.filePath = filePath;
        this.resourcesByPath[filePath] = result;
        this.resources.push(result);
        this.resourcesLoaded = false;
        this.context.resources.push({
          name: filePath,
          data: result
        });
      } else if (!result.loaded && result.hue !== hue) {
        profile = LanguageManager.profile;
        result = new Bitmap(filePath, ((profile != null) && (profile.items != null) ? profile.items.code : null));
        result.hue = hue;
        result.filePath = filePath;
        this.resources.push(result);
        this.resourcesLoaded = false;
      } else if (hue > 0) {
        hueBitmap = this.resourcesByPathHue[filePath + "@" + hue];
        if ((hueBitmap == null) && result.loaded) {
          hueBitmap = new Bitmap(result.image);
          hueBitmap.changeHue(hue);
          this.resourcesByPathHue[filePath + "@" + hue] = hueBitmap;
        }
        if (hueBitmap != null) {
          result = hueBitmap;
        }
      }
      return result;
    };


    /**
    * Gets an HTML image.
    *
    * @method getImage
    * @param {String} filePath - Path to the image file.
    * @return {HTMLImageElement} The image or <b>null</b> if no image exists at the specified file path.
     */

    ResourceManager.prototype.getImage = function(filePath) {
      var result;
      result = this.resourcesByPath[filePath];
      if (result == null) {
        result = new Bitmap("resources/" + filePath + ".png");
        this.resourcesByPath[filePath] = result;
        this.resources.push(result);
        this.resourcesLoaded = false;
      }
      return result;
    };


    /**
    * Gets an audio stream.
    *
    * @method getAudioStream
    * @param {String} filePath - Path to the audio file.
    * @return {gs.AudioBuffer} The audio buffer or <b>null</b> if no audio file exists at the specified file path.
     */

    ResourceManager.prototype.getAudioStream = function(filePath) {
      var languageCode, profile, result;
      result = this.resourcesByPath[filePath];
      profile = LanguageManager.profile;
      languageCode = (profile != null) && (profile.items != null) ? profile.items.code : null;
      if (result == null) {
        result = new GS.AudioBuffer(filePath);
        this.resourcesByPath[filePath] = result;
        this.resources.push(result);
        this.resourcesLoaded = false;
        this.context.resources.push({
          name: filePath,
          data: result
        });
      }
      return result;
    };


    /**
    * Gets an audio buffer. The audio data is fully loaded and decoded in memory. It is recommeneded
    * for sound effects but for a long background music, <b>getAudioStream</b> should be used instead. That is especially
    * the case on mobile devices.
    *
    * @method getAudioBuffer
    * @param {String} filePath - Path to the audio file.
    * @return {gs.AudioBuffer} The audio buffer or <b>null</b> if no audio file exists at the specified file path.
     */

    ResourceManager.prototype.getAudioBuffer = function(filePath) {
      var languageCode, profile, result;
      result = this.resourcesByPath[filePath];
      profile = LanguageManager.profile;
      languageCode = (profile != null) && (profile.items != null) ? profile.items.code : null;
      if (result == null) {
        result = new GS.AudioBuffer(filePath);
        this.resourcesByPath[filePath] = result;
        this.resources.push(result);
        this.resourcesLoaded = false;
        this.context.resources.push({
          name: filePath,
          data: result
        });
      }
      return result;
    };


    /**
    * Updates the loading process. Needs to be called once per frame to keep
    * the ResourceManager up to date.
    *
    * @method update
     */

    ResourceManager.prototype.update = function() {
      var bitmap, i, j, ref;
      if (this.events == null) {
        this.events = new gs.EventEmitter();
      }
      if (!this.resourcesLoaded) {
        this.resourcesLoaded = true;
        for (i = j = 0, ref = this.resources.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          if (!this.resources[i].loaded) {
            this.resourcesLoaded = false;
            break;
          } else if ((this.resources[i].hue != null) && this.resources[i].hue > 0) {
            bitmap = new Bitmap(this.resources[i].image);
            this.resourcesByPath[this.resources[i].filePath] = bitmap;
            this.resources[i].changeHue(this.resources[i].hue);
            this.resourcesByPathHue[this.resources[i].filePath + "@" + this.resources[i].hue] = this.resources[i];
            delete this.resources[i].filePath;
            delete this.resources[i].hue;
          }
        }
        if (this.resourcesLoaded) {
          this.events.emit("loaded", this);
        }
      }
      return null;
    };

    return ResourceManager;

  })();

  window.ResourceManager = ResourceManager;

  gs.ResourceManager = ResourceManager;

}).call(this);
