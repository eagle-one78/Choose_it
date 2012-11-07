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
function GScript(src) {document.write('<' + 'script src="' + src + '"' +' type="text/javascript"><' + '/script>');}function GBrowserIsCompatible() {return !!document.getElementById;}function GApiInit() {if (GApiInit.called) return;GApiInit.called = true;window.GAddMessages && GAddMessages({160: '\x3cH1\x3eServer Error\x3c/H1\x3eThe server encountered a temporary error and could not complete your request.\x3cp\x3ePlease try again in a minute or so.\x3c/p\x3e',1415: '.',1416: ',',1547: 'mi',1616: 'km',4100: 'm',4101: 'ft',10018: 'Loading...',10021: 'Zoom In',10022: 'Zoom Out',10024: 'Drag to zoom',10029: 'Return to the last result',10049: 'Map',10050: 'Satellite',10093: 'Terms of Use',10111: 'Map',10112: 'Sat',10116: 'Hybrid',10117: 'Hyb',10120: 'We are sorry, but we don\x27t have maps at this zoom level for this region.\x3cp\x3eTry zooming out for a broader look.\x3c/p\x3e',10121: 'We are sorry, but we don\x27t have imagery at this zoom level for this region.\x3cp\x3eTry zooming out for a broader look.\x3c/p\x3e',10507: 'Pan left',10508: 'Pan right',10509: 'Pan up',10510: 'Pan down',10511: 'Show street map',10512: 'Show satellite imagery',10513: 'Show imagery with street names',10806: 'Click to see this area on Google Maps',10807: 'Traffic',10808: 'Show Traffic',10809: 'Hide Traffic',12150: '%1$s on %2$s',12151: '%1$s on %2$s at %3$s',12152: '%1$s on %2$s between %3$s and %4$s',10985: 'Zoom in',10986: 'Zoom out',11047: 'Center map here',11089: '\x3ca href\x3d\x22javascript:void(0);\x22\x3eZoom In\x3c/a\x3e to see traffic for this region',11259: 'Full-screen',11751: 'Show street map with terrain',11752: 'Style:',11757: 'Change map style',11758: 'Terrain',11759: 'Ter',11794: 'Show labels',11303: 'Street View Help',11274: 'To use street view, you need Adobe Flash Player version %1$d or newer.',11382: 'Get the latest Flash Player.',11314: 'We\x27re sorry, street view is currently unavailable due to high demand.\x3cbr\x3ePlease try again later!',1559: 'N',1560: 'S',1561: 'W',1562: 'E',1608: 'NW',1591: 'NE',1605: 'SW',1606: 'SE',11907: 'This image is no longer available',10041: 'Help',12471: 'Current Location',12492: 'Earth',12823: 'Google has disabled usage of the Maps API for this application. See the Terms of Service for more information: %1$s.',12822: 'http://code.google.com/apis/maps/terms.html',12915: 'Improve the map',12916: 'Google, Europa Technologies',13171: 'Hybrid 3D',0: ''});}var GLoad;(function() {GLoad = function(apiCallback) {var callee = arguments.callee;GApiInit();var opts = {export_legacy_names:true,tile_override:[{maptype:0,min_zoom:"7",max_zoom:"7",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1293600000}},{lo:{lat_e7:366500000,lng_e7:1297000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:0,min_zoom:"8",max_zoom:"8",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:345000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:354690000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:0,min_zoom:"9",max_zoom:"9",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:340000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:348900000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1302000000}},{lo:{lat_e7:368300000,lng_e7:1302000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:0,min_zoom:"10",max_zoom:"19",rect:[{lo:{lat_e7:329890840,lng_e7:1246055600},hi:{lat_e7:386930130,lng_e7:1284960940}},{lo:{lat_e7:344646740,lng_e7:1284960940},hi:{lat_e7:386930130,lng_e7:1288476560}},{lo:{lat_e7:350277470,lng_e7:1288476560},hi:{lat_e7:386930130,lng_e7:1310531620}},{lo:{lat_e7:370277730,lng_e7:1310531620},hi:{lat_e7:386930130,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"7",max_zoom:"7",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1293600000}},{lo:{lat_e7:366500000,lng_e7:1297000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"8",max_zoom:"8",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:345000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:354690000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"9",max_zoom:"9",rect:[{lo:{lat_e7:330000000,lng_e7:1246050000},hi:{lat_e7:386200000,lng_e7:1279600000}},{lo:{lat_e7:340000000,lng_e7:1279600000},hi:{lat_e7:386200000,lng_e7:1286700000}},{lo:{lat_e7:348900000,lng_e7:1286700000},hi:{lat_e7:386200000,lng_e7:1302000000}},{lo:{lat_e7:368300000,lng_e7:1302000000},hi:{lat_e7:386200000,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]},{maptype:3,min_zoom:"10",rect:[{lo:{lat_e7:329890840,lng_e7:1246055600},hi:{lat_e7:386930130,lng_e7:1284960940}},{lo:{lat_e7:344646740,lng_e7:1284960940},hi:{lat_e7:386930130,lng_e7:1288476560}},{lo:{lat_e7:350277470,lng_e7:1288476560},hi:{lat_e7:386930130,lng_e7:1310531620}},{lo:{lat_e7:370277730,lng_e7:1310531620},hi:{lat_e7:386930130,lng_e7:1314843700}}],uris:["http://mt0.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt1.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt2.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26","http://mt3.gmaptiles.co.kr/mt/v=kr1p.17\x26hl=en\x26src=api\x26"]}],jsmain:"http://maps.gstatic.com/intl/en_ALL/mapfiles/400d/maps2.api/main.js",obliques_urls:["http://khm0.googleapis.com/kh?v=64\x26src=app\x26","http://khm1.googleapis.com/kh?v=64\x26src=app\x26"],token:"3442658515",jsmodule_base_url:"http://maps.gstatic.com/intl/en_ALL/mapfiles/400d/maps2.api",generic_tile_urls:["http://mt0.googleapis.com/vt?hl=en\x26src=api\x26","http://mt1.googleapis.com/vt?hl=en\x26src=api\x26"],ignore_auth:false,sv_host:"http://cbk0.google.com"};apiCallback(["http://mt0.googleapis.com/vt/lyrs\x3dm@196000000\x26hl\x3den\x26src\x3dapi\x26","http://mt1.googleapis.com/vt/lyrs\x3dm@196000000\x26hl\x3den\x26src\x3dapi\x26"], ["http://khm0.googleapis.com/kh/v\x3d119\x26src\x3dapp\x26","http://khm1.googleapis.com/kh/v\x3d119\x26src\x3dapp\x26"], ["http://mt0.googleapis.com/vt/lyrs\x3dh@196000000\x26hl\x3den\x26src\x3dapi\x26","http://mt1.googleapis.com/vt/lyrs\x3dh@196000000\x26hl\x3den\x26src\x3dapi\x26"],""  ,""  ,""  ,true,"google.maps.",opts,["http://mt0.googleapis.com/vt/lyrs\x3dt@129,r@196000000\x26hl\x3den\x26src\x3dapi\x26","http://mt1.googleapis.com/vt/lyrs\x3dt@129,r@196000000\x26hl\x3den\x26src\x3dapi\x26"]);if (!callee.called) {callee.called = true;}}})();function GUnload() {if (window.GUnloadApi) {GUnloadApi();}}var _mIsRtl = false;var _mHost = "http://maps.google.com";var _mUri = "/maps";var _mDomain = "google.com";var _mStaticPath = "http://maps.gstatic.com/intl/en_ALL/mapfiles/";var _mJavascriptVersion = G_API_VERSION = "400d";var _mTermsUrl = "http://www.google.com/intl/en_ALL/help/terms_maps.html";var _mLocalSearchUrl = "http://www.google.com/uds/solutions/localsearch/gmlocalsearch.js";var _mHL = "en";var _mGL = "";var _mTrafficEnableApi = true;var _mTrafficTileServerUrls = ["http://mt0.google.com/mapstt","http://mt1.google.com/mapstt","http://mt2.google.com/mapstt","http://mt3.google.com/mapstt"];var _mCityblockLatestFlashUrl = "http://maps.google.com/local_url?dq=&amp;q=http://www.adobe.com/shockwave/download/download.cgi%3FP1_Prod_Version%3DShockwaveFlash&amp;s=ANYYN7manSNIV_th6k0SFvGB4jz36is1Gg";var _mCityblockFrogLogUsage = false;var _mCityblockInfowindowLogUsage = false;var _mCityblockUseSsl = false;var _mSatelliteToken = "fzwq2uL5EG1zyGPGbeT8p88w65UdTTGrEd7e6A";var _mMapCopy = "Map data \x26#169;2012 ";var _mSatelliteCopy = "Imagery \x26#169;2012 ";var _mGoogleCopy = "\x26#169;2012 Google";var _mPreferMetric = false;var _mDirectionsEnableApi = true;var _mLayersTileBaseUrls = ['http://mt0.google.com/mapslt','http://mt1.google.com/mapslt','http://mt2.google.com/mapslt','http://mt3.google.com/mapslt'];var _mLayersFeaturesBaseUrl = "http://mt0.google.com/vt/ft";function GLoadMapsScript() {if (!GLoadMapsScript.called && GBrowserIsCompatible()) {GLoadMapsScript.called = true;GScript("http://maps.gstatic.com/intl/en_ALL/mapfiles/400d/maps2.api/main.js");}}(function() {if (!window.google) window.google = {};if (!window.google.maps) window.google.maps = {};var ns = window.google.maps;ns.BrowserIsCompatible = GBrowserIsCompatible;ns.Unload = GUnload;})();GLoadMapsScript();;
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
