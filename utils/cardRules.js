const restrictions = {
    Classic: () => true,
    Gold: (client) => client.monthlyIncome >= 500,
    Platinum: (client) => client.monthlyIncome >= 1000 && client.viseClub,
    Black: (client) =>
      client.monthlyIncome >= 2000 &&
      client.viseClub &&
      !["China", "Vietnam", "India", "Iran"].includes(client.country),
    White: (client) =>
      client.monthlyIncome >= 2000 &&
      client.viseClub &&
      !["China", "Vietnam", "India", "Iran"].includes(client.country),
  };
  
  const benefits = {
    Gold: (purchase, date) => {
      const day = date.getUTCDay();
      if (day >= 1 && day <= 3 && purchase.amount > 100) {
        return { percent: 15, reason: "Lunes a Miércoles - Descuento 15%" };
      }
    },
    Platinum: (purchase, date, clientCountry) => {
      const day = date.getUTCDay();
      if (day >= 1 && day <= 3 && purchase.amount > 100) {
        return { percent: 20, reason: "Lunes a Miércoles - Descuento 20%" };
      }
      if (day === 6 && purchase.amount > 200) {
        return { percent: 30, reason: "Sábado - Descuento 30%" };
      }
      if (purchase.purchaseCountry !== clientCountry) {
        return { percent: 5, reason: "Compra en el exterior - Descuento 5%" };
      }
    },
    Black: (purchase, date, clientCountry) => {
      const day = date.getUTCDay();
      if (day >= 1 && day <= 3 && purchase.amount > 100) {
        return { percent: 25, reason: "Lunes a Miércoles - Descuento 25%" };
      }
      if (day === 6 && purchase.amount > 200) {
        return { percent: 35, reason: "Sábado - Descuento 35%" };
      }
      if (purchase.purchaseCountry !== clientCountry) {
        return { percent: 5, reason: "Compra en el exterior - Descuento 5%" };
      }
    },
    White: (purchase, date, clientCountry) => {
      const day = date.getUTCDay();
      if (day >= 1 && day <= 5 && purchase.amount > 100) {
        return { percent: 25, reason: "Lunes a Viernes - Descuento 25%" };
      }
      if ((day === 6 || day === 0) && purchase.amount > 200) {
        return { percent: 35, reason: "Fin de semana - Descuento 35%" };
      }
      if (purchase.purchaseCountry !== clientCountry) {
        return { percent: 5, reason: "Compra en el exterior - Descuento 5%" };
      }
    },
  };
  
  module.exports = { restrictions, benefits };
  