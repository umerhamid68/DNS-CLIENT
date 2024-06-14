import { Communication } from './Communication';
import { CLI } from './CLI';
import { DNSClient } from './DNSClient';
import { handleResponse } from './ResponseGenerator';
import { Persistence } from './Persistance';
import { OutputLayer } from './OutputLayer';
import { ConsoleOutput } from './ConsoleOutput';
import { FileOutput } from './FileOutput';
import { Fli } from './Fli';
const communication = new Communication();
const persistence = new Persistence();
const console = new ConsoleOutput();
const F_out = new FileOutput('output.txt');
//const outputLayer = new OutputLayer(F_out);
const outputLayer = new OutputLayer(console);
const dnsClient = new DNSClient();

dnsClient.start(communication, persistence);

communication.run(Buffer.alloc(0), persistence, outputLayer, dnsClient)

const cli = new CLI(dnsClient);
cli.run();
/*const fli = new Fli('input.txt',dnsClient);
fli.run();*/




//////////////////////////////////////////// FILE OUTPUT CASE
/*import { Communication } from './Communication';
import { CLI } from './CLI';
import { DNSClient } from './DNSClient';
import { handleResponse } from './ResponseGenerator';
import { Persistence } from './Persistance';
import { OutputLayer } from './OutputLayer';
const outputFilePath = 'output.txt';
const communication = new Communication();
const persistence = new Persistence();
const outputLayer = new OutputLayer(outputFilePath);
const dnsClient = new DNSClient(communication, persistence);

communication.initSockets();
communication.on('message', (msg: Buffer) => handleResponse(msg, persistence, outputLayer, dnsClient));

const cli = new CLI(dnsClient);
cli.run();

*/



//////////////////////////////////////////////NORMAL CLI OUTPUT:
/*
Enter domain: google.com
Enter record type (A, AAAA, CNAME): AAAA
Record type 28
UDP socket listening on 0.0.0.0:42567
Index: 0, Transaction ID: 276, RDATA: 2404:6800:4009:826:0:0:0:200e
TCP socket connected
Enter domain: apple.com
Enter record type (A, AAAA, CNAME): CNAME
Record type 5
Index: 1, Transaction ID: 46795, RDATA not found
Enter domain: apple.com
Enter record type (A, AAAA, CNAME): A
Record type 1
Index: 2, Transaction ID: 44797, RDATA: 17.253.144.10
*/


////////////////////////////////////////////////////////
/* Response handler optional parameter true, output:
Enter domain: google.com
Enter record type (A, AAAA, CNAME): A
Record type 1
UDP socket listening on 0.0.0.0:39830
TCP socket connected
Differnt handler type....
<Buffer 76 da 81 80 00 01 00 01 00 00 00 00 06 67 6f 6f 67 6c 65 03 63 6f 6d 00 00 01 00 01 c0 0c 00 01 00 01 00 00 00 4d 00 04 8e fa 46 4e>
*/