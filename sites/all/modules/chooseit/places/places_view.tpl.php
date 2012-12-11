<?php if (user_access (PERMISSION_INSERT_PLACE)): ?>
  <div class="insert-new-place">
    <a class="insert-new-place-link" href="?q=places/insert-places">
      Lägg till en ny plats
    </a>
  </div>
<?php endif; ?>
<?php if (isset ($placesInfo) && $placesInfo && user_access (PERMISSION_VIEW_PLACE)): ?>
  <div class="ajax-message"></div>
  <div class="places-container">
    <ul class="places-list">
      <?php foreach ($placesInfo as $place): ?>

        <li class="place-list-item">
          <input type="hidden" value="<?php echo htmlspecialchars($place->id); ?>" />
          <div class="place-info-header">
            <h2><?php echo htmlspecialchars(isset($place->name) ? $place->name : ''); ?></h2>
            <label for="place-address">Adress:<p class="place-address"><?php echo htmlspecialchars(isset($place->formatted_address) ? $place->formatted_address : ''); ?></p></label>
          </div>
          <div class="place-div">
            <label for="phone-number">Telefon:<p class="phone-number"><?php echo htmlspecialchars(isset($place->phone_number) ? $place->phone_number : ''); ?></p></label>
            <label for="google-rating">Googles omdöme:<p class="google-rating"><?php echo htmlspecialchars(isset($place->google_rating) ? $place->google_rating : ''); ?></p></label>
            <label for="chooseit-rating">Choose it! omdöme:<p class="chooseit-rating"><?php echo htmlspecialchars(isset($place->chooseit_rating) ? $place->chooseit_rating : ''); ?></p></label>
            <label for="place-website-view">URL:
              <a class="place-webbsite-view" href="<?php echo htmlspecialchars(isset ($place->website) ? $place->website : ''); ?>" target="_blank">
                <?php echo htmlspecialchars(isset ($place->website) ? $place->website : ''); ?>
              </a>
            </label>
            <div class="edit-place-area">
              <a class="edit-place-link" href="?q=places/edit-place/<?php echo htmlspecialchars($place->id); ?>">
                Redigera plats
              </a>
            </div>
            <div class="rating-place-area">
              <a class="rating-place-link" href="?q=places/rating&name=<?php echo htmlspecialchars($place->name) . '&address=' . htmlspecialchars($place->formatted_address); ?>">
                Ge omdöme!
              </a>
            </div>
          </div>
        </li>

      <?php endforeach; ?>
    </ul>
    <div class="page_navigation"></div>
  </div>
<?php endif; ?>
