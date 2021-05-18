//file per usare plan e subscription
const Joi = require("joi");
const Subscription = require("../models/subscription");
const Plan = require("../models/plan");
const ValidationError = require("../errors/validation-error");

("use strict");

//dizionario di piani e sottoscrizioni
let validators = {
  Subscription: {
    scopes: {
      default: Subscription.SubscriptionValidationSchema,
    },
  },
  Plan: {
    scopes: {
      default: Plan.PlanValidationSchema,
    },
  },
};

//verifica se esiste lo scope
function scopeExists(validators, scope) {
  return (
    Object.keys(validators.scopes).find((key) => key == scope) != undefined
  );
}

//preleva i dati passando il model in input (ovvero se è subscription oppure plan)
function getSchema(model, scope) {
  let validator = validators[model];
  if (!validator) {
    throw new Error("Validator does not exist");
  }

  // verifica se il validatore dato ha più scopi
  if (validator.scopes) {
    if (scope) {
      if (!scopeExists(validator, scope)) {
        throw new Error(`Scope ${scope} does not exist in ${model} validator`);
      } else {
        return validator.scopes[scope];
      }
    } else {
      return validator.scopes.default;
    }
  } else {
    return validator;
  }
}

//funzione che verofoca la validità delle info inserite prelevate da getSchema
function validate(model, object, scope) {
  return Joi.validate(object, getSchema(model, scope), {
    allUnknown: true,
  });
}

module.exports = function ValidationMiddleware(model, scope) {
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope);
    if (validationResult.error) {
      //se il risultato della validazione ha il campo error come vero, gestisce l'eccezione con il messaggio corrispondente
      throw new ValidationError(validationResult.error.message, model);
    } else {
      next(); //passa al middleware successivo
    }
  };
};
