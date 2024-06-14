import { PacketGenerator } from "./PacketGenerator";
import { PersistenceInterface } from "./PersistanceInterface";
import { OutputLayer } from './OutputLayer';
import { DNSClient } from './DNSClient';

export function handleResponse(msg: Buffer, persistence: PersistenceInterface, outputLayer: OutputLayer, dnsClient: DNSClient, c?:Boolean) {
    if (!c) {
        const packet = PacketGenerator.extractPacket(msg);
        //console.log('Packet Sent to output', packet)
        const transactionIndex = persistence.getTransactionIndex(packet.tId);

        if (transactionIndex !== -1) {
            persistence.addToOutput(packet, transactionIndex);
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