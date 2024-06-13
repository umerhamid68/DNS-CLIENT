const { QuestionEncoder } = require('./QuestionEncoder');
import { decodeDomainName } from "./QuestionEncoder";

class AnswerDecoder {
    static decodeAnswerSection(buffer: Buffer, ancount: number, offset: number): any {
        const answers = [];

        for (let i = 0; i < ancount; i++) {
            const { name, newOffset } = decodeDomainName(buffer, offset);
            offset = newOffset;
            const type = buffer.subarray(offset, offset + 2).readUInt16BE(0);
            const cls = buffer.subarray(offset + 2, offset + 4).readUInt16BE(0);
            const ttl = buffer.subarray(offset + 4, offset + 8).readUInt32BE(0);
            const rdlength = buffer.subarray(offset + 8, offset + 10).readUInt16BE(0);
            const rdata = buffer.subarray(offset + 10, offset + 10 + rdlength);
            offset += 10 + rdlength;

            answers.push({
                domain: name,
                name_offset : newOffset,
                type,
                cls,
                ttl,
                rdlength,
                rdata: rdata.toString('hex')
            });
        }

        return { answers, offset };
    }
    
}

export { AnswerDecoder };

