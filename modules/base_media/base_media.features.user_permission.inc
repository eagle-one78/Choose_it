<?php
/**
 * @file
 * base_media.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function base_media_user_default_permissions() {
  $permissions = array();

  // Exported permission: add media from remote sources.
  $permissions['add media from remote sources'] = array(
    'name' => 'add media from remote sources',
    'roles' => array(
      0 => 'administrator',
      1 => 'contributor',
      2 => 'editor',
      3 => 'manager',
    ),
    'module' => 'media_internet',
  );

  // Exported permission: administer files.
  $permissions['administer files'] = array(
    'name' => 'administer files',
    'roles' => array(
      0 => 'administrator',
      1 => 'editor',
      2 => 'manager',
    ),
    'module' => 'file_entity',
  );

  // Exported permission: edit file.
  $permissions['edit file'] = array(
    'name' => 'edit file',
    'roles' => array(
      0 => 'administrator',
      1 => 'contributor',
      2 => 'editor',
      3 => 'manager',
    ),
    'module' => 'file_entity',
  );

  return $permissions;
}
