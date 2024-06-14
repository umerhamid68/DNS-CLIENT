// import { RecordT } from "./RecordClasses";

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
import { RecordT } from './RecordClasses';
import { BufferWrapper } from './BufferWrapper';

class QuestionEncoder {
    static createQuestion(domain: string, recordType: string): Buffer {
        const typeKey = recordType.toUpperCase() as keyof typeof RecordT;
        const typeValue = RecordT[typeKey];

        if (typeValue === undefined) {
            throw new Error(`Invalid record type: ${recordType}`);
        }

        const labels = domain.split('.');
        let length = 0;
        labels.forEach(label => length += label.length + 1); // length of labels and 1 byte

        const bufferWrapper = new BufferWrapper(length + 5); // domain + qType + qClass
        bufferWrapper.writeDomainName(domain);
        bufferWrapper.writeUInt16BE(typeValue); // qType
        bufferWrapper.writeUInt16BE(1); // qClass IN

        return bufferWrapper.getBuffer();
    }

    static decodeQuestionSection(buffer: Buffer, qdcount: number): any {
        const bufferWrapper = new BufferWrapper(buffer);
        const questions = [];

        for (let i = 0; i < qdcount; i++) {
            const domain = bufferWrapper.readDomainName();
            const qType = bufferWrapper.readUInt16BE();
            const qClass = bufferWrapper.readUInt16BE();

            questions.push({
                domain,
                qType,
                qClass
            });
        }

        return {
            questions,
            byteLength: bufferWrapper.getOffset()
        };
    }
}





/*export function decodeDomainName(buffer: Buffer, offset: number): { name: string, newOffset: number } {
        const labels = [];
        let jumped = false;
        let jumpOffset = 0;
    
        while (buffer[offset] !== 0) {
            const length = buffer[offset];
    
            //compression
            if ((length & 0xc0) === 0xc0) {
                if (!jumped) {
                    jumpOffset = offset + 2;
                }
                offset = ((length & 0x3f) << 8) | buffer[offset + 1];
                jumped = true;
                continue;
            }
    
            offset += 1;
            labels.push(buffer.subarray(offset, offset + length).toString());
            offset += length;
        }
    
        if (!jumped) {
            offset += 1; //skip the null byte
        }
    
        return { name: labels.join('.'), newOffset: jumped ? jumpOffset : offset };
    }*/



export { QuestionEncoder };
