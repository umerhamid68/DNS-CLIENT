"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
var PacketGenerator_1 = require("./PacketGenerator");
function handleResponse(msg, persistence, outputLayer, dnsClient, c) {
    if (!c) {
        var packet = PacketGenerator_1.PacketGenerator.extractPacket(msg);
        //console.log('Packet Sent to output', packet)
        var transactionIndex = persistence.getTransactionIndex(packet.tId);
        if (transactionIndex !== -1) {
            persistence.addToOutput(packet, transactionIndex);
            outputLayer.outputPacket(packet, transactionIndex);
            dnsClient.resolveResponse(packet.tId);
        }
        else {
            console.log("Transaction ID ".concat(packet.tId, " not found in persistence layer."));
        }
    }
    else {
        console.log('Different Hnadler');
        console.log('Buffer: ', msg);
    }
}
exports.handleResponse = handleResponse;
