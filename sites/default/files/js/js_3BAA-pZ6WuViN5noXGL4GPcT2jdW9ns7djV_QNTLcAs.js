
/**
 * @file
 * GMap Shapes
 * GMap API version / Base case
 */

/*global jQuery, Drupal, GEvent, GLatLng, GPolygon, GPolyline */

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;
/*
  obj.bind('init',function() {
    if (obj.vars.behavior.autozoom) {
      obj.bounds = new GLatLngBounds(new GLatLng(obj.vars.latitude,obj.vars.longitude),new GLatLng(obj.vars.latitude,obj.vars.longitude));
    }
  });
*/
  obj.bind('prepareshape', function (shape) {
    var pa, cargs, style;
    //var m = new GMarker(new GLatLng(marker.latitude,marker.longitude),marker.opts);
    pa = []; // point array (array of GLatLng-objects)
    var fillstyle = true;
    if (shape.type === 'circle') {
      pa = obj.poly.calcPolyPoints(new GLatLng(shape.center[0], shape.center[1]), shape.radius * 1000, shape.numpoints);
    }
    else if (shape.type === 'rpolygon') {
      shape.center = new GLatLng(shape.center[0], shape.center[1]);
      shape.point2 = new GLatLng(shape.point2[0], shape.point2[1]);
      var radius = shape.center.distanceFrom(shape.point2);
      pa = obj.poly.calcPolyPoints(shape.center, radius, shape.numpoints);
    }
    else if (shape.type === 'polygon') {
      jQuery.each(shape.points, function (i, n) {
        pa.push(new GLatLng(n[0], n[1]));
      });
    }
    else if (shape.type === 'line') {
      jQuery.each(shape.points, function (i, n) {
        pa.push(new GLatLng(n[0], n[1]));
      });
      fillstyle = false;
    }
    cargs = [pa];

    // Style normalization
    if (fillstyle) {
      style = obj.vars.styles.poly_default.slice();
    }
    else {
      style = obj.vars.styles.line_default.slice();
    }
    if (shape.style) {
      if (typeof shape.style === 'string') {
        if (obj.vars.styles[shape.style]) {
          style = obj.vars.styles[shape.style].slice();
        }
      }
      else {
        style = shape.style.slice();
      }
    }
    style[0] = '#' + style[0];
    style[1] = Number(style[1]);
    style[2] = style[2] / 100;
    if (fillstyle) {
      style[3] = '#' + style[3];
      style[4] = style[4] / 100;
    }
    
    if (shape.type == 'encoded_line') {
      shape.color = style[0];
      shape.weight = style[1];
      shape.opacity = style[2];
    }
    else if (shape.type == 'encoded_polygon') {
      jQuery.each(shape.polylines, function(i, polyline) {
        polyline.color = style[0];
        polyline.weight = style[1];
        polyline.opacity = style[2];
      });
      shape.fill = true;
      shape.color = style[3];
      shape.opacity = style[4];
      shape.outline = true;
    }

    jQuery.each(style, function (i, n) {
      cargs.push(n);
    });
    if (shape.opts) {
      cargs.push(shape.opts);
    }
    var Pg = function (args) {
      GPolygon.apply(this, args);
    };
    Pg.prototype = new GPolygon();
    var Pl = function (args) {
      GPolyline.apply(this, args);
    };
    Pl.prototype = new GPolyline();
    switch (shape.type) {
      case 'circle':
      case 'polygon':
      case 'rpolygon':
        shape.shape = new Pg(cargs);
        break;
      case 'line':
        shape.shape = new Pl(cargs);
        break;
      case 'encoded_line':
        shape.shape = GPolyline.fromEncoded(shape);        
        break;
      case 'encoded_polygon':
        shape.shape = GPolygon.fromEncoded(shape);
        break;
    }
  });

  obj.bind('addshape', function (shape) {
    if (!obj.vars.shapes) {
      obj.vars.shapes = [];
    }
    obj.vars.shapes.push(shape);
    obj.map.addOverlay(shape.shape);

    if (obj.vars.behavior.clickableshapes) {
      GEvent.addListener(shape.shape, 'click', function () {
        obj.change('clickshape', -1, shape);
      });
    }
  });

  obj.bind('delshape', function (shape) {
    obj.map.removeOverlay(shape.shape);
  });

  obj.bind('clearshapes', function () {
    if (obj.vars.shapes) {
      jQuery.each(obj.vars.shapes, function (i, n) {
        obj.change('delshape', -1, n);
      });
    }
  });
});
;

/**
 * @file
 * Gmap Overlay Editor
 */

/*global jQuery, Drupal, GEvent, GMarker, GPolygon, GPolyline */
Drupal.gmap.addHandler('overlayedit_linestyle', function (elem) {
  var obj = this;
  obj.vars.styles.overlayline = [];
  var f = function () {
    var o = Number(jQuery(this).attr('id').match(/\d+$/));
    obj.vars.styles.overlayline[o] = this.value;
  };
  jQuery(elem).find('input.gmap_style').change(f).each(f);
});

Drupal.gmap.addHandler('overlayedit_linestyle_apply', function (elem) {
  var obj = this;
  obj.vars.overlay_linestyle_apply = Boolean(elem.checked);
  jQuery(elem).change(function () {
    obj.vars.overlay_linestyle_apply = Boolean(this.checked);
  });
});

Drupal.gmap.addHandler('overlayedit_polystyle', function (elem) {
  var obj = this;
  obj.vars.styles.overlaypoly = [];
  var f = function () {
    var o = Number(jQuery(this).attr('id').match(/\d+$/));
    obj.vars.styles.overlaypoly[o] = this.value;
  };
  jQuery(elem).find('input.gmap_style').change(f).each(f);
});

Drupal.gmap.addHandler('overlayedit_polystyle_apply', function (elem) {
  var obj = this;
  obj.vars.overlay_polystyle_apply = Boolean(elem.checked);
  jQuery(elem).change(function () {
    obj.vars.overlay_polystyle_apply = Boolean(this.checked);
  });
});

Drupal.gmap.addHandler('overlayedit_fillstroke_default', function (elem) {
  var obj = this;
  obj.vars._usedefaultfillstroke = Boolean(elem.checked);
  jQuery(elem).change(function () {
    obj.vars._usedefaultfillstroke = Boolean(this.checked);
    alert(obj.vars._usedefaultfillstroke);
  });
});

Drupal.gmap.addHandler('overlayedit_mapclicktype', function (elem) {
  var obj = this;
  obj.vars.overlay_add_mode = elem.value;
  jQuery(elem).change(function () {
    obj.vars.overlay_add_mode = elem.value;
    if (obj.temp_point) {
      delete obj.temp_point;
    }
  });
});
Drupal.gmap.addHandler('overlayedit_markerclicktype', function (elem) {
  var obj = this;
  obj.vars.overlay_del_mode = elem.value;
  jQuery(elem).change(function () {
    obj.vars.overlay_del_mode = elem.value;
  });
});

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  // Add status bar
  var status = jQuery(elem).after('<div class="gmap-statusbar">Status</div>').next();
  obj.statusdiv = status[0];

  obj.bind('buildmacro', function (add) {
    var temp, i, q, tm, ct;

    var style_line = function (n) {
      if (!n.style.length) {
        return '';
      }
      var style = n.style.slice(0, 3);
      style[0] = '#' + style[0];
      return style.join('/') + ':';
    };
    var style_poly = function (n) {
      if (!n.style.length) {
        return '';
      }
      var style = n.style.slice();
      style[0] = '#' + style[0];
      style[3] = '#' + style[3];
      return style.join('/') + ':';
    };

    var feature_dump = function (n) {
      var f = n.overlay;
      var tmp = [];
      var i, ct, vtx;
      ct = f.getVertexCount();
      for (i = 0; i < ct; i++) {
        vtx = f.getVertex(i);
        tmp.push('' + vtx.lat() + ',' + vtx.lng());
      }
      return tmp.join(' + ');
    };

    if (obj._oe && obj._oe.features) {
      var polygons = [];
      var polylines = [];
      var circles = [];
      var markers = {};
      jQuery.each(obj._oe.features, function (i, n) {
        if (n.type) {
          switch (n.type) {
            case 'polyline':
              add.push('line=' + style_line(n) + feature_dump(n));
              break;
            case 'polygon':
              add.push('polygon=' + style_poly(n) + feature_dump(n));
              break;
            case 'point':
              if (!markers[n.marker]) {
                markers[n.marker] = [];
              }
              var pt = n.overlay.getLatLng();
              var ptxt = '';
              if (n.html) {
                ptxt = ':' + n.html;
              }
              markers[n.marker].push('' + pt.lat() + ',' + pt.lng() + ptxt);
              break;
            case 'circle':
              add.push('circle=' + style_poly(n) + n.center.lat() + ' , ' + n.center.lng() + ' + ' + n.radius / 1000);
              break;
          }
        }
      });
      jQuery.each(markers, function (i, n) {
        add.push('markers=' + i + '::' + n.join(' + '));
      });
    }
  });
});

Drupal.gmap.map.prototype.statusdiv = undefined;

Drupal.gmap.map.prototype.status = function (text) {
  var obj = this;
  if (obj.statusdiv) {
    jQuery(obj.statusdiv).html(text);
  }
};

// Extend markers to store type info.
GMarker.prototype.gmapMarkerData = function (data) {
  if (data) {
    this._gmapdata = data;
  }
  return this._gmapdata;
};

/************* Overlay edit widget ******************/
Drupal.gmap.addHandler('overlayedit', function (elem) {
  var obj = this;

  var binding = obj.bind('overlay_edit_mode', function () {
    // @@@
  });

  jQuery(elem).change(function () {
    obj.vars.overlay_next_icon = elem.value;
//    obj.vars.overlay_edit_mode = elem.value;
//    obj.change('overlay_edit_mode',binding);
  });

  obj.bind('init', function () {
    obj._oe = {};
    obj.vars.overlay_add_mode = 'Points'; //elem.value;
    obj.vars.overlay_del_mode = 'Remove';
    var edit_text_elem;

    if (obj.map) {
      obj._oe.features = [];
      obj._oe.featuresRef = {};
      obj._oe.editing = false;
      obj._oe.markerseq = {};
      GEvent.addListener(obj.map, 'click', function (overlay, point) {
        var ctx, s, p;
        if (overlay) {
          if (obj._oe.editing) {
            // Work around problem where double clicking to finish a poly fires a click event.
            obj._oe.editing = false;
          }
          else {
          }
        }
        else if (point && !obj._oe.editing) {
          obj._oe.editing = true;
          switch (obj.vars.overlay_add_mode) {
            case 'Points':
              var m = elem.value; // @@@ It's kinda silly to be binding the whole shebang to this dropdown..
              if (!obj._oe.markerseq.hasOwnProperty(m)) {
                obj._oe.markerseq[m] = -1;
              }
              obj._oe.markerseq[m] = obj._oe.markerseq[m] + 1;
              p = new GMarker(point, {icon: Drupal.gmap.getIcon(m, obj._oe.markerseq[m])});
              obj.map.addOverlay(p);
              ctx = {
                'type' : 'point',
                'marker' : m,
                'overlay' : p
              };
              var offset = obj._oe.features.push(ctx) - 1;
              obj._oe.editing = false;
              GEvent.addListener(p, "click", function () {
                switch (obj.vars.overlay_del_mode) {
                  case 'Remove':
                    obj._oe.markerseq[m] = obj._oe.markerseq[m] - 1;
                    ctx.type = 'deleted';
                    obj.map.removeOverlay(p);
                    ctx.overlay = null;
                    var tmpcnt = 0;
                    // Renumber markers in set.
                    jQuery.each(obj._oe.features, function (i, n) {
                      if (n.type && n.type === 'point' && n.marker === m) {
                        var pt = n.overlay.getLatLng();
                        n.overlay.setImage(Drupal.gmap.getIcon(n.marker, tmpcnt).image);
                        tmpcnt = tmpcnt + 1;
                      }
                    });
                    break;
                  case 'Edit info':
                    // @@@
                    break;
                }
                obj.change('mapedited', -1);
              });
              obj.change('mapedited', -1);
              break;

            case 'Lines':
              ctx = {
                'type' : 'polyline',
                'style' : [],
                'overlay' : null
              };
              s = obj.vars.styles.line_default;
              if (obj.vars.overlay_linestyle_apply) {
                ctx.style = obj.vars.styles.overlayline.slice();
                s = ctx.style;
              }
              p = new GPolyline([point], '#' + s[0], Number(s[1]), s[2] / 100);
              obj.map.addOverlay(p);
              ctx.overlay = p;
              obj._oe.featuresRef[p] = obj._oe.features.push(ctx) - 1;

              p.enableDrawing();
              p.enableEditing({onEvent: "mouseover"});
              p.disableEditing({onEvent: "mouseout"});
              GEvent.addListener(p, "endline", function () {
                //obj._oe.editing = false;
                GEvent.addListener(p, "lineupdated", function () {
                  obj.change('mapedited', -1);
                });
                GEvent.addListener(p, "click", function (latlng, index) {
                  if (typeof index === "number") {
                    // Delete vertex on click.
                    p.deleteVertex(index);
                  }
                  else {
                    var feature = obj._oe.features[obj._oe.featuresRef[p]];
                    feature.stroke = obj.vars.stroke; // @@@
                    p.setStrokeStyle(feature.stroke);
                  }
                });
                obj.change('mapedited', -1);
              });
              break;

            case 'GPolygon':
              ctx = {
                'type' : 'polygon',
                'style' : [],
                'overlay' : null
              };
              s = obj.vars.styles.poly_default;
              if (obj.vars.overlay_polystyle_apply) {
                ctx.style = obj.vars.styles.overlaypoly.slice();
                s = ctx.style;
              }
              p = new GPolygon([point], '#' + s[0], Number(s[1]), s[2] / 100, '#' + s[3], s[4] / 100);
              obj.map.addOverlay(p);
              ctx.overlay = p;
              obj._oe.featuresRef[p] = obj._oe.features.push(ctx) - 1;

              p.enableDrawing();
              p.enableEditing({onEvent: "mouseover"});
              p.disableEditing({onEvent: "mouseout"});
              GEvent.addListener(p, "endline", function () {
                //obj._oe.editing = false;
                GEvent.addListener(p, "lineupdated", function () {
                  obj.change('mapedited', -1);
                });
                GEvent.addListener(p, "click", function (latlng, index) {
                  if (typeof index === "number") {
                    p.deleteVertex(index);
                  }
                  else {
                    var feature = obj._oe.features[obj._oe.featuresRef[p]];
                    feature.stroke = obj.vars.stroke;
                    feature.fill = obj.vars.fill;
                    p.setStrokeStyle(feature.stroke);
                    p.setFillStyle(feature.fill); // @@@
                  }
                });
                obj.change('mapedited', -1);
              });
              break;

            case 'Circles':
              var temppoint = point;
              // @@@ Translate
              obj.status("Drawing circle. Click a point on the rim to place.");

              var handle = GEvent.addListener(obj.map, 'click', function (overlay, point) {
                if (point) {
                  var ctx = {
                    'type' : 'circle',
                    'center' : temppoint,
                    'radius' : null,
                    'style' : [],
                    'overlay' : null
                  };
                  var s = obj.vars.styles.poly_default;
                  if (obj.vars.overlay_polystyle_apply) {
                    ctx.style = obj.vars.styles.overlaypoly.slice();
                    s = ctx.style;
                  }
                  obj.status("Placed circle. Radius was " + temppoint.distanceFrom(point) / 1000 + " km.");
                  ctx.radius = temppoint.distanceFrom(point);
                  var p = new GPolygon(obj.poly.calcPolyPoints(ctx.center, ctx.radius, 32), '#' + s[0], Number(s[1]), s[2] / 100, '#' + s[3], s[4] / 100);
                  obj.map.addOverlay(p);
                  ctx.overlay = p;
                  obj._oe.featuresRef[p] = obj._oe.features.push(ctx) - 1;
                  GEvent.addListener(p, "click", function () {
                    switch (obj.vars.overlay_del_mode) {
                      case 'Remove':
                        ctx.type = 'deleted';
                        obj.map.removeOverlay(p);
                        ctx.overlay = null;
                        break;
                      case 'Edit info':
                        // @@@
                        break;
                    }
                    obj.change('mapedited', -1);
                  });
                }
                else {
                  // @@@ Uh, do cleanup I suppose..
                }
                obj._oe.editing = false;
                GEvent.removeListener(handle);
                obj.change('mapedited', -1);
              });
              break;
          }
        }
      });
    }
  });
});;

/**
 * @file
 * Address widget and GMap geocoder routines.
 */

/*global jQuery, Drupal, GClientGeocoder */

/**
 * Provide a shared geocoder.
 * Lazy initialize it so it's not resident until needed.
 */
Drupal.gmap.geocoder = function () {
  var theGeocoder;
  if (!theGeocoder) {
    theGeocoder = new GClientGeocoder();
  }
  return theGeocoder;
};

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  obj.bind('geocode_pan', function (addr) {
    Drupal.gmap.geocoder().getLatLng(addr, function (point) {
      if (point) {
        obj.vars.latitude = point.lat();
        obj.vars.longitude = point.lng();
        obj.change("move", -1);
      }
      else {
        // Error condition?
      }
    });
  });

  obj.bind('geocode_panzoom', function (addr) {
    Drupal.gmap.geocoder().getLocations(addr, function (response) {
      if (response && response.Status.code === 200) {
        var place = response.Placemark[0];
        obj.vars.latitude = place.Point.coordinates[1];
        obj.vars.longitude = place.Point.coordinates[0];

        // This is, of course, temporary.

        switch (place.AddressDetails.Accuracy) {
          case 1: // Country level
            obj.vars.zoom = 4;
            break;
          case 2: // Region (state, province, prefecture, etc.) level
            obj.vars.zoom = 6;
            break;
          case 3: // Sub-region (county, municipality, etc.) level
            obj.vars.zoom = 8;
            break;
          case 4: // Town (city, village) level accuracy. (Since 2.59)
          case 5: // Post code (zip code) level accuracy. (Since 2.59)
          case 6: // Street level accuracy. (Since 2.59)
          case 7: // Intersection level accuracy. (Since 2.59)
          case 8: // Address level accuracy. (Since 2.59)
            obj.vars.zoom = 12;
        }
        obj.change('move', -1);
      }
    });
  });

  obj.bind('preparemarker', function (marker) {
    if (marker.address && (!marker.latitude || !marker.longitude)) {
      Drupal.gmap.geocoder().getLatLng(marker.address, function (point) {
        if (point) {
          marker.latitude = point.lat();
          marker.longitude = point.lng();
        }
      });
    }
  });

});

////////////////////////////////////////
//         Address widget             //
////////////////////////////////////////
Drupal.gmap.addHandler('address', function (elem) {
  var obj = this;

  // Respond to focus event.
  jQuery(elem).focus(function () {
    this.value = '';
  });

  // Respond to incoming movements.
  // Clear the box when the coords change...
  var binding = obj.bind("move", function () {
    elem.value = 'Enter an address';
  });
  // Send out outgoing movements.
  // This happens ASYNC!!!
  jQuery(elem).change(function () {
    if (elem.value.length > 0) {
      Drupal.gmap.geocoder().getLatLng(elem.value, function (point) {
        if (point) {
          obj.vars.latitude = point.lat();
          obj.vars.longitude = point.lng();
          obj.change("move", binding);
        }
        else {
          // Todo: Get translated value using settings.
          elem.value = 'Geocoder error: Address not found';
        }
      });
    }
    else {
      // Was empty. Ignore.
      elem.value = 'Enter an address';
    }
  });
});


////////////////////////////////////////
//  Locpick address handler (testing) //
////////////////////////////////////////
Drupal.gmap.addHandler('locpick_address', function (elem) {
  var obj = this;

  // Respond to focus event.
  jQuery(elem).focus(function () {
    this.value = '';
  });

  // Respond to incoming movements.
  // Clear the box when the coords change...
  var binding = obj.bind("locpickchange", function () {
    elem.value = 'Enter an address';
  });
  // Send out outgoing movements.
  // This happens ASYNC!!!
  jQuery(elem).change(function () {
    if (elem.value.length > 0) {
      Drupal.gmap.geocoder().getLatLng(elem.value, function (point) {
        if (point) {
          obj.locpick_coord = point;
          obj.change("locpickchange", binding);
        }
        else {
          // Todo: Get translated value using settings.
          elem.value = 'Geocoder error: Address not found';
        }
      });
    }
    else {
      // Was empty. Ignore.
      elem.value = 'Enter an address';
    }
  });
});
;

/**
 * @file
 * Alignment widget.
 * Applies CSS classes to a macro.
 */

/*global jQuery, Drupal */
(function ($) {
Drupal.gmap.addHandler('align', function (elem) {
  var obj = this;
  // Respond to incoming alignment changes.
  var binding = obj.bind("alignchange", function () {
    elem.value = obj.vars.align;
  });
  // Send out outgoing alignment changes.
  $(elem).change(function () {
    obj.vars.align = elem.value;
    obj.change("alignchange", binding);
  });
});

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;
  // Respond to incoming alignment changes.
  obj.bind("alignchange", function () {
    var cont = obj.map.getContainer();
    $(cont)
      .removeClass('gmap-left')
      .removeClass('gmap-center')
      .removeClass('gmap-right');
    if (obj.vars.align === 'Left') {
      $(cont).addClass('gmap-left');
    }
    if (obj.vars.align === 'Center') {
      $(cont).addClass('gmap-center');
    }
    if (obj.vars.align === 'Right') {
      $(cont).addClass('gmap-right');
    }
  });
  // Send out outgoing alignment changes.
  // N/A

  obj.bind('buildmacro', function (add) {
    if (obj.vars.align && obj.vars.align !== 'None') {
      add.push('align=' + obj.vars.align);
    }
  });
});
})(jQuery);;

/**
 * @file
 * GMap macro widget and macro compiler.
 */

/*global Drupal */

/**
 * Widget handler.
 */
Drupal.gmap.addHandler('macrotext', function (elem) {
  var obj = this;
  obj.macrostorage = {};

  obj.bind("widthchange", function (w) {
    obj.macrostorage.width = w;
  });
  obj.bind("heightchange", function (h) {
    obj.macrostorage.height = h;
  });

  // Basic macros.
  obj.bind('buildmacro', function (add) {
    add.push('zoom=' + obj.vars.zoom);
    add.push('center=' + obj.vars.latitude + ',' + obj.vars.longitude);
    add.push('width=' + obj.macrostorage.width);
    add.push('height=' + obj.macrostorage.height);
    if (obj.vars.macro_mapid && obj.vars.macro_mapid !== '') {
      add.push('id=' + obj.vars.macro_mapid);
    }
    add.push('control=' + obj.vars.controltype);
    // @@@ Use maptype instead, accept old and new.
    add.push('type=' + obj.vars.maptype);
  });


  // Update macro every time something happens.
  obj.bind('all', function (name) {
    if (name !== 'buildmacro') {
      var add = [];
      // Collect macro pieces.
      obj.change('buildmacro', -1, add);
      elem.value = '[gmap ' + add.join(' |') + ']';
    }
  });
});

/**
 * Extensible macros @@@
 */
Drupal.gmap.map.prototype.parse = function (m) {
  // Trim off outside tag
  if (m.substr(0, 5) === '[gmap') {
    m = m.slice(6, -1);
  }
};
;

/**
 * @file
 * Map ID widget for macro form.
 */

/*global jQuery, Drupal */

Drupal.gmap.addHandler('mapid', function (elem) {
  var obj = this;
  // Respond to incoming map id changes.
  var binding = obj.bind("idchange", function () {
    elem.value = obj.vars.macro_mapid;
  });
  // Send out outgoing map id changes.
  jQuery(elem).change(function () {
    obj.vars.macro_mapid = elem.value;
    obj.change("idchange", binding);
  });
});
;

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
