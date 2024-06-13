"use strict";
/*type RecordType = 'A' | 'AAAA' | 'CNAME';

class QuestionEncoder {
    static createQuestion(domain: string, recordType: RecordType): Buffer {
        const typeMap: { [key in RecordType]: number } = {
            A: 0x0001,
            AAAA: 0x001c,
            CNAME: 0x0005
        };

        const labels = domain.split('.');
        let length = 0;
        labels.forEach(label => length += label.length + 1); //length of each label + 1 byte for length

        const buffer = Buffer.alloc(length + 5); //domain+qType+qClass
        let offset = 0;

        labels.forEach(label => {
            buffer.writeUInt8(label.length, offset);
            offset += 1;
            buffer.write(label, offset);
            offset += label.length;
        });

        buffer.writeUInt8(0, offset); //null byte at the end
        buffer.writeUInt16BE(typeMap[recordType], offset + 1); //qType
        buffer.writeUInt16BE(1, offset + 3); //qClass(IN)

        return buffer;
    }

    static decodeQuestionSection(buffer: Buffer, qdcount: number): any {
        let offset = 0;
        const questions = [];

        for (let i = 0; i < qdcount; i++) {
            const { name, newOffset } = QuestionEncoder.decodeDomainName(buffer, offset);
            offset = newOffset;
            const qType = buffer.readUInt16BE(offset);
            const qClass = buffer.readUInt16BE(offset + 2);
            offset += 4;

            questions.push({
                domain: name,
                qType,
                qClass
            });
        }

        return {
            questions,
            byteLength: offset
        };
    }

    static decodeDomainName(buffer: Buffer, offset: number): { name: string, newOffset: number } {
        const labels = [];
        let jumped = false;
        let jumpOffset = 0;

        while (buffer[offset] !== 0) {
            const length = buffer[offset];
            if ((length & 0xc0) === 0xc0) {
                if (!jumped) {
                    jumpOffset = offset + 2;
                }
                offset = ((length & 0x3f) << 8) | buffer[offset + 1];
                jumped = true;
                continue;
            }

            offset += 1;
            const label = buffer.subarray(offset, offset + length).toString();
            labels.push(label);
            offset += length;
        }

        if (!jumped) {
            offset += 1;
        }

        return { name: labels.join('.'), newOffset: jumped ? jumpOffset : offset };
    }
}

export { QuestionEncoder, RecordType };*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionEncoder = exports.decodeDomainName = void 0;
var QuestionEncoder = /** @class */ (function () {
    function QuestionEncoder() {
    }
    QuestionEncoder.createQuestion = function (domain, recordType) {
        var typeMap = {
            A: 0x0001,
            AAAA: 0x001c,
            CNAME: 0x0005
        };
        var labels = domain.split('.');
        var length = 0;
        labels.forEach(function (label) { return length += label.length + 1; }); // Length of each label + 1 byte for length
        var buffer = Buffer.alloc(length + 5); // Domain + QType + QClass
        var offset = 0;
        labels.forEach(function (label) {
            buffer.writeUInt8(label.length, offset);
            offset += 1;
            buffer.write(label, offset);
            offset += label.length;
        });
        //console.log('Record type',typeMap[recordType]);
        buffer.writeUInt8(0, offset); // Null byte at the end of the domain name
        buffer.writeUInt16BE(typeMap[recordType], offset + 1); // QType
        buffer.writeUInt16BE(1, offset + 3); // QClass (IN)
        return buffer;
    };
    QuestionEncoder.decodeQuestionSection = function (buffer, qdcount) {
        var offset = 0;
        var questions = [];
        for (var i = 0; i < qdcount; i++) {
            var _a = decodeDomainName(buffer, offset), name_1 = _a.name, newOffset = _a.newOffset;
            offset = newOffset;
            var qType = buffer.readUInt16BE(offset);
            var qClass = buffer.readUInt16BE(offset + 2);
            offset += 4;
            questions.push({
                domain: name_1,
                qType: qType,
                qClass: qClass
            });
        }
        return {
            questions: questions,
            byteLength: offset
        };
    };
    return QuestionEncoder;
}());
exports.QuestionEncoder = QuestionEncoder;
function decodeDomainName(buffer, offset) {
    var labels = [];
    var jumped = false;
    var jumpOffset = 0;
    while (buffer[offset] !== 0) {
        var length_1 = buffer[offset];
        // Handle compression
        if ((length_1 & 0xc0) === 0xc0) {
            if (!jumped) {
                jumpOffset = offset + 2;
            }
            offset = ((length_1 & 0x3f) << 8) | buffer[offset + 1];
            jumped = true;
            continue;
        }
        offset += 1;
        labels.push(buffer.subarray(offset, offset + length_1).toString());
        offset += length_1;
    }
    if (!jumped) {
        offset += 1; // Skip the null byte
    }
    return { name: labels.join('.'), newOffset: jumped ? jumpOffset : offset };
}
exports.decodeDomainName = decodeDomainName;
