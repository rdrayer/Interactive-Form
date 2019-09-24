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

    if ((dateTime === inputDateTime) && (clicked[0] !== activities[index])) {
      if (clicked.prop("checked") === false) {
        activities[index].disabled = false;
        console.log("false");
      } else {
        activities[index].disabled = true;
        console.log("true");
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
const nameInput = $('#name');
const nameValidation = /([^\s])/;
const nameError = $("<p></p>").text("Please enter a name").css("color", "red");
nameInput.after(nameError);
nameError.hide();

function isValidName() {
  if (nameValidation.test($(nameInput).val())) {
    nameError.hide();
    return true;
  } else {
    nameError.show();
    return false;
  }
}

const emailInput = $('#mail');
const emailValidation = /^[^@]+@[^@.]+\.[a-z]+$/i;
const emailError = $("<p></p>").text("Please enter a valid email address").css("color", "red");
emailInput.after(emailError);
emailError.hide();

function isValidEmail() {
  if (emailValidation.test($(emailInput).val())) {
    emailError.hide();
    return true;
  } else {
    emailError.show();
    return false;
  }
}

const activitySelect = $('.activities');
const activityError = $("<p></p>").text("You must select at least one activity").css("color", "red");
activitySelect.append($(activityError));
activitySelect.after(activityError);
activityError.hide();

function isValidActivity() {
  if ($('input[type="checkbox"]').prop("checked")) {
    activityError.hide();
    return true;
  } else {
    activityError.show();
    return false;
  }
}

const ccNum = $('#cc-num');
const ccNumVal = /^\d{13,16}$/;
const ccNumError = $("<p></p>").text("Please enter a valid credit card number").css("color", "red");
ccNum.after(ccNumError);
ccNumError.hide();

function isValidCC() {
  if (ccNumVal.test($(ccNum).val())) {
    ccNumError.hide();
    return true;
  } else {
    ccNumError.show();
    return false;
  }
}

const zip = $('#zip');
const zipVal = /^\d{5}$/;
const zipError = $("<p></p>").text("Please enter a valid zip code").css("color", "red");
zip.after(zipError);
zipError.hide();

function isValidZip() {
  if (zipVal.test($(zip).val())) {
    zipError.hide();
    return true;
  } else {
    zipError.show();
    return false;
  }
}

const cvv = $('#cvv');
const cvvVal = /^[0-9]{3}$/;
const cvvError = $("<p></p>").text("Please enter a valid cvv code").css("color", "red");
cvv.after(cvvError);
cvvError.hide();

function isValidCvv() {
  if (cvvVal.test($(cvv).val())) {
    cvvError.hide();
    return true;
  } else {
    cvvError.show();
    return false;
  }
}

$('form').submit(function(event) {
  if (!isValidName() || !isValidEmail() || !isValidActivity()){
    event.preventDefault();
  }

    if ($('option[value="Credit Card"]').is(':selected')) {
      if (!isValidCC() || !isValidCvv() || !isValidZip()) {
        event.preventDefault();
      }
    }


});
