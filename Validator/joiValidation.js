const Joi = require('joi');

// Define the schema
const userSchema = Joi.object({
  Email: Joi.string().allow('').pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')).optional(),
  Zip_Code: Joi.string().allow('').pattern(new RegExp('^\\d{8}$')).optional(),
  Id: Joi.string().pattern(new RegExp('^[a-zA-Z]{3}\\d{5}$')).required(),
  Age: Joi.number().integer().min(18).max(70).allow('').optional(),
  City : Joi.string().optional().allow(''),
  Name : Joi.string().optional().allow('')
});

// Function to validate user data
function validateUser(data) {
  const { error, value } = userSchema.validate(data, { abortEarly: false });

  if (error) {
    return {
      success: false,
      errors: error.details.map(err => err.message)
    };
  }

  return {
    success: true,
    value: value
  };
}

// Example usage
const userData = {
  Email: '',
  Zip_Code: '',
  Id: 'Vis12385',
  Age: '',
};

const result = validateUser(userData);
console.log(result);


module.exports = {
    validateUser
}