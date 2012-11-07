/*
 * jQuery Nivo Slider v3.1
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(a){var b=function(b,c){var d=a.extend({},a.fn.nivoSlider.defaults,c);var e={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false,controlNavEl:false};var f=a(b);f.data("nivo:vars",e).addClass("nivoSlider");var g=f.children();g.each(function(){var b=a(this);var c="";if(!b.is("img")){if(b.is("a")){b.addClass("nivo-imageLink");c=b}b=b.find("img:first")}var d=d===0?b.attr("width"):b.width(),f=f===0?b.attr("height"):b.height();if(c!==""){c.css("display","none")}b.css("display","none");e.totalSlides++});if(d.randomStart){d.startSlide=Math.floor(Math.random()*e.totalSlides)}if(d.startSlide>0){if(d.startSlide>=e.totalSlides){d.startSlide=e.totalSlides-1}e.currentSlide=d.startSlide}if(a(g[e.currentSlide]).is("img")){e.currentImage=a(g[e.currentSlide])}else{e.currentImage=a(g[e.currentSlide]).find("img:first")}if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}var h=a('<img class="nivo-main-image" src="#" />');h.attr("src",e.currentImage.attr("src")).show();f.append(h);a(window).resize(function(){f.children("img").width(f.width());h.attr("src",e.currentImage.attr("src"));h.stop().height("auto");a(".nivo-slice").remove();a(".nivo-box").remove()});f.append(a('<div class="nivo-caption"></div>'));var i=function(b){var c=a(".nivo-caption",f);if(e.currentImage.attr("title")!=""&&e.currentImage.attr("title")!=undefined){var d=e.currentImage.attr("title");if(d.substr(0,1)=="#")d=a(d).html();if(c.css("display")=="block"){setTimeout(function(){c.html(d)},b.animSpeed)}else{c.html(d);c.stop().fadeIn(b.animSpeed)}}else{c.stop().fadeOut(b.animSpeed)}};i(d);var j=0;if(!d.manualAdvance&&g.length>1){j=setInterval(function(){o(f,g,d,false)},d.pauseTime)}if(d.directionNav){f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+d.prevText+'</a><a class="nivo-nextNav">'+d.nextText+"</a></div>");a("a.nivo-prevNav",f).live("click",function(){if(e.running){return false}clearInterval(j);j="";e.currentSlide-=2;o(f,g,d,"prev")});a("a.nivo-nextNav",f).live("click",function(){if(e.running){return false}clearInterval(j);j="";o(f,g,d,"next")})}if(d.controlNav){e.controlNavEl=a('<div class="nivo-controlNav"></div>');f.after(e.controlNavEl);for(var k=0;k<g.length;k++){if(d.controlNavThumbs){e.controlNavEl.addClass("nivo-thumbs-enabled");var l=g.eq(k);if(!l.is("img")){l=l.find("img:first")}if(l.attr("data-thumb"))e.controlNavEl.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("data-thumb")+'" alt="" /></a>')}else{e.controlNavEl.append('<a class="nivo-control" rel="'+k+'">'+(k+1)+"</a>")}}a("a:eq("+e.currentSlide+")",e.controlNavEl).addClass("active");a("a",e.controlNavEl).bind("click",function(){if(e.running)return false;if(a(this).hasClass("active"))return false;clearInterval(j);j="";h.attr("src",e.currentImage.attr("src"));e.currentSlide=a(this).attr("rel")-1;o(f,g,d,"control")})}if(d.pauseOnHover){f.hover(function(){e.paused=true;clearInterval(j);j=""},function(){e.paused=false;if(j===""&&!d.manualAdvance){j=setInterval(function(){o(f,g,d,false)},d.pauseTime)}})}f.bind("nivo:animFinished",function(){h.attr("src",e.currentImage.attr("src"));e.running=false;a(g).each(function(){if(a(this).is("a")){a(this).css("display","none")}});if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}if(j===""&&!e.paused&&!d.manualAdvance){j=setInterval(function(){o(f,g,d,false)},d.pauseTime)}d.afterChange.call(this)});var m=function(b,c,d){if(a(d.currentImage).parent().is("a"))a(d.currentImage).parent().css("display","block");a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility","hidden").show();var e=a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").parent().is("a")?a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").parent().height():a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").height();for(var f=0;f<c.slices;f++){var g=Math.round(b.width()/c.slices);if(f===c.slices-1){b.append(a('<div class="nivo-slice" name="'+f+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block !important; top:0; left:-"+(g+f*g-g)+'px;" /></div>').css({left:g*f+"px",width:b.width()-g*f+"px",height:e+"px",opacity:"0",overflow:"hidden"}))}else{b.append(a('<div class="nivo-slice" name="'+f+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block !important; top:0; left:-"+(g+f*g-g)+'px;" /></div>').css({left:g*f+"px",width:g+"px",height:e+"px",opacity:"0",overflow:"hidden"}))}}a(".nivo-slice",b).height(e);h.stop().animate({height:a(d.currentImage).height()},c.animSpeed)};var n=function(b,c,d){if(a(d.currentImage).parent().is("a"))a(d.currentImage).parent().css("display","block");a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility","hidden").show();var e=Math.round(b.width()/c.boxCols),f=Math.round(a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").height()/c.boxRows);for(var g=0;g<c.boxRows;g++){for(var i=0;i<c.boxCols;i++){if(i===c.boxCols-1){b.append(a('<div class="nivo-box" name="'+i+'" rel="'+g+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block; top:-"+f*g+"px; left:-"+e*i+'px;" /></div>').css({opacity:0,left:e*i+"px",top:f*g+"px",width:b.width()-e*i+"px"}));a('.nivo-box[name="'+i+'"]',b).height(a('.nivo-box[name="'+i+'"] img',b).height()+"px")}else{b.append(a('<div class="nivo-box" name="'+i+'" rel="'+g+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block; top:-"+f*g+"px; left:-"+e*i+'px;" /></div>').css({opacity:0,left:e*i+"px",top:f*g+"px",width:e+"px"}));a('.nivo-box[name="'+i+'"]',b).height(a('.nivo-box[name="'+i+'"] img',b).height()+"px")}}}h.stop().animate({height:a(d.currentImage).height()},c.animSpeed)};var o=function(b,c,d,e){var f=b.data("nivo:vars");if(f&&f.currentSlide===f.totalSlides-1){d.lastSlide.call(this)}if((!f||f.stop)&&!e){return false}d.beforeChange.call(this);if(!e){h.attr("src",f.currentImage.attr("src"))}else{if(e==="prev"){h.attr("src",f.currentImage.attr("src"))}if(e==="next"){h.attr("src",f.currentImage.attr("src"))}}f.currentSlide++;if(f.currentSlide===f.totalSlides){f.currentSlide=0;d.slideshowEnd.call(this)}if(f.currentSlide<0){f.currentSlide=f.totalSlides-1}if(a(c[f.currentSlide]).is("img")){f.currentImage=a(c[f.currentSlide])}else{f.currentImage=a(c[f.currentSlide]).find("img:first")}if(d.controlNav){a("a",f.controlNavEl).removeClass("active");a("a:eq("+f.currentSlide+")",f.controlNavEl).addClass("active")}i(d);a(".nivo-slice",b).remove();a(".nivo-box",b).remove();var g=d.effect,j="";if(d.effect==="random"){j=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");g=j[Math.floor(Math.random()*(j.length+1))];if(g===undefined){g="fade"}}if(d.effect.indexOf(",")!==-1){j=d.effect.split(",");g=j[Math.floor(Math.random()*j.length)];if(g===undefined){g="fade"}}if(f.currentImage.attr("data-transition")){g=f.currentImage.attr("data-transition")}f.running=true;var k=0,l=0,o="",q="",r="",s="";if(g==="sliceDown"||g==="sliceDownRight"||g==="sliceDownLeft"){m(b,d,f);k=0;l=0;o=a(".nivo-slice",b);if(g==="sliceDownLeft"){o=a(".nivo-slice",b)._reverse()}o.each(function(){var c=a(this);c.css({top:"0px"});if(l===d.slices-1){setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed)},100+k)}k+=50;l++})}else if(g==="sliceUp"||g==="sliceUpRight"||g==="sliceUpLeft"){m(b,d,f);k=0;l=0;o=a(".nivo-slice",b);if(g==="sliceUpLeft"){o=a(".nivo-slice",b)._reverse()}o.each(function(){var c=a(this);c.css({bottom:"0px"});if(l===d.slices-1){setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed)},100+k)}k+=50;l++})}else if(g==="sliceUpDown"||g==="sliceUpDownRight"||g==="sliceUpDownLeft"){m(b,d,f);k=0;l=0;var t=0;o=a(".nivo-slice",b);if(g==="sliceUpDownLeft"){o=a(".nivo-slice",b)._reverse()}o.each(function(){var c=a(this);if(l===0){c.css("top","0px");l++}else{c.css("bottom","0px");l=0}if(t===d.slices-1){setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed)},100+k)}k+=50;t++})}else if(g==="fold"){m(b,d,f);k=0;l=0;a(".nivo-slice",b).each(function(){var c=a(this);var e=c.width();c.css({top:"0px",width:"0px"});if(l===d.slices-1){setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed)},100+k)}k+=50;l++})}else if(g==="fade"){m(b,d,f);q=a(".nivo-slice:first",b);q.css({width:b.width()+"px"});q.animate({opacity:"1.0"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g==="slideInRight"){m(b,d,f);q=a(".nivo-slice:first",b);q.css({width:"0px",opacity:"1"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g==="slideInLeft"){m(b,d,f);q=a(".nivo-slice:first",b);q.css({width:"0px",opacity:"1",left:"",right:"0px"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){q.css({left:"0px",right:""});b.trigger("nivo:animFinished")})}else if(g==="boxRandom"){n(b,d,f);r=d.boxCols*d.boxRows;l=0;k=0;s=p(a(".nivo-box",b));s.each(function(){var c=a(this);if(l===r-1){setTimeout(function(){c.animate({opacity:"1"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1"},d.animSpeed)},100+k)}k+=20;l++})}else if(g==="boxRain"||g==="boxRainReverse"||g==="boxRainGrow"||g==="boxRainGrowReverse"){n(b,d,f);r=d.boxCols*d.boxRows;l=0;k=0;var u=0;var v=0;var w=[];w[u]=[];s=a(".nivo-box",b);if(g==="boxRainReverse"||g==="boxRainGrowReverse"){s=a(".nivo-box",b)._reverse()}s.each(function(){w[u][v]=a(this);v++;if(v===d.boxCols){u++;v=0;w[u]=[]}});for(var x=0;x<d.boxCols*2;x++){var y=x;for(var z=0;z<d.boxRows;z++){if(y>=0&&y<d.boxCols){(function(c,e,f,h,i){var j=a(w[c][e]);var k=j.width();var l=j.height();if(g==="boxRainGrow"||g==="boxRainGrowReverse"){j.width(0).height(0)}if(h===i-1){setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3,"",function(){b.trigger("nivo:animFinished")})},100+f)}else{setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3)},100+f)}})(z,y,k,l,r);l++}y--}k+=100}}};var p=function(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d,10),c=a[--d],a[d]=a[b],a[b]=c);return a};var q=function(a){if(this.console&&typeof console.log!=="undefined"){console.log(a)}};this.stop=function(){if(!a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=true;q("Stop Slider")}};this.start=function(){if(a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=false;q("Start Slider")}};d.afterLoad.call(this);return this};a.fn.nivoSlider=function(c){return this.each(function(d,e){var f=a(this);if(f.data("nivoslider")){return f.data("nivoslider")}var g=new b(this,c);f.data("nivoslider",g)})};a.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,controlNav:true,controlNavThumbs:false,pauseOnHover:true,manualAdvance:false,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};a.fn._reverse=[].reverse})(jQuery);
/**
 * @file
 *  Applies the nivo slider functionality to the drupal blocks.
 */
 
(function ($) {
  Drupal.behaviors.mediaNivoSlider = {
    attach: function (context, settings) {
      // Iterate over all nivo sliders available via the Drupal javascript settings.
      for (var key in Drupal.settings.media_nivo_slider) {
        var slider = Drupal.settings.media_nivo_slider[key];
        
        // Set the block width, corrects the width setting when using varied image styles.
        var imageWidth = $("#" + key + "-media-nivo-slider").find('img:first').width();
        $("#" + key + "-media-nivo-slider").css('width', imageWidth);

        // Apply nivo slider to block
        $("#" + key + "-media-nivo-slider").nivoSlider({
          effect: slider.effect, //Specify sets like: 'fold,fade,sliceDown'
          slices: parseInt(slider.slices),
          boxCols: parseInt(slider.boxCols), // For box animations
          boxRows: parseInt(slider.boxRows),
          animSpeed: parseInt(slider.animSpeed), //Slide transition speed
          pauseTime: parseInt(slider.pauseTime),
          startSlide: parseInt(slider.startSlide), // Set starting Slide (0 index)
          directionNav: slider.directionNav, // Next & Prev navigation
          directionNavHide: slider.directionNavHide, // Only show on hover
          controlNav: slider.controlNav, // 1,2,3... navigation
          controlNavThumbs: slider.controlNavThumbs, // Use thumbnails for Control Nav
          controlNavThumbsFromRel: slider.controlNavThumbsFromRel, // Use image rel for thumbs
          controlNavThumbsSearch: slider.controlNavThumbsSearch, // Replace this with...
          controlNavThumbsReplace: slider.controlNavThumbsReplace, // ...this in thumb Image src
          keyboardNav: slider.keyboardNav, // Use left & right arrows
          pauseOnHover: slider.pauseOnHover, // Stop animation while hovering
          manualAdvance: slider.manualAdvance, // Force manual transitions
          captionOpacity: slider.captionOpacity, // Universal caption opacity
          prevText: slider.prevText, // Prev directionNav text
          nextText: slider.nextText, // Next directionNav text
          randomStart: slider.randomStart, // Start on a random slide
          beforeChange: new Function('', JSON.parse(slider.beforeChange)), // Triggers before a slide transition
          afterChange: new Function('', JSON.parse(slider.afterChange)), // Triggers after a slide transition
          slideshowEnd: new Function('', JSON.parse(slider.slideshowEnd)), // Triggers after all slides have been shown
          lastSlide: new Function('', JSON.parse(slider.lastSlide)), // Triggers when last slide is shown
          afterLoad: new Function('', JSON.parse(slider.afterLoad)) // Triggers when slider has loaded
        });        
      }
    }
  };

}(jQuery));
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
(function ($) {

Drupal.toolbar = Drupal.toolbar || {};

/**
 * Attach toggling behavior and notify the overlay of the toolbar.
 */
Drupal.behaviors.toolbar = {
  attach: function(context) {

    // Set the initial state of the toolbar.
    $('#toolbar', context).once('toolbar', Drupal.toolbar.init);

    // Toggling toolbar drawer.
    $('#toolbar a.toggle', context).once('toolbar-toggle').click(function(e) {
      Drupal.toolbar.toggle();
      // Allow resize event handlers to recalculate sizes/positions.
      $(window).triggerHandler('resize');
      return false;
    });
  }
};

/**
 * Retrieve last saved cookie settings and set up the initial toolbar state.
 */
Drupal.toolbar.init = function() {
  // Retrieve the collapsed status from a stored cookie.
  var collapsed = $.cookie('Drupal.toolbar.collapsed');

  // Expand or collapse the toolbar based on the cookie value.
  if (collapsed == 1) {
    Drupal.toolbar.collapse();
  }
  else {
    Drupal.toolbar.expand();
  }
};

/**
 * Collapse the toolbar.
 */
Drupal.toolbar.collapse = function() {
  var toggle_text = Drupal.t('Show shortcuts');
  $('#toolbar div.toolbar-drawer').addClass('collapsed');
  $('#toolbar a.toggle')
    .removeClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').removeClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    1,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Expand the toolbar.
 */
Drupal.toolbar.expand = function() {
  var toggle_text = Drupal.t('Hide shortcuts');
  $('#toolbar div.toolbar-drawer').removeClass('collapsed');
  $('#toolbar a.toggle')
    .addClass('toggle-active')
    .attr('title',  toggle_text)
    .html(toggle_text);
  $('body').addClass('toolbar-drawer').css('paddingTop', Drupal.toolbar.height());
  $.cookie(
    'Drupal.toolbar.collapsed',
    0,
    {
      path: Drupal.settings.basePath,
      // The cookie should "never" expire.
      expires: 36500
    }
  );
};

/**
 * Toggle the toolbar.
 */
Drupal.toolbar.toggle = function() {
  if ($('#toolbar div.toolbar-drawer').hasClass('collapsed')) {
    Drupal.toolbar.expand();
  }
  else {
    Drupal.toolbar.collapse();
  }
};

Drupal.toolbar.height = function() {
  var $toolbar = $('#toolbar');
  var height = $toolbar.outerHeight();
  // In modern browsers (including IE9), when box-shadow is defined, use the
  // normal height.
  var cssBoxShadowValue = $toolbar.css('box-shadow');
  var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
  // In IE8 and below, we use the shadow filter to apply box-shadow styles to
  // the toolbar. It adds some extra height that we need to remove.
  if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test($toolbar.css('filter'))) {
    height -= $toolbar[0].filters.item("DXImageTransform.Microsoft.Shadow").strength;
  }
  return height;
};

})(jQuery);
;

/**
 * @file
 * Drupal to Google Maps API bridge.
 */

/*global jQuery, Drupal, GLatLng, GSmallZoomControl, GLargeMapControl, GMap2 */
/*global GMapTypeControl, GSmallMapControl, G_HYBRID_MAP, G_NORMAL_MAP */
/*global G_PHYSICAL_MAP, G_SATELLITE_MAP, GHierarchicalMapTypeControl */
/*global GKeyboardHandler, GLatLngBounds, GMenuMapTypeControl, GEvent */
/*global GOverviewMapControl, GScaleControl, GUnload */

(function () { // BEGIN closure
  var handlers = {};
  var maps = {};
  var ajaxoffset = 0;

  Drupal.gmap = {

    /**
     * Retrieve a map object for use by a non-widget.
     * Use this if you need to be able to fire events against a certain map
     * which you have the mapid for.
     * Be a good GMap citizen! Remember to send change()s after modifying variables!
     */
    getMap: function (mapid) {
      if (maps[mapid]) {
        return maps[mapid];
      }
      else {
        // Perhaps the user passed a widget id instead?
        mapid = mapid.split('-').slice(1, -1).join('-');
        if (maps[mapid]) {
          return maps[mapid];
        }
      }
      return false;
    },

    unloadMap: function (mapid) {
      delete maps[mapid];
    },

    addHandler: function (handler, callback) {
      if (!handlers[handler]) {
        handlers[handler] = [];
      }
      handlers[handler].push(callback);
    },

    globalChange: function (name, userdata) {
      for (var mapid in Drupal.settings.gmap) {
        if (Drupal.settings.gmap.hasOwnProperty(mapid)) {
          // Skip maps that are set up but not shown, etc.
          if (maps[mapid]) {
            maps[mapid].change(name, -1, userdata);
          }
        }
      }
    },

    setup: function (settings) {
      var obj = this;

      var initcallback = function (mapid) {
        return (function () {
          maps[mapid].change("bootstrap_options", -1);
          maps[mapid].change("boot", -1);
          maps[mapid].change("init", -1);
          // Send some changed events to fire up the rest of the initial settings..
          maps[mapid].change("maptypechange", -1);
          maps[mapid].change("controltypechange", -1);
          maps[mapid].change("alignchange", -1);
          // Set ready to put the event system into action.
          maps[mapid].ready = true;
          maps[mapid].change("ready", -1);
        });
      };

      if (settings || (Drupal.settings && Drupal.settings.gmap)) {
        var mapid = obj.id.split('-');
        if (Drupal.settings['gmap_remap_widgets']) {
          if (Drupal.settings['gmap_remap_widgets'][obj.id]) {
            jQuery.each(Drupal.settings['gmap_remap_widgets'][obj.id].classes, function() {
              jQuery(obj).addClass(this);
            });
            mapid = Drupal.settings['gmap_remap_widgets'][obj.id].id.split('-');
          }
        }
        var instanceid = mapid.pop();
        mapid.shift();
        mapid = mapid.join('-');
        var control = instanceid.replace(/\d+$/, '');

        // Lazy init the map object.
        if (!maps[mapid]) {
          if (settings) {
            maps[mapid] = new Drupal.gmap.map(settings);
          }
          else {
            maps[mapid] = new Drupal.gmap.map(Drupal.settings.gmap[mapid]);
          }
          // Prepare the initialization callback.
          var callback = initcallback(mapid);
          setTimeout(callback, 0);
        }

        if (handlers[control]) {
          for (var i = 0; i < handlers[control].length; i++) {
            handlers[control][i].call(maps[mapid], obj);
          }
        }
        else {
          // Element with wrong class?
        }
      }
    }
  };

  jQuery.fn.createGMap = function (settings, mapid) {
    return this.each(function () {
      if (!mapid) {
        mapid = 'auto' + ajaxoffset + 'ajax';
        ajaxoffset++;
      }
      settings.id = mapid;
      jQuery(this)
        .attr('id', 'gmap-' + mapid + '-gmap0')
        .css('width', settings.width)
        .css('height', settings.height)
        .addClass('gmap-control')
        .addClass('gmap-gmap')
        .addClass('gmap')
        .addClass('gmap-map')
        .addClass('gmap-' + mapid + '-gmap')
        .addClass('gmap-processed')
        .each(function() {Drupal.gmap.setup.call(this, settings)});
    });
  };

})(); // END closure

Drupal.gmap.factory = {};

Drupal.gmap.map = function (v) {
  this.vars = v;
  this.map = undefined;
  this.ready = false;
  var _bindings = {};

  /**
   * Register interest in a change.
   */
  this.bind = function (name, callback) {
    if (!_bindings[name]) {
      _bindings[name] = [];
    }
    return _bindings[name].push(callback) - 1;
  };

  /**
   * Change notification.
   * Interested parties can act on changes.
   */
  this.change = function (name, id, userdata) {
    var c;
    if (_bindings[name]) {
      for (c = 0; c < _bindings[name].length; c++) {
        if (c !== id) {
          _bindings[name][c](userdata);
        }
      }
    }
    if (name !== 'all') {
      this.change('all', -1, name, userdata);
    }
  };

  /**
   * Deferred change notification.
   * This will cause a change notification to be tacked on to the *end* of the event queue.
   */
  this.deferChange = function (name, id, userdata) {
    var obj = this;
    // This will move the function call to the end of the event loop.
    setTimeout(function () {
      obj.change(name, id, userdata);
    }, 0);
  };
};

////////////////////////////////////////
//             Map widget             //
////////////////////////////////////////
Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  var _ib = {};


  // Respond to incoming zooms
  _ib.zoom = obj.bind("zoom", function () {
    obj.map.setZoom(obj.vars.zoom);
  });

  // Respond to incoming moves
  _ib.move = obj.bind("move", function () {
    obj.map.panTo(new GLatLng(obj.vars.latitude, obj.vars.longitude));
  });

  // Respond to incoming recenter commands.
  _ib.recenter = obj.bind("recenter", function (vars) {
    if (vars) {
      if (vars.bounds) {
        obj.vars.latitude = vars.bounds.getCenter().lat();
        obj.vars.longitude = vars.bounds.getCenter().lng();
        obj.vars.zoom = obj.map.getBoundsZoomLevel(vars.bounds);
      }
      else {
        obj.vars.latitude = vars.latitude;
        obj.vars.longitude = vars.longitude;
        obj.vars.zoom = vars.zoom;
      }
    }
    obj.map.setCenter(new GLatLng(obj.vars.latitude, obj.vars.longitude), obj.vars.zoom);
  });

  // Respond to incoming map type changes
  _ib.mtc = obj.bind("maptypechange", function () {
    var i;
    for (i = 0; i < obj.opts.mapTypeNames.length; i++) {
      if (obj.opts.mapTypeNames[i] === obj.vars.maptype) {
        obj.map.setMapType(obj.opts.mapTypes[i]);
        break;
      }
    }
  });

  // Respond to incoming width changes.
  _ib.width = obj.bind("widthchange", function (w) {
    obj.map.getContainer().style.width = w;
    obj.map.checkResize();
  });
  // Send out outgoing width changes.
  // N/A
  // Respond to incoming height changes.
  _ib.height = obj.bind("heightchange", function (h) {
    obj.map.getContainer().style.height = h;
    obj.map.checkResize();
  });
  // Send out outgoing height changes.
  // N/A

  // Respond to incoming control type changes.
  _ib.ctc = obj.bind("controltypechange", function () {
    if (obj.currentcontrol) {
      obj.map.removeControl(obj.currentcontrol);
    }
    if (obj.vars.controltype === 'Micro') {
      obj.map.addControl(obj.currentcontrol = new GSmallZoomControl());
    }
    else if (obj.vars.controltype === 'Small') {
      obj.map.addControl(obj.currentcontrol = new GSmallMapControl());
    }
    else if (obj.vars.controltype === 'Large') {
      obj.map.addControl(obj.currentcontrol = new GLargeMapControl());
    }
  });
  // Send out outgoing control type changes.
  // N/A

  obj.bind("bootstrap_options", function () {
    // Bootup options.
    var opts = {}; // Object literal GMapOptions
    obj.opts = opts;

    // Null out the enabled types.
    opts.mapTypes = [];
    opts.mapTypeNames = [];

    // Load google map types.
    if (obj.vars.baselayers.Map) {
      opts.mapTypes.push(G_NORMAL_MAP);
      opts.mapTypeNames.push('Map');
    }
    if (obj.vars.baselayers.Satellite) {
      opts.mapTypes.push(G_SATELLITE_MAP);
      opts.mapTypeNames.push('Satellite');
    }
    if (obj.vars.baselayers.Hybrid) {
      opts.mapTypes.push(G_HYBRID_MAP);
      opts.mapTypeNames.push('Hybrid');
    }
    if (obj.vars.baselayers.Physical) {
      opts.mapTypes.push(G_PHYSICAL_MAP);
      opts.mapTypeNames.push('Physical');
    }

    if (obj.vars.draggableCursor) {
      opts.draggableCursor = obj.vars.draggableCursor;
    }
    if (obj.vars.draggingCursor) {
      opts.draggingCursor = obj.vars.draggingCursor;
    }
    if (obj.vars.backgroundColor) {
      opts.backgroundColor = obj.vars.backgroundColor;
    }
  });

  obj.bind("boot", function () {
    obj.map = new GMap2(elem, obj.opts);
  });

  obj.bind("init", function () {
    var map = obj.map;

    // Map type control
    if (obj.vars.mtc === 'standard') {
      map.addControl(new GMapTypeControl());
    }
    else if (obj.vars.mtc === 'hier') {
      map.addControl(new GHierarchicalMapTypeControl());
    }
    else if (obj.vars.mtc === 'menu') {
      map.addControl(new GMenuMapTypeControl());
    }

    if (obj.vars.behavior.overview) {
      map.addControl(new GOverviewMapControl());
    }
    if (obj.vars.behavior.googlebar) {
      map.enableGoogleBar();
    }
    if (obj.vars.behavior.scale) {
      map.addControl(new GScaleControl());
    }
    if (obj.vars.behavior.nodrag) {
      map.disableDragging();
    }
    else if (!obj.vars.behavior.nokeyboard) {
      obj._kbdhandler = new GKeyboardHandler(map);
    }
    if (obj.vars.extent) {
      var c = obj.vars.extent;
      var extent = new GLatLngBounds(new GLatLng(c[0][0], c[0][1]), new GLatLng(c[1][0], c[1][1]));
      obj.vars.latitude = extent.getCenter().lat();
      obj.vars.longitude = extent.getCenter().lng();
      obj.vars.zoom = map.getBoundsZoomLevel(extent);
    }
    if (obj.vars.behavior.collapsehack) {
      // Modify collapsable fieldsets to make maps check dom state when the resize handle
      // is clicked. This may not necessarily be the correct thing to do in all themes,
      // hence it being a behavior.
      setTimeout(function () {
        var r = function () {
          map.checkResize();
          map.setCenter(new GLatLng(obj.vars.latitude, obj.vars.longitude), obj.vars.zoom);
        };
        jQuery(elem).parents('fieldset.collapsible').children('legend').children('a').click(r);
        jQuery('.vertical-tab-button', jQuery(elem).parents('.vertical-tabs')).children('a').click(r);
        // Would be nice, but doesn't work.
        //$(elem).parents('fieldset.collapsible').children('.fieldset-wrapper').scroll(r);
      }, 0);
    }
    map.setCenter(new GLatLng(obj.vars.latitude, obj.vars.longitude), obj.vars.zoom);

    if (!obj.vars.nocontzoom) {
      map.enableDoubleClickZoom();
      map.enableContinuousZoom();
    }
    if (!obj.vars.behavior.nomousezoom) {
      map.enableScrollWheelZoom();
    }

    // Send out outgoing zooms
    GEvent.addListener(map, "zoomend", function (oldzoom, newzoom) {
      obj.vars.zoom = newzoom;
      obj.change("zoom", _ib.zoom);
    });

    // Send out outgoing moves
    GEvent.addListener(map, "moveend", function () {
      var coord = map.getCenter();
      obj.vars.latitude = coord.lat();
      obj.vars.longitude = coord.lng();
      obj.change("move", _ib.move);
    });

    // Send out outgoing map type changes.
    GEvent.addListener(map, "maptypechanged", function () {
      // If the map isn't ready yet, ignore it.
      if (obj.ready) {
        var type = map.getCurrentMapType();
        var i;
        for (i = 0; i < obj.opts.mapTypes.length; i++) {
          if (obj.opts.mapTypes[i] === type) {
            obj.vars.maptype = obj.opts.mapTypeNames[i];
          }
        }
        obj.change("maptypechange", _ib.mtc);
      }
    });

  });
});

////////////////////////////////////////
//            Zoom widget             //
////////////////////////////////////////
Drupal.gmap.addHandler('zoom', function (elem) {
  var obj = this;
  // Respond to incoming zooms
  var binding = obj.bind("zoom", function () {
    elem.value = obj.vars.zoom;
  });
  // Send out outgoing zooms
  jQuery(elem).change(function () {
    obj.vars.zoom = parseInt(elem.value, 10);
    obj.change("zoom", binding);
  });
});

////////////////////////////////////////
//          Latitude widget           //
////////////////////////////////////////
Drupal.gmap.addHandler('latitude', function (elem) {
  var obj = this;
  // Respond to incoming movements.
  var binding = obj.bind("move", function () {
    elem.value = '' + obj.vars.latitude;
  });
  // Send out outgoing movements.
  jQuery(elem).change(function () {
    obj.vars.latitude = Number(this.value);
    obj.change("move", binding);
  });
});

////////////////////////////////////////
//         Longitude widget           //
////////////////////////////////////////
Drupal.gmap.addHandler('longitude', function (elem) {
  var obj = this;
  // Respond to incoming movements.
  var binding = obj.bind("move", function () {
    elem.value = '' + obj.vars.longitude;
  });
  // Send out outgoing movements.
  jQuery(elem).change(function () {
    obj.vars.longitude = Number(this.value);
    obj.change("move", binding);
  });
});

////////////////////////////////////////
//          Latlon widget             //
////////////////////////////////////////
Drupal.gmap.addHandler('latlon', function (elem) {
  var obj = this;
  // Respond to incoming movements.
  var binding = obj.bind("move", function () {
    elem.value = '' + obj.vars.latitude + ',' + obj.vars.longitude;
  });
  // Send out outgoing movements.
  jQuery(elem).change(function () {
    var t = this.value.split(',');
    obj.vars.latitude = Number(t[0]);
    obj.vars.longitude = Number(t[1]);
    obj.change("move", binding);
  });
});

////////////////////////////////////////
//          Extent widget             //
////////////////////////////////////////
Drupal.gmap.addHandler('extent', function (elem) {
  var obj = this;
  // Respond to incoming extent changes.
  var binding = obj.bind("move", function () {
    var b = obj.map.getBounds();
    elem.value = '' + b.getSouthWest().lng() + ',' + b.getSouthWest().lat() + ',' + b.getNorthEast().lng() + ',' + b.getNorthEast().lat();
  });
  // Send out outgoing extent changes.
  jQuery(elem).change(function () {
    var t = this.value.split(',');
    var b = new GLatLngBounds(new GLatLng(Number(t[1]), Number(t[0])), new GLatLng(Number(t[3]), Number(t[2])));
    obj.vars.latitude = b.getCenter().lat();
    obj.vars.longitude = b.getCenter().lng();
    obj.vars.zoom = obj.map.getBoundsZoomLevel(b);
    obj.map.setCenter(new GLatLng(obj.vars.latitude, obj.vars.longitude), obj.vars.zoom);
  });
});

////////////////////////////////////////
//          Maptype widget            //
////////////////////////////////////////
Drupal.gmap.addHandler('maptype', function (elem) {
  var obj = this;
  // Respond to incoming movements.
  var binding = obj.bind("maptypechange", function () {
    elem.value = obj.vars.maptype;
  });
  // Send out outgoing movements.
  jQuery(elem).change(function () {
    obj.vars.maptype = elem.value;
    obj.change("maptypechange", binding);
  });
});

(function () { // BEGIN CLOSURE
  var re = /([0-9.]+)\s*(em|ex|px|in|cm|mm|pt|pc|%)/;
  var normalize = function (str) {
    var ar;
    if ((ar = re.exec(str.toLowerCase()))) {
      return ar[1] + ar[2];
    }
    return null;
  };
  ////////////////////////////////////////
  //           Width widget             //
  ////////////////////////////////////////
  Drupal.gmap.addHandler('width', function (elem) {
    var obj = this;
    // Respond to incoming width changes.
    var binding = obj.bind("widthchange", function (w) {
      elem.value = normalize(w);
    });
    // Send out outgoing width changes.
    jQuery(elem).change(function () {
      var n;
      if ((n = normalize(elem.value))) {
        elem.value = n;
        obj.change('widthchange', binding, n);
      }
    });
    obj.bind('init', function () {
      jQuery(elem).change();
    });
  });

  ////////////////////////////////////////
  //           Height widget            //
  ////////////////////////////////////////
  Drupal.gmap.addHandler('height', function (elem) {
    var obj = this;
    // Respond to incoming height changes.
    var binding = obj.bind("heightchange", function (h) {
      elem.value = normalize(h);
    });
    // Send out outgoing height changes.
    jQuery(elem).change(function () {
      var n;
      if ((n = normalize(elem.value))) {
        elem.value = n;
        obj.change('heightchange', binding, n);
      }
    });
    obj.bind('init', function () {
      jQuery(elem).change();
    });
  });

})(); // END CLOSURE

////////////////////////////////////////
//        Control type widget         //
////////////////////////////////////////
Drupal.gmap.addHandler('controltype', function (elem) {
  var obj = this;
  // Respond to incoming height changes.
  var binding = obj.bind("controltypechange", function () {
    elem.value = obj.vars.controltype;
  });
  // Send out outgoing height changes.
  jQuery(elem).change(function () {
    obj.vars.controltype = elem.value;
    obj.change("controltypechange", binding);
  });
});

// Map cleanup.
jQuery(document).unload(GUnload);

Drupal.behaviors.GMap = {
  attach: function (context, settings) {
    if (Drupal.settings && Drupal.settings['gmap_remap_widgets']) {
      jQuery.each(Drupal.settings['gmap_remap_widgets'], function(key, val) {
        jQuery('#'+ key).addClass('gmap-control');
      });
    }
    jQuery('.gmap-gmap:not(.gmap-processed)', context).addClass('gmap-processed').each(function () {Drupal.gmap.setup.call(this)});
    jQuery('.gmap-control:not(.gmap-processed)', context).addClass('gmap-processed').each(function () {Drupal.gmap.setup.call(this)});
  },
  detach: function (context, settings) {
    jQuery('.gmap-processed', context).each(function (element) {
      //find mapid
      var id = jQuery(this).attr('id');
      var mapid = id.split('-', 2);

      //unload map
      Drupal.gmap.unloadMap(mapid[1]);
    });
  }
};
;

/**
 * @file
 * Common marker routines.
 */

/*global jQuery, Drupal, GEvent, GInfoWindowTab, GLatLng, GLatLngBounds */

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  obj.bind('init', function () {
    if (obj.vars.behavior.autozoom) {
      obj.bounds = new GLatLngBounds();
    }
  });

  obj.bind('addmarker', function (marker) {
    var m = Drupal.gmap.factory.marker(new GLatLng(marker.latitude, marker.longitude), marker.opts);
    marker.marker = m;
    GEvent.addListener(m, 'click', function () {
      obj.change('clickmarker', -1, marker);
    });
    if (obj.vars.behavior.highlight) {
      GEvent.addListener(m, 'mouseover', function () {
        var highlightColor = '#' + obj.vars.styles.highlight_color;
        highlightMarker(obj.map, marker, 'hoverHighlight', highlightColor);
      });
      GEvent.addListener(m, 'mouseout', function () {
        unHighlightMarker(obj.map, marker, 'hoverHighlight');
      });
    }
    if (obj.vars.behavior.extramarkerevents) {
      GEvent.addListener(m, 'mouseover', function () {
        obj.change('mouseovermarker', -1, marker);
      });
      GEvent.addListener(m, 'mouseout', function () {
        obj.change('mouseoutmarker', -1, marker);
      });
      GEvent.addListener(m, 'dblclick', function () {
        obj.change('dblclickmarker', -1, marker);
      });
    }
    /**
     * Perform a synthetic marker click on this marker on load.
     */
    if (marker.autoclick || (marker.options && marker.options.autoclick)) {
      obj.deferChange('clickmarker', -1, marker);
    }
    if (obj.vars.behavior.autozoom) {
      obj.bounds.extend(marker.marker.getPoint());
    }
    // If the highlight arg option is used in views highlight the marker.
    if (marker.opts.highlight == 1) {
      highlightMarker(obj.map, marker, 'viewHighlight', marker.opts.highlightcolor);
    }
  });

  // Default marker actions.
  obj.bind('clickmarker', function (marker) {
    // Local/stored content
    if (marker.text) {
      marker.marker.openInfoWindowHtml(marker.text);
    }
    // Info Window Query / Info Window Offset
    if (marker.iwq || (obj.vars.iwq && typeof marker.iwo != 'undefined')) {
      var iwq, iwo;
      if (obj.vars.iwq) {
        iwq = obj.vars.iwq;
      }
      if (marker.iwq) {
        iwq = marker.iwq;
      }
      iwo = 0;
      if (marker.iwo) {
        iwo = marker.iwo;
      }
      // Create a container to store the cloned DOM elements.
      var el = document.createElement('div');
      // Clone the matched object, run through the clone, stripping off ids, and move the clone into the container.
      jQuery(iwq).eq(iwo).clone(false).find('*').removeAttr('id').appendTo(jQuery(el));
      marker.marker.openInfoWindow(el);
    }
    // AJAX content
    if (marker.rmt) {
      var uri = marker.rmt;
      // If there was a callback, prefix that.
      // (If there wasn't, marker.rmt was the FULL path.)
      if (obj.vars.rmtcallback) {
        uri = obj.vars.rmtcallback + '/' + marker.rmt;
      }
      // @Bevan: I think it makes more sense to do it in this order.
      // @Bevan: I don't like your choice of variable btw, seems to me like
      // @Bevan: it belongs in the map object, or at *least* somewhere in
      // @Bevan: the gmap settings proper...
      //if (!marker.text && Drupal.settings.loadingImage) {
      //  marker.marker.openInfoWindowHtml(Drupal.settings.loadingImage);
      //}
      jQuery.get(uri, {}, function (data) {
        marker.marker.openInfoWindowHtml(data);
      });
    }
    // Tabbed content
    else if (marker.tabs) {
      var infoWinTabs = [];
      for (var m in marker.tabs) {
        if (marker.tabs.hasOwnProperty(m)) {
          infoWinTabs.push(new GInfoWindowTab(m, marker.tabs[m]));
        }
      }
      marker.marker.openInfoWindowTabsHtml(infoWinTabs);
    }
    // No content -- marker is a link
    else if (marker.link) {
      open(marker.link, '_self');
    }
  });

  obj.bind('markersready', function () {
    // If we are autozooming, set the map center at this time.
    if (obj.vars.behavior.autozoom) {
      if (!obj.bounds.isEmpty()) {
        obj.map.setCenter(obj.bounds.getCenter(), Math.min(obj.map.getBoundsZoomLevel(obj.bounds), obj.vars.maxzoom));
      }
    }
  });

  obj.bind('clearmarkers', function () {
    // Reset bounds if autozooming
    // @@@ Perhaps we should have a bounds for both markers and shapes?
    if (obj.vars.behavior.autozoom) {
      obj.bounds = new GLatLngBounds();
    }
  });

  // @@@ TODO: Some sort of bounds handling for deletemarker? We'd have to walk the whole thing to figure out the new bounds...
});
;

/**
 * @file
 * Common marker highlighting routines.
 */

/**
 * Highlights marker on rollover.
 * Removes highlight on previous marker.
 *
 * Creates a "circle" using 20-sided GPolygon at the given point
 * Circle polygon object is global variable as there is only one highlighted marker at a time
 * and we want to remove the previously placed polygon before placing a new one.
 * 
 * Original code "Google Maps JavaScript API Example"
 */
highlightMarker = function (map, currentMarker, highlightID, color) {
  var markerPoint = currentMarker.marker.getPoint();
  var polyPoints = Array();

  var mapNormalProj = G_NORMAL_MAP.getProjection();
  var mapZoom = map.getZoom();
  var clickedPixel = mapNormalProj.fromLatLngToPixel(markerPoint, mapZoom);

  var polySmallRadius = 20;
  var polyNumSides = 20;
  var polySideLength = 18;

  for (var a = 0; a < (polyNumSides + 1); a++) {
    var aRad = polySideLength * a * (Math.PI/180);
    var polyRadius = polySmallRadius; 
    var pixelX = clickedPixel.x + polyRadius * Math.cos(aRad);
    var pixelY = clickedPixel.y + polyRadius * Math.sin(aRad);
    var polyPixel = new GPoint(pixelX, pixelY);
    var polyPoint = mapNormalProj.fromPixelToLatLng(polyPixel, mapZoom);
    polyPoints.push(polyPoint);
  }
  // Using GPolygon(points,  strokeColor?,  strokeWeight?,  strokeOpacity?,  fillColor?,  fillOpacity?)
  map.highlightID = new GPolygon(polyPoints, color, 2, 0, color, 0.5);
  map.addOverlay(map.highlightID);
};

unHighlightMarker = function (map, currentMarker, highlightID) {
  if (map.highlightID) {
    map.removeOverlay(map.highlightID);
    delete map.highlightID;
  }
};
;

/**
 * @file
 * GIcon manager for GMap.
 * Required for markers to operate properly.
 */

/*global jQuery, Drupal, GIcon, GPoint, GSize, G_DEFAULT_ICON */

/**
 * Get the GIcon corresponding to a setname / sequence.
 * There is only one GIcon for each slot in the sequence.
 * The marker set wraps around when reaching the end of the sequence.
 * @@@ TODO: Move this directly into the preparemarker event binding.
 */
Drupal.gmap.getIcon = function (setname, sequence) {
  var othimg = ['printImage', 'mozPrintImage', 'printShadow', 'transparent'];
  // If no setname, return google's default icon.
  if (!setname) {
    return G_DEFAULT_ICON;
  }
  if (!this.gicons) {
    this.gicons = {};
  }

  // If no sequence, synthesise one.
  if (!sequence) {
    // @TODO make this per-map.
    if (!this.sequences) {
      this.sequences = {};
    }
    if (!this.sequences[setname]) {
      this.sequences[setname] = -1;
    }
    this.sequences[setname]++;
    sequence = this.sequences[setname];
  }

  if (!this.gicons[setname]) {
    if (!Drupal.gmap.icons[setname]) {
      alert('Request for invalid marker set ' + setname + '!');
    }
    this.gicons[setname] = [];
    var q = Drupal.gmap.icons[setname];
    var p, t;
    for (var i = 0; i < q.sequence.length; i++) {
      t = new GIcon();
      p = Drupal.gmap.iconpath + q.path;
      t.image = p + q.sequence[i].f;
      if (q.shadow.f !== '') {
        t.shadow = p + q.shadow.f;
        t.shadowSize = new GSize(q.shadow.w, q.shadow.h);
      }
      t.iconSize = new GSize(q.sequence[i].w, q.sequence[i].h);
      t.iconAnchor = new GPoint(q.anchorX, q.anchorY);
      t.infoWindowAnchor = new GPoint(q.infoX, q.infoY);
      for (var j = 0; j < othimg.length; j++) {
        if (q[othimg[j]] !== '') {
          t[othimg[j]] = p + q[othimg[j]];
        }
      }
      // @@@ imageMap?
      this.gicons[setname][i] = t;
    }
    delete Drupal.gmap.icons[setname];
  }
  // TODO: Random, other cycle methods.
  return this.gicons[setname][sequence % this.gicons[setname].length];
};

/**
 * JSON callback to set up the icon defs.
 * When doing the JSON call, the data comes back in a packed format.
 * We need to expand it and file it away in a more useful format.
 */
Drupal.gmap.iconSetup = function () {
  Drupal.gmap.icons = {};
  var m = Drupal.gmap.icondata;
  var filef, filew, fileh, files;
  for (var path in m) {
    if (m.hasOwnProperty(path)) {
      // Reconstitute files array
      filef = m[path].f;
      filew = Drupal.gmap.expandArray(m[path].w, filef.length);
      fileh = Drupal.gmap.expandArray(m[path].h, filef.length);
      files = [];
      for (var i = 0; i < filef.length; i++) {
        files[i] = {f : filef[i], w : filew[i], h : fileh[i]};
      }

      for (var ini in m[path].i) {
        if (m[path].i.hasOwnProperty(ini)) {
          jQuery.extend(Drupal.gmap.icons, Drupal.gmap.expandIconDef(m[path].i[ini], path, files));
        }
      }
    }
  }
};

/**
 * Expand a compressed array.
 * This will pad arr up to len using the last value of the old array.
 */
Drupal.gmap.expandArray = function (arr, len) {
  var d = arr[0];
  for (var i = 0; i < len; i++) {
    if (!arr[i]) {
      arr[i] = d;
    }
    else {
      d = arr[i];
    }
  }
  return arr;
};

/**
 * Expand icon definition.
 * This helper function is the reverse of the packer function found in
 * gmap_markerinfo.inc.
 */
Drupal.gmap.expandIconDef = function (c, path, files) {
  var decomp = ['key', 'name', 'sequence', 'anchorX', 'anchorY', 'infoX',
    'infoY', 'shadow', 'printImage', 'mozPrintImage', 'printShadow',
    'transparent'];
  var fallback = ['', '', [], 0, 0, 0, 0, {f: '', h: 0, w: 0}, '', '', '', ''];
  var imagerep = ['shadow', 'printImage', 'mozPrintImage', 'printShadow',
    'transparent'];
  var defaults = {};
  var sets = [];
  var i, j;
  // Part 1: Defaults / Markersets
  // Expand arrays and fill in missing ones with fallbacks
  for (i = 0; i < decomp.length; i++) {
    if (!c[0][i]) {
      c[0][i] = [ fallback[i] ];
    }
    c[0][i] = Drupal.gmap.expandArray(c[0][i], c[0][0].length);
  }
  for (i = 0; i < c[0][0].length; i++) {
    for (j = 0; j < decomp.length; j++) {
      if (i === 0) {
        defaults[decomp[j]] = c[0][j][i];
      }
      else {
        if (!sets[i - 1]) {
          sets[i - 1] = {};
        }
        sets[i - 1][decomp[j]] = c[0][j][i];
      }
    }
  }
  for (i = 0; i < sets.length; i++) {
    for (j = 0; j < decomp.length; j++) {
      if (sets[i][decomp[j]] === fallback[j]) {
        sets[i][decomp[j]] = defaults[decomp[j]];
      }
    }
  }
  var icons = {};
  for (i = 0; i < sets.length; i++) {
    var key = sets[i].key;
    icons[key] = sets[i];
    icons[key].path = path;
    delete icons[key].key;
    delete sets[i];
    for (j = 0; j < icons[key].sequence.length; j++) {
      icons[key].sequence[j] = files[icons[key].sequence[j]];
    }
    for (j = 0; j < imagerep.length; j++) {
      if (typeof(icons[key][imagerep[j]]) === 'number') {
        icons[key][imagerep[j]] = files[icons[key][imagerep[j]]];
      }
    }
  }
  return icons;
};

/**
 * We attach ourselves if we find a map somewhere needing markers.
 * Note: Since we broadcast our ready event to all maps, it doesn't
 * matter which one we attached to!
 */
Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  obj.bind('init', function () {
    // Only expand once.
    if (!Drupal.gmap.icons) {
      Drupal.gmap.iconSetup();
    }
  });

  obj.bind('ready', function () {
    // Compatibility event.
    if (Drupal.gmap.icondata) {
      obj.deferChange('iconsready', -1);
    }
  });

  if (!obj.vars.behavior.customicons) {
    // Provide icons to markers.
    obj.bind('preparemarker', function (marker) {
      marker.opts.icon = Drupal.gmap.getIcon(marker.markername, marker.offset);
    });
  }
});
;
