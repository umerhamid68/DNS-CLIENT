import { OutputInterface } from './OutputInterface';
import { PacketGenerator } from './PacketGenerator';

class ConsoleOutput implements OutputInterface {
    outputPacket(packet: any, index: number) {
        const rdata = PacketGenerator.extractParsedRdata(packet);
        console.log(`Index: ${index}, Transaction ID: ${packet.header.transactionID}, RDATA: ${rdata}`);
    }
}

export { ConsoleOutput };
