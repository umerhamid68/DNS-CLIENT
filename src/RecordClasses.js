"use strict";
// import * as net from 'node:net';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CNAME = exports.IPv6 = exports.IPv4 = exports.RecordT = void 0;
// export enum RecordT {
//     A = 1,
//     AAAA = 28,
//     CNAME = 5
// }
// export class IPv4 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv4(rdata);
//     }
//     static parse(rdata: Buffer): string {
//         if (rdata.length !== 4) return 'Invalid IPv4 address';
//         return Array.from(rdata).map(byte => byte.toString()).join('.');
//     }
// }
// export class IPv6 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv6(rdata);
//     }
//     static parse(rdata: Buffer): string {
//         if (rdata.length !== 16) return 'Invalid IPv6 address';
//         return Array.from(rdata).map(byte => byte.toString(16)).join(':');
//     }
// }
// export class CNAME {
//     static isValid(rdata: Buffer): boolean {
//         return rdata.length > 0;
//     }
//     static parse(rdata: Buffer): string {
//         const labels = [];
//         let offset = 0;
//         while (offset < rdata.length) {
//             const length = rdata[offset++];
//             if (length === 0) break;
//             labels.push(rdata.subarray(offset, offset + length).toString());
//             offset += length;
//         }
//         return labels.join('.');
//     }
// }
// import * as net from 'net';
// export enum RecordT {
//     A = 1,
//     AAAA = 28,
//     CNAME = 5
// }
// export class IPv4 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv4(rdata);
//     }
//     static parse(rdata: Buffer): { data: string, offset: number } {
//         if (rdata.length !== 4) return { data: 'Invalid IPv4 address', offset: rdata.length };
//         const data = Array.from(rdata).map(byte => byte.toString()).join('.');
//         console.log(rdata.length);
//         return { data, offset: rdata.length };
//     }
// }
// export class IPv6 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv6(rdata);
//     }
//     static parse(rdata: Buffer): { data: string, offset: number } {
//         if (rdata.length !== 16) return { data: 'Invalid IPv6 address', offset: rdata.length };
//         const data = Array.from(rdata).map(byte => byte.toString(16)).join(':');
//         return { data, offset: rdata.length };
//     }
// }
// export class CNAME {
//     static isValid(rdata: Buffer): boolean {
//         return rdata.length > 0;
//     }
//     static parse(rdata: Buffer): { data: string, offset: number } {
//         const labels = [];
//         let offset = 0;
//         while (offset < rdata.length) {
//             const length = rdata[offset++];
//             if (length === 0) break;
//             labels.push(rdata.subarray(offset, offset + length).toString());
//             offset += length;
//         }
//         return { data: labels.join('.'), offset };
//     }
// }
var net = require("net");
var RecordT;
(function (RecordT) {
    RecordT[RecordT["A"] = 1] = "A";
    RecordT[RecordT["AAAA"] = 28] = "AAAA";
    RecordT[RecordT["CNAME"] = 5] = "CNAME";
})(RecordT || (exports.RecordT = RecordT = {}));
var IPv4 = /** @class */ (function () {
    function IPv4() {
    }
    IPv4.isValid = function (rdata) {
        return net.isIPv4(rdata);
    };
    IPv4.parse = function (answers) {
        var data = [];
        var offset = 0;
        for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
            var answer = answers_1[_i];
            var rdata = Buffer.from(answer.rdata, 'hex');
            if (rdata.length !== 4) {
                data.push('Invalid IPv4 address');
                offset += rdata.length;
                continue;
            }
            data.push(Array.from(rdata).map(function (byte) { return byte.toString(); }).join('.'));
            offset += rdata.length;
        }
        //console.log(offset);
        return { data: data, offset: offset };
    };
    return IPv4;
}());
exports.IPv4 = IPv4;
var IPv6 = /** @class */ (function () {
    function IPv6() {
    }
    IPv6.isValid = function (rdata) {
        return net.isIPv6(rdata);
    };
    IPv6.parse = function (answers) {
        var data = [];
        var offset = 0;
        for (var _i = 0, answers_2 = answers; _i < answers_2.length; _i++) {
            var answer = answers_2[_i];
            var rdata = Buffer.from(answer.rdata, 'hex');
            if (rdata.length !== 16) {
                data.push('Invalid IPv6 address');
                offset += rdata.length;
                continue;
            }
            var segments = [];
            for (var i = 0; i < rdata.length; i += 2) {
                segments.push(rdata.readUInt16BE(i).toString(16));
            }
            var formattedAddress = segments.join(':').replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
            data.push(formattedAddress);
            offset += rdata.length;
        }
        return { data: data, offset: offset };
    };
    return IPv6;
}());
exports.IPv6 = IPv6;
var CNAME = /** @class */ (function () {
    function CNAME() {
    }
    CNAME.isValid = function (rdata) {
        return rdata.length > 0;
    };
    CNAME.parse = function (answers) {
        var data = [];
        var offset = 0;
        for (var _i = 0, answers_3 = answers; _i < answers_3.length; _i++) {
            var answer = answers_3[_i];
            var rdata = Buffer.from(answer.rdata, 'hex');
            var labels = [];
            var currentOffset = 0;
            while (currentOffset < rdata.length) {
                var length_1 = rdata[currentOffset++];
                if (length_1 === 0)
                    break;
                labels.push(rdata.subarray(currentOffset, currentOffset + length_1).toString());
                currentOffset += length_1;
            }
            data.push(labels.join('.'));
            offset += rdata.length;
        }
        //console.log(offset);
        return { data: data, offset: offset };
    };
    return CNAME;
}());
exports.CNAME = CNAME;
