const { AnswerDecoder } = require('../src/AnswerDecoder');
const { HeaderEncoder } = require('../src/HeaderEncoder');
const { QuestionEncoder } = require('../src/QuestionEncoder');

function testDecodeHexdumpQuestionSection() {
    const buffer = Buffer.from([
                0x00, 0x01, 0x81, 0x80, 0x00, 0x01, 0x00, 0x01,
                0x00, 0x00, 0x00, 0x00, 0x06, 0x67, 0x6f, 0x6f,
                0x67, 0x6c, 0x65, 0x03, 0x63, 0x6f, 0x6d, 0x00,
                0x00, 0x01, 0x00, 0x01, 0xc0, 0x0c, 0x00, 0x01,
                0x00, 0x01, 0x00, 0x00, 0x00, 0xcf, 0x00, 0x04,
                0x8e, 0xfa, 0x46, 0x4e
              ]);

    const header = HeaderEncoder.decodeHeader(buffer);
    console.log(header.transactionID)
    console.log(header.flags)
    console.log(header.QDCOUNT)    
    console.log(header.ANCOUNT)
    console.log(header.NSCOUNT)
    console.log(header.ARCOUNT)

    const questionSection = QuestionEncoder.decodeQuestionSection(buffer.subarray(12),1);
    console.log('Decoded Question Section:', questionSection);

    const answerSection = AnswerDecoder.decodeAnswerSection(buffer, header.ANCOUNT, 12 + questionSection.byteLength);

    console.log('Decoded Answer Section:', answerSection);

    console.log('Test Case passed');
}

testDecodeHexdumpQuestionSection();




////////////////////////////////////////////////////// OUTPUT
/*
1
33152
1
1
0
0
Decoded Question Section: {
  questions: [ { domain: 'google.com', qType: 1, qClass: 1 } ],
  byteLength: 16
}
Decoded Answer Section: {
  answers: [
    {
      domain: 'google.com',
      type: 1,
      cls: 1,
      ttl: 207,
      rdlength: 4,
      rdata: '8efa464e',
      newa: 30
    }
  ],
  offset: 44
}
Test Case passed
*/