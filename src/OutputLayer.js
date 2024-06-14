"use strict";
// class OutputLayer {
//     outputPacket(packet: any, index: number) {
//         const rdata = this.extractRData(packet.answer);
//         if (rdata !== '') {
//             console.log(`Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}`);
//         }
//         else {
//             console.log(`Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA not found`);
//         }
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputLayer = void 0;
var OutputLayer = /** @class */ (function () {
    function OutputLayer(output) {
        this.output = output;
    }
    OutputLayer.prototype.outputPacket = function (packet, index) {
        this.output.outputPacket(packet, index);
    };
    return OutputLayer;
}());
exports.OutputLayer = OutputLayer;
