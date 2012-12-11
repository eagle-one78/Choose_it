/**
 *JS file for the Google Maps, Places, and Details API
 *It shows the users current position, and when the user inserts a search data, Places and Details API wok together
 *to loop throw the locations and show Icons, markers, animations, and when a click on one of the markers shows
 *an the info window for that marker with the information available.
 *@author:      Sam Almendwi
 *@created:     20 november 2012
 */

(function ($) {
  $(document).ready(function(){
    var places_marker = [],
    markers_infowindow,
    place,
    places,
    image,
    place_website,
    place_rating,
    place_phonenumber,
    map;
    function initialize() {
      var mapOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

      var input = document.getElementById('search'),
      searchBox = new google.maps.places.SearchBox(input),
      service = new google.maps.places.PlacesService(map);

      google.maps.event.addListener(searchBox, 'places_changed', function() {
        places = searchBox.getPlaces();

        var bounds = new google.maps.LatLngBounds();
        markers_infowindow = new google.maps.InfoWindow();

        for (var x = 0; x < places.length; x++) {
          place = places[x];
          bounds.extend(place.geometry.location);
          image = new google.maps.MarkerImage(
            place.icon, new google.maps.Size(71, 71),
            new google.maps.Point(0, 0), new google.maps.Point(17, 34),
            new google.maps.Size(25, 25)
            );

          places_marker = new google.maps.Marker({
            map: map,
            animation : google.maps.Animation.DROP,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });
          places_marker.set('location', place);
          google.maps.event.addListener(places_marker, 'click', (function(places_marker) {
            return function() {
              var request = {
                reference: places_marker.location.reference
              },
              url = window.location.href;
              service.getDetails(request, function(details, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  //if details preform check
                  if (details) {
                    //if available place rating then give the global variable the value else not avail. string
                    if (details.rating) {
                      place_rating = details.rating;
                    }
                    else {
                      place_rating = 'Ej tillgängligt';
                    }
                    //if available place phone number then give the global variable the value else not avail. string
                    if (details.formatted_phone_number) {
                      place_phonenumber = details.formatted_phone_number;
                    }
                    else {
                      place_phonenumber = 'Ej tillgängligt';
                    }
                    //if available place website then give the global variable the value else not avail. string
                    if (details.website) {
                      place_website = details.website;
                    }
                    else {
                      place_website = 'Ej tillgänglig';
                    }
                  }

                  /*
                   * Trim and replace the special chars and the white spaces from name and address
                   */
                  var placeName = details.name,
                  stripedName = placeName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                  var placeAddress = details.formatted_address,
                  stripedAddress = placeAddress.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

                  /**
                   *Preform place insertion to database for the searched places and their
                   *information when click on marker using AJAX
                   */
                  var data = {
                    'insert_place': true,
                    'place_name': stripedName,
                    'google_rating': details.rating,
                    'formatted_address': stripedAddress,
                    'website': details.website,
                    'phone_number': details.formatted_phone_number
                  };
                  $.ajax({
                    url: 'places/insert/ajax',
                    type: 'POST',
                    data: data,
                    success: function(data) {
                      if(data === 'success') {
                        $('.messages').html('Platsen sparades korrekt i databasen!');
                      }
                      else if (data !== 'exists' && data !== 'success') {
                        $('.messages').html('Kunde inte spara platsen i databasen!');
                      }
                      else if (data === 'place_exists') {
                        $('.messages').html('Platsen finns redan!');
                      }
                    }
                  });


                  //Set markers content based on the details needed
                  markers_infowindow.setContent(
                    '<div style="background-color: #e6e6de;">' +
                    '<h2>' + details.name + '</h2>' +
                    '<span>' + details.formatted_address + '</span><br />' +
                    '<span>Omdöme från Google:&nbsp' + place_rating + '</span><br />' +
                    '<a class="rate-link" style="text-decoration: none" href="' + url + '?q=places/rating&name=' + stripedName + '&address=' + stripedAddress + '">Ge omdöme!</a><br />' +
                    '<span>Webbadress:&nbsp<a style="text-decoration: none" href="' + place_website + '" target="_blank">' +
                    place_website +
                    '</a></span><br /><span>Telefonnummer:&nbsp' +
                    place_phonenumber +
                    '</span></div>'
                    );

                  markers_infowindow.open(map, places_marker);


                  //Set bounce animation to the clicked marker
                  if (places_marker.getAnimation() != null) {
                    places_marker.setAnimation(null);
                    markers_infowindow.close();
                  }
                  else {
                    places_marker.setAnimation(google.maps.Animation.BOUNCE);
                  }
                }
              });
            }
          })(places_marker, x));
        }
        map.fitBounds(bounds);
      });

      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });

      /**
 *Get user current location
*/
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);

          var my_position_marker = new google.maps.Marker({
            position: pos,
            map: map
          });

          var infowindow = new google.maps.InfoWindow({
            map: map,
            position: pos,
            content: 'Du är här!'
          });

          map.setCenter(pos);

          google.maps.event.addListener(my_position_marker, 'mouseover', (function(my_position_marker) {
            return function() {
              infowindow.open(map, my_position_marker);
            }
          })(my_position_marker));

        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    //Focus on the search field onload
    $('#search').trigger('focus');

    //clear the search input field
    $('#search').click(function(){
      $('#search').val('');
    });
  });
})(jQuery);