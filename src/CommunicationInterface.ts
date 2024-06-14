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
<<<<<<< Updated upstream
    run(msg: Buffer, persistence: PersistenceInterface, outputLayer: OutputLayer, dnsClient: DNSClient): void;
=======
    //run(msg: Buffer, persistence: PersistenceInterface, outputLayer: OutputLayer, dnsClient: DNSClient): void;
    run(handleResponse: (msg: Buffer) => void, handleError: (err: Error) => void): void;
>>>>>>> Stashed changes
}

