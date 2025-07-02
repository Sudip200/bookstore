"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UuidSingeltonService {
    getInstance() {
        if (!UuidSingeltonService.serviceInstance) {
            UuidSingeltonService.serviceInstance = new UuidSingeltonService();
        }
        return UuidSingeltonService.serviceInstance;
    }
    generateId() {
        return (0, uuid_1.v4)();
    }
}
exports.default = UuidSingeltonService;
