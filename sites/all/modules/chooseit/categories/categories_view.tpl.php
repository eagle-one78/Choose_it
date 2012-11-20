<?php if(isset($categoriesInfo) && $categoriesInfo && user_access(PERMISSION_VIEW_CATEGORY)):
  foreach ($categoriesInfo as $category): ?>
  <div class="categories-div">
    <input type="hidden" value="<?php echo $category->id ;?>" />
    <ul class="category-list">
      <li class="category-list-item">
        <div class="show-on-hover">
          <a class="category-link" href="">
            <img src="" class="category-img"/>
          </a>
          <h2>
            <?php echo $category->name; ?>
          </h2>
          <span>
            <?php echo $category->category_type; ?>
          </span>
          <p class="category-description">
            <?php echo $category->description; ?>
          </p>
          <div class="edit-category-area">
            <a class="edit-category-link" href="?q=categories/edit-category/<?php echo $category->id; ?>">
              Redigera kategori
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <?php endforeach; endif; ?>

<?php if(user_access(PERMISSION_INSERT_CATEGORY)): ?>
<div class="insert-new-category">
  <a class="insert-new-category-link" href="?q=categories/insert-categories">
    Lägg till en ny kategori
  </a>
</div>
<?php endif; ?>
