import Joi from "joi";

export const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
};

export const validateLogin = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
  
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    next();
  };



  export const validateExpense = (req, res, next) => {
    const schema = Joi.object({
      amount: Joi.number().positive().required(),
      description: Joi.string().required(),
      splitMethod: Joi.string().valid('equal', 'exact', 'percentage').required(),
      splits: Joi.array().items(Joi.object({
        user: Joi.string().required(),
        amount: Joi.number().positive(),
        percentage: Joi.number().min(0).max(100)
      })).required().custom((value, helpers) => {
        const { splitMethod } = helpers.state.ancestors[0];
        
        if (splitMethod === 'equal' && value.some(split => 'amount' in split || 'percentage' in split)) {
          return helpers.error('any.invalid');
        }
        
        if (splitMethod === 'exact' && (!value.every(split => 'amount' in split) || value.some(split => 'percentage' in split))) {
          return helpers.error('any.invalid');
        }
        
        if (splitMethod === 'percentage' && (!value.every(split => 'percentage' in split) || value.some(split => 'amount' in split))) {
          return helpers.error('any.invalid');
        }
        
        return value;
      })
    });
  
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).send(error.details.map(detail => detail.message).join(', '));
  
    next();
  };
