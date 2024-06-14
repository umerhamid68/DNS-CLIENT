"use strict";
// import * as dgram from 'dgram';
// import * as net from 'net';
// import { EventEmitter } from 'events';
// import { CommunicationInterface } from './CommunicationInterface';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Communication = void 0;
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
var dgram = require("dgram");
var net = require("net");
var events_1 = require("events");
var ResponseGenerator_1 = require("./ResponseGenerator");
var Communication = /** @class */ (function (_super) {
    __extends(Communication, _super);
    function Communication() {
        var _this = _super.call(this) || this;
        _this.udpSocket = dgram.createSocket('udp4');
        _this.tcpSocket = new net.Socket();
        return _this;
    }
    Communication.prototype.initComm = function (onResponse, onError) {
        var _this = this;
        this.udpSocket.on('message', onResponse);
        this.tcpSocket.on('data', onResponse);
        this.udpSocket.on('error', onError);
        this.tcpSocket.on('error', onError);
        this.udpSocket.on('listening', function () {
            var address = _this.udpSocket.address();
            console.log("UDP socket listening on ".concat(address.address, ":").concat(address.port));
        });
        this.tcpSocket.connect({ host: '1.1.1.1', port: 53 }, function () {
            console.log('TCP socket connected');
        });
        this.udpSocket.bind(0);
    };
    Communication.prototype.run = function (msg, persistence, outputLayer, dnsClient) {
        this.initComm(function (msg) { return (0, ResponseGenerator_1.handleResponse)(msg, persistence, outputLayer, dnsClient); }, function (err) { return console.error('Communication error:', err); });
    };
    Communication.prototype.send = function (packet) {
        if (packet.length > 512) {
            this.sendTCP(packet);
        }
        else {
            this.sendUDP(packet);
        }
    };
    Communication.prototype.sendUDP = function (packet) {
        this.udpSocket.send(packet, 53, '1.1.1.1', function (err) {
            if (err)
                console.error('UDP send error:', err);
        });
    };
    Communication.prototype.sendTCP = function (packet) {
        this.tcpSocket.write(packet);
    };
    Communication.prototype.closeComm = function () {
        this.udpSocket.close();
        this.tcpSocket.end();
    };
    return Communication;
}(events_1.EventEmitter));
exports.Communication = Communication;
