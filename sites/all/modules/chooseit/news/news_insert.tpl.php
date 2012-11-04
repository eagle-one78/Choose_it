<div id="create_news-div">
  <a id="insert-news-form-show-link" href="#">Create news</a>
  <form id="create-news-formn" action="<?php echo $GLOBALS['base_url']; ?>?q=news/insert" method="post">
    <div id="inser-news-fields">
      <label for="news_title">News title:
        <input type="text" name="news_title" title="Insert news title" />
      </label>
      <label for="news_text">News text:
        <textarea cols="30" rows="10" type="text" name="news_text" title="Insert news text"></textarea>
      </label>
      <input type="submit" name="save_news" title="Save news button" value="Insert news"/>

    </div>
  </form>
</div>