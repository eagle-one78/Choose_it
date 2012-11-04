<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of news_class
 *
 * @author Sam
 */
class News {
  private $db;

  function __construct() {
    $this->db = Database::getConnection();
  }

  /**
   * Gets all the news from database news table
   */
  public function  get_all_news() {
    $query = db_select('news', 'n')
      ->fields('n')
      ->orderBy('title')
      ->execute();
    $news = $query->fetchAll();
    return $news;
  }

  public function insert_news_to_db($newsTitle, $newsText) {
    $query = db_insert('news')
      ->fields(array(
        'title'         => $newsTitle,
        'news_text'     => $newsText,
        'date_created'  => date("Y-m-d H:i:s"),
      ))
      ->execute();
  }
  
}
