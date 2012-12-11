<?php if (isset ($placeParams)): ?>
  <label class="rating-div2-label" for="place-rating-div2"><h1>Choose it! omdöme</h1></label>
  <div class="place-rating-div2">
    <div class="place-info-div">
      <input class="place-id" type="hidden" value="<?php echo $placeParams['id']; ?>" />
      <h2 class="place-rating-h2"><?php echo htmlspecialchars (isset ($placeParams['name']) ? $placeParams['name'] : ''); ?></h2>
      <p class="place-rating-address"><?php echo htmlspecialchars (isset ($placeParams['formatted_address']) ? $placeParams['formatted_address'] : ''); ?></p>
      <p class="place-rating-phone"><?php echo htmlspecialchars (isset ($placeParams['phone_number']) ? $placeParams['phone_number'] : ''); ?></p>
      <span>Googles omdöme:&nbsp;<p class="place-rating-g-rating"><?php echo htmlspecialchars (isset ($placeParams['google_rating']) ? $placeParams['google_rating'] : '0'); ?></p></span>
      <span>Choose it! omdöme:&nbsp;<p class="place-rating-c-rating"><?php echo htmlspecialchars (isset ($placeParams['rateAverage']) ? $placeParams['rateAverage'] : '0'); ?></p></span>
      <a class="place-rating-website" target="_blank" href="<?php echo htmlspecialchars (isset ($placeParams['website']) ? $placeParams['website'] : ''); ?>">Hemsida</a>
      <p class="place-rating-comment"><?php echo htmlspecialchars (isset ($placeParams['place_comment']) ? $placeParams['place_comment'] : ''); ?></p>
    </div>

    <div class="rating-place-area2">
      <label  id="rate-link">Ge omdöme!</label>
      <div class="ajax-message"></div>
      <div class="fivestar-fivestarcraft fivestar-widget">
        <form accept-charset="UTF-8" id="fivestar-custom-widget" method="post" action="/drupal/chooseit/?q=node/5" class="fivestar-widget">
          <div>
            <div class="clearfix fivestar-average-stars fivestar-form-item fivestar-craft fivestar-processed">
              <div class="form-item form-type-fivestar form-item-vote">
                <div class="form-item form-type-select form-item-vote">
                  <div class="fivestar-widget clearfix fivestar-widget-5">
                    <div id="star-1" class="star star-1 odd star-first on">
                      <a title="Ge omdöme 1/5" href="#20">Ge omdöme 1/5</a>
                    </div>
                    <div id="star-2" class="star star-2 even on">
                      <a title="Ge omdöme 2/5" href="#40">Ge omdöme 2/5</a>
                    </div>
                    <div id="star-3" class="star star-3 odd on">
                      <a title="Ge omdöme 3/5" href="#60">Ge omdöme 3/5</a>
                    </div>
                    <div id="star-4" class="star star-4 even on">
                      <a title="Ge omdöme 4/5" href="#80">Ge omdöme 4/5</a>
                    </div>
                    <div id="star-5" class="star star-5 odd star-last on">
                      <a title="Ge omdöme 5/5" href="#100">Ge omdöme 5/5</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" value="Rate" name="op" id="edit-fivestar-submit" class="fivestar-submit form-submit">
          </div>
        </form>
      </div>
    </div>
  </div>
<?php endif; ?>

