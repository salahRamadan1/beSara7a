const joi = require("joi");
let methods = ['body' , 'params']
let schema = {
    body: joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi
          .string()
          .email({ tlds: ["com", "net"] })
          .required(),
        password: joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
        refPassword: joi.ref("password"),
        age: joi.number().max(80).min(16),
      }),
      params:paramsSchema = joi.object({
        id: joi.string().min(4).max(4),
      })
}
module.exports.validUser = (req, res, next) => {
  let errValid = [];
  methods.map((key)=>{
    const { error } = schema[key].validate(req[key ], { abortEarly: false });
    if (error) {
      error.details.map((msg) => {
        errValid.push(msg.message);
      });
      res.json(errValid);
    }  
  })
  if(errValid.length >0){
    res.json({errValid})
  }else{
    next()
  }
};

 