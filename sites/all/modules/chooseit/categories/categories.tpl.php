
<div id="container">
  <?php if($categoriesInfo): ?>
    <?php foreach ($categoriesInfo as $category): ?>
    <div id="categories-div">
      <input type="hidden" value="<?php echo $category->id ;?>"
      <h2>
        <?php echo $category->name ;?>
      </h2>
      <p id="category-description">
        <?php echo $category->discription ;?>
      </p>
    </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>
