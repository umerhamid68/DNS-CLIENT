import { OutputInterface } from './OutputInterface';
import { PacketGenerator } from './PacketGenerator';
import * as fs from 'fs';

class FileOutput implements OutputInterface {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    outputPacket(packet: any, index: number) {
        const rdata = PacketGenerator.extractParsedRdata(packet);
        const output = `Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}\n`;
        fs.appendFileSync(this.filePath, output, 'utf8');
    }
}

export { FileOutput };
