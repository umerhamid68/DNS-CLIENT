class HeaderEncoder {
    static createHeader(transactionID: number, QDCOUNT: number): Buffer {
        const buffer = Buffer.alloc(12);
        buffer.writeUInt16BE(transactionID, 0); //transactionID
        buffer.writeUInt16BE(0x0100, 2); //flags 
        buffer.writeUInt16BE(QDCOUNT, 4); //QDCOUNT
        buffer.writeUInt16BE(0, 6); //ANCOUNT
        buffer.writeUInt16BE(0, 8); //NSCOUNT
        buffer.writeUInt16BE(0, 10); //ARCOUNT
        return buffer;
    }

    static decodeHeader(buffer: Buffer): any {
        const transactionID = buffer.readUInt16BE(0);
        const flags = buffer.readUInt16BE(2);
        const QDCOUNT = buffer.readUInt16BE(4);
        const ANCOUNT = buffer.readUInt16BE(6);
        const NSCOUNT = buffer.readUInt16BE(8);
        const ARCOUNT = buffer.readUInt16BE(10);

        return {
            transactionID,
            flags,
            QDCOUNT,
            ANCOUNT,
            NSCOUNT,
            ARCOUNT
        };
    }
}

export { HeaderEncoder };
