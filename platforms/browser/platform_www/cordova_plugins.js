cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-appcenter-shared/www/AppCenter.js",
        "id": "cordova-plugin-appcenter-shared.AppCenter",
        "pluginId": "cordova-plugin-appcenter-shared",
        "clobbers": [
            "AppCenter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-appcenter-analytics/www/Analytics.js",
        "id": "cordova-plugin-appcenter-analytics.Analytics",
        "pluginId": "cordova-plugin-appcenter-analytics",
        "clobbers": [
            "AppCenter.Analytics"
        ]
    },
    {
        "file": "plugins/cordova-plugin-appcenter-crashes/www/Crashes.js",
        "id": "cordova-plugin-appcenter-crashes.Crashes",
        "pluginId": "cordova-plugin-appcenter-crashes",
        "clobbers": [
            "AppCenter.Crashes"
        ]
    },
    {
        "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
        "id": "cordova-plugin-qrscanner.QRScanner",
        "pluginId": "cordova-plugin-qrscanner",
        "clobbers": [
            "QRScanner"
        ]
    },
    {
        "file": "plugins/cordova-plugin-qrscanner/src/browser/plugin.min.js",
        "id": "cordova-plugin-qrscanner.QRScannerProxy",
        "pluginId": "cordova-plugin-qrscanner",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-appcenter-shared": "0.2.2",
    "cordova-plugin-appcenter-analytics": "0.2.2",
    "cordova-plugin-appcenter-crashes": "0.2.2",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-qrscanner": "3.0.1",
    "cordova-plugin-geolocation": "4.0.2"
}
// BOTTOM OF METADATA
});