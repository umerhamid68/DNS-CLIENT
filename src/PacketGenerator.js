"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketGenerator = void 0;
var HeaderEncoder_1 = require("./HeaderEncoder");
var QuestionEncoder_1 = require("./QuestionEncoder");
var AnswerDecoder_1 = require("./AnswerDecoder");
//import { RecordType } from './QuestionEncoder';
var PacketGenerator = /** @class */ (function () {
    function PacketGenerator() {
    }
    PacketGenerator.createPacket = function (domain, recordType, transactionID, qdCount) {
        if (qdCount === void 0) { qdCount = 1; }
        var header = HeaderEncoder_1.HeaderEncoder.createHeader(transactionID, qdCount); //qdcount 1 in case not supplied
        var question = QuestionEncoder_1.QuestionEncoder.createQuestion(domain, recordType);
        //adding all fields of packet together
        var packet = Buffer.concat([header, question]);
        return packet;
    };
    PacketGenerator.extractPacket = function (buffer) {
        var header = HeaderEncoder_1.HeaderEncoder.decodeHeader(buffer);
        var questionSection = QuestionEncoder_1.QuestionEncoder.decodeQuestionSection(buffer.subarray(12), header.QDCOUNT);
        //12 + questionSection.byteLength
        var answer = AnswerDecoder_1.AnswerDecoder.decodeAnswerSection(buffer, header.ANCOUNT, 12 + questionSection.byteLength);
        return {
            header: header,
            tId: header.transactionID,
            question: questionSection.questions,
            answers: answer.answers
        };
    };
    PacketGenerator.extractParsedRdata = function (packet) {
        //console.log('Packet to be extracted', packet);
        return AnswerDecoder_1.AnswerDecoder.extractParsedRdata(packet);
    };
    PacketGenerator.reconstructPacket = function (existingPacket, newDomain, newRecordType) {
        var extracted = this.extractPacket(existingPacket);
        var newQuestion = QuestionEncoder_1.QuestionEncoder.createQuestion(newDomain, newRecordType);
        //add new question to previous question
        var updatedQuestions = Buffer.concat([existingPacket.subarray(12), newQuestion]);
        //update qdcount in header
        var newHeader = HeaderEncoder_1.HeaderEncoder.createHeader(extracted.header.transactionID, extracted.header.QDCOUNT + 1);
        var newPacket = Buffer.concat([newHeader, updatedQuestions]); //make new packet
        return newPacket;
    };
    return PacketGenerator;
}());
exports.PacketGenerator = PacketGenerator;
