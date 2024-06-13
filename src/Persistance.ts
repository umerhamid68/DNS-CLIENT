class Persistence {
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

    addToOutputList(packet: any, index: number) {
        this.outputList[index] = packet;
    }

    getOutputList() {
        return this.outputList;
    }
}

export { Persistence };

