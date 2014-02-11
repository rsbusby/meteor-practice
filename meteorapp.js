

Posts = new Meteor.Collection('posts');

Points = new Meteor.Collection('points');

if (Meteor.isClient) {
     markers = [];
     infoWindows = Array();
  
  
   
  
  
    if (Posts.find().count() === 0) {
      Posts.insert({
        title: 'Introducing Telescope',
        author: 'Sacha Greif',
        url: 'http://sachagreif.com/introducing-telescope/'
      });
    
      Posts.insert({
        title: 'Meteor',
        author: 'Tom Coleman',
        url: 'http://meteor.com'
      });
    
      Posts.insert({
        title: 'The Meteor Book',
        author: 'Tom Coleman',
        url: 'http://themeteorbook.com'
      });
    }
}

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to meteorapp.";
  };

  Template.hello.events({
    'click #button1' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
      
          var lat = Random.fraction() * 0.5 + 33.5;
          var long = -117.4 + Random.fraction() * 1.2;
      
           var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat, long),
              map: map,
              title: "first",
              //infowindow: myInfoWindow,
              //icon: "{{ STATIC_URL }}icons/Carrot-Veggie-Icon.png",

          });
          markers.push(marker);
      
         Points.insert({
          lat: lat,
           long: long, 
          // user
         });

      
    }
      });

 // function clearOverlays() { for (i in markers) markers[i].setMap(null); markers = []; }
  
  Template.hello.events({

    'click #button2' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button2");
      
//        clearOverlays();
  
      console.log(markers.length);
      for (i in markers) {
        markers[i].setMap(null); 
      }
        markers = [];
       
      
      
    }
    
  });

Template.mapPostsList.rendered = function() {  
  
   console.log("YO");
   //var markers = [];
  // infoWindows = Array();
  
  
     if (Points.find().count() > 0) {
        var count = 0;
        allPoints = Points.find();
        allPoints.forEach(function (point) {
        console.log("Title of point " + count + ": " + point.lat);
        count += 1;

            
          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(point.lat, point.long),
              map: map,
              title: "first",
              //infowindow: myInfoWindow,
              //icon: "{{ STATIC_URL }}icons/Carrot-Veggie-Icon.png",

          });
          //markers.push(marker);
        });
      }

       function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(34., -118.244),
          zoom: 8,
          streetViewControl: false,
          mapTypeControl: false,
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
   console.log("YO4");

       }
     console.log("YO6");

      google.maps.event.addDomListener(window, 'load', initialize);

};

  initialize = function() {
    var mapOptions = {
      center: new google.maps.LatLng(34., -118.244),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
  
  Template.mapPostsList.listPoints = function () {
    //return "Not really a list.";
  var listStr = "";
    var count = 0;
    allPoints = Points.find();
        allPoints.forEach(function (point) {
        listStr = listStr + "point " + count + ": " + point.lat + ", " + point.long + "<br>";
        count += 1;
        });    
    return listStr;
    
  };
  
  
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
