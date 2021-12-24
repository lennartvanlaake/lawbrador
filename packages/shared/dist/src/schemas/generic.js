import { Type } from '@sinclair/typebox';
export var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["success"] = 0] = "success";
    ResponseStatus[ResponseStatus["failed"] = 1] = "failed";
})(ResponseStatus || (ResponseStatus = {}));
export const statusResponse = Type.Object({
    status: Type.Enum(ResponseStatus),
});
//# sourceMappingURL=generic.js.map