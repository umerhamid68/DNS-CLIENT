import { DNSClient } from './DNSClient';
import { InputInterface } from './InputInterface';
import * as fs from 'fs';

class Fli implements InputInterface {
    private filePath: string;
    private fileContent: string[];
    private currentIndex: number;
    private dnsClient: DNSClient;

    constructor(filePath: string,dnsClient: DNSClient) {
        this.filePath = filePath;
        this.fileContent = fs.readFileSync(this.filePath, 'utf8').split('\n');
        this.currentIndex = 0;
        this.dnsClient = dnsClient;
    }

    getInput(): { domain: string, recordType: string } {
        while (this.currentIndex < this.fileContent.length) {
            const line = this.fileContent[this.currentIndex].trim();
            this.currentIndex++;

            if (!line) continue; // Skip empty lines

            const [domain, recordType] = line.split(' ');

            if (!domain || !recordType) {
                console.error(`Invalid input line: ${line}`);
                continue; // Skip invalid lines
            }

            return { domain, recordType: recordType.toUpperCase() };
        }

        return { domain: 'exit', recordType: 'A' }; // End of file or invalid input
    }
    async run() {
        
        while (true) {
            const userInput = this.getInput();
            if (userInput.domain === 'exit') {
                console.log('Exiting');
                break;
            }
            await this.dnsClient.queryFlow(userInput);
        }
    }
}

export { Fli };
