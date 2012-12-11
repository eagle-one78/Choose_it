create fallowing in your template.php

function mythemename_views_mini_pager($variables) {
  
  // Number of pager elements, i.e if 3 pager will be  << 1-5 6-10 11-15 >>
  $variables['quantity'] = 3; 
  
  // Number of records returned by the view, 
  // Important! Set to be the same as in the view edit screen, pager section
  $items_per_page = 5; 
  
  // images for first, previous etc buttons, put images in your_theme/images folder
  // coment out if you do not want to use images and want to use << First , < Previous etc instead
  $variables['tags'][0] = 'bt_first.png';
  $variables['tags'][1] = 'bt_prev.png';
  $variables['tags'][3] = 'bt_next.png';
  $variables['tags'][4] = 'bt_last.png';
  
  // Second argument is "How many records per page the view displays". Default 5.
  return '<div id="my_custom_pager">' . darko_views_mini_pager($variables, $items_per_page) . '</div>';
}

and creae appropriate theme template
see http://www.cyber-sundae.com/create-custom-pager-view-drupal-7-howto

drop all caches