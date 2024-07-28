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
      : Joi.array().items(Joi.object({
        user: Joi.string().required(),
        amount: Joi.number().when('..splitMethod', {
          is: 'exact',
          then: Joi.required(),
          otherwise: Joi.forbidden()
        }),
        percentage: Joi.number().when('..splitMethod', {
          is: 'percentage',
          then: Joi.number().min(0).max(100).required(),
          otherwise: Joi.forbidden()
        })
      })).required()
    });
  
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    next();
  };
