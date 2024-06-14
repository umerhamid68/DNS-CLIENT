const {OutputLayer} = require('../src/OutputLayer')

//old function, used to extraxct rdata here to avoid using output layer
function extractRData(packet: { answer: { rdata: string }[] }): string {
    if (packet && packet.answer && packet.answer.length > 0) {
        return packet.answer.map(answer => answer.rdata).join(', ');
    }
    return '';
}

export { extractRData };

function testExtractRData() {
    const mockPacket = {
        header: {
            transactionID: 12345,
            flags: 33152,
            QDCOUNT: 1,
            ANCOUNT: 1,
            NSCOUNT: 0,
            ARCOUNT: 0,
        },
        question: [
            { domain: 'google.com', qType: 1, qClass: 1 }
        ],
        answer: [
            {
                domain: 'google.com',
                type: 1,
                cls: 1,
                ttl: 300,
                rdlength: 4,
                rdata: '8efa464e'
            }
        ],
        processed: false
    };
    const outputLayer = new OutputLayer();
    const rdata = extractRData(mockPacket);
    console.log(`Extracted RDATA: ${rdata}`);
}

function testConvertRData() {
    const outputLayer = new OutputLayer(); 

    const mockPacket = {
        header: {
            transactionID: 12345,
            flags: 33152,
            QDCOUNT: 1,
            ANCOUNT: 1,
            NSCOUNT: 0,
            ARCOUNT: 0,
        },
        question: [
            { domain: 'google.com', qType: 1, qClass: 1 }
        ],
        answer: [
            {
                domain: 'google.com',
                type: 1,
                cls: 1,
                ttl: 300,
                rdlength: 4,
                rdata: '8efa464e'
            }
        ],
        processed: false
    };

    const rdata = outputLayer.outputPacket(mockPacket,1);
    console.log(`Converted RDATA: ${rdata}`);
}

testExtractRData();
testConvertRData();
