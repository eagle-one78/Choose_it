<?php
  $categoryObject = new Category();
  $category = $categoryObject->get_category_from_DB_by(arg(2));
  if(isset($category) && user_access(PERMISSION_EDIT_CATEGORY)): ?>
    <div class="edit-category-div">
      <form class="edit-category-form" action="?q=category/edit" method="post">
        <label for="category-name-field">Kategorinamn</label>
        <input type="text" name="edit_category_name" class="category-name-field" value="<?php echo $category['name']; ?>"/>

        <label for="category-type-field">Kategorityp</label>
        <input type="text" name="edit_category_type" class="category-type-field" value="<?php echo $category['category_type']; ?>"/>

        <label for="category-description-field">Kategoribeskrivning</label>
        <textarea cols="15" rows="4" name="edit_category_description"
                  class="category-description-text"><?php echo $category['description']; ?>
        </textarea>
        <input type="hidden" name="edit_category_id" value="<?php echo $category['id']; ?>" />
        <input type="submit" name="edit_category" value="Uppdatera" />
        <input type="submit" name="delete_category" value="Ta bort" />
      </form>
    </div>
  <?php endif; ?>
