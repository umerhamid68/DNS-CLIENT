
import { PacketGenerator } from "./PacketGenerator";
import { Persistence } from "./Persistance";
import { OutputLayer } from './OutputLayer';
import { DNSClient } from './DNSClient';

export function handleResponse(msg: Buffer, persistence: Persistence, outputLayer: OutputLayer, dnsClient: DNSClient, c?:Boolean) {
    if (!c) {
        const packet = PacketGenerator.extractPacket(msg);
        const transactionIndex = persistence.getTransactionIndex(packet.tId);

        if (transactionIndex !== -1) {
            persistence.addToOutputList(packet, transactionIndex);
            outputLayer.outputPacket(packet, transactionIndex);
            dnsClient.resolveResponse(packet.tId);
        } else {
            console.log(`Transaction ID ${packet.tId} not found in persistence layer.`);
        }
    }
    else {
        console.log('Different Hnadler');
        console.log('Buffer: ', msg);
    }
    
}
