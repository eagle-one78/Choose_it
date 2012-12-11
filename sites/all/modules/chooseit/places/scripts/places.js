/*
 *
 */

(function($) {
  $(document).ready(function() {

    //Pagination config
    $('.places-container').paginate({
      nav_label_first : '<<',
      nav_label_last : '>>',
      nav_label_prev : '<',
      nav_label_next : '>'
    });

    //Place info div show hide finction
    $('.place-list-item').click(function() {
      var placeDiv = $(this).children('div.place-div');

      if(placeDiv.is(':hidden')) {
        placeDiv.show();
      }
      else {
        placeDiv.hide();
      }
    })


    /*
    *Rating functions
    *Return the select value with the link reference when a rate star is clicked.
    */
    //20 % if star 1
    $('#star-1').click(function() {
      var data = {
        'place_id': $('.place-id').val(),
        'chooseit_rate': '20',
        'rating': true
      };
      $.ajax({
        url: 'places/rating/ajax',
        type: 'POST',
        data: data,
        success: function(data) {
          if(data.data !== 'Du har redan röstat på denna plats!' && data.data !== 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.place-rating-c-rating').html(data.data).fadeIn(2000);
          }
          if (data.error === true && data.data === 'Du har redan röstat på denna plats!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
          if (data.error === true && data.data === 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
        }
      });
    });

    //40% if star 2
    $('#star-2').click(function() {
      var data = {
        'place_id': $('.place-id').val(),
        'chooseit_rate': '40',
        'rating': true
      };
      $.ajax({
        url: 'places/rating/ajax',
        type: 'POST',
        data: data,
       success: function(data) {
          if(data.data !== 'Du har redan röstat på denna plats!' && data.data !== 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.place-rating-c-rating').html(data.data).fadeIn(2000);
          }
          if (data.error === true && data.data === 'Du har redan röstat på denna plats!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
          if (data.error === true && data.data === 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
        }
      });
    });

    //60% if star 3
    $('#star-3').click(function() {
      var data = {
        'place_id': $('.place-id').val(),
        'chooseit_rate': '60',
        'rating': true
      };
      $.ajax({
        url: 'places/rating/ajax',
        type: 'POST',
        data: data,
        success: function(data) {
          if(data.data !== 'Du har redan röstat på denna plats!' && data.data !== 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.place-rating-c-rating').html(data.data).fadeIn(2000);
          }
          if (data.error === true && data.data === 'Du har redan röstat på denna plats!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
          if (data.error === true && data.data === 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
        }
      });
    });

    //80% if star 4
    $('#star-4').click(function() {
      var data = {
        'place_id': $('.place-id').val(),
        'chooseit_rate': '80',
        'rating': true
      };
      $.ajax({
        url: 'places/rating/ajax',
        type: 'POST',
        data: data,
        success: function(data) {
          if(data.data !== 'Du har redan röstat på denna plats!' && data.data !== 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.place-rating-c-rating').html(data.data).fadeIn(2000);
          }
          if (data.error === true && data.data === 'Du har redan röstat på denna plats!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
          if (data.error === true && data.data === 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
        }
      });
    });

    //100% if star 5
    $('#star-5').click(function() {
      var data = {
        'place_id': $('.place-id').val(),
        'chooseit_rate': '100',
        'rating': true
      };
      $.ajax({
        url: 'places/rating/ajax',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function(data) {
          if(data.data !== 'Du har redan röstat på denna plats!' && data.data !== 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.place-rating-c-rating').html(data.data).fadeIn(2000);
          }
          if (data.error === true && data.data === 'Du har redan röstat på denna plats!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
          if (data.error === true && data.data === 'Du måste vara inloggad för att kunna ge omdöme!') {
            $('.ajax-message').show().html(data.data).fadeOut(5000);
          }
        }
      });
    });
  });
})(jQuery);