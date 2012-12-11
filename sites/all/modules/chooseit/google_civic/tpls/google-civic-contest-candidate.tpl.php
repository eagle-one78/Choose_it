<?php
/**
 * @file
 * Google Civic Contest Candidate Template
 *
 * Available variables:
 * - $title: The title for the fieldset
 * - $candidates: An array of candidates
 */
?>

<fieldset class='collapsible collapsed google-civic-candidate'>
   <legend><span class='fieldset-legend'><?php print $title; ?></span></legend>
   <div class='fieldset-wrapper'>
     <ul>
     <?php foreach ($candidates as $candidate): ?>
       <li class='google-civic-candidate'>
         <?php if (!empty($candidate->candidateUrl)): ?>
           <p><?php print l("{$candidate->name} - {$candidate->party}", $candidate->candidateUrl); ?></p>
         <?php else: ?>
           <p><?php print "{$candidate->name} - {$candidate->party}"; ?></p>
         <?php endif; ?>
       </li>
     <?php endforeach; ?>
     </ul>
   </div>
</fieldset>
