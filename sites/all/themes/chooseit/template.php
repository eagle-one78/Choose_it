<?php

/**
 * Add body classes if certain regions have content.
 */
function chooseit_preprocess_html (&$variables) {
  if (!empty ($variables['page']['featured'])) {
    $variables['classes_array'][] = 'featured';
  }

  if (!empty ($variables['page']['triptych_first'])
    || !empty ($variables['page']['triptych_middle'])
    || !empty ($variables['page']['triptych_last'])) {
    $variables['classes_array'][] = 'triptych';
  }

  if (!empty ($variables['page']['footer_firstcolumn'])
    || !empty ($variables['page']['footer_secondcolumn'])
    || !empty ($variables['page']['footer_thirdcolumn'])
    || !empty ($variables['page']['footer_fourthcolumn'])) {
    $variables['classes_array'][] = 'footer-columns';
  }
  //Add conditional JS scripts here
  //Choose it! globals JS
  drupal_add_js (drupal_get_path ('theme', 'chooseit') . 'scripts/chooseit_globals.js', 'theme');
//Google API external JS
  drupal_add_js ('http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB3H5hndXWs4dwj4QLksPXff69gVfUwvow&sensor=true', 'external');

  // Add conditional stylesheets for IE
  drupal_add_css (path_to_theme () . '/css/ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 7', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css (path_to_theme () . '/css/ie6.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 6', '!IE' => FALSE), 'preprocess' => FALSE));
}

/**
 * Override or insert variables into the page template for HTML output.
 */
function chooseit_process_html (&$variables) {
  // Hook into color.module.
  if (module_exists ('color')) {
    _color_html_alter ($variables);
  }
}

/**
 * Override or insert variables into the page template.
 */
function chooseit_process_page (&$variables) {
  // Hook into color.module.
  if (module_exists ('color')) {
    _color_page_alter ($variables);
  }
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name'] = theme_get_setting ('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting ('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin (variable_get ('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin (variable_get ('site_slogan', ''));
  }
  // Since the title and the shortcut link are both block level elements,
  // positioning them next to each other is much simpler with a wrapper div.
  if (!empty ($variables['title_suffix']['add_or_remove_shortcut']) && $variables['title']) {
    // Add a wrapper div using the title_prefix and title_suffix render elements.
    $variables['title_prefix']['shortcut_wrapper'] = array(
      '#markup' => '<div class="shortcut-wrapper clearfix">',
      '#weight' => 100,
    );
    $variables['title_suffix']['shortcut_wrapper'] = array(
      '#markup' => '</div>',
      '#weight' => -99,
    );
    // Make sure the shortcut link is the first item in title_suffix.
    $variables['title_suffix']['add_or_remove_shortcut']['#weight'] = -100;
  }
}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function chooseit_preprocess_maintenance_page (&$variables) {
  // By default, site_name is set to Drupal if no db connection is available
  // or during site installation. Setting site_name to an empty string makes
  // the site and update pages look cleaner.
  // @see template_preprocess_maintenance_page
  if (!$variables['db_is_active']) {
    $variables['site_name'] = '';
  }
  drupal_add_css (drupal_get_path ('theme', 'chooseit') . '/css/maintenance-page.css');
}

/**
 * Override or insert variables into the maintenance page template.
 */
function chooseit_process_maintenance_page (&$variables) {
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name'] = theme_get_setting ('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting ('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin (variable_get ('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin (variable_get ('site_slogan', ''));
  }
}

/**
 * Override or insert variables into the node template.
 */
function chooseit_preprocess_node (&$variables) {
  if ($variables['view_mode'] == 'full' && node_is_page ($variables['node'])) {
    $variables['classes_array'][] = 'node-full';
  }
}

/**
 * Override or insert variables into the block template.
 */
function chooseit_preprocess_block (&$variables) {
  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }
}

/**
 * Implements theme_menu_tree().
 */
function chooseit_menu_tree ($variables) {
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_field__field_type().
 */
function chooseit_field__taxonomy_term_reference ($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render ($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array ('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}

function chooseit_views_mini_pager ($variables) {

// Number of pager elements, i.e if 3 pager will be 1-5 6-10 11-15
  $variables['quantity'] = 8;

// Number of records returned by the view,
// Important! Set to be the same as in the view edit screen, pager section
  $items_per_page = 5;

// images for first, previous etc buttons, put images in your_theme/images folder
// coment out if you do not want to use images and want to use $variables['tags'][0] = 'bt_first.png';
  $variables['tags'][1] = 'bt_prev.png';
  $variables['tags'][3] = 'bt_next.png';
  $variables['tags'][4] = 'bt_last.png';

// Second argument is "How many records per page the view displays". Default 5.
  return views_mini_pager ($variables, $items_per_page);
}
