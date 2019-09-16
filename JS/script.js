//Start the cursor in the 'Name' input element
$('#name').focus();

//***Job Role Section***

//Hide the "other" input text field until the user selects the "Other" option in the Job Role drop down.
$('#other-title').hide();
//$("#title select").val("other").show($('#other-title'));
$("#title").change(function () {
  var selected_option = $('#title').val();
  if (selected_option === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//***T-shirt Option Section***

//Hide the "Select Theme" option element in the Design menu:
$('option[value="select theme"]').attr('hidden', 'hidden');

const newOption = $('#color').prepend('<option value="select">Please select a T-shirt theme</option>');
const designSelect = $('#design');
const colorSelect = $('#color option');
colorSelect.eq(0).attr('selected', 'selected');
$('option[value="select"]').attr('hidden', 'hidden');

designSelect.change(function(event) {
  designSelect.each(function() {
    if ($(event.target).val() === "heart js") {
      $('option[value="tomato"]').show();
      $('option[value="steelblue"]').show();
      $('option[value="dimgrey"]').show();
      $('option[value="cornflowerblue"]').hide();
      $('option[value="darkslategrey"]').hide();
      $('option[value="gold"]').hide();
    } else if ($(event.target).val() === "js puns"){
      $('option[value="cornflowerblue"]').show();
      $('option[value="darkslategrey"]').show();
      $('option[value="gold"]').show()
      $('option[value="tomato"]').hide();
      $('option[value="steelblue"]').hide();
      $('option[value="dimgrey"]').hide();
    }
  });
});


//***Activites Section***

const $activities = $('.activities')
const totalText = document.createElement('div');
$activities.append(totalText);
let totalCost = 0;

$($activities).change(function(event) {
  const clicked = $(event.target);
  const dataCost = clicked.attr("data-cost").slice(1);
  const costToNum = parseInt(dataCost);

  if (clicked.prop("checked") === true) {
    totalCost += costToNum;
  } else {
    totalCost -= costToNum;
  }

  totalText.textContent = "Total cost: $" + totalCost;

  const dateTime = clicked.attr("data-day-and-time");
  const activities = $('.activities input');

  activities.each(function(index, element) {
    const inputDateTime = $(activities[index]).attr("data-day-and-time");

    if (dateTime === inputDateTime) {
      if (clicked.prop("checked") === false) {
        activities[index].disabled = false;
      } else {
        activities[index].disabled = true;
      }
    }
  });
});

//***Payment Selection Section***
$('option[value="select method"]').attr('hidden', 'hidden');
const cc = $('option[value="Credit Card"]').attr('selected', 'selected');
const paymentTypes = $('#payment');

const ccDiv = $('#credit-card');
const bitcoinDiv = $('#bitcoin').hide();
const paypalDiv = $('#paypal').hide();

paymentTypes.change(function(event) {
  const selected = $(event.target);
  console.log(selected);
  if (selected.val() === "Bitcoin") {
    ccDiv.hide();
    paypalDiv.hide();
    bitcoinDiv.show();
  } else if (selected.val() === "PayPal") {
    ccDiv.hide();
    paypalDiv.show();
    bitcoinDiv.hide();
  } else if (selected.val() === "Credit Card") {
    ccDiv.show();
    paypalDiv.hide();
    bitcoinDiv.hide();
  }
})

//***Form Validation Section***

$('form').submit(function(event) {
  event.preventDefault();

  function isValidName() {
    const nameInput = $('#name');
    const nameValidation = /([^\s])/;
    const nameError = $("<p></p>").text("Please enter a name");

    if (nameValidation.test($(nameInput).val())) {
      return true;
    } else {
      nameInput.after(nameError);
      return false;
    }
  }
  isValidName()

  function isValidEmail() {
    const emailInput = $('#mail');
    const emailValidation = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const emailError = $("<p></p>").text("Please enter a valid email address");

    if (emailValidation.test($(emailInput).val())) {
      return true;
    } else {
      emailInput.after(emailError);
      return false;
    }
  }
  isValidEmail()

  function isValidActivity() {
    const activitySelect = $('.activities');
    const activityError = $("<p></p>").text("You must select at least one activity");
    activitySelect.append($(activityError));

    if ($('input[type="checkbox"]').prop("checked")) {
      return true;
    } else {
      activitySelect.after(activityError);
      return false;
    }
  }
  isValidActivity()

  function isValidCC() {
    const ccNum = $('#cc-num');
    const ccNumVal = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const ccNumError = $("<p></p>").text("Please enter a valid credit card number");

    if (ccNumVal.test($(ccNum).val())) {
      return true;
    } else {
      ccNum.after(ccNumError);
      return false;
    }
  }
  isValidCC()

  function isValidZip() {
    const zip = $('#zip');
    const zipVal = /^\d{5}$/;
    const zipError = $("<p></p>").text("Please enter a valid zip code");

    if (zipVal.test($(zip).val())) {
      return true;
    } else {
      zip.after(zipError);
      return false;
    }
  }
  isValidZip()

  function isValidCvv() {
    const cvv = $('#cvv');
    const cvvVal = /^[0-9]{3}$/;
    const cvvError = $("<p></p>").text("Please enter a valid cvv code");

    if (cvvVal.test($(cvv).val())) {
      return true;
    } else {
      cvv.after(cvvError);
      return false;
    }
  }
  isValidCvv()
});
