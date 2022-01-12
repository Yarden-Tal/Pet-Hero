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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Setup
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./database/connection"));
const bodyParser = require("body-parser");
const path = require("path");
// Variables
const app = express_1.default();
const PORT = process.env.PORT || 8000;
// Global middleware
app.use(cors_1.default());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes
const authRoutes_1 = __importDefault(require("./api/routes/authRoutes"));
const usersRoutes_1 = __importDefault(require("./api/routes/usersRoutes"));
const petsRoutes_1 = __importDefault(require("./api/routes/petsRoutes"));
app.use("/auth", authRoutes_1.default);
app.use("/users", usersRoutes_1.default);
app.use("/pets", petsRoutes_1.default);
app.use("/images", express_1.default.static(path.join("images")));
// Connect to db and start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    if (yield connection_1.default()) {
        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}...`));
    }
    else
        console.log("Error connecting to database");
});
startServer();
