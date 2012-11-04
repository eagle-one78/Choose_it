<div class="news-container">
  <?php if($newsInfo): ?>
    <?php foreach ($newsInfo as $newsArticle): ?>
      <div class="news-div">
        <input type="hidden" value="<?php echo $newsArticle->id; ?>" />
        <h2>
          <?php echo $newsArticle->title; ?>
        </h2>
        <p class="news-discription">
          <?php echo $newsArticle->news_text; ?>
        </p>
        <small class="news-date-created-div">
          <?php echo $newsArticle->date_created; ?>
        </small>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>