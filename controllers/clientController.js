

const { registerClient } = require("../models/clientModel");
const { restrictions } = require("../utils/cardRules");

function createClient(req, res) {
  const { name, country, monthlyIncome, viseClub, cardType } = req.body;

  const isValid = restrictions[cardType]?.({ name, country, monthlyIncome, viseClub });

  if (!isValid) {
    let error = `El cliente no cumple con los requisitos para la tarjeta ${cardType}`;
    if (cardType === "Platinum" || cardType === "Black" || cardType === "White") {
      if (!viseClub) error = `El cliente no cumple con la suscripción VISE CLUB requerida para ${cardType}`;
      if (cardType !== "Platinum" && ["China", "Vietnam", "India", "Iran"].includes(country)) {
        error = `El cliente con tarjeta ${cardType} no puede vivir en ${country}`;
      }
    }
    return res.status(400).json({ status: "Rejected", error });
  }

  const client = registerClient({ name, country, monthlyIncome, viseClub, cardType });
  res.status(201).json({
    clientId: client.clientId,
    name: client.name,
    cardType: client.cardType,
    status: "Registered",
    message: `Cliente apto para tarjeta ${cardType}`
  });
}

module.exports = { createClient };
