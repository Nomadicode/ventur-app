cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-appcenter-shared.AppCenter",
      "file": "plugins/cordova-plugin-appcenter-shared/www/AppCenter.js",
      "pluginId": "cordova-plugin-appcenter-shared",
      "clobbers": [
        "AppCenter"
      ]
    },
    {
      "id": "cordova-plugin-appcenter-analytics.Analytics",
      "file": "plugins/cordova-plugin-appcenter-analytics/www/Analytics.js",
      "pluginId": "cordova-plugin-appcenter-analytics",
      "clobbers": [
        "AppCenter.Analytics"
      ]
    },
    {
      "id": "cordova-plugin-appcenter-crashes.Crashes",
      "file": "plugins/cordova-plugin-appcenter-crashes/www/Crashes.js",
      "pluginId": "cordova-plugin-appcenter-crashes",
      "clobbers": [
        "AppCenter.Crashes"
      ]
    },
    {
      "id": "cordova-plugin-qrscanner.QRScanner",
      "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
      "pluginId": "cordova-plugin-qrscanner",
      "clobbers": [
        "QRScanner"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-appcenter-shared": "0.2.2",
    "cordova-plugin-appcenter-analytics": "0.2.2",
    "cordova-plugin-appcenter-crashes": "0.2.2",
    "cordova-plugin-qrscanner": "3.0.1",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-geolocation": "4.0.2"
  };
});