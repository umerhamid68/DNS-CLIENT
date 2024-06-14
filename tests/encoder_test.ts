const { PacketGenerator } = require("../src/PacketGenerator");

function testEncodeHexdumpQuestionSection() {

    const header = PacketGenerator.createPacket('google.com', 'A',1);
    console.log(header);

}

testEncodeHexdumpQuestionSection();

/////////////////////////////////////////////////////////OUTPUT
/*
<Buffer 00 01 01 00 00 01 00 00 00 00 00 00 06 67 6f 6f 67 6c 65 03 63 6f 6d 00 00 01 00 01>
*/