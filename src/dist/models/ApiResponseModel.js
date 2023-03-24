"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponseModel {
    constructor(data, error) {
        this.isError = error !== null;
        if (this.isError) {
            this.setError(error);
        }
        this.setModel(data);
    }
    setModel(params) {
        this.data = params;
    }
    setError(params) {
        this.error = params;
    }
}
exports.default = ApiResponseModel;
//# sourceMappingURL=ApiResponseModel.js.map