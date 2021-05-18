// classe che gestisce i messaggi degli errori del modello
module.exports = class ValidationError {
  constructor(message, model) {
    //messaggio di errore e il modello relativo (se plan o subscription)
    this.message = message;
    this.model = model;
  }
};
