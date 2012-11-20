<?php
if (arg(0) == 'categories' && arg(1) == NULL) {
  include (drupal_get_path('module', 'categories').'/categories_view.tpl.php');
}
if (arg(1) == 'insert-categories'){
  include (drupal_get_path('module', 'categories').'/insert_categories.tpl.php');
}
if (arg(1) == 'edit-category'){
  include (drupal_get_path('module', 'categories').'/edit_category.tpl.php');
}
