import { Communication } from './Communication';
import { PacketGenerator } from './PacketGenerator';
import { RecordType } from './QuestionEncoder';
import { Persistence } from './Persistance';

class DNSClient {
    private communication: Communication;
    private persistence: Persistence;
    private responsePromises: { [transactionID: number]: (value?: unknown) => void } = {};

    constructor(communication: Communication, persistence: Persistence) {
        this.communication = communication;
        this.persistence = persistence;
    }

    async start(userInput: { domain: string, recordType: string }) {
        const mappedRecordType = this.mapRecordType(userInput.recordType);
        if (!mappedRecordType) {
            console.error('Invalid record type provided.');
            return;
        }
        if ((mappedRecordType === 'A' || mappedRecordType === 'AAAA') && userInput.domain.startsWith('www.')) {
            userInput.domain = userInput.domain.substring(4);
        }

        const transactionID = Math.floor(Math.random() * 65535);
        const packet = PacketGenerator.createPacket(userInput.domain, mappedRecordType, transactionID);

        this.persistence.addTransaction(transactionID);

        const responsePromise = new Promise((resolve) => {
            this.responsePromises[transactionID] = resolve;
        });

        this.queryFlow(packet);

        await responsePromise;
    }

    private mapRecordType(recordType: string): RecordType | null {
        const typeMap: { [key: string]: RecordType } = {
            'A': 'A',
            'AAAA': 'AAAA',
            'CNAME': 'CNAME'
        };
        return typeMap[recordType.toUpperCase()] || null;
    }

    private queryFlow(packet: Buffer) {
        this.communication.send(packet);
    }

    resolveResponse(transactionID: number) {
        if (this.responsePromises[transactionID]) {
            this.responsePromises[transactionID]();
            delete this.responsePromises[transactionID];
        }
    }
}

export { DNSClient };



