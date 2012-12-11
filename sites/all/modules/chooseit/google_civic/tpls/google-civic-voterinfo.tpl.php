<?php

/**
 * @file Google Civic Voterinfo Template.
 */
?>

<h2 id="google-civic-voterinfo-heading">
  <?php print $headline; ?>
</h2>
<div id="google-civic-voterinfo">
  <?php if (!empty($locations)) : ?>
    <div id="google-civic-voterinfo-polling-locations">
      <?php print $locations; ?>
    </div>
  <?php else: ?>
    <p><?php print $sorry; ?></p>
    <?php if (empty($contests)): ?>
    <div id="google-civic-address-form-div">
      <span class="google-civic-search-again">Please ensure your address is in the proper format and try again.</span>
      <?php print drupal_render($address_form); ?>
    </div>
    <?php endif; ?>
  <?php endif; ?>

  <?php if ($map) : ?>
    <div id="google-civic-voterinfo-gmap"><?php print $map; ?></div>
  <?php endif; ?>

  <?php if ($early_locations) : ?>
    <div id="google-civic-voterinfo-early-locations" class="clearfix">
      <div id="google-civic-voterinfo-early-locations-title">
        <?php print t('Early Voting Sites'); ?>
      </div>
      <?php print $early_locations; ?>
    </div>
  <?php endif; ?>

  <?php if ($election_info_link) : ?>
    <div id="google-civic-voterinfo-election-info">
      <?php print
        t('For more information, visit: !link',
            array('!link' => $election_info_link));
      ?>
    </div>
  <?php endif; ?>

  <?php if ($contests): ?>
    <h2>Contest Information</h2>
    <p>Below are the contests that are relevant to this address. Please expand each section for more info.</p>
    <?php print $contests; ?>
  <?php endif; ?>
</div>
