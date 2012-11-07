
    var map,
    service,
    infowindow;
    function initialize() {
      var myOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      map = new google.map.Map(document.getElementById('chooseit-map'), myOptions);

      //some HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longtitude
          ),
          infowindow = new google.maps.infowindow({
            map : map,
            position : pos,
            content : 'Du är här'
          }),

          request = {
            location: pos,
            radius: '5000',
            query: 'restaurant'
          },
          service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);

          map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // The used browser dose not support Geolocations
        handleNoGeolocation(false);
      }
    }

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          content = 'Error: Your browser doesn\'t support geolocation.';
        }

        var options = {
          map: map,
          position: new google.maps.LatLng(60, 105),
          content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
      }



