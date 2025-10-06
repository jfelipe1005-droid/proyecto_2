# Crea un cliente válido
POST {{host}}/client
[Header]
Content-Type: application/json

{
  "name": "Alice",
  "country": "USA",
  "monthlyIncome": 5000,
  "viseClub": true,
  "cardType": "Gold"
}

HTTP/1.1 201
jsonpath "$.status" == "Registered"
capture client_id jsonpath "$.clientId"

# Hace una compra aprobada
POST {{host}}/purchase
[Header]
Content-Type: application/json

{
  "clientId": {{client_id}},
  "amount": 100,
  "currency": "USD",
  "purchaseDate": "2025-01-01",
  "purchaseCountry": "USA"
}

HTTP/1.1 200
jsonpath "$.status" == "Approved"
