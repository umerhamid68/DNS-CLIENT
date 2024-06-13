"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderEncoder = void 0;
var HeaderEncoder = /** @class */ (function () {
    function HeaderEncoder() {
    }
    HeaderEncoder.createHeader = function (transactionID, QDCOUNT) {
        var buffer = Buffer.alloc(12);
        buffer.writeUInt16BE(transactionID, 0); //transactionID
        buffer.writeUInt16BE(0x0100, 2); //flags 
        buffer.writeUInt16BE(QDCOUNT, 4); //QDCOUNT
        buffer.writeUInt16BE(0, 6); //ANCOUNT
        buffer.writeUInt16BE(0, 8); //NSCOUNT
        buffer.writeUInt16BE(0, 10); //ARCOUNT
        return buffer;
    };
    HeaderEncoder.decodeHeader = function (buffer) {
        var transactionID = buffer.readUInt16BE(0);
        var flags = buffer.readUInt16BE(2);
        var QDCOUNT = buffer.readUInt16BE(4);
        var ANCOUNT = buffer.readUInt16BE(6);
        var NSCOUNT = buffer.readUInt16BE(8);
        var ARCOUNT = buffer.readUInt16BE(10);
        return {
            transactionID: transactionID,
            flags: flags,
            QDCOUNT: QDCOUNT,
            ANCOUNT: ANCOUNT,
            NSCOUNT: NSCOUNT,
            ARCOUNT: ARCOUNT
        };
    };
    return HeaderEncoder;
}());
exports.HeaderEncoder = HeaderEncoder;
