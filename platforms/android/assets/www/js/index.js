var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
                //alert("Device Ready")
        var push = PushNotification.init({ "android": {"senderID": "137344682665"},
        "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

        push.on('registration', function(data) {
        //alert(data.registrationId);
        $.ajax({
          type: "POST",
          url: "http://www.ymcaustmob.com/android/index.php",
          data: { hash:data.registrationId },
          success: function(data)
            {
                  //alert("AJAX DONE SUCCESSFULLY");
                  //alert(data);                 
            } ,
           error: function(data)
            {
                  //alert("AJAX NOT DONE SUCCESSFULLY");
                  //alert(JSON.stringify(data));                 
            }      
        }); 
        });

        push.on('notification', function(data) {
        console.log(data.message);
        alert(data.title+" Message: " +data.message);
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
        });

        push.on('error', function(e) {
        //alert(e.message);
        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();