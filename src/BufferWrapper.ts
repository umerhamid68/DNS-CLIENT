// // // class BufferWrapper {
// // //     private buffer: Buffer;
// // //     private offset: number;

// // //     constructor(size: number) {
// // //         this.buffer = Buffer.alloc(size);
// // //         this.offset = 0;
// // //     }

// // //     writeUInt16BE(value: number) {
// // //         this.buffer.writeUInt16BE(value, this.offset);
// // //         this.offset += 2;
// // //     }

// // //     readUInt16BE(offset: number): number {
// // //         return this.buffer.readUInt16BE(offset);
// // //     }

// // //     getBuffer(): Buffer {
// // //         return this.buffer;
// // //     }
// // // }

// // // export { BufferWrapper };



// // class BufferWrapper {
// //     private buffer: Buffer;
// //     private offset: number;

// //     constructor(sizeOrBuffer: number | Buffer) {
// //         if (typeof sizeOrBuffer === 'number') {
// //             this.buffer = Buffer.alloc(sizeOrBuffer);
// //         } else {
// //             this.buffer = sizeOrBuffer;
// //         }
// //         this.offset = 0;
// //     }

// //     writeUInt16BE(value: number) {
// //         this.buffer.writeUInt16BE(value, this.offset);
// //         this.offset += 2;
// //     }

// //     readUInt16BE(): number {
// //         const value = this.buffer.readUInt16BE(this.offset);
// //         this.offset += 2;
// //         return value;
// //     }

// //     getBuffer(): Buffer {
// //         return this.buffer;
// //     }

// //     setOffset(newOffset: number) {
// //         this.offset = newOffset;
// //     }

// //     getOffset(): number {
// //         return this.offset;
// //     }
// // }

// // export { BufferWrapper };




// class BufferWrapper {
//     private buffer: Buffer;
//     private offset: number;

//     constructor(sizeOrBuffer: number | Buffer) {
//         if (typeof sizeOrBuffer === 'number') {
//             this.buffer = Buffer.alloc(sizeOrBuffer);
//         } else {
//             this.buffer = sizeOrBuffer;
//         }
//         this.offset = 0;
//     }

//     writeUInt16BE(value: number) {
//         this.buffer.writeUInt16BE(value, this.offset);
//         this.offset += 2;
//     }

//     readUInt16BE(): number {
//         const value = this.buffer.readUInt16BE(this.offset);
//         this.offset += 2;
//         return value;
//     }

//     writeUInt8(value: number) {
//         this.buffer.writeUInt8(value, this.offset);
//         this.offset += 1;
//     }

//     writeString(value: string) {
//         this.buffer.write(value, this.offset);
//         this.offset += value.length;
//     }

//     readUInt8(): number {
//         const value = this.buffer.readUInt8(this.offset);
//         this.offset += 1;
//         return value;
//     }

//     readString(length: number): string {
//         const value = this.buffer.toString('utf8', this.offset, this.offset + length);
//         this.offset += length;
//         return value;
//     }

//     writeDomainName(domain: string) {
//         const labels = domain.split('.');
//         labels.forEach(label => {
//             this.writeUInt8(label.length);
//             this.writeString(label);
//         });
//         this.writeUInt8(0); // null byte at the end
//     }

//     readDomainName(): string {
//         const labels = [];
//         let jumped = false;
//         let jumpOffset = 0;

//         while (true) {
//             const length = this.readUInt8();

//             // compression
//             if ((length & 0xc0) === 0xc0) {
//                 if (!jumped) {
//                     jumpOffset = this.offset;
//                 }
//                 this.offset = ((length & 0x3f) << 8) | this.readUInt8();
//                 jumped = true;
//                 continue;
//             }

//             if (length === 0) break;

//             labels.push(this.readString(length));
//         }

//         if (jumped) {
//             this.offset = jumpOffset;
//         }

//         return labels.join('.');
//     }

//     getBuffer(): Buffer {
//         return this.buffer;
//     }
//     getOffset(): Number {
//         return this.offset;
//     }
// }

// export { BufferWrapper };



class BufferWrapper {
    private buffer: Buffer;
    private offset: number;

    constructor(sizeOrBuffer: number | Buffer, offset: number = 0) {
        if (typeof sizeOrBuffer === 'number') {
            this.buffer = Buffer.alloc(sizeOrBuffer);
        } else {
            this.buffer = sizeOrBuffer;
        }
        this.offset = offset;
    }
    setOffset(value:number) {
        this.offset = value;
    }

    writeUInt16BE(value: number) {
        this.buffer.writeUInt16BE(value, this.offset);
        this.offset += 2;
    }

    readUInt16BE(offset?: number): number {
        const value = this.buffer.readUInt16BE(offset !== undefined ? offset : this.offset);
        if (offset === undefined) {
            this.offset += 2;
        }
        return value;
    }

    writeUInt8(value: number) {
        this.buffer.writeUInt8(value, this.offset);
        this.offset += 1;
    }

    writeString(value: string) {
        this.buffer.write(value, this.offset);
        this.offset += value.length;
    }

    readUInt8(offset?: number): number {
        const value = this.buffer.readUInt8(offset !== undefined ? offset : this.offset);
        if (offset === undefined) {
            this.offset += 1;
        }
        return value;
    }

    readString(length: number): string {
        const value = this.buffer.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    }

    writeDomainName(domain: string) {
        const labels = domain.split('.');
        labels.forEach(label => {
            this.writeUInt8(label.length);
            this.writeString(label);
        });
        this.writeUInt8(0); // null byte at the end
    }

    readDomainName(): { name: string, newOffset: number } {
        const labels = [];
        let jumped = false;
        let jumpOffset = 0;

        while (this.buffer[this.offset] !== 0) {
            const length = this.readUInt8();

            // compression
            if ((length & 0xc0) === 0xc0) {
                if (!jumped) {
                    jumpOffset = this.offset + 1;
                }
                this.offset = ((length & 0x3f) << 8) | this.readUInt8();
                jumped = true;
                continue;
            }

            labels.push(this.readString(length));
        }

        if (!jumped) {
            this.offset += 1; // skip the null byte
        }

        return { name: labels.join('.'), newOffset: jumped ? jumpOffset : this.offset };
    }

    readUInt32BE(): number {
        const value = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return value;
    }

    readSubarray(length: number): Buffer {
        const subarray = this.buffer.subarray(this.offset, this.offset + length);
        this.offset += length;
        return subarray;
    }

    getBuffer(): Buffer {
        return this.buffer;
    }

    getOffset(): number {
        return this.offset;
    }
}

export { BufferWrapper };




/*class BufferWrapper {
    private buffer: Buffer;
    private offset: number;

    constructor(sizeOrBuffer: number | Buffer, offset: number = 0) {
        if (typeof sizeOrBuffer === 'number') {
            this.buffer = Buffer.alloc(sizeOrBuffer);
        } else {
            this.buffer = sizeOrBuffer;
        }
        this.offset = offset;
    }
    setOffset(value:number):void {
        this.offset = value;
    }

    writeUInt16BE(value: number) {
        this.buffer.writeUInt16BE(value, this.offset);
        this.offset += 2;
    }

    readUInt16BE(offset?: number): number {
        const value = this.buffer.readUInt16BE(offset !== undefined ? offset : this.offset);
        if (offset === undefined) {
            this.offset += 2;
        }
        return value;
    }

    writeUInt8(value: number) {
        this.buffer.writeUInt8(value, this.offset);
        this.offset += 1;
    }

    writeString(value: string) {
        this.buffer.write(value, this.offset);
        this.offset += value.length;
    }

    readUInt8(offset?: number): number {
        const value = this.buffer.readUInt8(offset !== undefined ? offset : this.offset);
        if (offset === undefined) {
            this.offset += 1;
        }
        return value;
    }

    readString(length: number): string {
        const value = this.buffer.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    }

    writeDomainName(domain: string) {
        const labels = domain.split('.');
        labels.forEach(label => {
            this.writeUInt8(label.length);
            this.writeString(label);
        });
        this.writeUInt8(0); // null byte at the end
    }

    readDomainName(): { name: string, newOffset: number } {
        const labels = [];
        let jumped = false;
        let jumpOffset = 0;

        while (true) {
            const length = this.readUInt8();

            // compression
            if ((length & 0xc0) === 0xc0) {
                if (!jumped) {
                    jumpOffset = this.offset + 1;
                }
                this.offset = ((length & 0x3f) << 8) | this.readUInt8();
                jumped = true;
                continue;
            }

            if (length === 0) break;

            labels.push(this.readString(length));
        }

        if (!jumped) {
            this.offset += 1; // skip the null byte
        }

        return { name: labels.join('.'), newOffset: this.offset };
    }

    readUInt32BE(): number {
        const value = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return value;
    }

    readSubarray(length: number): Buffer {
        const subarray = this.buffer.subarray(this.offset, this.offset + length);
        this.offset += length;
        return subarray;
    }

    getBuffer(): Buffer {
        return this.buffer;
    }

    getOffset(): number {
        return this.offset;
    }
}

export { BufferWrapper };
*/

