var PROTO_PATH = './service.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {   keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var service_proto = grpc.loadPackageDefinition(packageDefinition).service;

let users = []

// RPC Methods
function getUser(call, callback) {
    const user = users.find(user => user.id == call.request.id)
    if (user) {
        callback(null, user)
    } else {
        callback(null, {})
    }
}

function addUser(call, callback) {
    const user = {
        id: call.request.id, 
        name: call.request.name, 
        email: call.request.email
    }
    users.push(user)
    callback(null, {result: true})
}

function operation(call, callback) {
    // codi de la calculadora
    const { operationType, num1, num2 } = call;

    let result;

    switch(operationType) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                callback(new Error('Cannot divide by zero'));
                return;
            }
            break;
        default:
            callback(new Error('Invalid operation type'));
            return;
    }

    callback(null, result);
}

// Starts an RPC server that receives requests for the service at the sample server port
function main() {
    var server = new grpc.Server();
  // Afegeix els mètodes RPC al servidor
    server.addService(service_proto.YourService.service, {getUser: getUser, addUser: addUser});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    });
}

main();
