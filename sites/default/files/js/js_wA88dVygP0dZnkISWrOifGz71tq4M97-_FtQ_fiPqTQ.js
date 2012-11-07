
/**
 * @file
 * GPolyLine / GPolygon manager
 */

/*global Drupal, GLatLng, GPoint */

Drupal.gmap.map.prototype.poly = {};

/**
 * Distance in pixels between 2 points.
 */
Drupal.gmap.map.prototype.poly.distance = function (point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
};

/**
 * Circle -- Following projection.
 */
Drupal.gmap.map.prototype.poly.computeCircle = function (obj, center, point2) {
  var numSides = 36;
  var sideInc = 10; // 360 / 20 = 18 degrees
  var convFactor = Math.PI / 180;
  var points = [];
  var radius = obj.poly.distance(center, point2);
  // 36 sided poly ~= circle
  for (var i = 0; i <= numSides; i++) {
    var rad = i * sideInc * convFactor;
    var x = center.x + radius * Math.cos(rad);
    var y = center.y + radius * Math.sin(rad);
    //points.push(obj.map.getCurrentMapType().getProjection().fromPixelToLatLng(new GPoint(x,y),obj.map.getZoom()));
    points.push(new GPoint(x, y));
  }
  return points;
};

Drupal.gmap.map.prototype.poly.calcPolyPoints = function (center, radM, numPoints, sAngle) {
  if (!numPoints) {
    numPoints = 32;
  }
  if (!sAngle) {
    sAngle = 0;
  }

  var d2r = Math.PI / 180.0;
  var r2d = 180.0 / Math.PI;
  var angleRad = sAngle * d2r;
  // earth semi major axis is about 6378137 m
  var latScale = radM / 6378137 * r2d;
  var lngScale = latScale / Math.cos(center.latRadians());

  var angInc = 2 * Math.PI / numPoints;
  var points = [];
  for (var i = 0; i < numPoints; i++) {
    var lat = parseFloat(center.lat()) + latScale * Math.sin(angleRad);
    var lng = parseFloat(center.lng()) + lngScale * Math.cos(angleRad);
    points.push(new GLatLng(lat, lng));
    angleRad += angInc;
  }

  // close the shape and return it
  points.push(points[0]);
  return points;
};
;

/**
 * @file
 * GMap Markers
 * Google GMarkerManager API version
 */

/*global Drupal, GMarker, GMarkerManager */

// Replace to override marker creation
Drupal.gmap.factory.marker = function (loc, opts) {
  return new GMarker(loc, opts);
};

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  obj.bind('init', function () {
    // Set up the markermanager.
    obj.mm = new GMarkerManager(obj.map, Drupal.settings.gmap_markermanager);
  });

  obj.bind('addmarker', function (marker) {
    var minzoom = Drupal.settings.gmap_markermanager.markerMinZoom;
    var maxzoom = Drupal.settings.gmap_markermanager.markerMaxZoom;
    if (marker.minzoom) {
      minzoom = marker.minzoom;
    }
    if (marker.maxzoom) {
      maxzoom = marker.maxzoom;
    }
    if (maxzoom > 0) {
      obj.mm.addMarker(marker.marker, minzoom, maxzoom);
    }
    else {
      obj.mm.addMarker(marker.marker, minzoom);
    }
    obj.mm.refresh();
  });

  obj.bind('delmarker', function (marker) {
    // @@@ This is NOT AVAILABLE in this version.
  });

  obj.bind('clearmarkers', function () {
    // @@@ This is NOT AVAILABLE in this version.
  });
});
;
