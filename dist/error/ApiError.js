"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class ApiError {
    constructor(props) {
        this.code = props.code;
        if (props.err instanceof sequelize_1.ValidationError) {
            console.log(props.err);
            this.err = props.err.errors.map((error) => {
                return {
                    message: error.message,
                    value: error.value,
                    field: error.path,
                };
            });
        }
        else {
            this.err = [
                {
                    message: props.err,
                },
            ];
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map