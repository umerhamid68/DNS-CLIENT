"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRData = void 0;
var OutputLayer = require('../src/OutputLayer').OutputLayer;
function extractRData(packet) {
    if (packet && packet.answer && packet.answer.length > 0) {
        return packet.answer.map(function (answer) { return answer.rdata; }).join(', ');
    }
    return '';
}
exports.extractRData = extractRData;
function testExtractRData() {
    var mockPacket = {
        header: {
            transactionID: 12345,
            flags: 33152,
            QDCOUNT: 1,
            ANCOUNT: 1,
            NSCOUNT: 0,
            ARCOUNT: 0,
        },
        question: [
            { domain: 'google.com', qType: 1, qClass: 1 }
        ],
        answer: [
            {
                domain: 'google.com',
                type: 1,
                cls: 1,
                ttl: 300,
                rdlength: 4,
                rdata: '8efa464e'
            }
        ],
        processed: false
    };
    var outputLayer = new OutputLayer();
    var rdata = extractRData(mockPacket);
    console.log("Extracted RDATA: ".concat(rdata));
}
function testConvertRData() {
    var outputLayer = new OutputLayer(); // Pass null or mock outputPersistence as needed
    var mockPacket = {
        header: {
            transactionID: 12345,
            flags: 33152,
            QDCOUNT: 1,
            ANCOUNT: 1,
            NSCOUNT: 0,
            ARCOUNT: 0,
        },
        question: [
            { domain: 'google.com', qType: 1, qClass: 1 }
        ],
        answer: [
            {
                domain: 'google.com',
                type: 1,
                cls: 1,
                ttl: 300,
                rdlength: 4,
                rdata: '8efa464e'
            }
        ],
        processed: false
    };
    var rdata = outputLayer.outputPacket(mockPacket, 1);
    console.log("Converted RDATA: ".concat(rdata));
}
testExtractRData();
testConvertRData();
