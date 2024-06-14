var AnswerDecoder = require('../src/AnswerDecoder').AnswerDecoder;
var HeaderEncoder = require('../src/HeaderEncoder').HeaderEncoder;
var QuestionEncoder = require('../src/QuestionEncoder').QuestionEncoder;
function testDecodeHexdumpQuestionSection() {
    var buffer = Buffer.from([
        0x00, 0x01, 0x81, 0x80, 0x00, 0x01, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x06, 0x67, 0x6f, 0x6f,
        0x67, 0x6c, 0x65, 0x03, 0x63, 0x6f, 0x6d, 0x00,
        0x00, 0x01, 0x00, 0x01, 0xc0, 0x0c, 0x00, 0x01,
        0x00, 0x01, 0x00, 0x00, 0x00, 0xcf, 0x00, 0x04,
        0x8e, 0xfa, 0x46, 0x4e
    ]);
    var header = HeaderEncoder.decodeHeader(buffer);
    console.log(header.transactionID);
    console.log(header.flags);
    console.log(header.QDCOUNT);
    console.log(header.ANCOUNT);
    console.log(header.NSCOUNT);
    console.log(header.ARCOUNT);
    var questionSection = QuestionEncoder.decodeQuestionSection(buffer.subarray(12), 1);
    console.log('Decoded Question Section:', questionSection);
    var answerSection = AnswerDecoder.decodeAnswerSection(buffer, header.ANCOUNT, 12 + questionSection.byteLength);
    console.log('Decoded Answer Section:', answerSection);
    console.log('Test Case passed');
}
testDecodeHexdumpQuestionSection();
