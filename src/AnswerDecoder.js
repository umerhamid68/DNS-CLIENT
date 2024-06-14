"use strict";
// // const { QuestionEncoder } = require('./QuestionEncoder');
// // import { decodeDomainName } from "./QuestionEncoder";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerDecoder = void 0;
// // class AnswerDecoder {
// //     static decodeAnswerSection(buffer: Buffer, ancount: number, offset: number): any {
// //         const answers = [];
// //         for (let i = 0; i < ancount; i++) {
// //             const { name, newOffset } = decodeDomainName(buffer, offset);
// //             offset = newOffset;
// //             const type = buffer.subarray(offset, offset + 2).readUInt16BE(0);
// //             const cls = buffer.subarray(offset + 2, offset + 4).readUInt16BE(0);
// //             const ttl = buffer.subarray(offset + 4, offset + 8).readUInt32BE(0);
// //             const rdlength = buffer.subarray(offset + 8, offset + 10).readUInt16BE(0);
// //             const rdata = buffer.subarray(offset + 10, offset + 10 + rdlength);
// //             offset += 10 + rdlength;
// //             answers.push({
// //                 domain: name,
// //                 name_offset : newOffset,
// //                 type,
// //                 cls,
// //                 ttl,
// //                 rdlength,
// //                 rdata: rdata.toString('hex')
// //             });
// //         }
// //         return { answers, offset };
// //     }
// // }
// // export { AnswerDecoder };
// /*
// import { decodeDomainName } from "./QuestionEncoder";
// class AnswerDecoder {
//     static decodeAnswerSection(buffer: Buffer, ancount: number, offset: number): any {
//         const answers = [];
//         for (let i = 0; i < ancount; i++) {
//             const { name, newOffset } = decodeDomainName(buffer, offset);
//             offset = newOffset;
//             const type = buffer.readUInt16BE(offset);
//             const cls = buffer.readUInt16BE(offset + 2);
//             const ttl = buffer.readUInt32BE(offset + 4);
//             const rdlength = buffer.readUInt16BE(offset + 8);
//             const rdata = buffer.subarray(offset + 10, offset + 10 + rdlength).toString('hex');
//             offset += 10 + rdlength;
//             answers.push({
//                 domain: name,
//                 type,
//                 cls,
//                 ttl,
//                 rdlength,
//                 rdata
//             });
//         }
//         return { answers, offset };
//     }
//     static parseRdata(type: number, rdata: string): string {
//         const buffer = Buffer.from(rdata, 'hex');
//         if (type === 1) { // A
//             return this.convertToIPv4(buffer);
//         } else if (type === 28) { // AAAA
//             return this.convertToIPv6(buffer);
//         } else if (type === 5) { // CNAME
//             return this.convertToCNAME(buffer);
//         }
//         return 'Unknown record type';
//     }
//     static convertToIPv4(buffer: Buffer): string {
//         if (buffer.length !== 4) return 'Invalid IPv4 address';
//         return Array.from(buffer).map(byte => byte.toString()).join('.');
//     }
//     static convertToIPv6(buffer: Buffer): string {
//         if (buffer.length !== 16) return 'Invalid IPv6 address';
//         const segments = [];
//         for (let i = 0; i < buffer.length; i += 2) {
//             segments.push(buffer.readUInt16BE(i).toString(16));
//         }
//         return segments.join(':');
//     }
//     static convertToCNAME(buffer: Buffer): string {
//         const labels = [];
//         let offset = 0;
//         while (offset < buffer.length) {
//             const length = buffer[offset++];
//             if (length === 0) break;
//             labels.push(buffer.slice(offset, offset + length).toString());
//             offset += length;
//         }
//         return labels.join('.');
//     }
// }
// export { AnswerDecoder };*/
// import { decodeDomainName } from "./QuestionEncoder";
// import { IPv4, IPv6, CNAME, RecordT } from './RecordClasses';
// class AnswerDecoder {
//     static decodeAnswerSection(buffer: Buffer, ancount: number, offset: number): any {
//         const answers = [];
//         for (let i = 0; i < ancount; i++) {
//             const { name, newOffset } = decodeDomainName(buffer, offset);
//             offset = newOffset;
//             const type = buffer.readUInt16BE(offset);
//             const cls = buffer.readUInt16BE(offset + 2);
//             const ttl = buffer.readUInt32BE(offset + 4);
//             const rdlength = buffer.readUInt16BE(offset + 8);
//             const rdata = buffer.subarray(offset + 10, offset + 10 + rdlength).toString('hex');
//             offset += 10 + rdlength;
//             answers.push({
//                 domain: name,
//                 name_offset : newOffset,
//                 type,
//                 cls,
//                 ttl,
//                 rdlength,
//                 rdata
//             });
//         }
//         return { answers, offset };
//     }
//     /*static parseRdata(type: number, rdata: string): string {
//         const buffer = Buffer.from(rdata, 'hex');
//         if (type === RecordT.A) { // A
//             return IPv4.parse(buffer);
//         } else if (type === RecordT.AAAA) { // AAAA
//             return IPv6.parse(buffer);
//         } else if (type === RecordT.CNAME) { // CNAME
//             return CNAME.parse(buffer);
//         }
//         return 'Unknown record type';
//     }*/
//     /*static extractParsedRdata(packet: any): string {
//         console.log('Extracting parsed RDATA');
//         return packet.answer.map((ans: any) => {
//             switch (ans.type) {
//                 case RecordT.A:
//                     return IPv4.parse(Buffer.from(ans.rdata, 'hex')).data;
//                 case RecordT.AAAA:
//                     return IPv6.parse(Buffer.from(ans.rdata, 'hex')).data;
//                 case RecordT.CNAME:
//                     return CNAME.parse(Buffer.from(ans.rdata, 'hex')).data;
//                 default:
//                     return 'Unknown record type';
//             }
//         }).join(', ');
//     }*/
//    static extractParsedRdata(packet: any): string {
//         const aAnswers = packet.answer.filter((ans: any) => ans.type === RecordT.A);
//         const aaaaAnswers = packet.answer.filter((ans: any) => ans.type === RecordT.AAAA);
//         const cnameAnswers = packet.answer.filter((ans: any) => ans.type === RecordT.CNAME);
//         const aData = IPv4.parse(aAnswers).data;
//         const aaaaData = IPv6.parse(aaaaAnswers).data;
//         const cnameData = CNAME.parse(cnameAnswers).data;
//         return [...aData, ...aaaaData, ...cnameData].join(', ');
//     }
// }
// export { AnswerDecoder };
/*import { BufferWrapper } from './BufferWrapper';
import { IPv4, IPv6, CNAME, RecordT } from './RecordClasses';

class AnswerDecoder {
    static decodeAnswerSection(buffer: Buffer, ancount: number, initialOffset: number): any {
        const bufferWrapper = new BufferWrapper(buffer, initialOffset);
        const answers = [];

        for (let i = 0; i < ancount; i++) {
            const { name, newOffset } = bufferWrapper.readDomainName();
            bufferWrapper.setOffset(newOffset);
            const type = bufferWrapper.readUInt16BE();
            const cls = bufferWrapper.readUInt16BE();
            const ttl = bufferWrapper.readUInt32BE();
            const rdlength = bufferWrapper.readUInt16BE();
            const rdata = bufferWrapper.readSubarray(rdlength).toString('hex');
            console.log('Decoded RDATA', rdata);
            answers.push({
                domain: name,
                type,
                cls,
                ttl,
                rdlength,
                rdata
            });
        }

        return { answers, offset: bufferWrapper.getOffset() };
    }

    static extractParsedRdata(packet: any): string {
        const aAnswers = packet.answers.filter((ans: any) => ans.type === RecordT.A);
        const aaaaAnswers = packet.answers.filter((ans: any) => ans.type === RecordT.AAAA);
        const cnameAnswers = packet.answers.filter((ans: any) => ans.type === RecordT.CNAME);

        const aData = IPv4.parse(aAnswers).data;
        const aaaaData = IPv6.parse(aaaaAnswers).data;
        const cnameData = CNAME.parse(cnameAnswers).data;

        return [...aData, ...aaaaData, ...cnameData].join(', ');
    }
}

export { AnswerDecoder };*/
var BufferWrapper_1 = require("./BufferWrapper");
var RecordClasses_1 = require("./RecordClasses");
var AnswerDecoder = /** @class */ (function () {
    function AnswerDecoder() {
    }
    AnswerDecoder.decodeAnswerSection = function (buffer, ancount, initialOffset) {
        var bufferWrapper = new BufferWrapper_1.BufferWrapper(buffer, initialOffset);
        var answers = [];
        for (var i = 0; i < ancount; i++) {
            var _a = bufferWrapper.readDomainName(), name_1 = _a.name, newOffset = _a.newOffset;
            bufferWrapper.setOffset(newOffset);
            var type = bufferWrapper.readUInt16BE();
            var cls = bufferWrapper.readUInt16BE();
            var ttl = bufferWrapper.readUInt32BE();
            var rdlength = bufferWrapper.readUInt16BE();
            var rdata = bufferWrapper.readSubarray(rdlength).toString('hex');
            answers.push({
                domain: name_1,
                type: type,
                cls: cls,
                ttl: ttl,
                rdlength: rdlength,
                rdata: rdata
            });
        }
        return { answers: answers, offset: bufferWrapper.getOffset() };
    };
    AnswerDecoder.extractParsedRdata = function (packet) {
        //console.log('In answer decoder rdata extractor', packet);
<<<<<<< Updated upstream
=======
        /*the benefit of this that i thought was right was that it was avoiding checking and
         i did not have to fix what function to call based on what output
         may be beneficial in case of multiple responses that may have different types
         as in cname along with the ip address*/
>>>>>>> Stashed changes
        var aAnswers = packet.answers.filter(function (ans) { return ans.type === RecordClasses_1.RecordT.A; });
        var aaaaAnswers = packet.answers.filter(function (ans) { return ans.type === RecordClasses_1.RecordT.AAAA; });
        var cnameAnswers = packet.answers.filter(function (ans) { return ans.type === RecordClasses_1.RecordT.CNAME; });
        var aData = RecordClasses_1.IPv4.parse(aAnswers).data;
        var aaaaData = RecordClasses_1.IPv6.parse(aaaaAnswers).data;
        var cnameData = RecordClasses_1.CNAME.parse(cnameAnswers).data;
        return __spreadArray(__spreadArray(__spreadArray([], aData, true), aaaaData, true), cnameData, true).join(', ');
    };
    return AnswerDecoder;
}());
exports.AnswerDecoder = AnswerDecoder;
