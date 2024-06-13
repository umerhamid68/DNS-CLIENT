"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputLayer = void 0;
var OutputLayer = /** @class */ (function () {
    function OutputLayer() {
    }
    OutputLayer.prototype.outputPacket = function (packet, index) {
        var rdata = this.extractRData(packet.answer);
        if (rdata !== '') {
            console.log("Index: ".concat(index, ", Transaction ID: ").concat(packet.header.transactionID, ", RDATA: ").concat(rdata));
        }
        else {
            console.log("Index: ".concat(index, ", Transaction ID: ").concat(packet.header.transactionID, ", RDATA not found"));
        }
    };
    OutputLayer.prototype.extractRData = function (answerSection) {
        var _this = this;
        if (!answerSection || answerSection.length === 0)
            return '';
        return answerSection.map(function (answer) {
            if (answer.type === 1) { // A
                return _this.convertToIPv4(answer.rdata);
            }
            else if (answer.type === 28) { // AAAA (IPv6)
                return _this.convertToIPv6(answer.rdata);
            }
            else if (answer.type === 5) { // CNAME
                return _this.convertToCNAME(answer.rdata);
            }
            else {
                return "Unknown record type ".concat(answer.type);
            }
        }).join(', ');
    };
    OutputLayer.prototype.convertToIPv4 = function (rdata) {
        var octets = rdata.match(/.{1,2}/g);
        if (!octets)
            return '';
        return octets.map(function (octet) { return parseInt(octet, 16); }).join('.');
    };
    OutputLayer.prototype.convertToIPv6 = function (rdata) {
        var segments = rdata.match(/.{1,4}/g);
        if (!segments)
            return '';
        return segments.map(function (segment) { return parseInt(segment, 16).toString(16); }).join(':');
    };
    OutputLayer.prototype.convertToCNAME = function (rdata) {
        var cnameBuffer = Buffer.from(rdata, 'hex');
        var offset = 0;
        var labels = [];
        while (offset < cnameBuffer.length) {
            var length_1 = cnameBuffer[offset++];
            if (length_1 === 0)
                break;
            labels.push(cnameBuffer.subarray(offset, offset + length_1).toString());
            offset += length_1;
        }
        return labels.join('.');
    };
    return OutputLayer;
}());
exports.OutputLayer = OutputLayer;
////////////////////////////////////////////////////////////// FILE OUTPUT CASE (TEST)
/*import * as fs from 'fs';

class OutputLayer {
    private outputFilePath: string;

    constructor(outputFilePath: string) {
        this.outputFilePath = outputFilePath;
        // Clear the output file at the start
        fs.writeFileSync(this.outputFilePath, '');
    }

    outputPacket(packet: any, index: number) {
        const rdata = this.extractRData(packet.answer);
        const output = `Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}\n`;
        this.writeToFile(output);
    }

    extractRData(answerSection: any[]): string {
        if (!answerSection || answerSection.length === 0) return '';

        return answerSection.map(answer => {
            if (answer.type === 1) { // A
                return this.convertToIPv4(answer.rdata);
            } else if (answer.type === 28) { // AAAA (IPv6)
                return this.convertToIPv6(answer.rdata);
            } else if (answer.type === 5) { // CNAME
                return this.convertToCNAME(answer.rdata);
            } else {
                return `Unknown record type ${answer.type}`;
            }
        }).join(', ');
    }

    convertToIPv4(rdata: string): string {
        const octets = rdata.match(/.{1,2}/g);
        if (!octets) return '';
        return octets.map(octet => parseInt(octet, 16)).join('.');
    }

    convertToIPv6(rdata: string): string {
        const segments = rdata.match(/.{1,4}/g);
        if (!segments) return '';
        return segments.map(segment => parseInt(segment, 16).toString(16)).join(':');
    }

    convertToCNAME(rdata: string): string {
        const cnameBuffer = Buffer.from(rdata, 'hex');
        let offset = 0;
        const labels = [];

        while (offset < cnameBuffer.length) {
            const length = cnameBuffer[offset++];
            if (length === 0) break;
            labels.push(cnameBuffer.subarray(offset, offset + length).toString());
            offset += length;
        }

        return labels.join('.');
    }

    private writeToFile(data: string) {
        fs.appendFileSync(this.outputFilePath, data, 'utf8');
    }
}

export { OutputLayer };
*/
