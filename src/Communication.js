"use strict";
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
var dgram = require("dgram");
var net = require("net");
var events_1 = require("events");
var Communication = /** @class */ (function (_super) {
    __extends(Communication, _super);
    function Communication() {
        var _this = _super.call(this) || this;
        _this.udpSocket = dgram.createSocket('udp4');
        _this.tcpSocket = new net.Socket();
        return _this;
    }
    Communication.prototype.initSockets = function () {
        var _this = this;
        this.udpSocket.on('message', function (msg) {
            _this.emit('message', msg);
        });
        this.tcpSocket.on('data', function (data) {
            _this.emit('message', data);
        });
        this.udpSocket.on('error', function (err) {
            console.error('UDP socket error:', err);
        });
        this.tcpSocket.on('error', function (err) {
            console.error('TCP socket error:', err);
        });
        this.udpSocket.on('listening', function () {
            var address = _this.udpSocket.address();
            console.log("UDP socket listening on ".concat(address.address, ":").concat(address.port));
        });
        this.tcpSocket.connect({ host: '1.1.1.1', port: 53 }, function () {
            console.log('TCP socket connected');
        });
        this.udpSocket.bind(0);
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
    Communication.prototype.closeSockets = function () {
        this.udpSocket.close();
        this.tcpSocket.end();
    };
    return Communication;
}(events_1.EventEmitter));
exports.Communication = Communication;
