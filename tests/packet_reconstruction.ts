import { PacketGenerator } from '../src/PacketGenerator';
import { RecordType } from '../src/QuestionEncoder';

function testPacketReconstruction() {
    const initialPacket = PacketGenerator.createPacket('google.com', 'A', 1);
    console.log('Initial Packet:', initialPacket.toString('hex'));

    const reconstructedPacket = PacketGenerator.reconstructPacket(initialPacket, 'example.com', 'CNAME');
    console.log('Reconstructed Packet:', reconstructedPacket.toString('hex'));

    const extracted = PacketGenerator.extractPacket(reconstructedPacket);
    console.log('Reconstructed Packet Details:', extracted);
}

testPacketReconstruction();










////////////////////////////////////////SENDING RECONSTRUCTED PACKET TO RESOLVER
/*import { PacketGenerator } from './PacketGenerator';
import { RecordType } from './QuestionEncoder';
import * as dgram from 'dgram';

function sendDNSPacket(packet: Buffer) {
    const client = dgram.createSocket('udp4');
    const server = '8.8.8.8'; 
    const port = 53;

    client.send(packet, port, server, (err) => {
        if (err) {
            console.error('Error sending packet:', err);
            client.close();
        } else {
            console.log('Packet sent');
        }
    });

    client.on('message', (msg) => {
        console.log('Received response:', msg.toString('hex'));
        const extractedPacket = PacketGenerator.extractPacket(msg);
        console.log('Decoded Packet:', JSON.stringify(extractedPacket, null, 2));
        client.close();
    });
}

function testSendingReconstructedPacket() {
    const initialPacket = PacketGenerator.createPacket('google.com', 'A', 1);
    console.log('Initial Packet:', initialPacket.toString('hex'));

    //reconstruct packet by adding another question
    const reconstructedPacket = PacketGenerator.reconstructPacket(initialPacket, 'abc.com', 'CNAME');
    console.log('Reconstructed Packet:', reconstructedPacket.toString('hex'));

    //send reconstructed packet
    sendDNSPacket(reconstructedPacket);
}

//run test
testSendingReconstructedPacket();*/


////////////////////////////////////////////////////////
/* RESPONSE:
Record type 1
Initial Packet: 00010100000100000000000006676f6f676c6503636f6d0000010001
1
Record type 5
Reconstructed Packet: 00010100000200000000000006676f6f676c6503636f6d00000100010361626303636f6d0000050001
Packet sent
Received response: 00018180000100010000000006676f6f676c6503636f6d0000010001c00c000100010000009c0004c0b218ae
1
Decoded Packet: {
  "header": {
    "transactionID": 1,
    "flags": 33152,
    "QDCOUNT": 1,
    "ANCOUNT": 1,
    "NSCOUNT": 0,
    "ARCOUNT": 0
  },
  "tId": 1,
  "question": [
    {
      "domain": "google.com",
      "qType": 1,
      "qClass": 1
    }
  ],
  "answer": [
    {
      "domain": "google.com",
      "type": 1,
      "cls": 1,
      "ttl": 156,
      "rdlength": 4,
      "rdata": "c0b218ae",
      "newa": 30
    }
  ]
} 
  */
