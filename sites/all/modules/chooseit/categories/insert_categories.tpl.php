<?php if (arg(1) == 'insert-category') : ?>
<div class="insert-category-div">
  <form class="insert-category-form" action="?q=categories" method="post">
    <label for="category-name-field">Kategori namn</label>
    <input type="text" name="category_name" class="category-name-field" />

    <label for="category-discription-field">Kategori beskrivning</label>
    <textarea cols="15" rows="4" name="category_discription" class="category-discription-text" ></textarea>
    <input type="submit" name="insert_category" value="Lägg till" />
  </form>
</div>
<?php endif; ?>