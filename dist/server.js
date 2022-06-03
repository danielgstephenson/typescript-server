"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const options = {};
console.log(config_1.default);
if (config_1.default.secure) {
    options.key = fs_1.default.readFileSync('sis-key.pem');
    options.cert = fs_1.default.readFileSync('sis-cert.pem');
}
const server = config_1.default.secure ? https_1.default.createServer(options, app) : new http_1.default.Server(app);
const io = config_1.default.secure ? new socket_io_1.Server(server) : new socket_io_1.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
io.on('connection', socket => {
    console.log('socket.id =', socket.id);
});
server.listen(3000, () => {
    const address = server.address();
    const port = typeof address === 'string' ? null : address.port;
    const string = String(port);
    console.log(`listening on port: ${string}`);
});
//# sourceMappingURL=server.js.map