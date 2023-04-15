const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.emailormobile = !isEmpty(data.emailormobile) ? data.emailormobile : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Password checks
  if (Validator.isEmpty(data.emailormobile)) {
    errors.emailormobile = "Email or Mobile is required";
  }

  // Validate an email address
if (Validator.isEmail(data.emailormobile)) {
    console.log('The input is a valid email address.');
  }
  // Validate a mobile phone number
  else if (Validator.isMobilePhone(data.emailormobile)) {
    console.log('The input is a valid mobile phone number.');
  }
  else {
    errors.emailormobile = "Email or Mobile field is not valid";
  }
// Email or mobile checks
// if (Validator.isEmpty(data.email) && Validator.isEmpty(data.mobile)) {
//     errors.email = "Email or Mobile field is required";
//   } else if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email) && !Validator.isEmpty(data.mobile) && !Validator.isMobilePhone(data.mobile, 'any')) {
//     errors.email = "Email and Mobile are invalid";
//   } else if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
//     errors.email = "Email is invalid";
//   } else if (!Validator.isEmpty(data.mobile) && !Validator.isMobilePhone(data.mobile, 'any')) {
//     errors.mobile = "Mobile number is invalid";
//   }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};