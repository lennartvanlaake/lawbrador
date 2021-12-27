"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusResponse = exports.ResponseStatus = void 0;
const typebox_1 = require("@sinclair/typebox");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["success"] = 0] = "success";
    ResponseStatus[ResponseStatus["failed"] = 1] = "failed";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
exports.statusResponse = typebox_1.Type.Object({
    status: typebox_1.Type.Enum(ResponseStatus),
});
//# sourceMappingURL=generic.js.map