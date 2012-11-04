<?php
/**
 * @file
 * base_core.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function base_core_user_default_roles() {
  $roles = array();

  // Exported role: administrator.
  $roles['administrator'] = array(
    'name' => 'administrator',
    'weight' => '50',
    'machine_name' => 'administrator',
  );

  // Exported role: contributor.
  $roles['contributor'] = array(
    'name' => 'contributor',
    'weight' => '20',
    'machine_name' => 'contributor',
  );

  // Exported role: editor.
  $roles['editor'] = array(
    'name' => 'editor',
    'weight' => '30',
    'machine_name' => 'editor',
  );

  // Exported role: manager.
  $roles['manager'] = array(
    'name' => 'manager',
    'weight' => '40',
    'machine_name' => 'manager',
  );

  return $roles;
}
