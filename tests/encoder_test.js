var PacketGenerator = require("../src/PacketGenerator").PacketGenerator;
function testEncodeHexdumpQuestionSection() {
    var header = PacketGenerator.createPacket('google.com', 'A', 1);
    console.log(header);
}
testEncodeHexdumpQuestionSection();
