<?php

/**
 * @file
 * The main class for proccessing the places, whether inserted from the template or by the Google Places API user preformed search with AJAX
 * Manages the rating functionality insertion to the database with some validation, and returns the required params to the module for furthur process.
 */

/**
 * Description of Places class
 *
 * @author Sam Almendwi
 */
class Place {

  private $db;

  /**
   * Make the DB connection from the construct function
   */
  function __construct() {
    $this->db = Database::getConnection ();
  }

  /**
   * Gets the place that match the id
   * @param type int $catId
   * @return type array $placesById
   */
  public function get_place_from_DB_by($placeId) {
    $query = db_select('places', 'pl')
      ->fields('pl')
      ->condition('pl.id', $placeId, '=')
      ->orderBy('name')
      ->execute();
    $placesById = $query->fetchAssoc();
    return $placesById;
  }

/**
 *Get place all params from DB according to the supplied ID
 * @param int $placeId
 * @return array
 */
  public function get_place_params_from_DB_by($placeId) {
    $query = db_select('places', 'pl')
      ->fields('pl')
      ->condition('pl.id', $placeId, '=')
      ->orderBy('name')
      ->execute();
    $placesById = $query->fetchAll();
    return $placesById;
  }

  /**
   *
   * @param type $name
   * @param type $address
   * @return type
   */
  public function get_places_from_DB_by($name, $address) {
    $query = db_select('places', 'pl')
      ->fields('pl')
      ->condition('pl.name', $name, '=')
      ->condition('pl.formatted_address', $address, '=')
      ->orderBy('name')
      ->execute();
    $placesAccordingToParams = $query->fetchAssoc();
    return $placesAccordingToParams;
  }

  /**
   * Get the choose it! rate for the place with the supplied id
   * @param type int $id
   * @return type array $place_rate
   */
  public function get_places_rate_from_DB_by($id) {
    $query = db_select('places', 'pl')
      ->fields('pl', array('chooseit_rating', 'rating_count'))
      ->condition('pl.id', $id, '=')
      ->execute();
    $place_rate = $query->fetchAssoc();
    return $place_rate;
  }

  /**
   * Gets All the places from the DB
   * @return type array $places
   */
  public function get_all_places_from_DB() {
    $query = db_select('places', 'pl')
      ->fields('pl')
      ->orderBy('name')
      ->execute();
    $places = $query->fetchAll();
    return $places;
  }

  /**
   * Inserts place to the database with the posted variables
   * @param array $_POST
   */
  public function insert_place($post) {
    db_insert('places')
      ->fields(array(
        'name' => $post['place_name'],
        'formatted_address' => $post['formatted_address'],
        'website' => $post['website'],
        'phone_number' => $post['phone_number']
      ))
      ->execute();
  }

  /**
   * Inserts place to the database with the posted variables with AJAX
   * Check if place exists no insert else insert
   * @param array $_POST
   * @return Boolean, array $placeId
   */
  public function insert_place_ajax($post) {
    $name = '';
    $address = '';
    $process = FALSE;

    //Create a self instance of the class
    $placesObject = new Place();
    //Get all places from the daabase
    $places = $placesObject->get_all_places_from_DB();

    /*
     * Loop throw the places and check if the posted data match with any existing place and return TRUE to exit
     * else procced to save the new place to data base
     */
    foreach ($places as $key => $value) {
      $name = $value->name;
      $address = $value->formatted_address;
      if ($name == $post['place_name'] && $address == $post['formatted_address']) {
        echo 'place_exists';
        $process = TRUE;
      }
    }
    if ($process == FALSE) {
      db_insert('places')
        ->fields(array(
          'name' => $post['place_name'],
          'formatted_address' => $post['formatted_address'],
          'google_rating' => $post['google_rating'],
          'website' => $post['website'],
          'phone_number' => $post['phone_number'],
          'place_comment' => ''
        ))
        ->execute();
      echo 'success';

      //Return the id of the newly created place back to the applikation with AJAX to sow the place and preform rating
      $query = db_select('places', 'pl')
        ->fields('pl', array('id'))
        ->condition('pl.name', $post['place_name'], '=')
        ->condition('pl.formatted_address', $post['formatted_address'], '=')
        ->execute();
      $placeId = $query->fetchAssoc();
      return $placeId;
    }
    elseif ($process == TRUE) {
      return FALSE;
      exit();
    }
  }

  /**
   * Edit place with the posted variables
   * @param array $_POST
   */
  public function edit_place($post) {
    db_update('places')
      ->fields(array(
        'name' => $post['edit_place_name'],
        'formatted_address' => $post['edit_formatted_address'],
        'website' => $post['edit_website'],
        'phone_number' => $post['edit_phone_number']
      ))
      ->condition('id', $post['edit_place_id'], '=')
      ->execute();
  }

  /**
   * Delete place from the database by id
   * @param array $_POST placeId
   */
  public function delete_place($placeId) {
    db_delete('places')
      ->condition('id', $placeId, '=')
      ->execute();
  }

  /**
   *Inserts the place rate to the DB.
   * @global type $user
   * @param type $_POST
   * @return mixed boolean, string
   */
  public function insert_place_rate($post) {
    $placeId = '0';
    $userIdOnDb = '';
    $usersIdOnDb = array();
    $IdOnDb = array();
    $currentRate = '';
    $currentRatingCount = '';
    global $user;
    $process = FALSE;
    $userId = '0';
    if ($user) {
      $userId = $user->uid;
    }
    else {
      $userId = '0';
    }

    //Create a self instance of the class
    $placesObject = new Place();
    //Get all places from the database
    $places = $placesObject->get_place_params_from_DB_by($post['place_id']);

    /*
     * Loop throw the places and check if the posted data match with any existing place and return TRUE to exit
     * else procced to save the new place to data base
     */
    foreach ($places as $value) {
      $placeId = $value->id;
      $userIdOnDb = $value->rating_user_id;
      $usersIdOnDb = explode(',', $userIdOnDb);
      $currentRatingCount = $value->rating_count;
      foreach ($usersIdOnDb as $id) {
        $IdOnDb[] = $id;
      }

      /*Validate if the place is the same at the db and the one rated, the user already rated the place, and if the rate is'nt 0
       * return string to AJAX
       * and the failure process boolean variable sets to TRUE
      */
      if ($placeId == $post['place_id'] && in_array($userId, $IdOnDb)  && $post['chooseit_rate'] != '0') {
        $rateExists = 'user_rate_exists';
        $process = TRUE;
        return $rateExists;
      }
      //Validate if the user is a guest user and return string to the AJAX
      if ($placeId == $post['place_id'] && $userId == '0' && $post['chooseit_rate'] != '0') {
        $guestUser = 'guest_user';
        $process = TRUE;
        return $guestUser;
      }
    }
    /**
     * If validation is ok process the rate insertion to DB with some math to get the statistics on the right step and return string success to AJAX
     */
    if ($process == FALSE) {
      $currentRate = $places[0]->chooseit_rating;
      $newRate = $currentRate + $post['chooseit_rate'];
      $currentRatingCount = $currentRatingCount + 1;
      $newUserId = $userIdOnDb . ', ' . $userId;
      db_update('places')
        ->fields(array(
          'chooseit_rating' =>  $newRate,
          'rating_user_id' => $newUserId,
          'rating_count' => $currentRatingCount
        ))
        ->condition('id', $post['place_id'], '=')
        ->execute();
     $success = 'success';
     return $success;
    }
    //Else if all above not work return FALSE and abort
    elseif ($process == TRUE) {
      return FALSE;
    }
  }


/**
 *Gets the rating params from the database and process the maths to get the average rating for the place
 * @param int $id
 * @return float $rateAverage
 */
  public function get_place_average_rate($id) {
    header('Content-Type: application/json');
    $placesObject = new Place();
    $place_rate = $placesObject->get_places_rate_from_DB_by($id);
    $rateLevel = $place_rate['chooseit_rating'];
    $rateCount = $place_rate['rating_count'];
    $rateMaxLevel = $rateLevel / $rateCount;
    $rateAverage = $rateMaxLevel / 20;
    return $rateAverage;
  }

}
