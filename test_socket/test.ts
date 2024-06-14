// import * as dgram from 'dgram';

// function createDNSQuery(domain: string): Buffer {
//     const queryID = Buffer.from([0xaa, 0xaa]); 
//     const flags = Buffer.from([0x01, 0x00]); 
//     const questions = Buffer.from([0x00, 0x01]); 
//     const answerRRs = Buffer.from([0x00, 0x00]); 
//     const authorityRRs = Buffer.from([0x00, 0x00]); 
//     const additionalRRs = Buffer.from([0x00, 0x00]); 

//     const domainParts = domain.split('.');
//     const question = Buffer.concat(domainParts.map(part => {
//         const length = Buffer.from([part.length]);
//         const label = Buffer.from(part);
//         return Buffer.concat([length, label]);
//     }).concat(Buffer.from([0x00]))); 

//     const qType = Buffer.from([0x00, 0x01]); 
//     const qClass = Buffer.from([0x00, 0x01]); 

//     const query = Buffer.concat([queryID, flags, questions, answerRRs, authorityRRs, additionalRRs, question, qType, qClass]);
//     return query;
// }

// function parseResponseHeader(buffer: Buffer): void {
//     const transactionID = buffer.slice(0, 2).toString('hex');
//     const flags = buffer.slice(2, 4).toString('hex');
//     const questionCount = buffer.slice(4, 6).readUInt16BE(0);
//     const answerCount = buffer.slice(6, 8).readUInt16BE(0);
//     const authorityCount = buffer.slice(8, 10).readUInt16BE(0);
//     const additionalCount = buffer.slice(10, 12).readUInt16BE(0);

//     console.log('Transaction ID:', transactionID);
//     console.log('Flags:', flags);
//     console.log('Questions:', questionCount);
//     console.log('Answer RRs:', answerCount);
//     console.log('Authority RRs:', authorityCount);
//     console.log('Additional RRs:', additionalCount);
// }

// async function sendDNSQuery(domain: string) {
//     const dnsServer = '8.8.8.8';
//     const port = 53;

//     const packet = createDNSQuery(domain);

//     const client = dgram.createSocket('udp4');

//     client.on('error', (err) => {
//         console.error("UDP error: " + err.message);
//         client.close();
//     });

//     client.on('message', (message) => {
//         console.log("Received response (raw):", message.toString('hex'));
//         //parseResponseHeader(message);
//         client.close();
//     });

//     client.send(packet, port, dnsServer, (err) => {
//         if (err) {
//             console.error("UDP send error: " + err.message);
//             client.close();
//         } else {
//             console.log("DNS query sent to", dnsServer);
//         }
//     });
// }

// sendDNSQuery('google.com').then(() => {
//     console.log("Query sent.");
// }).catch((err) => {
//     console.error("Error:", err.message);
// });
