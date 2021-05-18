// classe che gestisce i messaggi degli errori di autenticazione
module.exports = class AuthenticationError {
  constructor(message) {
    this.message = message;
  }
};
