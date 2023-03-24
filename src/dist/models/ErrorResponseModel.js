"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponseModel {
    constructor(error, message, exception, name) {
        this.error = error;
        this.message = message;
        this.exception = exception;
        this.name = name;
    }
    static NewErrorMsg(error, message) {
        return new ErrorResponseModel(error, message, null, null);
    }
    static NewErrorExMsg(error, message, exception) {
        return new ErrorResponseModel(error, message, exception, exception.name);
    }
    static NewError(error, exception) {
        return new ErrorResponseModel(error, exception.message, exception, exception.name);
    }
}
exports.default = ErrorResponseModel;
//# sourceMappingURL=ErrorResponseModel.js.map