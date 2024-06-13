"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerDecoder = void 0;
var QuestionEncoder = require('./QuestionEncoder').QuestionEncoder;
var QuestionEncoder_1 = require("./QuestionEncoder");
/*class AnswerDecoder {
    static decodeAnswerSection(buffer: Buffer, ancount: number, offset: number): any {
        const answers = [];

        for (let i = 0; i < ancount; i++) {
            const { name, newOffset } = decodeDomainName(buffer, offset);
            const type = buffer.subarray(offset, offset + 2).readUInt16BE(0);
            const cls = buffer.subarray(offset + 2, offset + 4).readUInt16BE(0);
            const ttl = buffer.subarray(offset + 4, offset + 8).readUInt32BE(0);
            const rdlength = buffer.subarray(offset + 8, offset + 10).readUInt16BE(0);
            const rdata = buffer.subarray(offset + 10, offset + 10 + rdlength);
            offset += 10 + rdlength;

            answers.push({
                domain: name,
                type,
                cls,
                ttl,
                rdlength,
                rdata: rdata.toString('hex'),
            });
        }

        return { answers, offset };
    }
}

export { AnswerDecoder };*/
var AnswerDecoder = /** @class */ (function () {
    function AnswerDecoder() {
    }
    AnswerDecoder.decodeAnswerSection = function (buffer, ancount, offset) {
        var answers = [];
        for (var i = 0; i < ancount; i++) {
            var _a = (0, QuestionEncoder_1.decodeDomainName)(buffer, offset), name_1 = _a.name, newOffset = _a.newOffset;
            offset = newOffset;
            var type = buffer.subarray(offset, offset + 2).readUInt16BE(0);
            var cls = buffer.subarray(offset + 2, offset + 4).readUInt16BE(0);
            var ttl = buffer.subarray(offset + 4, offset + 8).readUInt32BE(0);
            var rdlength = buffer.subarray(offset + 8, offset + 10).readUInt16BE(0);
            var rdata = buffer.subarray(offset + 10, offset + 10 + rdlength);
            offset += 10 + rdlength;
            answers.push({
                domain: name_1,
                name_offset: newOffset,
                type: type,
                cls: cls,
                ttl: ttl,
                rdlength: rdlength,
                rdata: rdata.toString('hex')
            });
        }
        return { answers: answers, offset: offset };
    };
    return AnswerDecoder;
}());
exports.AnswerDecoder = AnswerDecoder;
