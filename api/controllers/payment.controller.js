import mercadopago from "mercadopago";
import { Participant } from "../model/index.js";
import { HOST, MERCADOPAGO_API_KEY, NGROK } from "../../config.js";
import fetch from "node-fetch";

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    console.log(NGROK);
    res.status(200).json(participants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createAnOrder = async (req, res) => {
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
    notification_url: `${NGROK}/api/mp/webhook`,
  });
  res.send(result.body);
};

export const createThreeOrders = async (req, res) => {
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
    notification_url: `${NGROK}/api/mp/webhook`,
  });
  res.send(result.body);
};

export const createFiveOrders = async (req, res) => {
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
    notification_url: `${NGROK}/api/mp/webhook`,
  });
  res.send(result.body);
};

export const createTenOrders = async (req, res) => {
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
    notification_url: `${NGROK}/api/mp/webhook`,
  });
  res.send(result.body);
};

export const receiveWebHook = async (req, res) => {
  const payment = req.query;
  let createdParticipant;
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      const quantity = Number(data.body.additional_info.items[0].quantity);
      const acummMoney = Number(
        data.response.transaction_details.net_received_amount
      );
      console.log(acummMoney, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassss");
      const newParticipant = {
        name: "beto",
        lastname: "sdasdasdsadsadsa",
        email: data.response.payer.email,
        phone: 337432423,
        quantityBought: quantity,
      };
      
      if (data.body.status === "approved") {
        createdParticipant = await Participant.create(newParticipant);
         fetch(`${HOST}/api/acummNum/update-accumulated-numbers`, {
          method: "POST",
          body: JSON.stringify({ acummMoney }),
          headers: { "Content-Type": "application/json" },
        }); 
        return res.status(201).json({
          message: "Participante creado exitosamente",
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

export const raffleParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll();
    const totalTickets = participants.reduce(
      (total, participant) => total + participant.quantityBought,
      0
    );
    const randomNumber = Math.floor(Math.random() * totalTickets);

    if (participants.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay participantes en la base de datos." });
    }
    let accumulatedTickets = 0;
    let selectedParticipant;
    for (const participant of participants) {
      accumulatedTickets += participant.quantityBought;
      if (randomNumber < accumulatedTickets) {
        selectedParticipant = participant;
        break;
      }
    }
    return res.status(200).json({
      message: "Participante seleccionado al azar:",
      participant: selectedParticipant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAllParticipants = async (req, res) => {
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
