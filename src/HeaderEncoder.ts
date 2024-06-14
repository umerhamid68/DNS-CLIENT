// class HeaderEncoder {
//     static createHeader(transactionID: number, QDCOUNT: number): Buffer {
//         const buffer = Buffer.alloc(12);
//         buffer.writeUInt16BE(transactionID, 0); //transactionID
//         buffer.writeUInt16BE(0x0100, 2); //flags 
//         buffer.writeUInt16BE(QDCOUNT, 4); //QDCOUNT
//         buffer.writeUInt16BE(0, 6); //ANCOUNT
//         buffer.writeUInt16BE(0, 8); //NSCOUNT
//         buffer.writeUInt16BE(0, 10); //ARCOUNT
//         return buffer;
//     }

//     static decodeHeader(buffer: Buffer): any {
//         const transactionID = buffer.readUInt16BE(0);
//         console.log('Decoded TID', transactionID);
//         const flags = buffer.readUInt16BE(2);
//         const QDCOUNT = buffer.readUInt16BE(4);
//         const ANCOUNT = buffer.readUInt16BE(6);
//         const NSCOUNT = buffer.readUInt16BE(8);
//         const ARCOUNT = buffer.readUInt16BE(10);

//         return {
//             transactionID,
//             flags,
//             QDCOUNT,
//             ANCOUNT,
//             NSCOUNT,
//             ARCOUNT
//         };
//     }
// }

// export { HeaderEncoder };




// /*import { BufferWrapper } from './BufferWrapper';

// class HeaderEncoder {
//     static createHeader(transactionID: number, QDCOUNT: number): Buffer {
//         const bufferWrapper = new BufferWrapper(12);
//         bufferWrapper.writeUInt16BE(transactionID); // transactionID
//         bufferWrapper.writeUInt16BE(0x0100); // flags 
//         bufferWrapper.writeUInt16BE(QDCOUNT); // QDCOUNT
//         bufferWrapper.writeUInt16BE(0); // ANCOUNT
//         bufferWrapper.writeUInt16BE(0); // NSCOUNT
//         bufferWrapper.writeUInt16BE(0); // ARCOUNT
//         return bufferWrapper.getBuffer();
//     }

//     static decodeHeader(buffer: Buffer): any {
//         const bufferWrapper = new BufferWrapper(buffer.length);
//         const transactionID = bufferWrapper.readUInt16BE(0);
//         console.log('Decoded TID', transactionID);
//         const flags = bufferWrapper.readUInt16BE(2);
//         const QDCOUNT = bufferWrapper.readUInt16BE(4);
//         const ANCOUNT = bufferWrapper.readUInt16BE(6);
//         const NSCOUNT = bufferWrapper.readUInt16BE(8);
//         const ARCOUNT = bufferWrapper.readUInt16BE(10);

//         return {
//             transactionID,
//             flags,
//             QDCOUNT,
//             ANCOUNT,
//             NSCOUNT,
//             ARCOUNT
//         };
//     }
// }

// export { HeaderEncoder };*/


import { BufferWrapper } from './BufferWrapper';

class HeaderEncoder {
    static createHeader(transactionID: number, QDCOUNT: number): Buffer {
<<<<<<< Updated upstream
        const bufferWrapper = new BufferWrapper(12);
=======
        const bufferWrapper = new BufferWrapper(12); //bytes
>>>>>>> Stashed changes
        bufferWrapper.writeUInt16BE(transactionID); // transactionID
        bufferWrapper.writeUInt16BE(0x0100); // flags 
        bufferWrapper.writeUInt16BE(QDCOUNT); // QDCOUNT
        bufferWrapper.writeUInt16BE(0); // ANCOUNT
        bufferWrapper.writeUInt16BE(0); // NSCOUNT
        bufferWrapper.writeUInt16BE(0); // ARCOUNT
        return bufferWrapper.getBuffer();
    }

    // static decodeHeader(buffer: Buffer): any {
    //     const bufferWrapper = new BufferWrapper(buffer);
    //     const transactionID = bufferWrapper.readUInt16BE();
    //     bufferWrapper.setOffset(2);
    //     const flags = bufferWrapper.readUInt16BE();
    //     bufferWrapper.setOffset(4);
    //     const QDCOUNT = bufferWrapper.readUInt16BE();
    //     bufferWrapper.setOffset(6);
    //     const ANCOUNT = bufferWrapper.readUInt16BE();
    //     bufferWrapper.setOffset(8);
    //     const NSCOUNT = bufferWrapper.readUInt16BE();
    //     bufferWrapper.setOffset(10);
    //     const ARCOUNT = bufferWrapper.readUInt16BE();

    //     return {
    //         transactionID,
    //         flags,
    //         QDCOUNT,
    //         ANCOUNT,
    //         NSCOUNT,
    //         ARCOUNT
    //     };
    // }
    static decodeHeader(buffer: Buffer): any {
        const bufferWrapper = new BufferWrapper(buffer);
        const transactionID = bufferWrapper.readUInt16BE();
        const flags = bufferWrapper.readUInt16BE();
        const QDCOUNT = bufferWrapper.readUInt16BE();
        const ANCOUNT = bufferWrapper.readUInt16BE();
        const NSCOUNT = bufferWrapper.readUInt16BE();
        const ARCOUNT = bufferWrapper.readUInt16BE();

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
