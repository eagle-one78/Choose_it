<?php
if (arg(0) == 'places' && arg(1) == NULL) {
  require_once (drupal_get_path('module', 'places') . '/places_view.tpl.php');
}
if (arg(1) == 'insert-places'){
  require_once (drupal_get_path('module', 'places') . '/insert_places.tpl.php');
}
if (arg(1) == 'edit-place'){
  require_once (drupal_get_path('module', 'places' ) . '/edit_places.tpl.php');
}
if (arg(1) == 'rating'){
  require_once (drupal_get_path('module', 'places' ) . '/place_rating.tpl.php');
}
