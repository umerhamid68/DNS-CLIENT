// import * as dgram from 'dgram';
// import * as net from 'net';
// import { EventEmitter } from 'events';
// import { CommunicationInterface } from './CommunicationInterface';

// class Communication extends EventEmitter implements CommunicationInterface {
//     private udpSocket: dgram.Socket;
//     private tcpSocket: net.Socket;

//     constructor() {
//         super();
//         this.udpSocket = dgram.createSocket('udp4');
//         this.tcpSocket = new net.Socket();
//     }

//     initComm() {
//         this.udpSocket.on('message', (msg) => {
//             this.emit('message', msg);
//         });

//         this.tcpSocket.on('data', (data) => {
//             this.emit('message', data);
//         });

//         this.udpSocket.on('error', (err) => {
//             console.error('UDP socket error:', err);
//         });

//         this.tcpSocket.on('error', (err) => {
//             console.error('TCP socket error:', err);
//         });

//         this.udpSocket.on('listening', () => {
//             const address = this.udpSocket.address();
//             console.log(`UDP socket listening on ${address.address}:${address.port}`);
//         });

//         this.tcpSocket.connect({ host: '1.1.1.1', port: 53 }, () => {
//             console.log('TCP socket connected');
//         });

//         this.udpSocket.bind(0); 
//     }
//     send(packet: Buffer) {
//         if (packet.length > 512) {
//             this.sendTCP(packet);
//         } else {
//             this.sendUDP(packet);
//         }
//     }

//     sendUDP(packet: Buffer) {
//         this.udpSocket.send(packet, 53, '1.1.1.1', (err) => {
//             if (err) console.error('UDP send error:', err);
//         });
//     }

//     sendTCP(packet: Buffer) {
//         this.tcpSocket.write(packet);
//     }

//     closeComm() {
//         this.udpSocket.close();
//         this.tcpSocket.end();
//     }
// }

// export { Communication };



/*import * as dgram from 'dgram';
import * as net from 'net';
import { EventEmitter } from 'events';
import { CommunicationInterface } from './CommunicationInterface';

class Communication extends EventEmitter implements CommunicationInterface {
    private udpSocket: dgram.Socket;
    private tcpSocket: net.Socket;

    constructor() {
        super();
        this.udpSocket = dgram.createSocket('udp4');
        this.tcpSocket = new net.Socket();
    }

    initComm(onResponse: (msg: Buffer) => void, onError: (err: Error) => void) {
        this.udpSocket.on('message', onResponse);
        this.tcpSocket.on('data', onResponse);

        this.udpSocket.on('error', onError);
        this.tcpSocket.on('error', onError);

        this.udpSocket.on('listening', () => {
            const address = this.udpSocket.address();
            console.log(`UDP socket listening on ${address.address}:${address.port}`);
        });

        this.tcpSocket.connect({ host: '1.1.1.1', port: 53 }, () => {
            console.log('TCP socket connected');
        });

        this.udpSocket.bind(0); 
    }

    send(packet: Buffer) {
        if (packet.length > 512) {
            this.sendTCP(packet);
        } else {
            this.sendUDP(packet);
        }
    }

    sendUDP(packet: Buffer) {
        this.udpSocket.send(packet, 53, '1.1.1.1', (err) => {
            if (err) console.error('UDP send error:', err);
        });
    }

    sendTCP(packet: Buffer) {
        this.tcpSocket.write(packet);
    }

    closeComm() {
        this.udpSocket.close();
        this.tcpSocket.end();
    }
}

export { Communication };*/



import * as dgram from 'dgram';
import * as net from 'net';
import { EventEmitter } from 'events';
import { CommunicationInterface } from './CommunicationInterface';
import { PersistenceInterface } from './PersistanceInterface';
import { DNSClient } from './DNSClient';
import { handleResponse } from './ResponseGenerator';
import { OutputLayer } from './OutputLayer';

class Communication extends EventEmitter implements CommunicationInterface {
    private udpSocket: dgram.Socket;
    private tcpSocket: net.Socket;

    constructor() {
        super();
        this.udpSocket = dgram.createSocket('udp4');
        this.tcpSocket = new net.Socket();
    }

    initComm(onResponse: (msg: Buffer) => void, onError: (err: Error) => void) {
        this.udpSocket.on('message', onResponse);
        this.tcpSocket.on('data', onResponse);

        this.udpSocket.on('error', onError);
        this.tcpSocket.on('error', onError);

        this.udpSocket.on('listening', () => {
            const address = this.udpSocket.address();
            console.log(`UDP socket listening on ${address.address}:${address.port}`);
        });

        this.tcpSocket.connect({ host: '1.1.1.1', port: 53 }, () => {
            console.log('TCP socket connected');
        });

        this.udpSocket.bind(0);
    }

<<<<<<< Updated upstream
    run(msg: Buffer, persistence: PersistenceInterface, outputLayer: OutputLayer, dnsClient: DNSClient) {
=======
    /*run(msg: Buffer, persistence: PersistenceInterface, outputLayer: OutputLayer, dnsClient: DNSClient) {
>>>>>>> Stashed changes
        this.initComm(
            (msg: Buffer) => handleResponse(msg, persistence, outputLayer, dnsClient),
            (err: Error) => console.error('Communication error:', err)
        );
<<<<<<< Updated upstream
=======
    }*/
    run(handleResponse: (msg: Buffer) => void, handleError: (err: Error) => void) {
        this.initComm(handleResponse, handleError);
>>>>>>> Stashed changes
    }

    send(packet: Buffer) {
        if (packet.length > 512) {
            this.sendTCP(packet);
        } else {
            this.sendUDP(packet);
        }
    }

    sendUDP(packet: Buffer) {
        this.udpSocket.send(packet, 53, '1.1.1.1', (err) => {
            if (err) console.error('UDP send error:', err);
        });
    }

    sendTCP(packet: Buffer) {
        this.tcpSocket.write(packet);
    }

    closeComm() {
        this.udpSocket.close();
        this.tcpSocket.end();
    }
}

export { Communication };

