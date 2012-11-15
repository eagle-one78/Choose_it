//
//    var map,
//    service,
//    infowindow;
//    function initialize() {
//      var myOptions = {
//        zoom: 12,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//      },
//      map = new google.maps.Map(document.getElementById('chooseit-map'), myOptions);
//
//      //some HTML5 geolocation
//      if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function(position) {
//          var pos = new google.maps.LatLng(
//            position.coords.latitude,
//            position.coords.longtitude
//          ),
//          infowindow = new google.maps.infowindow({
//            map : map,
//            position : pos,
//            content : 'Du är här'
//          }),
//
//          request = {
//            location: pos,
//            radius: '5000',
//            query: 'restaurant'
//          },
//          service = new google.maps.places.PlacesService(map);
//          service.textSearch(request, callback);
//
//          map.setCenter(pos);
//        }, function() {
//          handleNoGeolocation(true);
//        });
//      } else {
//        // The used browser dose not support Geolocations
//        handleNoGeolocation(false);
//      }
//    }
//
//    function callback(results, status) {
//      if (status == google.maps.places.PlacesServiceStatus.OK) {
//        for (var i = 0; i < results.length; i++) {
//          var place = results[i];
//          createMarker(results[i]);
//        }
//      }
//    }
//
//    function handleNoGeolocation(errorFlag) {
//        if (errorFlag) {
//          var content = 'Error: The Geolocation service failed.';
//        } else {
//          content = 'Error: Your browser doesn\'t support geolocation.';
//        }
//
//        var options = {
//          map: map,
//          position: new google.maps.LatLng(60, 105),
//          content: content
//        };
//
//        var infowindow = new google.maps.InfoWindow(options);
//        map.setCenter(options.position);
//      }
//
//
//

var map;
  var markers = new Array();
  function initialize() {
    var map_center = new google.maps.LatLng(39.2,-84.479381);
    var store_locations = new Array();
    store_locations = [
        new google.maps.LatLng(39.112456,-84.574779),
        new google.maps.LatLng(39.314153,-84.261379),
        new google.maps.LatLng(39.197099,-84.667579),
        new google.maps.LatLng(39.16836,-84.479381)
        ];
    var myOptions = {
      zoom: 10,
      center: map_center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("chooseit-map"), myOptions);
    for(i=0;i<store_locations.length;i++)
    {
        markers[i] = new google.maps.Marker(
           { position: store_locations[i],
             map: map,
             title: "Store " + (i+1)
           } );
        google.maps.event.addListener(markers[i], 'click',
            function() {
              markerClick(this);
            }
        );
    }
    function markerClick( mark )
    {
      for ( var m = 0; m < markers.length; ++m )
      {
        if ( markers[m] == mark )
        {
             map.set_center(store_locations[m]);
             map.set_zoom(16);
             return;
        }
      }
    }
    document.getElementById("map_reset_button").style.display="block";
  }