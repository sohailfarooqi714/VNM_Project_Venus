var Main;

Main = (function() {

  /**
  * Controls the boot-process of the game.
  *
  * @module gs
  * @class Main
  * @memberof gs
  * @constructor
   */
  function Main() {
    window.$ = jQuery.noConflict();
    this.languagesLoaded = false;
    this.frameCallback = null;
  }


  /**
  * Updates the current frame.
  *
  * @method updateFrame
   */

  Main.prototype.updateFrame = function() {
    if ($PARAMS.showDebugInfo) {
      window.startTime = window.performance != null ? window.performance.now() : Date.now();
    }
    SceneManager.update();
    Graphics.frameCount++;
    if ($PARAMS.showDebugInfo) {
      if (this.debugSprite == null) {
        this.debugSprite = new Sprite_Debug();
      }
      window.endTime = window.performance != null ? window.performance.now() : Date.now();
      if (Graphics.frameCount % 30 === 0) {
        this.debugSprite.frameTime = endTime - startTime;
        return this.debugSprite.redraw();
      }
    }
  };


  /**
  * Loads game data.
  *
  * @method loadData
   */

  Main.prototype.loadData = function() {
    RecordManager.load();
    DataManager.getDocumentsByType("global_variables");
    DataManager.getDocumentsByType("language_profile");
    return DataManager.getDocumentsByType("vn.chapter");
  };


  /**
  * Loads system data.
  *
  * @method loadSystemData
   */

  Main.prototype.loadSystemData = function() {
    DataManager.getDocument("RESOURCES");
    return DataManager.getDocument("SUMMARIES");
  };


  /**
  * Loads system resources such as graphics, sounds, fonts, etc.
  *
  * @method loadSystemResources
   */

  Main.prototype.loadSystemResources = function() {
    var j, language, len, ref, ref1, ref2;
    ResourceManager.loadFonts();
    ResourceLoader.loadSystemSounds(RecordManager.system);
    ResourceLoader.loadSystemGraphics(RecordManager.system);
    ref = LanguageManager.languages;
    for (j = 0, len = ref.length; j < len; j++) {
      language = ref[j];
      if (((ref1 = language.icon) != null ? (ref2 = ref1.name) != null ? ref2.length : void 0 : void 0) > 0) {
        ResourceManager.getBitmap("Graphics/Icons/" + language.icon.name);
      }
    }
    return gs.Fonts.initialize();
  };


  /**
  * Gets game settings.
  *
  * @method getSettings
   */

  Main.prototype.getSettings = function() {
    var settings;
    settings = GameStorage.getObject("settings");
    if ((settings == null) || settings.version !== 342) {
      GameManager.resetSettings();
      settings = GameManager.settings;
    }
    return settings;
  };


  /**
  * Sets up the game's global data. If it is outdated, this method will
  * reset the global game data.
  *
  * @method setupGlobalData
   */

  Main.prototype.setupGlobalData = function() {
    var globalData;
    globalData = GameStorage.getObject("globalData");
    GameManager.globalData = globalData;
    if (!globalData || globalData.version !== 342) {
      return GameManager.resetGlobalData();
    }
  };


  /**
  * Sets up game settings.
  *
  * @method setupGameSettings
  * @param {Object} settings - Current game settings.
   */

  Main.prototype.setupGameSettings = function(settings) {
    var cg, character, i, j, l, len, len1, ref, ref1, results;
    GameManager.settings = settings;
    GameManager.settings.fullScreen = Graphics.isFullscreen();
    ref = RecordManager.charactersArray;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      character = ref[i];
      if (character && !GameManager.settings.voicesByCharacter[character.index]) {
        GameManager.settings.voicesByCharacter[character.index] = 100;
      }
    }
    ref1 = RecordManager.cgGalleryArray;
    results = [];
    for (i = l = 0, len1 = ref1.length; l < len1; i = ++l) {
      cg = ref1[i];
      if ((cg != null) && !GameManager.globalData.cgGallery[cg.index]) {
        results.push(GameManager.globalData.cgGallery[cg.index] = {
          unlocked: false
        });
      } else {
        results.push(void 0);
      }
    }
    return results;
  };


  /**
  * Sets up audio settings.
  *
  * @method setupAudioSettings
  * @param {Object} settings - Current game settings.
   */

  Main.prototype.setupAudioSettings = function(settings) {
    AudioManager.generalSoundVolume = settings.seVolume;
    AudioManager.generalMusicVolume = settings.bgmVolume;
    return AudioManager.generalVoiceVolume = settings.voiceVolume;
  };


  /**
  * Sets up video settings.
  *
  * @method setupVideoSettings
  * @param {Object} settings - Current game settings.
   */

  Main.prototype.setupVideoSettings = function(settings) {
    settings.renderer = 1;
    Graphics.keepRatio = !settings.adjustAspectRatio;
    return Graphics.onResize();
  };


  /**
  * Sets up settings.
  *
  * @method setupSettings
   */

  Main.prototype.setupSettings = function() {
    var settings;
    settings = this.getSettings();
    this.setupGlobalData();
    this.setupGameSettings(settings);
    this.setupAudioSettings(settings);
    this.setupVideoSettings(settings);
    return GameStorage.setObject("settings", settings);
  };


  /**
  * Loads all system resources needed to start the actual game.
  *
  * @method load
  * @param {Function} callback - Called when all system resources are loaded.
   */

  Main.prototype.load = function(callback) {
    this.loadSystemData();
    return DataManager.events.on("loaded", (function(_this) {
      return function() {
        GameManager.tempFields = new gs.GameTemp();
        window.$tempFields = GameManager.tempFields;
        if (_this.languagesLoaded) {
          RecordManager.initialize();
          LanguageManager.initialize();
          SceneManager.initialize();
          _this.setupSettings();
        } else {
          _this.loadData();
        }
        if (_this.languagesLoaded) {
          _this.loadSystemResources();
          DataManager.events.off("loaded");
          ResourceManager.events.on("loaded", function() {
            GameManager.setupCursor();
            ResourceManager.events.off("loaded");
            ui.UIManager.setup();
            return callback();
          });
        }
        return _this.languagesLoaded = true;
      };
    })(this));
  };


  /**
  * Sets up the application.
  *
  * @method setupApplication
   */

  Main.prototype.setupApplication = function() {
    $PARAMS.showDebugInfo = false;
    window.ResourceManager = new window.ResourceManager();
    window.DataManager = new window.DataManager();
    window.Graphics = new Graphics_OpenGL();
    window.gs.Graphics = window.Graphics;
    window.Renderer = window.Renderer_OpenGL;
    return Texture2D.filter = 1;
  };


  /**
  * Initializes the input system to enable support for keyboard, mouse, touch, etc.
  *
  * @method setupInput
   */

  Main.prototype.setupInput = function() {
    Input.initialize();
    return Input.Mouse.initialize();
  };


  /**
  * Initializes the video system with the game's resolution. It is necessary to
  * call this method before using graphic object such as bitmaps, sprites, etc.
  *
  * @method setupVideo
   */

  Main.prototype.setupVideo = function() {
    this.frameCallback = this.createFrameCallback();
    Graphics.initialize($PARAMS.resolution.width, $PARAMS.resolution.height);
    Graphics.onDispose = (function(_this) {
      return function() {
        return ResourceManager.dispose();
      };
    })(this);
    Graphics.formats = [320, 384, 427];
    Graphics.scale = 0.5 / 240 * Graphics.height;
    Font.defaultSize = Math.round(9 / 240 * Graphics.height);
    return Graphics.onEachFrame(this.frameCallback);
  };


  /**
  * Registers shader-based effects. It is important to register all effects
  * before the graphics system is initialized.
  *
  * @method setupEffects
   */

  Main.prototype.setupEffects = function() {
    gs.Effect.registerEffect(gs.Effect.fragmentShaderInfos.lod_blur);
    return gs.Effect.registerEffect(gs.Effect.fragmentShaderInfos.pixelate);
  };


  /**
  * Initializes the Live2D. If Live2D is not available, it does nothing. Needs to be
  * called before using Live2D.
  *
  * @method setupLive2D
   */

  Main.prototype.setupLive2D = function() {
    Live2D.init();
    Live2D.setGL($gl);
    return Live2DFramework.setPlatformManager(new L2DPlatformManager());
  };


  /**
  * Creates the frame-callback function called once per frame to update and render
  * the game.
  *
  * @method setupLive2D
  * @return {Function} The frame-callback function.
   */

  Main.prototype.createFrameCallback = function() {
    var callback;
    callback = null;
    if (($PARAMS.preview != null) || ($PARAMS.testOffline && window.parent !== window)) {
      callback = (function(_this) {
        return function(time) {
          var ex;
          try {
            if ($PARAMS.preview && !$PARAMS.preview.error) {
              return _this.updateFrame();
            }
          } catch (error) {
            ex = error;
            if ($PARAMS.preview || GameManager.inLivePreview) {
              $PARAMS.preview = {
                error: ex
              };
            }
            return console.log(ex);
          }
        };
      })(this);
    } else {
      callback = (function(_this) {
        return function(time) {
          return _this.updateFrame();
        };
      })(this);
    }
    return callback;
  };


  /**
  * Creates the start scene object. If an intro-scene is set, this method returns the
  * intro-scene. If the game runs in Live-Preview, this method returns the selected
  * scene in editor.
  *
  * @method createStartScene
  * @return {gs.Object_Base} The start-scene.
   */

  Main.prototype.createStartScene = function() {
    var introScene, ref, ref1, ref2, ref3, ref4, scene;
    scene = null;
    introScene = null;
    if (RecordManager.system.useIntroScene) {
      introScene = DataManager.getDocumentSummary((ref = RecordManager.system.introInfo) != null ? (ref1 = ref.scene) != null ? ref1.uid : void 0 : void 0);
    }
    if ($PARAMS.preview || introScene) {
      scene = new vn.Object_Scene();
      scene.sceneData.uid = ((ref2 = $PARAMS.preview) != null ? ref2.scene.uid : void 0) || ((ref3 = RecordManager.system.introInfo) != null ? (ref4 = ref3.scene) != null ? ref4.uid : void 0 : void 0);
      scene.events.on("dispose", function(e) {
        return GameManager.sceneData.uid = null;
      });
    } else if (LanguageManager.languages.length > 1) {
      scene = new gs.Object_Layout("languageMenuLayout");
    } else {
      scene = new gs.Object_Layout("titleLayout");
    }
    return scene;
  };


  /**
  * Boots the game by setting up the application window as well as the video, audio and input system.
  *
  * @method start
   */

  Main.prototype.start = function() {
    this.setupApplication();
    this.setupEffects();
    this.setupVideo();
    this.setupLive2D();
    this.setupInput();
    return this.load((function(_this) {
      return function() {
        return SceneManager.switchTo(_this.createStartScene());
      };
    })(this));
  };

  return Main;

})();

gs.Main = new Main();

gs.Application.initialize();

gs.Application.onReady = function() {
  Object.keys(gs).forEach(function(k) {
    gs[k].$namespace = "gs";
    return gs[k].$name = k;
  });
  Object.keys(vn).forEach(function(k) {
    vn[k].$namespace = "vn";
    return vn[k].$name = k;
  });
  Object.keys(ui).forEach(function(k) {
    ui[k].$namespace = "ui";
    return ui[k].$name = k;
  });
  return gs.Main.start();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLElBQUE7O0FBQU07O0FBQ0Y7Ozs7Ozs7O0VBUWEsY0FBQTtJQUNULE1BQU0sQ0FBQyxDQUFQLEdBQVcsTUFBTSxDQUFDLFVBQVAsQ0FBQTtJQUVYLElBQUMsQ0FBQSxlQUFELEdBQW1CO0lBQ25CLElBQUMsQ0FBQSxhQUFELEdBQWlCO0VBSlI7OztBQU1iOzs7Ozs7aUJBS0EsV0FBQSxHQUFhLFNBQUE7SUFDVCxJQUFHLE9BQU8sQ0FBQyxhQUFYO01BQ0ksTUFBTSxDQUFDLFNBQVAsR0FBc0IsMEJBQUgsR0FBNEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFuQixDQUFBLENBQTVCLEdBQTBELElBQUksQ0FBQyxHQUFMLENBQUEsRUFEakY7O0lBR0EsWUFBWSxDQUFDLE1BQWIsQ0FBQTtJQUNBLFFBQVEsQ0FBQyxVQUFUO0lBRUEsSUFBRyxPQUFPLENBQUMsYUFBWDtNQUNJLElBQU8sd0JBQVA7UUFBMEIsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxZQUFBLENBQUEsRUFBN0M7O01BRUEsTUFBTSxDQUFDLE9BQVAsR0FBb0IsMEJBQUgsR0FBNEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFuQixDQUFBLENBQTVCLEdBQTBELElBQUksQ0FBQyxHQUFMLENBQUE7TUFDM0UsSUFBRyxRQUFRLENBQUMsVUFBVCxHQUFzQixFQUF0QixLQUE0QixDQUEvQjtRQUNJLElBQUMsQ0FBQSxXQUFXLENBQUMsU0FBYixHQUEwQixPQUFBLEdBQVU7ZUFDcEMsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFiLENBQUEsRUFGSjtPQUpKOztFQVBTOzs7QUFlYjs7Ozs7O2lCQUtBLFFBQUEsR0FBVSxTQUFBO0lBQ04sYUFBYSxDQUFDLElBQWQsQ0FBQTtJQUNBLFdBQVcsQ0FBQyxrQkFBWixDQUErQixrQkFBL0I7SUFDQSxXQUFXLENBQUMsa0JBQVosQ0FBK0Isa0JBQS9CO1dBQ0EsV0FBVyxDQUFDLGtCQUFaLENBQStCLFlBQS9CO0VBSk07OztBQU1WOzs7Ozs7aUJBS0EsY0FBQSxHQUFnQixTQUFBO0lBQ1osV0FBVyxDQUFDLFdBQVosQ0FBd0IsV0FBeEI7V0FDQSxXQUFXLENBQUMsV0FBWixDQUF3QixXQUF4QjtFQUZZOzs7QUFJaEI7Ozs7OztpQkFLQSxtQkFBQSxHQUFxQixTQUFBO0FBQ2pCLFFBQUE7SUFBQSxlQUFlLENBQUMsU0FBaEIsQ0FBQTtJQUNBLGNBQWMsQ0FBQyxnQkFBZixDQUFnQyxhQUFhLENBQUMsTUFBOUM7SUFDQSxjQUFjLENBQUMsa0JBQWYsQ0FBa0MsYUFBYSxDQUFDLE1BQWhEO0FBRUE7QUFBQSxTQUFBLHFDQUFBOztNQUNJLHVFQUFzQixDQUFFLHlCQUFyQixHQUE4QixDQUFqQztRQUNJLGVBQWUsQ0FBQyxTQUFoQixDQUEwQixpQkFBQSxHQUFrQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQTFELEVBREo7O0FBREo7V0FJQSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVQsQ0FBQTtFQVRpQjs7O0FBV3JCOzs7Ozs7aUJBS0EsV0FBQSxHQUFhLFNBQUE7QUFDVCxRQUFBO0lBQUEsUUFBQSxHQUFXLFdBQVcsQ0FBQyxTQUFaLENBQXNCLFVBQXRCO0lBRVgsSUFBTyxrQkFBSixJQUFpQixRQUFRLENBQUMsT0FBVCxLQUFvQixHQUF4QztNQUNJLFdBQVcsQ0FBQyxhQUFaLENBQUE7TUFDQSxRQUFBLEdBQVcsV0FBVyxDQUFDLFNBRjNCOztBQUlBLFdBQU87RUFQRTs7O0FBU2I7Ozs7Ozs7aUJBTUEsZUFBQSxHQUFpQixTQUFBO0FBQ2IsUUFBQTtJQUFBLFVBQUEsR0FBYSxXQUFXLENBQUMsU0FBWixDQUFzQixZQUF0QjtJQUNiLFdBQVcsQ0FBQyxVQUFaLEdBQXlCO0lBRXpCLElBQUcsQ0FBQyxVQUFELElBQWUsVUFBVSxDQUFDLE9BQVgsS0FBc0IsR0FBeEM7YUFDSSxXQUFXLENBQUMsZUFBWixDQUFBLEVBREo7O0VBSmE7OztBQU9qQjs7Ozs7OztpQkFNQSxpQkFBQSxHQUFtQixTQUFDLFFBQUQ7QUFDZixRQUFBO0lBQUEsV0FBVyxDQUFDLFFBQVosR0FBdUI7SUFDdkIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFyQixHQUFrQyxRQUFRLENBQUMsWUFBVCxDQUFBO0FBRWxDO0FBQUEsU0FBQSw2Q0FBQTs7TUFDSSxJQUFHLFNBQUEsSUFBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsaUJBQWtCLENBQUEsU0FBUyxDQUFDLEtBQVYsQ0FBekQ7UUFDSSxXQUFXLENBQUMsUUFBUSxDQUFDLGlCQUFrQixDQUFBLFNBQVMsQ0FBQyxLQUFWLENBQXZDLEdBQTBELElBRDlEOztBQURKO0FBR0E7QUFBQTtTQUFBLGdEQUFBOztNQUNJLElBQUcsWUFBQSxJQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFVLENBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBN0M7cUJBQ0ksV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFVLENBQUEsRUFBRSxDQUFDLEtBQUgsQ0FBakMsR0FBNkM7VUFBRSxRQUFBLEVBQVUsS0FBWjtXQURqRDtPQUFBLE1BQUE7NkJBQUE7O0FBREo7O0VBUGU7OztBQVduQjs7Ozs7OztpQkFNQSxrQkFBQSxHQUFvQixTQUFDLFFBQUQ7SUFDaEIsWUFBWSxDQUFDLGtCQUFiLEdBQWtDLFFBQVEsQ0FBQztJQUMzQyxZQUFZLENBQUMsa0JBQWIsR0FBa0MsUUFBUSxDQUFDO1dBQzNDLFlBQVksQ0FBQyxrQkFBYixHQUFrQyxRQUFRLENBQUM7RUFIM0I7OztBQUtwQjs7Ozs7OztpQkFNQSxrQkFBQSxHQUFvQixTQUFDLFFBQUQ7SUFDaEIsUUFBUSxDQUFDLFFBQVQsR0FBb0I7SUFDcEIsUUFBUSxDQUFDLFNBQVQsR0FBcUIsQ0FBQyxRQUFRLENBQUM7V0FDL0IsUUFBUSxDQUFDLFFBQVQsQ0FBQTtFQUhnQjs7O0FBS3BCOzs7Ozs7aUJBS0EsYUFBQSxHQUFlLFNBQUE7QUFDWCxRQUFBO0lBQUEsUUFBQSxHQUFXLElBQUMsQ0FBQSxXQUFELENBQUE7SUFFWCxJQUFDLENBQUEsZUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGlCQUFELENBQW1CLFFBQW5CO0lBQ0EsSUFBQyxDQUFBLGtCQUFELENBQW9CLFFBQXBCO0lBQ0EsSUFBQyxDQUFBLGtCQUFELENBQW9CLFFBQXBCO1dBR0EsV0FBVyxDQUFDLFNBQVosQ0FBc0IsVUFBdEIsRUFBa0MsUUFBbEM7RUFUVzs7O0FBV2Y7Ozs7Ozs7aUJBTUEsSUFBQSxHQUFNLFNBQUMsUUFBRDtJQUNGLElBQUMsQ0FBQSxjQUFELENBQUE7V0FFQSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQXNCLFFBQXRCLEVBQWdDLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUM1QixXQUFXLENBQUMsVUFBWixHQUE2QixJQUFBLEVBQUUsQ0FBQyxRQUFILENBQUE7UUFDN0IsTUFBTSxDQUFDLFdBQVAsR0FBcUIsV0FBVyxDQUFDO1FBRWpDLElBQUcsS0FBQyxDQUFBLGVBQUo7VUFDSSxhQUFhLENBQUMsVUFBZCxDQUFBO1VBQ0EsZUFBZSxDQUFDLFVBQWhCLENBQUE7VUFDQSxZQUFZLENBQUMsVUFBYixDQUFBO1VBQ0EsS0FBQyxDQUFBLGFBQUQsQ0FBQSxFQUpKO1NBQUEsTUFBQTtVQU1JLEtBQUMsQ0FBQSxRQUFELENBQUEsRUFOSjs7UUFRQSxJQUFHLEtBQUMsQ0FBQSxlQUFKO1VBQ0ksS0FBQyxDQUFBLG1CQUFELENBQUE7VUFDQSxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQW5CLENBQXVCLFFBQXZCO1VBQ0EsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUF2QixDQUEwQixRQUExQixFQUFvQyxTQUFBO1lBQ2hDLFdBQVcsQ0FBQyxXQUFaLENBQUE7WUFDQSxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQXZCLENBQTJCLFFBQTNCO1lBQ0EsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFiLENBQUE7bUJBQ0EsUUFBQSxDQUFBO1VBSmdDLENBQXBDLEVBSEo7O2VBU0EsS0FBQyxDQUFBLGVBQUQsR0FBbUI7TUFyQlM7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhDO0VBSEU7OztBQTJCTjs7Ozs7O2lCQUtBLGdCQUFBLEdBQWtCLFNBQUE7SUFDZCxPQUFPLENBQUMsYUFBUixHQUF3QjtJQUN4QixNQUFNLENBQUMsZUFBUCxHQUE2QixJQUFBLE1BQU0sQ0FBQyxlQUFQLENBQUE7SUFDN0IsTUFBTSxDQUFDLFdBQVAsR0FBeUIsSUFBQSxNQUFNLENBQUMsV0FBUCxDQUFBO0lBR3pCLE1BQU0sQ0FBQyxRQUFQLEdBQXNCLElBQUEsZUFBQSxDQUFBO0lBQ3RCLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBVixHQUFxQixNQUFNLENBQUM7SUFDNUIsTUFBTSxDQUFDLFFBQVAsR0FBa0IsTUFBTSxDQUFDO1dBR3pCLFNBQVMsQ0FBQyxNQUFWLEdBQW1CO0VBWEw7OztBQWFsQjs7Ozs7O2lCQUtBLFVBQUEsR0FBWSxTQUFBO0lBQ1IsS0FBSyxDQUFDLFVBQU4sQ0FBQTtXQUNBLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBWixDQUFBO0VBRlE7OztBQUlaOzs7Ozs7O2lCQU1BLFVBQUEsR0FBWSxTQUFBO0lBQ1IsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBQyxDQUFBLG1CQUFELENBQUE7SUFFakIsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUF2QyxFQUE4QyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQWpFO0lBRUEsUUFBUSxDQUFDLFNBQVQsR0FBcUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsZUFBZSxDQUFDLE9BQWhCLENBQUE7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7SUFDckIsUUFBUSxDQUFDLE9BQVQsR0FBbUIsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVg7SUFDbkIsUUFBUSxDQUFDLEtBQVQsR0FBaUIsR0FBQSxHQUFNLEdBQU4sR0FBWSxRQUFRLENBQUM7SUFDdEMsSUFBSSxDQUFDLFdBQUwsR0FBbUIsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFBLEdBQUksR0FBSixHQUFVLFFBQVEsQ0FBQyxNQUE5QjtXQUVuQixRQUFRLENBQUMsV0FBVCxDQUFxQixJQUFDLENBQUEsYUFBdEI7RUFWUTs7O0FBWVo7Ozs7Ozs7aUJBTUEsWUFBQSxHQUFjLFNBQUE7SUFFVixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQVYsQ0FBeUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUF2RDtXQUVBLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBVixDQUF5QixFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQXZEO0VBSlU7OztBQVNkOzs7Ozs7O2lCQU1BLFdBQUEsR0FBYSxTQUFBO0lBQ1QsTUFBTSxDQUFDLElBQVAsQ0FBQTtJQUNBLE1BQU0sQ0FBQyxLQUFQLENBQWEsR0FBYjtXQUNBLGVBQWUsQ0FBQyxrQkFBaEIsQ0FBdUMsSUFBQSxrQkFBQSxDQUFBLENBQXZDO0VBSFM7OztBQUtiOzs7Ozs7OztpQkFPQSxtQkFBQSxHQUFxQixTQUFBO0FBQ2pCLFFBQUE7SUFBQSxRQUFBLEdBQVc7SUFFWCxJQUFHLHlCQUFBLElBQW9CLENBQUMsT0FBTyxDQUFDLFdBQVIsSUFBdUIsTUFBTSxDQUFDLE1BQVAsS0FBaUIsTUFBekMsQ0FBdkI7TUFDSSxRQUFBLEdBQVcsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLElBQUQ7QUFDUCxjQUFBO0FBQUE7WUFDSSxJQUFHLE9BQU8sQ0FBQyxPQUFSLElBQW1CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUF2QztxQkFDSSxLQUFDLENBQUEsV0FBRCxDQUFBLEVBREo7YUFESjtXQUFBLGFBQUE7WUFHTTtZQUNGLElBQUcsT0FBTyxDQUFDLE9BQVIsSUFBbUIsV0FBVyxDQUFDLGFBQWxDO2NBQ0ksT0FBTyxDQUFDLE9BQVIsR0FBa0I7Z0JBQUEsS0FBQSxFQUFPLEVBQVA7Z0JBRHRCOzttQkFFQSxPQUFPLENBQUMsR0FBUixDQUFZLEVBQVosRUFOSjs7UUFETztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsRUFEZjtLQUFBLE1BQUE7TUFVSSxRQUFBLEdBQVcsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLElBQUQ7aUJBQVUsS0FBQyxDQUFBLFdBQUQsQ0FBQTtRQUFWO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxFQVZmOztBQVlBLFdBQU87RUFmVTs7O0FBaUJyQjs7Ozs7Ozs7O2lCQVFBLGdCQUFBLEdBQWtCLFNBQUE7QUFDZCxRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsVUFBQSxHQUFhO0lBRWIsSUFBRyxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQXhCO01BQ0ksVUFBQSxHQUFhLFdBQVcsQ0FBQyxrQkFBWixtRkFBb0UsQ0FBRSxxQkFBdEUsRUFEakI7O0lBR0EsSUFBRyxPQUFPLENBQUMsT0FBUixJQUFtQixVQUF0QjtNQUNJLEtBQUEsR0FBWSxJQUFBLEVBQUUsQ0FBQyxZQUFILENBQUE7TUFDWixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQWhCLDJDQUFxQyxDQUFFLEtBQUssQ0FBQyxhQUF2Qix5RkFBbUUsQ0FBRTtNQUMzRixLQUFLLENBQUMsTUFBTSxDQUFDLEVBQWIsQ0FBZ0IsU0FBaEIsRUFBMkIsU0FBQyxDQUFEO2VBQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUF0QixHQUE0QjtNQUFuQyxDQUEzQixFQUhKO0tBQUEsTUFJSyxJQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBMUIsR0FBbUMsQ0FBdEM7TUFDRCxLQUFBLEdBQVksSUFBQSxFQUFFLENBQUMsYUFBSCxDQUFpQixvQkFBakIsRUFEWDtLQUFBLE1BQUE7TUFHRCxLQUFBLEdBQVksSUFBQSxFQUFFLENBQUMsYUFBSCxDQUFpQixhQUFqQixFQUhYOztBQUtMLFdBQU87RUFoQk87OztBQWtCbEI7Ozs7OztpQkFLQSxLQUFBLEdBQU8sU0FBQTtJQUNILElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLFlBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxVQUFELENBQUE7SUFDQSxJQUFDLENBQUEsV0FBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLFVBQUQsQ0FBQTtXQUVBLElBQUMsQ0FBQSxJQUFELENBQU0sQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQUcsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsS0FBQyxDQUFBLGdCQUFELENBQUEsQ0FBdEI7TUFBSDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBTjtFQVBHOzs7Ozs7QUFXWCxFQUFFLENBQUMsSUFBSCxHQUFjLElBQUEsSUFBQSxDQUFBOztBQUNkLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBZixDQUFBOztBQUNBLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBZixHQUF5QixTQUFBO0VBRXJCLE1BQU0sQ0FBQyxJQUFQLENBQVksRUFBWixDQUFlLENBQUMsT0FBaEIsQ0FBd0IsU0FBQyxDQUFEO0lBQU8sRUFBRyxDQUFBLENBQUEsQ0FBRSxDQUFDLFVBQU4sR0FBbUI7V0FBTSxFQUFHLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBTixHQUFjO0VBQTlDLENBQXhCO0VBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxFQUFaLENBQWUsQ0FBQyxPQUFoQixDQUF3QixTQUFDLENBQUQ7SUFBTyxFQUFHLENBQUEsQ0FBQSxDQUFFLENBQUMsVUFBTixHQUFtQjtXQUFNLEVBQUcsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFOLEdBQWM7RUFBOUMsQ0FBeEI7RUFDQSxNQUFNLENBQUMsSUFBUCxDQUFZLEVBQVosQ0FBZSxDQUFDLE9BQWhCLENBQXdCLFNBQUMsQ0FBRDtJQUFPLEVBQUcsQ0FBQSxDQUFBLENBQUUsQ0FBQyxVQUFOLEdBQW1CO1dBQU0sRUFBRyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQU4sR0FBYztFQUE5QyxDQUF4QjtTQUVBLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBUixDQUFBO0FBTnFCIiwic291cmNlc0NvbnRlbnQiOlsiIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jXG4jICAgU2NyaXB0OiBNYWluXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiNcbiMgICBFbnRyeSBwb2ludCBvZiB5b3VyIGdhbWUuXG4jXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNsYXNzIE1haW5cbiAgICAjIyMqXG4gICAgKiBDb250cm9scyB0aGUgYm9vdC1wcm9jZXNzIG9mIHRoZSBnYW1lLlxuICAgICpcbiAgICAqIEBtb2R1bGUgZ3NcbiAgICAqIEBjbGFzcyBNYWluXG4gICAgKiBAbWVtYmVyb2YgZ3NcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICMjI1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICB3aW5kb3cuJCA9IGpRdWVyeS5ub0NvbmZsaWN0KClcblxuICAgICAgICBAbGFuZ3VhZ2VzTG9hZGVkID0gbm9cbiAgICAgICAgQGZyYW1lQ2FsbGJhY2sgPSBudWxsXG5cbiAgICAjIyMqXG4gICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IGZyYW1lLlxuICAgICpcbiAgICAqIEBtZXRob2QgdXBkYXRlRnJhbWVcbiAgICAjIyNcbiAgICB1cGRhdGVGcmFtZTogLT5cbiAgICAgICAgaWYgJFBBUkFNUy5zaG93RGVidWdJbmZvXG4gICAgICAgICAgICB3aW5kb3cuc3RhcnRUaW1lID0gaWYgd2luZG93LnBlcmZvcm1hbmNlPyB0aGVuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSBlbHNlIERhdGUubm93KClcblxuICAgICAgICBTY2VuZU1hbmFnZXIudXBkYXRlKClcbiAgICAgICAgR3JhcGhpY3MuZnJhbWVDb3VudCsrXG5cbiAgICAgICAgaWYgJFBBUkFNUy5zaG93RGVidWdJbmZvXG4gICAgICAgICAgICBpZiBub3QgQGRlYnVnU3ByaXRlPyB0aGVuIEBkZWJ1Z1Nwcml0ZSA9IG5ldyBTcHJpdGVfRGVidWcoKVxuXG4gICAgICAgICAgICB3aW5kb3cuZW5kVGltZSA9IGlmIHdpbmRvdy5wZXJmb3JtYW5jZT8gdGhlbiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgZWxzZSBEYXRlLm5vdygpXG4gICAgICAgICAgICBpZiBHcmFwaGljcy5mcmFtZUNvdW50ICUgMzAgPT0gMFxuICAgICAgICAgICAgICAgIEBkZWJ1Z1Nwcml0ZS5mcmFtZVRpbWUgPSAoZW5kVGltZSAtIHN0YXJ0VGltZSlcbiAgICAgICAgICAgICAgICBAZGVidWdTcHJpdGUucmVkcmF3KClcblxuICAgICMjIypcbiAgICAqIExvYWRzIGdhbWUgZGF0YS5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWREYXRhXG4gICAgIyMjXG4gICAgbG9hZERhdGE6IC0+XG4gICAgICAgIFJlY29yZE1hbmFnZXIubG9hZCgpXG4gICAgICAgIERhdGFNYW5hZ2VyLmdldERvY3VtZW50c0J5VHlwZShcImdsb2JhbF92YXJpYWJsZXNcIilcbiAgICAgICAgRGF0YU1hbmFnZXIuZ2V0RG9jdW1lbnRzQnlUeXBlKFwibGFuZ3VhZ2VfcHJvZmlsZVwiKVxuICAgICAgICBEYXRhTWFuYWdlci5nZXREb2N1bWVudHNCeVR5cGUoXCJ2bi5jaGFwdGVyXCIpXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBzeXN0ZW0gZGF0YS5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRTeXN0ZW1EYXRhXG4gICAgIyMjXG4gICAgbG9hZFN5c3RlbURhdGE6IC0+XG4gICAgICAgIERhdGFNYW5hZ2VyLmdldERvY3VtZW50KFwiUkVTT1VSQ0VTXCIpXG4gICAgICAgIERhdGFNYW5hZ2VyLmdldERvY3VtZW50KFwiU1VNTUFSSUVTXCIpXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBzeXN0ZW0gcmVzb3VyY2VzIHN1Y2ggYXMgZ3JhcGhpY3MsIHNvdW5kcywgZm9udHMsIGV0Yy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIGxvYWRTeXN0ZW1SZXNvdXJjZXNcbiAgICAjIyNcbiAgICBsb2FkU3lzdGVtUmVzb3VyY2VzOiAtPlxuICAgICAgICBSZXNvdXJjZU1hbmFnZXIubG9hZEZvbnRzKClcbiAgICAgICAgUmVzb3VyY2VMb2FkZXIubG9hZFN5c3RlbVNvdW5kcyhSZWNvcmRNYW5hZ2VyLnN5c3RlbSlcbiAgICAgICAgUmVzb3VyY2VMb2FkZXIubG9hZFN5c3RlbUdyYXBoaWNzKFJlY29yZE1hbmFnZXIuc3lzdGVtKVxuXG4gICAgICAgIGZvciBsYW5ndWFnZSBpbiBMYW5ndWFnZU1hbmFnZXIubGFuZ3VhZ2VzXG4gICAgICAgICAgICBpZiBsYW5ndWFnZS5pY29uPy5uYW1lPy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyLmdldEJpdG1hcChcIkdyYXBoaWNzL0ljb25zLyN7bGFuZ3VhZ2UuaWNvbi5uYW1lfVwiKVxuXG4gICAgICAgIGdzLkZvbnRzLmluaXRpYWxpemUoKVxuXG4gICAgIyMjKlxuICAgICogR2V0cyBnYW1lIHNldHRpbmdzLlxuICAgICpcbiAgICAqIEBtZXRob2QgZ2V0U2V0dGluZ3NcbiAgICAjIyNcbiAgICBnZXRTZXR0aW5nczogLT5cbiAgICAgICAgc2V0dGluZ3MgPSBHYW1lU3RvcmFnZS5nZXRPYmplY3QoXCJzZXR0aW5nc1wiKVxuXG4gICAgICAgIGlmIG5vdCBzZXR0aW5ncz8gb3Igc2V0dGluZ3MudmVyc2lvbiAhPSAzNDJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLnJlc2V0U2V0dGluZ3MoKVxuICAgICAgICAgICAgc2V0dGluZ3MgPSBHYW1lTWFuYWdlci5zZXR0aW5nc1xuXG4gICAgICAgIHJldHVybiBzZXR0aW5nc1xuXG4gICAgIyMjKlxuICAgICogU2V0cyB1cCB0aGUgZ2FtZSdzIGdsb2JhbCBkYXRhLiBJZiBpdCBpcyBvdXRkYXRlZCwgdGhpcyBtZXRob2Qgd2lsbFxuICAgICogcmVzZXQgdGhlIGdsb2JhbCBnYW1lIGRhdGEuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cEdsb2JhbERhdGFcbiAgICAjIyNcbiAgICBzZXR1cEdsb2JhbERhdGE6IC0+XG4gICAgICAgIGdsb2JhbERhdGEgPSBHYW1lU3RvcmFnZS5nZXRPYmplY3QoXCJnbG9iYWxEYXRhXCIpXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdsb2JhbERhdGEgPSBnbG9iYWxEYXRhXG5cbiAgICAgICAgaWYgIWdsb2JhbERhdGEgfHwgZ2xvYmFsRGF0YS52ZXJzaW9uICE9IDM0MlxuICAgICAgICAgICAgR2FtZU1hbmFnZXIucmVzZXRHbG9iYWxEYXRhKClcblxuICAgICMjIypcbiAgICAqIFNldHMgdXAgZ2FtZSBzZXR0aW5ncy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwR2FtZVNldHRpbmdzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3MgLSBDdXJyZW50IGdhbWUgc2V0dGluZ3MuXG4gICAgIyMjXG4gICAgc2V0dXBHYW1lU2V0dGluZ3M6IChzZXR0aW5ncykgLT5cbiAgICAgICAgR2FtZU1hbmFnZXIuc2V0dGluZ3MgPSBzZXR0aW5nc1xuICAgICAgICBHYW1lTWFuYWdlci5zZXR0aW5ncy5mdWxsU2NyZWVuID0gR3JhcGhpY3MuaXNGdWxsc2NyZWVuKClcblxuICAgICAgICBmb3IgY2hhcmFjdGVyLCBpIGluIFJlY29yZE1hbmFnZXIuY2hhcmFjdGVyc0FycmF5XG4gICAgICAgICAgICBpZiBjaGFyYWN0ZXIgYW5kICFHYW1lTWFuYWdlci5zZXR0aW5ncy52b2ljZXNCeUNoYXJhY3RlcltjaGFyYWN0ZXIuaW5kZXhdXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuc2V0dGluZ3Mudm9pY2VzQnlDaGFyYWN0ZXJbY2hhcmFjdGVyLmluZGV4XSA9IDEwMFxuICAgICAgICBmb3IgY2csIGkgaW4gUmVjb3JkTWFuYWdlci5jZ0dhbGxlcnlBcnJheVxuICAgICAgICAgICAgaWYgY2c/IGFuZCAhR2FtZU1hbmFnZXIuZ2xvYmFsRGF0YS5jZ0dhbGxlcnlbY2cuaW5kZXhdXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2xvYmFsRGF0YS5jZ0dhbGxlcnlbY2cuaW5kZXhdID0geyB1bmxvY2tlZDogbm8gfVxuXG4gICAgIyMjKlxuICAgICogU2V0cyB1cCBhdWRpbyBzZXR0aW5ncy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwQXVkaW9TZXR0aW5nc1xuICAgICogQHBhcmFtIHtPYmplY3R9IHNldHRpbmdzIC0gQ3VycmVudCBnYW1lIHNldHRpbmdzLlxuICAgICMjI1xuICAgIHNldHVwQXVkaW9TZXR0aW5nczogKHNldHRpbmdzKSAtPlxuICAgICAgICBBdWRpb01hbmFnZXIuZ2VuZXJhbFNvdW5kVm9sdW1lID0gc2V0dGluZ3Muc2VWb2x1bWVcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmdlbmVyYWxNdXNpY1ZvbHVtZSA9IHNldHRpbmdzLmJnbVZvbHVtZVxuICAgICAgICBBdWRpb01hbmFnZXIuZ2VuZXJhbFZvaWNlVm9sdW1lID0gc2V0dGluZ3Mudm9pY2VWb2x1bWVcblxuICAgICMjIypcbiAgICAqIFNldHMgdXAgdmlkZW8gc2V0dGluZ3MuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cFZpZGVvU2V0dGluZ3NcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5ncyAtIEN1cnJlbnQgZ2FtZSBzZXR0aW5ncy5cbiAgICAjIyNcbiAgICBzZXR1cFZpZGVvU2V0dGluZ3M6IChzZXR0aW5ncykgLT5cbiAgICAgICAgc2V0dGluZ3MucmVuZGVyZXIgPSAxXG4gICAgICAgIEdyYXBoaWNzLmtlZXBSYXRpbyA9ICFzZXR0aW5ncy5hZGp1c3RBc3BlY3RSYXRpb1xuICAgICAgICBHcmFwaGljcy5vblJlc2l6ZSgpXG5cbiAgICAjIyMqXG4gICAgKiBTZXRzIHVwIHNldHRpbmdzLlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2V0dXBTZXR0aW5nc1xuICAgICMjI1xuICAgIHNldHVwU2V0dGluZ3M6IC0+XG4gICAgICAgIHNldHRpbmdzID0gQGdldFNldHRpbmdzKClcblxuICAgICAgICBAc2V0dXBHbG9iYWxEYXRhKClcbiAgICAgICAgQHNldHVwR2FtZVNldHRpbmdzKHNldHRpbmdzKVxuICAgICAgICBAc2V0dXBBdWRpb1NldHRpbmdzKHNldHRpbmdzKVxuICAgICAgICBAc2V0dXBWaWRlb1NldHRpbmdzKHNldHRpbmdzKVxuXG5cbiAgICAgICAgR2FtZVN0b3JhZ2Uuc2V0T2JqZWN0KFwic2V0dGluZ3NcIiwgc2V0dGluZ3MpXG5cbiAgICAjIyMqXG4gICAgKiBMb2FkcyBhbGwgc3lzdGVtIHJlc291cmNlcyBuZWVkZWQgdG8gc3RhcnQgdGhlIGFjdHVhbCBnYW1lLlxuICAgICpcbiAgICAqIEBtZXRob2QgbG9hZFxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsZWQgd2hlbiBhbGwgc3lzdGVtIHJlc291cmNlcyBhcmUgbG9hZGVkLlxuICAgICMjI1xuICAgIGxvYWQ6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQGxvYWRTeXN0ZW1EYXRhKClcblxuICAgICAgICBEYXRhTWFuYWdlci5ldmVudHMub24gXCJsb2FkZWRcIiwgPT5cbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLnRlbXBGaWVsZHMgPSBuZXcgZ3MuR2FtZVRlbXAoKVxuICAgICAgICAgICAgd2luZG93LiR0ZW1wRmllbGRzID0gR2FtZU1hbmFnZXIudGVtcEZpZWxkc1xuXG4gICAgICAgICAgICBpZiBAbGFuZ3VhZ2VzTG9hZGVkXG4gICAgICAgICAgICAgICAgUmVjb3JkTWFuYWdlci5pbml0aWFsaXplKClcbiAgICAgICAgICAgICAgICBMYW5ndWFnZU1hbmFnZXIuaW5pdGlhbGl6ZSgpXG4gICAgICAgICAgICAgICAgU2NlbmVNYW5hZ2VyLmluaXRpYWxpemUoKVxuICAgICAgICAgICAgICAgIEBzZXR1cFNldHRpbmdzKClcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAbG9hZERhdGEoKVxuXG4gICAgICAgICAgICBpZiBAbGFuZ3VhZ2VzTG9hZGVkXG4gICAgICAgICAgICAgICAgQGxvYWRTeXN0ZW1SZXNvdXJjZXMoKVxuICAgICAgICAgICAgICAgIERhdGFNYW5hZ2VyLmV2ZW50cy5vZmYgXCJsb2FkZWRcIlxuICAgICAgICAgICAgICAgIFJlc291cmNlTWFuYWdlci5ldmVudHMub24gXCJsb2FkZWRcIiwgPT5cbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuc2V0dXBDdXJzb3IoKVxuICAgICAgICAgICAgICAgICAgICBSZXNvdXJjZU1hbmFnZXIuZXZlbnRzLm9mZiBcImxvYWRlZFwiXG4gICAgICAgICAgICAgICAgICAgIHVpLlVJTWFuYWdlci5zZXR1cCgpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcblxuICAgICAgICAgICAgQGxhbmd1YWdlc0xvYWRlZCA9IHllc1xuXG5cbiAgICAjIyMqXG4gICAgKiBTZXRzIHVwIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwQXBwbGljYXRpb25cbiAgICAjIyNcbiAgICBzZXR1cEFwcGxpY2F0aW9uOiAtPlxuICAgICAgICAkUEFSQU1TLnNob3dEZWJ1Z0luZm8gPSBub1xuICAgICAgICB3aW5kb3cuUmVzb3VyY2VNYW5hZ2VyID0gbmV3IHdpbmRvdy5SZXNvdXJjZU1hbmFnZXIoKVxuICAgICAgICB3aW5kb3cuRGF0YU1hbmFnZXIgPSBuZXcgd2luZG93LkRhdGFNYW5hZ2VyKClcblxuICAgICAgICAjIEZvcmNlIE9wZW5HTCByZW5kZXJlclxuICAgICAgICB3aW5kb3cuR3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NfT3BlbkdMKClcbiAgICAgICAgd2luZG93LmdzLkdyYXBoaWNzID0gd2luZG93LkdyYXBoaWNzXG4gICAgICAgIHdpbmRvdy5SZW5kZXJlciA9IHdpbmRvdy5SZW5kZXJlcl9PcGVuR0xcblxuICAgICAgICAjIEZvcmNlIGxpbmVhciBmaWx0ZXJpbmdcbiAgICAgICAgVGV4dHVyZTJELmZpbHRlciA9IDFcblxuICAgICMjIypcbiAgICAqIEluaXRpYWxpemVzIHRoZSBpbnB1dCBzeXN0ZW0gdG8gZW5hYmxlIHN1cHBvcnQgZm9yIGtleWJvYXJkLCBtb3VzZSwgdG91Y2gsIGV0Yy5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwSW5wdXRcbiAgICAjIyNcbiAgICBzZXR1cElucHV0OiAtPlxuICAgICAgICBJbnB1dC5pbml0aWFsaXplKClcbiAgICAgICAgSW5wdXQuTW91c2UuaW5pdGlhbGl6ZSgpXG5cbiAgICAjIyMqXG4gICAgKiBJbml0aWFsaXplcyB0aGUgdmlkZW8gc3lzdGVtIHdpdGggdGhlIGdhbWUncyByZXNvbHV0aW9uLiBJdCBpcyBuZWNlc3NhcnkgdG9cbiAgICAqIGNhbGwgdGhpcyBtZXRob2QgYmVmb3JlIHVzaW5nIGdyYXBoaWMgb2JqZWN0IHN1Y2ggYXMgYml0bWFwcywgc3ByaXRlcywgZXRjLlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2V0dXBWaWRlb1xuICAgICMjI1xuICAgIHNldHVwVmlkZW86IC0+XG4gICAgICAgIEBmcmFtZUNhbGxiYWNrID0gQGNyZWF0ZUZyYW1lQ2FsbGJhY2soKVxuXG4gICAgICAgIEdyYXBoaWNzLmluaXRpYWxpemUoJFBBUkFNUy5yZXNvbHV0aW9uLndpZHRoLCAkUEFSQU1TLnJlc29sdXRpb24uaGVpZ2h0KVxuICAgICAgICAjR3JhcGhpY3Mub25Gb2N1c1JlY2VpdmUgPSA9PiBHYW1lTWFuYWdlci50ZW1wU2V0dGluZ3Muc2tpcCA9IG5vXG4gICAgICAgIEdyYXBoaWNzLm9uRGlzcG9zZSA9ID0+IFJlc291cmNlTWFuYWdlci5kaXNwb3NlKClcbiAgICAgICAgR3JhcGhpY3MuZm9ybWF0cyA9IFszMjAsIDM4NCwgNDI3XVxuICAgICAgICBHcmFwaGljcy5zY2FsZSA9IDAuNSAvIDI0MCAqIEdyYXBoaWNzLmhlaWdodFxuICAgICAgICBGb250LmRlZmF1bHRTaXplID0gTWF0aC5yb3VuZCg5IC8gMjQwICogR3JhcGhpY3MuaGVpZ2h0KVxuXG4gICAgICAgIEdyYXBoaWNzLm9uRWFjaEZyYW1lKEBmcmFtZUNhbGxiYWNrKVxuXG4gICAgIyMjKlxuICAgICogUmVnaXN0ZXJzIHNoYWRlci1iYXNlZCBlZmZlY3RzLiBJdCBpcyBpbXBvcnRhbnQgdG8gcmVnaXN0ZXIgYWxsIGVmZmVjdHNcbiAgICAqIGJlZm9yZSB0aGUgZ3JhcGhpY3Mgc3lzdGVtIGlzIGluaXRpYWxpemVkLlxuICAgICpcbiAgICAqIEBtZXRob2Qgc2V0dXBFZmZlY3RzXG4gICAgIyMjXG4gICAgc2V0dXBFZmZlY3RzOiAtPlxuICAgICAgICAjIFJlZ2lzdGVyIGJ1aWx0LWluIExPRC9Cb3ggQmx1ciBlZmZlY3RcbiAgICAgICAgZ3MuRWZmZWN0LnJlZ2lzdGVyRWZmZWN0KGdzLkVmZmVjdC5mcmFnbWVudFNoYWRlckluZm9zLmxvZF9ibHVyKVxuICAgICAgICAjIFJlZ2lzdGVyIGJ1aWx0LWluIHBpeGVsYXRlIGVmZmVjdFxuICAgICAgICBncy5FZmZlY3QucmVnaXN0ZXJFZmZlY3QoZ3MuRWZmZWN0LmZyYWdtZW50U2hhZGVySW5mb3MucGl4ZWxhdGUpXG5cbiAgICAgICAgIyBUaGlzIGlzIGFuIGV4YW1wbGUgb2YgaG93IHRvIHJlZ2lzdGVyIHlvdXIgb3duIHNoYWRlci1lZmZlY3QuXG4gICAgICAgICMgU2VlIEVmZmVjdHMgPiBDaXJjdWxhckRpc3RvcnRpb25FZmZlY3Qgc2NyaXB0IGZvciBtb3JlIGluZm8uXG4gICAgICAgICMgZ3MuQ2lyY3VsYXJEaXN0b3J0aW9uRWZmZWN0LnJlZ2lzdGVyKClcbiAgICAjIyMqXG4gICAgKiBJbml0aWFsaXplcyB0aGUgTGl2ZTJELiBJZiBMaXZlMkQgaXMgbm90IGF2YWlsYWJsZSwgaXQgZG9lcyBub3RoaW5nLiBOZWVkcyB0byBiZVxuICAgICogY2FsbGVkIGJlZm9yZSB1c2luZyBMaXZlMkQuXG4gICAgKlxuICAgICogQG1ldGhvZCBzZXR1cExpdmUyRFxuICAgICMjI1xuICAgIHNldHVwTGl2ZTJEOiAtPlxuICAgICAgICBMaXZlMkQuaW5pdCgpXG4gICAgICAgIExpdmUyRC5zZXRHTCgkZ2wpXG4gICAgICAgIExpdmUyREZyYW1ld29yay5zZXRQbGF0Zm9ybU1hbmFnZXIobmV3IEwyRFBsYXRmb3JtTWFuYWdlcigpKVxuXG4gICAgIyMjKlxuICAgICogQ3JlYXRlcyB0aGUgZnJhbWUtY2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIG9uY2UgcGVyIGZyYW1lIHRvIHVwZGF0ZSBhbmQgcmVuZGVyXG4gICAgKiB0aGUgZ2FtZS5cbiAgICAqXG4gICAgKiBAbWV0aG9kIHNldHVwTGl2ZTJEXG4gICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGZyYW1lLWNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICMjI1xuICAgIGNyZWF0ZUZyYW1lQ2FsbGJhY2s6IC0+XG4gICAgICAgIGNhbGxiYWNrID0gbnVsbFxuXG4gICAgICAgIGlmICRQQVJBTVMucHJldmlldz8gb3IgKCRQQVJBTVMudGVzdE9mZmxpbmUgJiYgd2luZG93LnBhcmVudCAhPSB3aW5kb3cpXG4gICAgICAgICAgICBjYWxsYmFjayA9ICh0aW1lKSA9PlxuICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICBpZiAkUEFSQU1TLnByZXZpZXcgJiYgISRQQVJBTVMucHJldmlldy5lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgQHVwZGF0ZUZyYW1lKClcbiAgICAgICAgICAgICAgICBjYXRjaCBleFxuICAgICAgICAgICAgICAgICAgICBpZiAkUEFSQU1TLnByZXZpZXcgb3IgR2FtZU1hbmFnZXIuaW5MaXZlUHJldmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgJFBBUkFNUy5wcmV2aWV3ID0gZXJyb3I6IGV4XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjYWxsYmFjayA9ICh0aW1lKSA9PiBAdXBkYXRlRnJhbWUoKVxuXG4gICAgICAgIHJldHVybiBjYWxsYmFja1xuXG4gICAgIyMjKlxuICAgICogQ3JlYXRlcyB0aGUgc3RhcnQgc2NlbmUgb2JqZWN0LiBJZiBhbiBpbnRyby1zY2VuZSBpcyBzZXQsIHRoaXMgbWV0aG9kIHJldHVybnMgdGhlXG4gICAgKiBpbnRyby1zY2VuZS4gSWYgdGhlIGdhbWUgcnVucyBpbiBMaXZlLVByZXZpZXcsIHRoaXMgbWV0aG9kIHJldHVybnMgdGhlIHNlbGVjdGVkXG4gICAgKiBzY2VuZSBpbiBlZGl0b3IuXG4gICAgKlxuICAgICogQG1ldGhvZCBjcmVhdGVTdGFydFNjZW5lXG4gICAgKiBAcmV0dXJuIHtncy5PYmplY3RfQmFzZX0gVGhlIHN0YXJ0LXNjZW5lLlxuICAgICMjI1xuICAgIGNyZWF0ZVN0YXJ0U2NlbmU6IC0+XG4gICAgICAgIHNjZW5lID0gbnVsbFxuICAgICAgICBpbnRyb1NjZW5lID0gbnVsbFxuXG4gICAgICAgIGlmIFJlY29yZE1hbmFnZXIuc3lzdGVtLnVzZUludHJvU2NlbmVcbiAgICAgICAgICAgIGludHJvU2NlbmUgPSBEYXRhTWFuYWdlci5nZXREb2N1bWVudFN1bW1hcnkoUmVjb3JkTWFuYWdlci5zeXN0ZW0uaW50cm9JbmZvPy5zY2VuZT8udWlkKVxuXG4gICAgICAgIGlmICRQQVJBTVMucHJldmlldyBvciBpbnRyb1NjZW5lXG4gICAgICAgICAgICBzY2VuZSA9IG5ldyB2bi5PYmplY3RfU2NlbmUoKVxuICAgICAgICAgICAgc2NlbmUuc2NlbmVEYXRhLnVpZCA9ICRQQVJBTVMucHJldmlldz8uc2NlbmUudWlkIHx8IFJlY29yZE1hbmFnZXIuc3lzdGVtLmludHJvSW5mbz8uc2NlbmU/LnVpZFxuICAgICAgICAgICAgc2NlbmUuZXZlbnRzLm9uIFwiZGlzcG9zZVwiLCAoZSkgLT4gR2FtZU1hbmFnZXIuc2NlbmVEYXRhLnVpZCA9IG51bGxcbiAgICAgICAgZWxzZSBpZiBMYW5ndWFnZU1hbmFnZXIubGFuZ3VhZ2VzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgIHNjZW5lID0gbmV3IGdzLk9iamVjdF9MYXlvdXQoXCJsYW5ndWFnZU1lbnVMYXlvdXRcIilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2NlbmUgPSBuZXcgZ3MuT2JqZWN0X0xheW91dChcInRpdGxlTGF5b3V0XCIpXG5cbiAgICAgICAgcmV0dXJuIHNjZW5lXG5cbiAgICAjIyMqXG4gICAgKiBCb290cyB0aGUgZ2FtZSBieSBzZXR0aW5nIHVwIHRoZSBhcHBsaWNhdGlvbiB3aW5kb3cgYXMgd2VsbCBhcyB0aGUgdmlkZW8sIGF1ZGlvIGFuZCBpbnB1dCBzeXN0ZW0uXG4gICAgKlxuICAgICogQG1ldGhvZCBzdGFydFxuICAgICMjI1xuICAgIHN0YXJ0OiAtPlxuICAgICAgICBAc2V0dXBBcHBsaWNhdGlvbigpXG4gICAgICAgIEBzZXR1cEVmZmVjdHMoKVxuICAgICAgICBAc2V0dXBWaWRlbygpXG4gICAgICAgIEBzZXR1cExpdmUyRCgpXG4gICAgICAgIEBzZXR1cElucHV0KClcblxuICAgICAgICBAbG9hZCA9PiBTY2VuZU1hbmFnZXIuc3dpdGNoVG8oQGNyZWF0ZVN0YXJ0U2NlbmUoKSlcblxuXG4jIFRoZSBlbnRyeSBwb2ludCBvZiB0aGUgZ2FtZS5cbmdzLk1haW4gPSBuZXcgTWFpbigpXG5ncy5BcHBsaWNhdGlvbi5pbml0aWFsaXplKClcbmdzLkFwcGxpY2F0aW9uLm9uUmVhZHkgPSAtPlxuICAgICMgQWRkIG1ldGEgZGF0YSB0byBhbGwgY2xhc3Mgb2JqZWN0cyBuZWNlc3NhcnkgZm9yIG9iamVjdCBzZXJpYWxpemF0aW9uLlxuICAgIE9iamVjdC5rZXlzKGdzKS5mb3JFYWNoIChrKSAtPiBnc1trXS4kbmFtZXNwYWNlID0gXCJnc1wiOyBnc1trXS4kbmFtZSA9IGtcbiAgICBPYmplY3Qua2V5cyh2bikuZm9yRWFjaCAoaykgLT4gdm5ba10uJG5hbWVzcGFjZSA9IFwidm5cIjsgdm5ba10uJG5hbWUgPSBrXG4gICAgT2JqZWN0LmtleXModWkpLmZvckVhY2ggKGspIC0+IHVpW2tdLiRuYW1lc3BhY2UgPSBcInVpXCI7IHVpW2tdLiRuYW1lID0ga1xuXG4gICAgZ3MuTWFpbi5zdGFydCgpXG5cblxuXG5cblxuIl19
//# sourceURL=Main_105.js