Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Ett AJAX HTTP-fel intr\u00e4ffade","HTTP Result Code: !status":"Resultatkod f\u00f6r HTTP: !status","An AJAX HTTP request terminated abnormally.":"Ett AJAX HTTP-anrop avslutades ov\u00e4ntat.","Debugging information follows.":"Fels\u00f6kningsinformation f\u00f6ljer.","Path: !uri":"S\u00f6kv\u00e4g: !uri","StatusText: !statusText":"Statustext: !statusText","ResponseText: !responseText":"Svarstext: !responseText","ReadyState: !readyState":"Tillst\u00e5nd: !readyState","Cancel":"Avbryt","Disabled":"Ej aktiverad","Enabled":"Aktiverad","Edit":"Redigera","none":"ingen","Add":"L\u00e4gg till","Configure":"Konfigurera","Done":"F\u00e4rdig","OK":"OK","Show":"Visa","Select all rows in this table":"Markera alla rader i tabellen","Deselect all rows in this table":"Avmarkera alla rader i tabellen","Not published":"Inte publicerad","Please wait...":"V\u00e4nligen v\u00e4nta...","Hide":"D\u00f6lj","Loading":"Laddar","Not enabled":"Ej aktiverat","Not in book":"Ej i bok","New book":"Ny bok","By @name on @date":"Av @name @date","By @name":"Av @name","Not in menu":"Ej i meny","Alias: @alias":"Alias: @alias","No alias":"Inga alias","New revision":"Ny version","Drag to re-order":"Drag f\u00f6r att ordna om","Changes made in this table will not be saved until the form is submitted.":"\u00c4ndringar som g\u00f6rs i denna tabell sparas inte f\u00f6rr\u00e4n formul\u00e4ret skickas.","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"\u00c4ndringarna i dessa block kommer inte att sparas f\u00f6rr\u00e4n knappen \u003Cem\u003ESpara block\u003C\/em\u003E klickas p\u00e5.","Show shortcuts":"Visa genv\u00e4gar","This permission is inherited from the authenticated user role.":"Denna beh\u00f6righet \u00e4rvs fr\u00e5n rollen verifierad anv\u00e4ndare.","No revision":"Inga versioner","@number comments per page":"@number kommentarer per sida","Requires a title":"Kr\u00e4ver en titel","Not restricted":"Ej begr\u00e4nsad","(active tab)":"(aktiv flik)","Not customizable":"Ej anpassningsbart","Restricted to certain pages":"Begr\u00e4nsad till vissa sidor","The block cannot be placed in this region.":"Blocket kan inte placeras i denna region.","Customize dashboard":"Anpassa \u00f6versiktspanel","Hide summary":"D\u00f6lj sammanfattning","Edit summary":"Redigera sammanfattning","Don\u0027t display post information":"Visa inte information om inl\u00e4gg","@title dialog":"Dialog @title","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Den valda filen %filename kan inte laddas upp. Endast filer med f\u00f6ljande \u00e4ndelser \u00e4r till\u00e5tna: %extensions.","Re-order rows by numerical weight instead of dragging.":"Sortera om rader efter numerisk vikt ist\u00e4llet f\u00f6r drag-och-sl\u00e4pp.","Show row weights":"Visa radernas vikt","Hide row weights":"D\u00f6lj radernas vikt","Autocomplete popup":"Popup med automatisk komplettering","Searching for matches...":"S\u00f6ker efter tr\u00e4ffar...","Hide shortcuts":"D\u00f6lj genv\u00e4gar"}} };;

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function($){
Drupal.behaviors.contextReactionBlock = {attach: function(context) {
  $('form.context-editor:not(.context-block-processed)')
    .addClass('context-block-processed')
    .each(function() {
      var id = $(this).attr('id');
      Drupal.contextBlockEditor = Drupal.contextBlockEditor || {};
      $(this).bind('init.pageEditor', function(event) {
        Drupal.contextBlockEditor[id] = new DrupalContextBlockEditor($(this));
      });
      $(this).bind('start.pageEditor', function(event, context) {
        // Fallback to first context if param is empty.
        if (!context) {
          context = $(this).data('defaultContext');
        }
        Drupal.contextBlockEditor[id].editStart($(this), context);
      });
      $(this).bind('end.pageEditor', function(event) {
        Drupal.contextBlockEditor[id].editFinish();
      });
    });

  //
  // Admin Form =======================================================
  //
  // ContextBlockForm: Init.
  $('#context-blockform:not(.processed)').each(function() {
    $(this).addClass('processed');
    Drupal.contextBlockForm = new DrupalContextBlockForm($(this));
    Drupal.contextBlockForm.setState();
  });

  // ContextBlockForm: Attach block removal handlers.
  // Lives in behaviors as it may be required for attachment to new DOM elements.
  $('#context-blockform a.remove:not(.processed)').each(function() {
    $(this).addClass('processed');
    $(this).click(function() {
      $(this).parents('tr').eq(0).remove();
      Drupal.contextBlockForm.setState();
      return false;
    });
  });
}};

/**
 * Context block form. Default form for editing context block reactions.
 */
DrupalContextBlockForm = function(blockForm) {
  this.state = {};

  this.setState = function() {
    $('table.context-blockform-region', blockForm).each(function() {
      var region = $(this).attr('id').split('context-blockform-region-')[1];
      var blocks = [];
      $('tr', $(this)).each(function() {
        var bid = $(this).attr('id');
        var weight = $(this).find('select').val();
        blocks.push({'bid' : bid, 'weight' : weight});
      });
      Drupal.contextBlockForm.state[region] = blocks;
    });

    // Serialize here and set form element value.
    $('form input.context-blockform-state').val(JSON.stringify(this.state));

    // Hide enabled blocks from selector that are used
    $('table.context-blockform-region tr').each(function() {
      var bid = $(this).attr('id');
      $('div.context-blockform-selector input[value='+bid+']').parents('div.form-item').eq(0).hide();
    });
    // Show blocks in selector that are unused
    $('div.context-blockform-selector input').each(function() {
      var bid = $(this).val();
      if ($('table.context-blockform-region tr#'+bid).size() === 0) {
        $(this).parents('div.form-item').eq(0).show();
      }
    });
  };

  // make sure we update the state right before submits, this takes care of an
  // apparent race condition between saving the state and the weights getting set
  // by tabledrag
  $('#ctools-export-ui-edit-item-form').submit(function() { Drupal.contextBlockForm.setState(); });

  // Tabledrag
  // Add additional handlers to update our blocks.
  $.each(Drupal.settings.tableDrag, function(base) {
    var table = $('#' + base + ':not(.processed)', blockForm);
    if (table && table.is('.context-blockform-region')) {
      table.addClass('processed');
      table.bind('mouseup', function(event) {
        Drupal.contextBlockForm.setState();
        return;
      });
    }
  });

  // Add blocks to a region
  $('td.blocks a', blockForm).each(function() {
    $(this).click(function() {
      var region = $(this).attr('href').split('#')[1];
      var selected = $("div.context-blockform-selector input:checked");
      if (selected.size() > 0) {
        selected.each(function() {
          // create new block markup
          var block = document.createElement('tr');
          var text = $(this).parents('div.form-item').eq(0).hide().children('label').text();
          var select = '<div class="form-item form-type-select"><select class="tabledrag-hide form-select">';
          var i;
          for (i = -10; i < 10; ++i) {
            select += '<option>' + i + '</option>';
          }
          select += '</select></div>';
          $(block).attr('id', $(this).attr('value')).addClass('draggable');
          $(block).html("<td>"+ text + "</td><td>" + select + "</td><td><a href='' class='remove'>X</a></td>");

          // add block item to region
          var base = "context-blockform-region-"+ region;
          Drupal.tableDrag[base].makeDraggable(block);
          $('table#'+base).append(block);
          if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
            $('table#'+base).find('.tabledrag-hide').css('display', '');
            $('table#'+base).find('.tabledrag-handle').css('display', 'none');
          }
          else {
            $('table#'+base).find('.tabledrag-hide').css('display', 'none');
            $('table#'+base).find('.tabledrag-handle').css('display', '');
          }
          Drupal.attachBehaviors($('table#'+base));

          Drupal.contextBlockForm.setState();
          $(this).removeAttr('checked');
        });
      }
      return false;
    });
  });
};

/**
 * Context block editor. AHAH editor for live block reaction editing.
 */
DrupalContextBlockEditor = function(editor) {
  this.editor = editor;
  this.state = {};
  this.blocks = {};
  this.regions = {};

  // Category selector handler.
  // Also set to "Choose a category" option as browsers can retain
  // form values from previous page load.
  $('select.context-block-browser-categories', editor).change(function() {
    var category = $(this).val();
    var params = {
      containment: 'document',
      revert: true,
      dropOnEmpty: true,
      placeholder: 'draggable-placeholder',
      forcePlaceholderSize: true,
      helper: 'clone',
      appendTo: 'body',
      connectWith: ($.ui.version === '1.6') ? ['.ui-sortable'] : '.ui-sortable'
    };
    $('div.category', editor).hide().sortable('destroy');
    $('div.category-'+category, editor).show().sortable(params);
  });
  $('select.context-block-browser-categories', editor).val(0).change();

  return this;
};

DrupalContextBlockEditor.prototype.initBlocks = function(blocks) {
  var self = this;
  this.blocks = blocks;
  blocks.each(function() {
    if($(this).hasClass('context-block-empty')) {
      $(this).removeClass('context-block-hidden');
    }
    $(this).addClass('draggable');
    $(this).prepend($('<a class="context-block-handle"></a>'));
    $(this).prepend($('<a class="context-block-remove"></a>').click(function() {
      $(this).parent ('.block').eq(0).fadeOut('medium', function() {
        $(this).remove();
        self.updateBlocks();
      });
      return false;
    }));
  });
};

DrupalContextBlockEditor.prototype.initRegions = function(regions) {
  this.regions = regions;
};

/**
  * Update UI to match the current block states.
  */
DrupalContextBlockEditor.prototype.updateBlocks = function() {
  var browser = $('div.context-block-browser');

  // For all enabled blocks, mark corresponding addables as having been added.
  $('.block, .admin-block').each(function() {
    var bid = $(this).attr('id').split('block-')[1]; // Ugh.
    $('#context-block-addable-'+bid, browser).draggable('disable').addClass('context-block-added').removeClass('context-block-addable');
  });
  // For all hidden addables with no corresponding blocks, mark as addable.
  $('.context-block-item', browser).each(function() {
    var bid = $(this).attr('id').split('context-block-addable-')[1];
    if ($('#block-'+bid).size() === 0) {
      $(this).draggable('enable').removeClass('context-block-added').addClass('context-block-addable');
    }
  });

  // Mark empty regions.
  $(this.regions).each(function() {
    if ($('.block:has(a.context-block)', this).size() > 0) {
      $(this).removeClass('context-block-region-empty');
    }
    else {
      $(this).addClass('context-block-region-empty');
    }
  });
};

/**
  * Live update a region.
  */
DrupalContextBlockEditor.prototype.updateRegion = function(event, ui, region, op) {
  switch (op) {
    case 'over':
      $(region).removeClass('context-block-region-empty');
      break;
    case 'out':
      if (
        // jQuery UI 1.8
        $('.draggable-placeholder', region).size() === 1 &&
        $('.block:has(a.context-block)', region).size() == 0
        // jQuery UI 1.6
        // $('div.draggable-placeholder', region).size() === 0 &&
        // $('div.block:has(a.context-block)', region).size() == 1 &&
        // $('div.block:has(a.context-block)', region).attr('id') == ui.item.attr('id')
      ) {
        $(region).addClass('context-block-region-empty');
      }
      break;
  }
};

/**
  * Remove script elements while dragging & dropping.
  */
DrupalContextBlockEditor.prototype.scriptFix = function(event, ui, editor, context) {
  if ($('script', ui.item)) {
    var placeholder = $(Drupal.settings.contextBlockEditor.scriptPlaceholder);
    var label = $('div.handle label', ui.item).text();
    placeholder.children('strong').html(label);
    $('script', ui.item).parent().empty().append(placeholder);
  }
};

/**
  * Add a block to a region through an AHAH load of the block contents.
  */
DrupalContextBlockEditor.prototype.addBlock = function(event, ui, editor, context) {
  var self = this;
  if (ui.item.is('.context-block-addable')) {
    var bid = ui.item.attr('id').split('context-block-addable-')[1];

    // Construct query params for our AJAX block request.
    var params = Drupal.settings.contextBlockEditor.params;
    params.context_block = bid + ',' + context;

    // Replace item with loading block.
    var blockLoading = $('<div class="context-block-item context-block-loading"><span class="icon"></span></div>');
    ui.item.addClass('context-block-added');
    ui.item.after(blockLoading);
    ui.sender.append(ui.item);

    $.getJSON(Drupal.settings.contextBlockEditor.path, params, function(data) {
      if (data.status) {
        var newBlock = $(data.block);
        if ($('script', newBlock)) {
          $('script', newBlock).remove();
        }
        blockLoading.fadeOut(function() {
          $(this).replaceWith(newBlock);
          self.initBlocks(newBlock);
          self.updateBlocks();
          Drupal.attachBehaviors();
        });
      }
      else {
        blockLoading.fadeOut(function() { $(this).remove(); });
      }
    });
  }
  else if (ui.item.is(':has(a.context-block)')) {
    self.updateBlocks();
  }
};

/**
  * Update form hidden field with JSON representation of current block visibility states.
  */
DrupalContextBlockEditor.prototype.setState = function() {
  var self = this;

  $(this.regions).each(function() {
    var region = $('a.context-block-region', this).attr('id').split('context-block-region-')[1];
    var blocks = [];
    $('a.context-block', $(this)).each(function() {
      if ($(this).attr('class').indexOf('edit-') != -1) {
        var bid = $(this).attr('id').split('context-block-')[1];
        var context = $(this).attr('class').split('edit-')[1].split(' ')[0];
        context = context ? context : 0;
        var block = {'bid': bid, 'context': context};
        blocks.push(block);
      }
    });
    self.state[region] = blocks;
  });

  // Serialize here and set form element value.
  $('input.context-block-editor-state', this.editor).val(JSON.stringify(this.state));
};

/**
  * Disable text selection.
  */
DrupalContextBlockEditor.prototype.disableTextSelect = function() {
  if ($.browser.safari) {
    $('.block:has(a.context-block):not(:has(input,textarea))').css('WebkitUserSelect','none');
  }
  else if ($.browser.mozilla) {
    $('.block:has(a.context-block):not(:has(input,textarea))').css('MozUserSelect','none');
  }
  else if ($.browser.msie) {
    $('.block:has(a.context-block):not(:has(input,textarea))').bind('selectstart.contextBlockEditor', function() { return false; });
  }
  else {
    $(this).bind('mousedown.contextBlockEditor', function() { return false; });
  }
};

/**
  * Enable text selection.
  */
DrupalContextBlockEditor.prototype.enableTextSelect = function() {
  if ($.browser.safari) {
    $('*').css('WebkitUserSelect','');
  }
  else if ($.browser.mozilla) {
    $('*').css('MozUserSelect','');
  }
  else if ($.browser.msie) {
    $('*').unbind('selectstart.contextBlockEditor');
  }
  else {
    $(this).unbind('mousedown.contextBlockEditor');
  }
};

/**
  * Start editing. Attach handlers, begin draggable/sortables.
  */
DrupalContextBlockEditor.prototype.editStart = function(editor, context) {
  var self = this;

  // This is redundant to the start handler found in context_ui.js.
  // However it's necessary that we trigger this class addition before
  // we call .sortable() as the empty regions need to be visible.
  $(document.body).addClass('context-editing');
  this.editor.addClass('context-editing');

  this.disableTextSelect();
  this.initBlocks($('.block:has(a.context-block.edit-'+context+')'));
  this.initRegions($('a.context-block-region').parent());
  this.updateBlocks();

  // First pass, enable sortables on all regions.
  $(this.regions).each(function() {
    var region = $(this);
    var params = {
      containment: 'document',
      revert: true,
      dropOnEmpty: true,
      placeholder: 'draggable-placeholder',
      forcePlaceholderSize: true,
      items: '> .block:has(a.context-block.editable)',
      handle: 'a.context-block-handle',
      start: function(event, ui) { self.scriptFix(event, ui, editor, context); },
      stop: function(event, ui) { self.addBlock(event, ui, editor, context); },
      receive: function(event, ui) { self.addBlock(event, ui, editor, context); },
      over: function(event, ui) { self.updateRegion(event, ui, region, 'over'); },
      out: function(event, ui) { self.updateRegion(event, ui, region, 'out'); }
    };
    region.sortable(params);
  });

  // Second pass, hook up all regions via connectWith to each other.
  $(this.regions).each(function() {
    $(this).sortable('option', 'connectWith', ['.ui-sortable']);
  });

  // Terrible, terrible workaround for parentoffset issue in Safari.
  // The proper fix for this issue has been committed to jQuery UI, but was
  // not included in the 1.6 release. Therefore, we do a browser agent hack
  // to ensure that Safari users are covered by the offset fix found here:
  // http://dev.jqueryui.com/changeset/2073.
  if ($.ui.version === '1.6' && $.browser.safari) {
    $.browser.mozilla = true;
  }
};

/**
  * Finish editing. Remove handlers.
  */
DrupalContextBlockEditor.prototype.editFinish = function() {
  this.editor.removeClass('context-editing');
  this.enableTextSelect();

  // Remove UI elements.
  $(this.blocks).each(function() {
    $('a.context-block-handle, a.context-block-remove', this).remove();
    if($(this).hasClass('context-block-empty')) {
      $(this).addClass('context-block-hidden');
    }
    $(this).removeClass('draggable');
  });
  this.regions.sortable('destroy');

  this.setState();

  // Unhack the user agent.
  if ($.ui.version === '1.6' && $.browser.safari) {
    $.browser.mozilla = false;
  }
};

})(jQuery);
;
function GScript(src) {document.write('<' + 'script src="' + src + '"' +' type="text/javascript"><' + '/script>');}function GBrowserIsCompatible() {return !!document.getElementById;}function GApiInit() {if (GApiInit.called) return;GApiInit.called = true;window.GAddMessages && GAddMessages({160: '\x3cH1\x3eServer Error\x3c/H1\x3eThe server encountered a temporary error and could not complete your request.\x3cp\x3ePlease try again in a minute or so.\x3c/p\x3e',1415: '.',1416: ',',1547: 'mi',1616: 'km',4100: 'm',4101: 'ft',10018: 'Loading...',10021: 'Zoom In',10022: 'Zoom Out',10024: 'Drag to zoom',10029: 'Return to the last result',10049: 'Map',10050: 'Satellite',10093: 'Terms of Use',10111: 'Map',10112: 'Sat',10116: 'Hybrid',10117: 'Hyb',10120: 'We are sorry, but we don\x27t have maps at this zoom level for this region.\x3cp\x3eTry zooming out for a broader look.\x3c/p\x3e',10121: 'We are sorry, but we don\x27t have imagery at this zoom level for this region.\x3cp\x3eTry zooming out for a broader look.\x3c/p\x3e',10507: 'Pan left',10508: 'Pan right',10509: 'Pan up',10510: 'Pan down',10511: 'Show street map',10512: 'Show satellite imagery',10513: 'Show imagery with street names',10806: 'Click to see this area on Google Maps',10807: 'Traffic',10808: 'Show Traffic',10809: 'Hide Traffic',12150: '%1$s on %2$s',12151: '%1$s on %2$s at %3$s',12152: '%1$s on %2$s between %3$s and %4$s',10985: 'Zoom in',10986: 'Zoom out',11047: 'Center map here',11089: '\x3ca href\x3d\x22javascript:void(0);\x22\x3eZoom In\x3c/a\x3e to see traffic for this region',11259: 'Full-screen',11751: 'Show street map with terrain',11752: 'Style:',11757: 'Change map style',11758: 'Terrain',11759: 'Ter',11794: 'Show labels',11303: 'Street View Help',11274: 'To use street view, you need Adobe Flash Player version %1$d or newer.',11382: 'Get the latest Flash Player.',11314: 'We\x27re sorry, street view is currently unavailable due to high demand.\x3cbr\x3ePlease try again later!',1559: 'N',1560: 'S',1561: 'W',1562: 'E',1608: 'NW',1591: 'NE',1605: 'SW',1606: 'SE',11907: 'This image is no longer available',10041: 'Help',12471: 'Current Location',12492: 'Earth',12823: 'Google has disabled usage of the Maps API for this application. See the Terms of Service for more information: %1$s.',12822: 'http://code.google.com/apis/maps/terms.html',12915: 'Improve the map',12916: 'Google, Europa Technologies',13171: 'Hybrid 3D',0: ''});}var GLoad;(function() {GLoad = function(apiCallback) {var callee = arguments.callee;GApiInit();var opts = {export_legacy_names:true,tile_override:[{maptype:0,min_zoom:"7",max_zoom:"7",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1293600000}},{lo:{lat_e7:366500000,lng_e7:1297000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:0,min_zoom:"8",max_zoom:"8",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:345000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:354690000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:0,min_zoom:"9",max_zoom:"9",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:340000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:348900000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1302000000}},{lo:{lat_e7:368300000,lng_e7:1302000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:0,min_zoom:"10",max_zoom:"19",rect:[{lo:{lat_e7:329890840,lng_e7:1246055600},hi:{lat_e7:386930130,lng_e7:1284960940}},{lo:{lat_e7:344646740,lng_e7:1284960940},hi:{lat_e7:386930130,lng_e7:1288476560}},{lo:{lat_e7:350277470,lng_e7:1288476560},hi:{lat_e7:386930130,lng_e7:1310531620}},{lo:{lat_e7:370277730,lng_e7:1310531620},hi:{lat_e7:386930130,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"7",max_zoom:"7",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1293600000}},{lo:{lat_e7:366500000,lng_e7:1297000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"8",max_zoom:"8",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:345000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:354690000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"9",max_zoom:"9",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:340000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:348900000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1302000000}},{lo:{lat_e7:368300000,lng_e7:1302000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"10",rect:[{lo:{lat_e7:329890840,lng_e7:1246055600},hi:{lat_e7:386930130,lng_e7:1284960940}},{lo:{lat_e7:344646740,lng_e7:1284960940},hi:{lat_e7:386930130,lng_e7:1288476560}},{lo:{lat_e7:350277470,lng_e7:1288476560},hi:{lat_e7:386930130,lng_e7:1310531620}},{lo:{lat_e7:370277730,lng_e7:1310531620},hi:{lat_e7:386930130,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]}],jsmain:"http://maps.gstatic.com/intl/en_ALL/mapfiles/400d/maps2.api/main.js",obliques_urls:["http://khm0.googleapis.com/kh?v=64\x26src=app\x26","http://khm1.googleapis.com/kh?v=64\x26src=app\x26"],token:"3442658515",jsmodule_base_url:"http://maps.gstatic.com/intl/en_ALL/mapfiles/400d/maps2.api",generic_tile_urls:["http://mt0.googleapis.com/vt?hl=en\x26src=api\x26","http://mt1.googleapis.com/vt?hl=en\x26src=api\x26"],ignore_auth:false,sv_host:"http://cbk0.google.com"};apiCallback(["http://mt0.googleapis.com/vt/lyrs\x3dm@196000000\x26hl\x3den\x26src\x3dapi\x26","http://mt1.googleapis.com/vt/lyrs\x3dm@196000000\x26hl\x3den\x26src\x3dapi\x26"], ["http://khm0.googleapis.com/kh/v\x3d119\x26src\x3dapp\x26","http://khm1.googleapis.com/kh/v\x3d119\x26src\x3dapp\x26"], ["http://mt0.googleapis.com/vt/lyrs\x3dh@196000000\x26hl\x3den\x26src\x3dapi\x26","http://mt1.googleapis.com/vt/lyrs\x3dh@196000000\x26hl\x3den\x26src\x3dapi\x26"],""  ,""  ,""  ,true,"google.maps.",opts,["http://mt0.googleapis.com/vt/lyrs\x3dt@129,r@196000000\x26hl\x3den\x26src\x3dapi\x26","http://mt1.googleapis.com/vt/lyrs\x3dt@129,r@196000000\x26hl\x3den\x26src\x3dapi\x26"]);if (!callee.called) {callee.called = true;}}})();function GUnload() {if (window.GUnloadApi) {GUnloadApi();}}var _mIsRtl = false;var _mHost = "http://maps.google.com";var _mUri = "/maps";var _mDomain = "google.com";var _mStaticPath = "http://maps.gstatic.com/intl/en_ALL/mapfiles/";var _mJavascriptVersion = G_API_VERSION = "400d";var _mTermsUrl = "http://www.google.com/intl/en_ALL/help/terms_maps.html";var _mLocalSearchUrl = "http://www.google.com/uds/solutions/localsearch/gmlocalsearch.js";var _mHL = "en";var _mGL = "";var _mTrafficEnableApi = true;var _mTrafficTileServerUrls = ["http://mt0.google.com/mapstt","http://mt1.google.com/mapstt","http://mt2.google.com/mapstt","http://mt3.google.com/mapstt"];var _mCityblockLatestFlashUrl = "http://maps.google.com/local_url?dq=&amp;q=http://www.adobe.com/shockwave/download/download.cgi%3FP1_Prod_Version%3DShockwaveFlash&amp;s=ANYYN7manSNIV_th6k0SFvGB4jz36is1Gg";var _mCityblockFrogLogUsage = false;var _mCityblockInfowindowLogUsage = false;var _mCityblockUseSsl = false;var _mSatelliteToken = "fzwq2hLEGuLM3FcdwONQuK0HQwGKNPUlEFnzvQ";var _mMapCopy = "Map data \x26#169;2012 ";var _mSatelliteCopy = "Imagery \x26#169;2012 ";var _mGoogleCopy = "\x26#169;2012 Google";var _mPreferMetric = false;var _mDirectionsEnableApi = true;var _mLayersTileBaseUrls = ['http://mt0.google.com/mapslt','http://mt1.google.com/mapslt','http://mt2.google.com/mapslt','http://mt3.google.com/mapslt'];var _mLayersFeaturesBaseUrl = "http://mt0.google.com/vt/ft";function GLoadMapsScript() {if (!GLoadMapsScript.called && GBrowserIsCompatible()) {GLoadMapsScript.called = true;GScript("http://maps.gstatic.com/intl/en_ALL/mapfiles/400d/maps2.api/main.js");}}(function() {if (!window.google) window.google = {};if (!window.google.maps) window.google.maps = {};var ns = window.google.maps;ns.BrowserIsCompatible = GBrowserIsCompatible;ns.Unload = GUnload;})();GLoadMapsScript();;
// GMap marker image data.
Drupal.gmap = Drupal.gmap || {};
Drupal.gmap.iconpath = "\/drupal\/chooseit\/sites\/all\/modules\/chooseit\/gmap\/markers";
Drupal.gmap.icondata = {"\/small\/":{"f":["shadow.png","red.png","bred.png","orange.png","pyellow.png","yellow.png","pgreen.png","green.png","dgreen.png","fgreen.png","pblue.png","lblue.png","blue.png","dblue.png","purple.png","pink.png","bpink.png","brown.png","white.png","lgray.png","gray.png","black.png","altblue.png","altred.png"],"w":[22,12],"h":[20],"i":[[[["defaults","small red","small bred","small orange","small pyellow","small yellow","small pgreen","small green","small dgreen","small fgreen","small pblue","small lblue","small blue","small dblue","small purple","small pink","small bpink","small brown","small white","small lgray","small gray","small black","alt small blue","alt small red"],["","Small Red","Small Bright red","Small Orange","Small Pale Yellow","Small Yellow","Small Pale Green","Small Green","Small Dark Green","Small Flouro Green","Small Pale Blue","Small Light Blue","Small Blue","Small Dark Blue","Small Purple","Small Pink","Small Bright Pink","Small Brown","Small White","Small Light Gray","Small Gray","Small Black","Small Blue (Alternate)","Small Red (Alternate)"],[[],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23]],[7,0],[19,0],[10,0],[2,0],[0]],[[],[],[],[],[],[],[],[],[],[],[],[]]]]},"\/flat\/":{"f":["x.png"],"w":[16],"h":[16],"i":[[[["defaults","treasure"],["","X marks the spot"],[[],[0]],[8,0],[8,0],[8,0],[8,0]],[[],[],[],[],[],[],[],[],[],[],[],[]]]]},"\/big\/":{"f":["shadow.png","blue.png","red.png"],"w":[56,30],"h":[51],"i":[[[["defaults","big blue","big red"],["","Big Blue","Big Red"],[[],[1],[2]],[16,0],[51,0],[24,0],[4,0],[0]],[[],[],[],[],[],[],[],[],[],[],[],[]]]]},"\/":{"f":["blue.png","gray.png","green.png","lblue.png","orange.png","pink.png","purple.png","white.png","yellow.png","marker_sunday.png","marker_monday.png","marker_tuesday.png","marker_wednesday.png","marker_thursday.png","marker_friday.png","marker_saturday.png","letter1.png","letter2.png","letter3.png","letter4.png","letter5.png","letter6.png","letter7.png","letter8.png","letter9.png","letter10.png","blank.png","cluster.png","drupal.png","vertex.png","number1.png","number2.png","number3.png","number4.png","number5.png","number6.png","number7.png","number8.png","number9.png","number10.png","number11.png","number12.png","number13.png","number14.png","number15.png","number16.png","number17.png","number18.png","number19.png","number20.png","number21.png","number22.png","number23.png","number24.png","number25.png","number26.png","route1.png","route2.png"],"w":[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,8,20],"h":[34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,8,34],"i":[[[["defaults","blue","gray","green","lblue","orange","pink","purple","white","yellow"],["","Blue","Gray","Green","Light Blue","Orange","Pink","Purple","White","Yellow"],[[],[0],[1],[2],[3],[4],[5],[6],[7],[8]],[10,0],[29,0],[17,0],[3,0]],[[],[],[],[],[],[],[],[],[],[],[],[]]],[[["defaults","sunday","monday","tuesday","wednesday","thursday","friday","saturday","week"],["","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Week"],[[],[9],[10],[11],[12],[13],[14],[15],[9,10,11,12,13,14,15]],[10,0],[29,0],[17,0],[3,0]],[[],[],[],[],[],[],[],[],[],[],[],[]]],[[["defaults","letters"],["","Letters"],[[],[16,17,18,19,20,21,22,23,24,25]],[10,0],[29,0],[17,0],[6,0]],[[],[],[],[],[],[],[],[],[],[],[],[]]],[[["defaults","blank","cluster","drupal","vertex"],["","Blank","Cluster","Drupal","Line Vertex"],[[],[26],[27],[28],[29]],[10,0,0,0,4],[29,0,0,0,4],[17,0,0,0,4],[6,0,0,0,4]],[[],[],[],[],[],[],[],[],[],[],[],[]]],[[["defaults","numbers"],["","Numbers"],[[],[30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]],[10,0],[29,0],[17,0],[6,0]],[[],[],[],[],[],[],[],[],[],[],[],[]]],[[["defaults","route"],["","Route"],[[],[56,57]],[10,0],[29,0],[17,0],[6,0]],[[],[],[],[],[],[],[],[],[],[],[],[]]]]}};
;

/**
 * @file
 * GMap Markers
 * GMap API version -- No manager
 */

/*global Drupal, GMarker */

// Replace to override marker creation
Drupal.gmap.factory.marker = function (loc, opts) {
  return new GMarker(loc, opts);
};

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  obj.bind('addmarker', function (marker) {
    obj.map.addOverlay(marker.marker);
  });

  obj.bind('delmarker', function (marker) {
    obj.map.removeOverlay(marker.marker);
  });

  obj.bind('clearmarkers', function () {
    // @@@ Maybe don't nuke ALL overlays?
    obj.map.clearOverlays();
  });
});
;
