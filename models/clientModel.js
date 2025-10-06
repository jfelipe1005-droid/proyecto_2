let clients = [];
let currentId = 1;

function registerClient(data) {
  const client = { clientId: currentId++, ...data };
  clients.push(client);
  return client;
}

function getClientById(id) {
  return clients.find(c => c.clientId === id);
}

module.exports = { registerClient, getClientById };
