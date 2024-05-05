"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./Database/index"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(0, index_1.default)()
    .then(() => {
    app_1.default.listen((PORT), () => {
        console.log("Server Start ");
    });
})
    .catch(() => {
    console.log("Error in index.ts file");
});
//# sourceMappingURL=index.js.map