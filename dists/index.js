"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const router_1 = __importDefault(require("./router"));
// DB URI
const MONGO_URL = process.env.MONGODB_URL;
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on("error", (error) => console.log(error));
app.use("/", (0, router_1.default)());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/user", (req, res) => {
    res.status(201).json({ msg: "Done", user: "Charles" });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map