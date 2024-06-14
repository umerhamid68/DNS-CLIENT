"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileOutput = void 0;
var PacketGenerator_1 = require("./PacketGenerator");
var fs = require("fs");
var FileOutput = /** @class */ (function () {
    function FileOutput(filePath) {
        this.filePath = filePath;
    }
    FileOutput.prototype.outputPacket = function (packet, index) {
        var rdata = PacketGenerator_1.PacketGenerator.extractParsedRdata(packet);
        var output = "Index: ".concat(index, ", Transaction ID: ").concat(packet.header.transactionID, ", RDATA: ").concat(rdata, "\n");
        fs.appendFileSync(this.filePath, output, 'utf8');
    };
    return FileOutput;
}());
exports.FileOutput = FileOutput;
