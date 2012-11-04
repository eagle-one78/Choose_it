<?php if(isset($categoriesInfo) && $categoriesInfo):
  foreach ($categoriesInfo as $category): ?>
  <div class="category-div">
    <input type="hidden" value="<?php echo $category->id ;?>" />
    <h2>
      <?php echo $category->name; ?>
    </h2>
    <p class="category-description">
      <?php echo $category->discription; ?>
    </p>
  </div>
  <?php endforeach; ?>
<?php endif; ?>
<div class="insert-new-category">
  <a class="insert-new-category-link" href="?q=categories/insert-category">
    Lägg till en ny kategori
  </a>
</div>
