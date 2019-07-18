const app = {
  initialize: function () {
    console.log('Initialize')
    this.bindEvents()
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
    document.addEventListener('pause', this.onPause, false)
  },

  onDeviceReady: function () {
    var push = PushNotification.init({
      browser: { pushServiceURL: 'http://push.api.phonegap.com/v1/push' },
      android: { senderID: '1:226320092066:android:45cb019aa3275163' },
      ios: { alert: 'true', badge: true, sound: 'true' }
    })

    push.on('registration', function (data) {
      var platform = device.platform
      var handle = data.registrationId

      // Add User Device API
      console.log(platform, handle)
    })
    
    push.on('notification', function (data) {
      alert('Push Received: ' + data.message)
    })

    push.on('error', function (error) {
      console.error(error)
    })
    //  universalLinks.subscribe('openEventDetailPage', app.eventDetailPageRequested)
  },

  onPause: function () {
    
  },

  eventDetailPageRequested: function (eventData) {
  }
}

export default app