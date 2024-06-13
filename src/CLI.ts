import { DNSClient } from './DNSClient';
import { RecordType } from './QuestionEncoder';
class CLI {
    private dnsClient: DNSClient;

    constructor(dnsClient: DNSClient) {
        this.dnsClient = dnsClient;
    }

    getInput(): { domain: string, recordType: string } {
        const readlineSync = require('readline-sync');
        const domain = readlineSync.question('Enter domain: ');
        if (domain.toLowerCase() === 'exit') {
            return { domain: 'exit', recordType: 'A' }; 
        }

        const recordType = readlineSync.question('Enter record type (A, AAAA, CNAME): ').toUpperCase();

        return { domain, recordType };
    }

    async run() {
        
        while (true) {
            const userInput = this.getInput();
            if (userInput.domain === 'exit') {
                console.log('Exiting');
                break;
            }
            await this.dnsClient.start(userInput);
        }
    }
}

export { CLI };





////////////////////////////////////////////////////////////////////FILE OUTPUT
/*import * as fs from 'fs';
import { DNSClient } from './DNSClient';

class CLI {
    private dnsClient: DNSClient;

    constructor(dnsClient: DNSClient) {
        this.dnsClient = dnsClient;
    }

    async run() {
        const inputFile = 'input.txt';
        const fileContent = fs.readFileSync(inputFile, 'utf-8');
        const lines = fileContent.split('\n');

        for (const line of lines) {
            if (line.trim() !== '') {
                const [domain, recordType] = line.split(' ');
                await this.dnsClient.start({ domain, recordType });
            }
        }
    }
}

export { CLI };*/

