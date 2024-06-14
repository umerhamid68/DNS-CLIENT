/*export interface PersistenceInterface {
    addTransaction(transactionID: number): void;
    getTransactionIndex(transactionID: number): number;
    getNextTransactionId(): number;
    addToOutputList(packet: any, index: number): void;
    getOutputList(): any[];
}*/

import { PersistenceInterface } from "./PersistanceInterface";

class Persistence implements PersistenceInterface {
    private transactions: number[] = [];
    private outputList: any[] = [];

    addTransaction(transactionID: number) {
        this.transactions.push(transactionID);
        this.outputList.push(null); //initialize with null to maintain order
    }

    getTransactionIndex(transactionID: number): number {
        return this.transactions.indexOf(transactionID);
    }

    getNextTransactionId(): number {
        return this.transactions.length + 1;
    }

    addToOutput(packet: any, index: number) {
        this.outputList[index] = packet;
    }

    getOutput() {
        return this.outputList;
    }
}

export { Persistence };

