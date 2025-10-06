const { getClientById } = require("../models/clientModel");
const { benefits } = require("../utils/cardRules");

function createPurchase(req, res) {
  const { clientId, amount, currency, purchaseDate, purchaseCountry } = req.body;
  const client = getClientById(clientId);

  if (!client) {
    return res.status(404).json({ status: "Rejected", error: "Cliente no encontrado" });
  }

  // Validar restricción para Black y White
  if (["Black", "White"].includes(client.cardType) && ["China", "Vietnam", "India", "Iran"].includes(purchaseCountry)) {
    return res.status(400).json({
      status: "Rejected",
      error: `El cliente con tarjeta ${client.cardType} no puede realizar compras desde ${purchaseCountry}`
    });
  }

  const date = new Date(purchaseDate);
  const benefitFn = benefits[client.cardType];
  let benefit = benefitFn?.({ amount, purchaseCountry }, date, client.country);

  if (benefit) {
    const discount = amount * (benefit.percent / 100);
    const final = amount - discount;
    return res.status(200).json({
      status: "Approved",
      purchase: {
        clientId,
        originalAmount: amount,
        discountApplied: discount,
        finalAmount: final,
        benefit: benefit.reason
      }
    });
  } else {
    return res.status(200).json({
      status: "Approved",
      purchase: {
        clientId,
        originalAmount: amount,
        discountApplied: 0,
        finalAmount: amount,
        benefit: "Sin beneficios aplicables"
      }
    });
  }
}

module.exports = { createPurchase };
