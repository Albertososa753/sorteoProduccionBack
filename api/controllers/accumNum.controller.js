import { AccumulatedNumbers } from "../model/index.js";

export const updateAccumulatedNumbers = async (req, res) => {
  try {
    console.log(req.body.acummMoney, "bodyyyyyyyyyyyyyyyyyyyyyyyy");
    const { acummMoney } = req.body;
    let accumulatedNumbers = await AccumulatedNumbers.findOne();

    if (!accumulatedNumbers) {
      accumulatedNumbers = new AccumulatedNumbers({ total: 0 });
    }

    accumulatedNumbers.total += acummMoney;

    await accumulatedNumbers.save();

    res.status(200).json({
      message: "Acumulado actualizado exitosamente",
      total: accumulatedNumbers.total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
