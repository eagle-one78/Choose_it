<div class="insert-category-div">
  <form class="insert-category-form" action="?q=categories/insert" method="post">
    <label for="category-name-field">Kategorinamn</label>
    <input type="text" name="category_name" class="category-name-field" />

    <label for="category-type-field">Kategorityp</label>
    <input type="radio" name="category_type" class="category-type-field" value="Huvudkategori"/>Huvudkategori
    <input type="radio" name="category_type" class="category-type-field" value="Underkategori"/>Underkategori

    <label for="category-description-field">Kategoribeskrivning</label>
    <textarea cols="15" rows="4" name="category_description" class="category-description-text" ></textarea>
    <input type="submit" name="insert_category" value="Lägg till" />
  </form>
</div>