"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleOutput = void 0;
var PacketGenerator_1 = require("./PacketGenerator");
var ConsoleOutput = /** @class */ (function () {
    function ConsoleOutput() {
    }
    ConsoleOutput.prototype.outputPacket = function (packet, index) {
        var rdata = PacketGenerator_1.PacketGenerator.extractParsedRdata(packet);
        console.log("Index: ".concat(index, ", Transaction ID: ").concat(packet.header.transactionID, ", RDATA: ").concat(rdata));
    };
    return ConsoleOutput;
}());
exports.ConsoleOutput = ConsoleOutput;
