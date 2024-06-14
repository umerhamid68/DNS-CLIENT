"use strict";
// import { RecordT } from "./RecordClasses";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionEncoder = void 0;
// class QuestionEncoder {
//     static createQuestion(domain: string, recordType: string): Buffer {
//         const typeKey = recordType.toUpperCase() as keyof typeof RecordT;
//         const typeValue = RecordT[typeKey];
//         if (typeValue === undefined) {
//             throw new Error(`Invalid record type: ${recordType}`);
//         }
//         const labels = domain.split('.');
//         let length = 0;
//         labels.forEach(label => length += label.length + 1); //length of labels and 1 byte
//         const buffer = Buffer.alloc(length + 5); //domain +qType+qClass
//         let offset = 0;
//         labels.forEach(label => {
//             buffer.writeUInt8(label.length, offset);
//             offset += 1;
//             buffer.write(label, offset);
//             offset += label.length;
//         });
//         //console.log('Record type',typeMap[recordType]);
//         buffer.writeUInt8(0, offset); //null byte at the end
//         buffer.writeUInt16BE(typeValue, offset + 1); //qType
//         buffer.writeUInt16BE(1, offset + 3); //qClass IN
//         return buffer;
//     }
//     static decodeQuestionSection(buffer: Buffer, qdcount: number): any {
//         let offset = 0;
//         const questions = [];
//         for (let i = 0; i < qdcount; i++) {
//             const { name, newOffset } = decodeDomainName(buffer, offset);
//             offset = newOffset;
//             const qType = buffer.readUInt16BE(offset);
//             const qClass = buffer.readUInt16BE(offset + 2);
//             offset += 4;
//             questions.push({
//                 domain: name,
//                 qType,
//                 qClass
//             });
//         }
//         return {
//             questions,
//             byteLength: offset
//         };
//     }
// }
// export function decodeDomainName(buffer: Buffer, offset: number): { name: string, newOffset: number } {
//     const labels = [];
//     let jumped = false;
//     let jumpOffset = 0;
//     while (buffer[offset] !== 0) {
//         const length = buffer[offset];
//         //compression
//         if ((length & 0xc0) === 0xc0) {
//             if (!jumped) {
//                 jumpOffset = offset + 2;
//             }
//             offset = ((length & 0x3f) << 8) | buffer[offset + 1];
//             jumped = true;
//             continue;
//         }
//         offset += 1;
//         labels.push(buffer.subarray(offset, offset + length).toString());
//         offset += length;
//     }
//     if (!jumped) {
//         offset += 1; //skip the null byte
//     }
//     return { name: labels.join('.'), newOffset: jumped ? jumpOffset : offset };
// }
// export { QuestionEncoder};
// import { RecordT } from './RecordClasses';
// import { BufferWrapper } from './BufferWrapper';
// class QuestionEncoder {
//     static createQuestion(domain: string, recordType: string): Buffer {
//         const typeKey = recordType.toUpperCase() as keyof typeof RecordT;
//         const typeValue = RecordT[typeKey];
//         if (typeValue === undefined) {
//             throw new Error(`Invalid record type: ${recordType}`);
//         }
//         const bufferWrapper = new BufferWrapper(domain.length + 5);
//         bufferWrapper.writeDomainName(domain);
//         bufferWrapper.writeUInt16BE(typeValue); // qType
//         bufferWrapper.writeUInt16BE(1); // qClass IN
//         return bufferWrapper.getBuffer();
//     }
//     static decodeQuestionSection(buffer: Buffer, qdcount: number): any {
//         const bufferWrapper = new BufferWrapper(buffer);
//         const questions = [];
//         for (let i = 0; i < qdcount; i++) {
//             const domain = bufferWrapper.readDomainName();
//             const qType = bufferWrapper.readUInt16BE();
//             const qClass = bufferWrapper.readUInt16BE();
//             questions.push({
//                 domain,
//                 qType,
//                 qClass
//             });
//         }
//         return {
//             questions,
//             byteLength: bufferWrapper.getOffset()
//         };
//     }
// }
var RecordClasses_1 = require("./RecordClasses");
var BufferWrapper_1 = require("./BufferWrapper");
var QuestionEncoder = /** @class */ (function () {
    function QuestionEncoder() {
    }
    QuestionEncoder.createQuestion = function (domain, recordType) {
        var typeKey = recordType.toUpperCase();
        var typeValue = RecordClasses_1.RecordT[typeKey];
        if (typeValue === undefined) {
            throw new Error("Invalid record type: ".concat(recordType));
        }
        var labels = domain.split('.');
        var length = 0;
        labels.forEach(function (label) { return length += label.length + 1; }); // length of labels and 1 byte
        var bufferWrapper = new BufferWrapper_1.BufferWrapper(length + 5); // domain + qType + qClass
        bufferWrapper.writeDomainName(domain);
        bufferWrapper.writeUInt16BE(typeValue); // qType
        bufferWrapper.writeUInt16BE(1); // qClass IN
        return bufferWrapper.getBuffer();
    };
    QuestionEncoder.decodeQuestionSection = function (buffer, qdcount) {
        var bufferWrapper = new BufferWrapper_1.BufferWrapper(buffer);
        var questions = [];
        for (var i = 0; i < qdcount; i++) {
            var domain = bufferWrapper.readDomainName();
            var qType = bufferWrapper.readUInt16BE();
            var qClass = bufferWrapper.readUInt16BE();
            questions.push({
                domain: domain,
                qType: qType,
                qClass: qClass
            });
        }
        return {
            questions: questions,
            byteLength: bufferWrapper.getOffset()
        };
    };
    return QuestionEncoder;
}());
exports.QuestionEncoder = QuestionEncoder;
