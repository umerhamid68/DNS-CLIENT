// class OutputLayer {
//     outputPacket(packet: any, index: number) {
//         const rdata = this.extractRData(packet.answer);
//         if (rdata !== '') {
//             console.log(`Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}`);
//         }
//         else {
//             console.log(`Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA not found`);
//         }



        
//     }

//     extractRData(answerSection: any[]): string {
//         if (!answerSection || answerSection.length === 0) return '';

//         return answerSection.map(answer => {
//             if (answer.type === 1) { //A
//                 return this.convertToIPv4(answer.rdata);
//             } else if (answer.type === 28) { //AAAA (IPv6)
//                 return this.convertToIPv6(answer.rdata);
//             } else if (answer.type === 5) { //CNAME
//                 return this.convertToCNAME(answer.rdata);
//             } else {
//                 return `Unknown record type ${answer.type}`;
//             }
//         }).join(', ');
//     }

//     convertToIPv4(rdata: string): string {
//         const octets = rdata.match(/.{1,2}/g);
//         if (!octets) return '';
//         return octets.map(octet => parseInt(octet, 16)).join('.');
//     }

//     convertToIPv6(rdata: string): string {
//         const segments = rdata.match(/.{1,4}/g);
//         if (!segments) return '';
//         return segments.map(segment => parseInt(segment, 16).toString(16)).join(':');
//     }

//     convertToCNAME(rdata: string): string {
//         const cnameBuffer = Buffer.from(rdata, 'hex');
//         let offset = 0;
//         const labels = [];

//         while (offset < cnameBuffer.length) {
//             const length = cnameBuffer[offset++];
//             if (length === 0) break;
//             labels.push(cnameBuffer.subarray(offset, offset + length).toString());
//             offset += length;
//         }

//         return labels.join('.');
//     }
// }

// export { OutputLayer };




// //////////////////////////////////////////////////////////////FILE OUTPUT CASE (TEST)

// /*import * as fs from 'fs';

// class OutputLayer {
//     private outputFilePath: string;

//     constructor(outputFilePath: string) {
//         this.outputFilePath = outputFilePath;
//         // Clear the output file at the start
//         fs.writeFileSync(this.outputFilePath, '');
//     }

//     outputPacket(packet: any, index: number) {
//         const rdata = this.extractRData(packet.answer);
//         const output = `Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}\n`;
//         this.writeToFile(output);
//     }

//     extractRData(answerSection: any[]): string {
//         if (!answerSection || answerSection.length === 0) return '';

//         return answerSection.map(answer => {
//             if (answer.type === 1) { //A
//                 return this.convertToIPv4(answer.rdata);
//             } else if (answer.type === 28) { //AAAA (IPv6)
//                 return this.convertToIPv6(answer.rdata);
//             } else if (answer.type === 5) { //CNAME
//                 return this.convertToCNAME(answer.rdata);
//             } else {
//                 return `Unknown record type ${answer.type}`;
//             }
//         }).join(', ');
//     }

//     convertToIPv4(rdata: string): string {
//         const octets = rdata.match(/.{1,2}/g);
//         if (!octets) return '';
//         return octets.map(octet => parseInt(octet, 16)).join('.');
//     }

//     convertToIPv6(rdata: string): string {
//         const segments = rdata.match(/.{1,4}/g);
//         if (!segments) return '';
//         return segments.map(segment => parseInt(segment, 16).toString(16)).join(':');
//     }

//     convertToCNAME(rdata: string): string {
//         const cnameBuffer = Buffer.from(rdata, 'hex');
//         let offset = 0;
//         const labels = [];

//         while (offset < cnameBuffer.length) {
//             const length = cnameBuffer[offset++];
//             if (length === 0) break;
//             labels.push(cnameBuffer.subarray(offset, offset + length).toString());
//             offset += length;
//         }

//         return labels.join('.');
//     }

//     private writeToFile(data: string) {
//         fs.appendFileSync(this.outputFilePath, data, 'utf8');
//     }
// }

// export { OutputLayer };

// */


/*import { PacketGenerator } from "./PacketGenerator";




class OutputLayer {
    outputPacket(packet: any, index: number) {
        //console.log('In output Layer',packet);
        const rdata = PacketGenerator.extractParsedRdata(packet);
        console.log(`Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}`);
    }
}

export { OutputLayer };
*/


import { OutputInterface } from './OutputInterface';

class OutputLayer {
    private output: OutputInterface;

    constructor(output: OutputInterface) {
        this.output = output;
    }

    outputPacket(packet: any, index: number) {
        this.output.outputPacket(packet, index);
    }
}

export { OutputLayer };







