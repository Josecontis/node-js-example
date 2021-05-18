// classe che gestisce i messaggi degli errori di credenziali sbagliate
module.exports = class AccessDeniedError {
  constructor(message) {
    this.message = message;
  }
};
