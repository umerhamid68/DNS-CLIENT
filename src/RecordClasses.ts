// import * as net from 'node:net';

// export enum RecordT {
//     A = 1,
//     AAAA = 28,
//     CNAME = 5
// }

// export class IPv4 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv4(rdata);
//     }

//     static parse(rdata: Buffer): string {
//         if (rdata.length !== 4) return 'Invalid IPv4 address';
//         return Array.from(rdata).map(byte => byte.toString()).join('.');
//     }
// }

// export class IPv6 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv6(rdata);
//     }

//     static parse(rdata: Buffer): string {
//         if (rdata.length !== 16) return 'Invalid IPv6 address';
//         return Array.from(rdata).map(byte => byte.toString(16)).join(':');
//     }
// }

// export class CNAME {
//     static isValid(rdata: Buffer): boolean {
//         return rdata.length > 0;
//     }

//     static parse(rdata: Buffer): string {
//         const labels = [];
//         let offset = 0;

//         while (offset < rdata.length) {
//             const length = rdata[offset++];
//             if (length === 0) break;
//             labels.push(rdata.subarray(offset, offset + length).toString());
//             offset += length;
//         }

//         return labels.join('.');
//     }
// }




// import * as net from 'net';

// export enum RecordT {
//     A = 1,
//     AAAA = 28,
//     CNAME = 5
// }

// export class IPv4 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv4(rdata);
//     }

//     static parse(rdata: Buffer): { data: string, offset: number } {
//         if (rdata.length !== 4) return { data: 'Invalid IPv4 address', offset: rdata.length };
//         const data = Array.from(rdata).map(byte => byte.toString()).join('.');
//         console.log(rdata.length);
//         return { data, offset: rdata.length };
//     }
// }

// export class IPv6 {
//     static isValid(rdata: string): boolean {
//         return net.isIPv6(rdata);
//     }

//     static parse(rdata: Buffer): { data: string, offset: number } {
//         if (rdata.length !== 16) return { data: 'Invalid IPv6 address', offset: rdata.length };
//         const data = Array.from(rdata).map(byte => byte.toString(16)).join(':');
//         return { data, offset: rdata.length };
//     }
// }

// export class CNAME {
//     static isValid(rdata: Buffer): boolean {
//         return rdata.length > 0;
//     }

//     static parse(rdata: Buffer): { data: string, offset: number } {
//         const labels = [];
//         let offset = 0;

//         while (offset < rdata.length) {
//             const length = rdata[offset++];
//             if (length === 0) break;
//             labels.push(rdata.subarray(offset, offset + length).toString());
//             offset += length;
//         }

//         return { data: labels.join('.'), offset };
//     }
// }



import * as net from 'net';

export enum RecordT {
    A = 1,
    AAAA = 28,
    CNAME = 5
}

export class IPv4 {
    static isValid(rdata: string): boolean {
        return net.isIPv4(rdata);
    }

    static parse(answers: any[]): { data: string[], offset: number } {
        const data = [];
        let offset = 0;

        for (const answer of answers) {
            const rdata = Buffer.from(answer.rdata, 'hex');
            if (rdata.length !== 4) {
                data.push('Invalid IPv4 address');
                offset += rdata.length;
                continue;
            }
            data.push(Array.from(rdata).map(byte => byte.toString()).join('.'));
            offset += rdata.length;
        }
        //console.log(offset);

        return { data, offset };
    }
}

export class IPv6 {
    static isValid(rdata: string): boolean {
        return net.isIPv6(rdata);
    }

    static parse(answers: any[]): { data: string[], offset: number } {
        const data = [];
        let offset = 0;

        for (const answer of answers) {
            const rdata = Buffer.from(answer.rdata, 'hex');
            if (rdata.length !== 16) {
                data.push('Invalid IPv6 address');
                offset += rdata.length;
                continue;
            }
            const segments = [];
            for (let i = 0; i < rdata.length; i += 2) {
                segments.push(rdata.readUInt16BE(i).toString(16));
            }
            const formattedAddress = segments.join(':').replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
            data.push(formattedAddress);
            offset += rdata.length;
        }

        return { data, offset };
    }
}

export class CNAME {
    static isValid(rdata: Buffer): boolean {
        return rdata.length > 0;
    }

    static parse(answers: any[]): { data: string[], offset: number } {
        const data = [];
        let offset = 0;

        for (const answer of answers) {
            const rdata = Buffer.from(answer.rdata, 'hex');
            const labels = [];
            let currentOffset = 0;

            while (currentOffset < rdata.length) {
                const length = rdata[currentOffset++];
                if (length === 0) break;
                labels.push(rdata.subarray(currentOffset, currentOffset + length).toString());
                currentOffset += length;
            }

            data.push(labels.join('.'));
            offset += rdata.length;
        }
        //console.log(offset);

        return { data, offset };
    }
}
