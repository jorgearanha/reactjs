const exception = (message) => {
    this.message = message;
    this.name = "Exception";
}

exports.module = exception;