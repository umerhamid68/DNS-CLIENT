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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dgram = require("dgram");
// Function to create a DNS query buffer
function createDNSQuery(domain) {
    var queryID = Buffer.from([0xaa, 0xaa]); // Random transaction ID
    var flags = Buffer.from([0x01, 0x00]); // Standard query
    var questions = Buffer.from([0x00, 0x01]); // One question
    var answerRRs = Buffer.from([0x00, 0x00]); // No answers
    var authorityRRs = Buffer.from([0x00, 0x00]); // No authority records
    var additionalRRs = Buffer.from([0x00, 0x00]); // No additional records
    // Encode the domain name
    var domainParts = domain.split('.');
    var question = Buffer.concat(domainParts.map(function (part) {
        var length = Buffer.from([part.length]);
        var label = Buffer.from(part);
        return Buffer.concat([length, label]);
    }).concat(Buffer.from([0x00]))); // End of domain name
    var qType = Buffer.from([0x00, 0x01]); // Type A
    var qClass = Buffer.from([0x00, 0x01]); // Class IN
    var query = Buffer.concat([queryID, flags, questions, answerRRs, authorityRRs, additionalRRs, question, qType, qClass]);
    return query;
}
// Parse the response header for more detailed output
function parseResponseHeader(buffer) {
    var transactionID = buffer.slice(0, 2).toString('hex');
    var flags = buffer.slice(2, 4).toString('hex');
    var questionCount = buffer.slice(4, 6).readUInt16BE(0);
    var answerCount = buffer.slice(6, 8).readUInt16BE(0);
    var authorityCount = buffer.slice(8, 10).readUInt16BE(0);
    var additionalCount = buffer.slice(10, 12).readUInt16BE(0);
    console.log('Transaction ID:', transactionID);
    console.log('Flags:', flags);
    console.log('Questions:', questionCount);
    console.log('Answer RRs:', answerCount);
    console.log('Authority RRs:', authorityCount);
    console.log('Additional RRs:', additionalCount);
}
// Send a DNS query via UDP and print the response
function sendDNSQuery(domain) {
    return __awaiter(this, void 0, void 0, function () {
        var dnsServer, port, packet, client;
        return __generator(this, function (_a) {
            dnsServer = '8.8.8.8';
            port = 53;
            packet = createDNSQuery(domain);
            client = dgram.createSocket('udp4');
            client.on('error', function (err) {
                console.error("UDP error: " + err.message);
                client.close();
            });
            client.on('message', function (message) {
                console.log("Received response (raw):", message.toString('hex'));
                parseResponseHeader(message);
                client.close();
            });
            client.send(packet, port, dnsServer, function (err) {
                if (err) {
                    console.error("UDP send error: " + err.message);
                    client.close();
                }
                else {
                    console.log("DNS query sent to", dnsServer);
                }
            });
            return [2 /*return*/];
        });
    });
}
// Example usage
sendDNSQuery('google.com').then(function () {
    console.log("Query sent.");
}).catch(function (err) {
    console.error("Error:", err.message);
});
