Stripe.setPublishableKey('pk_test_N0Xf3B1LqbJLiLAal3Lpn8QT');

// preparation for StripeV3
// var stripe = Stripe('pk_test_N0Xf3B1LqbJLiLAal3Lpn8QT');
// var elements = stripe.elements();

var $form = $('#checkout-form');

$form.submit(function(event) {
  $form.find('button').prop('disabled', true);
      Stripe.card.createToken({
      number: $('#card-number').val(),
      cvc: $('#card-cvc').val(),
      exp_month: $('#card-expiry-month').val(),
      exp_year: $('#card-expiry-year').val(),
      name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) { // Problem!

   // Show the errors on the form
   $form.find('#charge-errors').text(response.error.message);
   // hidden class is deprecated in Bootstrap 4 > check docs. refactor TODO
   $form.find('#charge-errors').removeClass('hidden');
   $form.find('button').prop('disabled', false); // Re-enable submission

 } else { // Token was created!

   // Get the token ID:
   var token = response.id;

   // Insert the token into the form so it gets submitted to the server:
   $form.append($('<input type="hidden" name="stripeToken" />').val(token));

   // Submit the form:
   $form.get(0).submit();

 }
};
