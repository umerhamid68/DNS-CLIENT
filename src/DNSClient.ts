// import { CommunicationInterface } from './CommunicationInterface';
// import { PacketGenerator } from './PacketGenerator';
// import { RecordType } from './QuestionEncoder';
// import { PersistenceInterface } from './PersistanceInterface';

// class DNSClient {
//     private communication: CommunicationInterface;
//     private persistence: PersistenceInterface;
//     private responsePromises: { [transactionID: number]: (value?: unknown) => void } = {};

//     constructor(communication: CommunicationInterface, persistence: PersistenceInterface) {
//         this.communication = communication;
//         this.persistence = persistence;
//     }

//     /*async start(userInput: { domain: string, recordType: string }) {
//         const mappedRecordType = this.mapRecordType(userInput.recordType);
//         if (!mappedRecordType) {
//             console.error('Invalid record type provided.');
//             return;
//         }
//         if ((mappedRecordType === 'A' || mappedRecordType === 'AAAA') && userInput.domain.startsWith('www.')) {
//             userInput.domain = userInput.domain.substring(4);
//         }

//         const transactionID = Math.floor(Math.random() * 65535);
//         const packet = PacketGenerator.createPacket(userInput.domain, mappedRecordType, transactionID);

//         this.persistence.addTransaction(transactionID);

//         const responsePromise = new Promise((resolve) => {
//             this.responsePromises[transactionID] = resolve;
//         });

//         this.queryFlow(packet);

//         await responsePromise;
//     }*/
//     async start(userInput: { domain: string, recordType: string }) {
//         const mappedRecordType = this.mapRecordType(userInput.recordType);
//         if (!mappedRecordType) {
//             console.error('Invalid record type provided.');
//             return;
//         }
//         if ((mappedRecordType === 'A' || mappedRecordType === 'AAAA') && userInput.domain.startsWith('www.')) {
//             userInput.domain = userInput.domain.substring(4);
//         }

//         await this.queryFlow(userInput.domain, mappedRecordType);
//     }

//     private mapRecordType(recordType: string): RecordType | null {
//         const typeMap: { [key: string]: RecordType } = {
//             'A': 'A',
//             'AAAA': 'AAAA',
//             'CNAME': 'CNAME'
//         };
//         return typeMap[recordType.toUpperCase()] || null;
//     }

//     private async queryFlow(domain: string, recordType: RecordType) {
//         const transactionID = Math.floor(Math.random() * 65535);
//         const packet = PacketGenerator.createPacket(domain, recordType, transactionID);

//         this.persistence.addTransaction(transactionID);

//         const responsePromise = new Promise((resolve) => {
//             this.responsePromises[transactionID] = resolve;
//         });

//         this.communication.send(packet);

//         await responsePromise;
//     }

//     /*private queryFlow(packet: Buffer) {
//         this.communication.send(packet);
//     }*/


//     resolveResponse(transactionID: number) {
//         if (this.responsePromises[transactionID]) {
//             this.responsePromises[transactionID]();
//             delete this.responsePromises[transactionID];
//         }
//     }
// }

// export { DNSClient };





import { CommunicationInterface } from './CommunicationInterface';
import { PacketGenerator } from './PacketGenerator';
import { RecordT } from './RecordClasses';
import { PersistenceInterface } from './PersistanceInterface';

class DNSClient {
    private communication!: CommunicationInterface;
    private persistence!: PersistenceInterface;
    private responsePromises: { [transactionID: number]: (value?: unknown) => void } = {};

    constructor() {
        
    }

    /*static create(): DNSClient {
        return new DNSClient();
    }*/

    start(communication: CommunicationInterface, persistence: PersistenceInterface) {
        this.communication = communication;
        this.persistence = persistence;
        console.log('DNS Client started and ready for queries.');
    }

    async queryFlow(userInput: { domain: string, recordType: string }) {
        const recordType = userInput.recordType.toUpperCase();
        if (!this.isValidRecordType(recordType)) {
            console.error('Invalid record type provided.');
            return;
        }
        if ((recordType === 'A' || recordType === 'AAAA') && userInput.domain.startsWith('www.')) {
            userInput.domain = userInput.domain.substring(4);
        }

        const transactionID = Math.floor(Math.random() * 65535);
        const packet = PacketGenerator.createPacket(userInput.domain, recordType, transactionID);

        this.persistence.addTransaction(transactionID);

        const responsePromise = new Promise((resolve) => {
            this.responsePromises[transactionID] = resolve;
        });

        this.communication.send(packet);

        await responsePromise;
    }

    private isValidRecordType(recordType: string): boolean {
        const validRecordTypes = Object.keys(RecordT);
        return validRecordTypes.includes(recordType);
    }

    resolveResponse(transactionID: number) {
        if (this.responsePromises[transactionID]) {
            this.responsePromises[transactionID]();
            delete this.responsePromises[transactionID];
        }
    }

    close() {
        if (this.communication) {
            this.communication.closeComm();
            console.log('DNS Client communication closed.');
        }
    }
}

export { DNSClient };
