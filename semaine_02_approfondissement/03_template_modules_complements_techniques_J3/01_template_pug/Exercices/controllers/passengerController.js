import PassengerModel from "../Models/Passenger.js";

export default async (req, res) => {
  const passengers = await PassengerModel.aggregate([
    { $match: { Pclass: 1 } },
    { $group: { _id: "$Sex", total: { $sum: 1 } } },
  ]);

  res.send(passengers);
};
