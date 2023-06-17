"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClient {
    static getAsync(token, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(uri, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
        });
    }
    static postAsync(token, uri, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(uri, {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
        });
    }
    static putAsync(token, uri, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(uri, {
                method: "PUT",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
        });
    }
    static patchAsync(token, uri, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(uri, {
                method: "PATCH",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
        });
    }
    static deleteAsync(token, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(uri, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
        });
    }
}
exports.default = HttpClient;
//# sourceMappingURL=httpService.js.map