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
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-x-socialsharing.SocialSharing",
      "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
      "pluginId": "cordova-plugin-x-socialsharing",
      "clobbers": [
        "window.plugins.socialsharing"
      ]
    },
    {
      "id": "cordova-universal-links-plugin.universalLinks",
      "file": "plugins/cordova-universal-links-plugin/www/universal_links.js",
      "pluginId": "cordova-universal-links-plugin",
      "clobbers": [
        "universalLinks"
      ]
    },
    {
      "id": "phonegap-plugin-push.PushNotification",
      "file": "plugins/phonegap-plugin-push/www/push.js",
      "pluginId": "phonegap-plugin-push",
      "clobbers": [
        "PushNotification"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-add-swift-support": "2.0.2",
    "cordova-plugin-appcenter-shared": "0.2.2",
    "cordova-plugin-appcenter-analytics": "0.2.2",
    "cordova-plugin-appcenter-crashes": "0.2.2",
    "cordova-plugin-geolocation": "4.0.2",
    "cordova-plugin-qrscanner": "3.0.1",
    "cordova-plugin-splashscreen": "5.0.3",
    "cordova-plugin-statusbar": "2.4.3",
    "cordova-plugin-whitelist": "1.3.3",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "5.4.7",
    "cordova-support-google-services": "1.1.0",
    "cordova-universal-links-plugin": "1.2.1",
    "phonegap-plugin-multidex": "1.0.0",
    "phonegap-plugin-push": "2.2.3"
  };
});