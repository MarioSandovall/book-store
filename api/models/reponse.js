class Reponse {
  success;
  Message;
  markAsSuccess(message = "") {
    this.success = true;
    this.Message = message;
  }
  markAsFailure(message = "") {
    this.success = false;
    this.Message = message;
  }
}

module.exports = Reponse;
