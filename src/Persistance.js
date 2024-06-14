"use strict";
/*export interface PersistenceInterface {
    addTransaction(transactionID: number): void;
    getTransactionIndex(transactionID: number): number;
    getNextTransactionId(): number;
    addToOutputList(packet: any, index: number): void;
    getOutputList(): any[];
}*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistence = void 0;
var Persistence = /** @class */ (function () {
    function Persistence() {
        this.transactions = [];
        this.outputList = [];
    }
    Persistence.prototype.addTransaction = function (transactionID) {
        this.transactions.push(transactionID);
        this.outputList.push(null); //initialize with null to maintain order
    };
    Persistence.prototype.getTransactionIndex = function (transactionID) {
        return this.transactions.indexOf(transactionID);
    };
    Persistence.prototype.getNextTransactionId = function () {
        return this.transactions.length + 1;
    };
    Persistence.prototype.addToOutput = function (packet, index) {
        this.outputList[index] = packet;
    };
    Persistence.prototype.getOutput = function () {
        return this.outputList;
    };
    return Persistence;
}());
exports.Persistence = Persistence;
