export interface PersistenceInterface {
    addTransaction(transactionID: number): void;
    getTransactionIndex(transactionID: number): number;
    getNextTransactionId(): number;
    addToOutput(packet: any, index: number): void;
    getOutput(): any[];
}
