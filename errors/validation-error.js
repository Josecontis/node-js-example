// file che contiene tutti i possibili errori riscontrabili
module.exports = class ValidationError {
  constructor(message, model) {
    //messaggio di errore e il modello relativo (se plan o subscription)
    this.message = message;
    this.model = model;
  }
};
