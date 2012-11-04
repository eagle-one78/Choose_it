<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of categories_class
 *
 * @author Sam
 */
class Category {
//  private $catId;
  private $db;


  function __construct() {
    $this->db = Database::getConnection();
//    $this->catId = $catId;
  }

  /**
   * Gets the categoriy that match the id
   * @param type int $catId
   * @return type array $categories
   */
  public function get_category_from_DB_by($catId) {
    $query = db_select('categories', 'cat')
    ->fields('cat')
    ->condition('cat.id', $catId, '=')
    ->orderBy('name')
    ->execute();
    $categoriesById = $query->fetchAll();
    return $categoriesById;
  }

  /**
   * Gets All the categories from the DB
   * @return type array $categories
   */
  public function get_all_categories_from_DB() {
    $query = db_select('categories', 'cat')
    ->fields('cat', array('id', 'name', 'discription'))
    ->orderBy('name')
    ->execute();
    $categories = $query->fetchAll();
    return $categories;
  }

  /**
   * Inserts categories to the database with the posted variables
   * @param array $_POST
   */
  public function insert_category($post) {
    db_insert('categories')
      ->fields(array(
        'name' => $post['category_name'],
        'description' => $post['category_descrption'],
      ))
      ->execute();
  }

}
