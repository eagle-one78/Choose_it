<?php
if (arg(0) == 'news' && arg(1) == NULL) {
  include (drupal_get_path('module', 'news').'/news_display.tpl.php');
}
if (arg(0) == 'news' && arg(1) == 'insert'){
  include (drupal_get_path('module', 'news').'/news_insert.tpl.php');
}
if (arg(0) == 'news' && arg(1) == 'edit'){
  include (drupal_get_path('module', 'news').'/news_edit.tpl.php');
}
