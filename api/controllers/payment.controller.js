const mercadopago = require("mercadopago");
const { Participant } = require("../model");

// Controlador para crear una orden
exports.createOrder = async function (req, res) {
  mercadopago.configure({
    access_token:
      "TEST-4652017139929379-101100-ef12c12813d43190ca9c41583b31b597-1508340502",
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
      success: "http://localhost:4001/api/mp/success",
      failure: "http://localhost:4001/api/mp/failure",
      pending: "http://localhost:4001/api/mp/pending",
    },
    notification_url: "https://18ee-186-124-45-83.ngrok.io/api/mp/webhook",
  });

  console.log(result);
  res.send(result.body);
};

exports.receiveWebHook = async function (req, res) {
  const payment = req.query;
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaa333333333333333333333333',data)
      const newParticipant = {
        id: data.body.payer.id, 
        name: 'data.payer.name',
        lastname: 'data.payer.surname',
        email: data.response.payer.email,
        phone: 33647432423,
        amountPaid: 100,
      };

      // Crea una instancia de 'Participant' y guárdala en la base de datos
      const createdParticipant = await Participant.create(newParticipant);

      return res.status(201).json({
        message: "Participante creado exitosamente",
        participant: createdParticipant,
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};


exports.addParticipants = async (req,res)=>{
  console.log(req.doby)
}