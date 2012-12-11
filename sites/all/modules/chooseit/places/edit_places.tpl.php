<?php
  $placeObject = new Place();
  $place = $placeObject->get_place_from_DB_by(arg(2));
  if(isset($place) && user_access(PERMISSION_EDIT_PLACE)): ?>
    <div class="edit-place-div">
      <label for="edit-place-form">ÄNDRA PLATS</label>
      <form class="edit-place-form" action="?q=place/edit" method="post">
        <label for="place-name-field">Platsnamn</label>
        <input type="text" name="edit_place_name" class="place-name-field" value="<?php echo htmlspecialchars($place['name']); ?>"/>

        <label for="place-formatted-address-field">Platsadress</label>
        <input type="text" name="edit_formatted_address" class="place-address-field" value="<?php echo htmlspecialchars($place['formatted_address']); ?>"/>

        <label for="place-edit-website-field">Webbadress</label>
        <input type="text" name="edit_website" class="place-website-field" value="<?php echo htmlspecialchars($place['website']); ?>"/>

        <label for="place-type-field">Telefonnummer</label>
        <input type="text" name="edit_phone_number" class="place-phone-number-field" value="<?php echo htmlspecialchars($place['phone_number']); ?>"/>

        <input type="hidden" name="edit_place_id" value="<?php echo htmlspecialchars($place['id']); ?>" />
        <input type="submit" name="edit_place" value="Uppdatera" class="place-insert-button"/>
        <input type="submit" name="delete_place" value="Ta bort" class="place-delete-button" />
      </form>
    </div>
  <?php endif; ?>
