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
