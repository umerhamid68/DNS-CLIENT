// export interface CommunicationInterface {
//     initComm(onResponse: (msg: Buffer) => void): void;
//     send(packet: Buffer): void;
//     closeComm(): void;
// }

import { DNSClient } from "./DNSClient";
import { OutputLayer } from "./OutputLayer";
import { PersistenceInterface } from "./PersistanceInterface";

export interface CommunicationInterface {
    initComm(onResponse: (msg: Buffer) => void, onError: (err: Error) => void): void;
    send(packet: Buffer): void;
    closeComm(): void;
    run(msg: Buffer, persistence: PersistenceInterface, outputLayer: OutputLayer, dnsClient: DNSClient): void;
}

