"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketGenerator = void 0;
var HeaderEncoder_1 = require("./HeaderEncoder");
var QuestionEncoder_1 = require("./QuestionEncoder");
var AnswerDecoder_1 = require("./AnswerDecoder");
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
        //console.log(header.transactionID)
        var questionSection = QuestionEncoder_1.QuestionEncoder.decodeQuestionSection(buffer.subarray(12), header.QDCOUNT);
        var answer = AnswerDecoder_1.AnswerDecoder.decodeAnswerSection(buffer, header.ANCOUNT, 12 + questionSection.byteLength);
        return {
            header: header,
            tId: header.transactionID,
            question: questionSection.questions,
            answer: answer.answers
        };
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
