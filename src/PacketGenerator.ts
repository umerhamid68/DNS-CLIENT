/*import { HeaderEncoder } from './HeaderEncoder';
import { QuestionEncoder } from './QuestionEncoder';
import { AnswerDecoder } from './AnswerDecoder';
import { RecordType } from './QuestionEncoder';
import { IPv4, IPv6, CNAME } from './RecordClasses';

class PacketGenerator {
    static createPacket(domain: string, recordType: RecordType, transactionID: number, qdCount: number = 1): Buffer {
        const header = HeaderEncoder.createHeader(transactionID, qdCount); //qdcount 1 in case not supplied
        const question = QuestionEncoder.createQuestion(domain, recordType);
        //adding all fields of packet together
        const packet = Buffer.concat([header, question]);
        return packet;
    }
    static extractPacket(buffer: Buffer): any {
        const header = HeaderEncoder.decodeHeader(buffer);
        //console.log(header.transactionID)
        const questionSection = QuestionEncoder.decodeQuestionSection(buffer.subarray(12), header.QDCOUNT);
        const answer = AnswerDecoder.decodeAnswerSection(buffer, header.ANCOUNT, 12 + questionSection.byteLength);
        return {
            header,
            tId:header.transactionID,
            question: questionSection.questions,
            answer: answer.answers
        };
    }

    static reconstructPacket(existingPacket: Buffer, newDomain: string, newRecordType: RecordType): Buffer {
        const extracted = this.extractPacket(existingPacket);
        const newQuestion = QuestionEncoder.createQuestion(newDomain, newRecordType);
        //add new question to previous question
        const updatedQuestions = Buffer.concat([existingPacket.subarray(12), newQuestion]);
        //update qdcount in header
        const newHeader = HeaderEncoder.createHeader(extracted.header.transactionID, extracted.header.QDCOUNT + 1); 
        const newPacket = Buffer.concat([newHeader, updatedQuestions]); //make new packet
        return newPacket;
    }

    
}

export { PacketGenerator };*/



import { HeaderEncoder } from './HeaderEncoder';
import { QuestionEncoder } from './QuestionEncoder';
import { AnswerDecoder } from './AnswerDecoder';
//import { RecordType } from './QuestionEncoder';

class PacketGenerator {
    static createPacket(domain: string, recordType: string, transactionID: number, qdCount: number = 1): Buffer {
        const header = HeaderEncoder.createHeader(transactionID, qdCount); //qdcount 1 in case not supplied
        const question = QuestionEncoder.createQuestion(domain, recordType);
        //adding all fields of packet together
        const packet = Buffer.concat([header, question]);
        return packet;
    }

    static extractPacket(buffer: Buffer): any {
        const header = HeaderEncoder.decodeHeader(buffer);
        const questionSection = QuestionEncoder.decodeQuestionSection(buffer.subarray(12), header.QDCOUNT);
        //12 + questionSection.byteLength
        const answer = AnswerDecoder.decodeAnswerSection(buffer, header.ANCOUNT,12 + questionSection.byteLength);
        return {
            header,
            tId: header.transactionID,
            question: questionSection.questions,
            answers: answer.answers
        };
    }

    static extractParsedRdata(packet: any): string {
        //console.log('Packet to be extracted', packet);
        return AnswerDecoder.extractParsedRdata(packet);
    }

    static reconstructPacket(existingPacket: Buffer, newDomain: string, newRecordType: string): Buffer {
        const extracted = this.extractPacket(existingPacket);
        const newQuestion = QuestionEncoder.createQuestion(newDomain, newRecordType);
        //add new question to previous question
        const updatedQuestions = Buffer.concat([existingPacket.subarray(12), newQuestion]);
        //update qdcount in header
        const newHeader = HeaderEncoder.createHeader(extracted.header.transactionID, extracted.header.QDCOUNT + 1); 
        const newPacket = Buffer.concat([newHeader, updatedQuestions]); //make new packet
        return newPacket;
    }
}

export { PacketGenerator };






