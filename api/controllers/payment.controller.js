const mercadopago = require("mercadopago");
const { Participant } = require("../model");
const { HOST, MERCADOPAGO_API_KEY } = require("../../config");

exports.createAnOrder = async function (req, res) {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "calco",
        unit_price: 100,
        currency_id: "ARS",
        quantity: 1,
      },
    ],
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/failure`,
      pending: `${HOST}/penging`,
    },
    notification_url: "https://e2b6-186-124-45-83.ngrok.io/api/mp/webhook",
  });
  res.send(result.body);
};
exports.createThreeOrders = async function (req, res) {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "calco",
        unit_price: 100,
        currency_id: "ARS",
        quantity: 3,
      },
    ],
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/failure`,
      pending: `${HOST}/penging`,
    },
    notification_url: "https://e2b6-186-124-45-83.ngrok.io/api/mp/webhook",
  });
  res.send(result.body);
};
exports.createFiveOrders = async function (req, res) {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "calco",
        unit_price: 100,
        currency_id: "ARS",
        quantity: 5,
      },
    ],
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/failure`,
      pending: `${HOST}/penging`,
    },
    notification_url: "https://e2b6-186-124-45-83.ngrok.io/api/mp/webhook",
  });
  res.send(result.body);
};
exports.createTenOrders = async function (req, res) {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "calco",
        unit_price: 100,
        currency_id: "ARS",
        quantity: 10,
      },
    ],
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/failure`,
      pending: `${HOST}/penging`,
    },
    notification_url: "https://e2b6-186-124-45-83.ngrok.io/api/mp/webhook",
  });
  res.send(result.body);
};

exports.receiveWebHook = async function (req, res) {
  const payment = req.query;
  let createdParticipant;
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);

      const quantity = Number(data.body.additional_info.items[0].quantity);
      const newParticipant = {
        name: "el beto",
        lastname: "sosa",
        email: data.response.payer.email,
        phone: 337432423,
        amountPaid: 100,
      };

      if (data.body.status === "approved") {
        for (let i = 0; i < quantity; i++) {
          createdParticipant = await Participant.create(newParticipant);
        }
        return res.status(201).json({
          message: "Participantes creados exitosamente",
          participants: createdParticipant,
        });
      }
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.raffleParticipants = async function (req, res) {
  try {
    const participants = await Participant.findAll();

    if (participants.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay participantes en la base de datos." });
    }
    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedParticipant = participants[randomIndex];

    return res.status(200).json({
      message: "Participante seleccionado al azar:",
      participant: selectedParticipant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteAllParticipants = async function (req, res) {
  try {
    const result = await Participant.destroy({
      where: {},
    });
    res
      .status(201)
      .json({ message: "Todos los participantes han sido eliminados." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
