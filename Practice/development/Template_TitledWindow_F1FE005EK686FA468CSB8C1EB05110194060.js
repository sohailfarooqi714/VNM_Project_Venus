// Generated by CoffeeScript 1.12.7
(function() {
  ui.UiFactory.customTypes["ui.TitledWindow"] = {
    "type": "ui.FreeLayout",
    "controls": [
      {
        "type": "ui.Frame",
        "style": "windowShadow",
        "frame": [0, 0, "100%", "100%"]
      }, {
        "type": "ui.Image",
        "style": "windowTilePattern",
        "frame": [0, 0, "100%", "100%"]
      }, {
        "type": "ui.Image",
        "style": "windowStretchPattern",
        "frame": [0, 0, "100%", "100%"]
      }, {
        "type": "ui.Frame",
        "style": "windowFrame",
        "frame": [0, 0, "100%", "100%"]
      }, {
        "type": "ui.Text",
        "text": function() {
          return p.title;
        },
        "style": "smallUIText",
        "frame": [10, 10],
        "sizeToFit": true
      }, {
        "type": "ui.Panel",
        "style": "windowContentSeparator",
        "frame": [0, 45, "100%", 1]
      }
    ]
  };

}).call(this);
