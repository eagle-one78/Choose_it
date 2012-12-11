<div class="insert-place-div">
  <label for="insert-place-form">LÄGG TILL EN NY PLATS</label>
  <form class="insert-place-form" action="?q=places/insert" method="post">
    <label for="place-name-field">Platsnamn</label>
    <input type="text" name="place_name" class="place-name-field" />
    <label for="place-name-field">Platsadress</label>
    <input type="text" name="formatted_address" class="place-address-field" />
    <label for="place-website-field">Webbadress</label>
    <input type="text" name="website" class="place-website-field" />
    <label for="place-website-field">Telefonnummer</label>
    <input type="text" name="phone_number" class="place-phone-number-field" />
    <input type="submit" name="insert_place" value="Lägg till"  class="place-insert-button"/>
  </form>
</div>