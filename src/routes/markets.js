const { Router, response } = require('express');
const router = Router();

const superMarket = [
  {
    id: 1,
    store: "Whole Foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "RT Super market",
    miles: 1.26,
  },
  {
    id: 3,
    store: "Jp Store",
    miles: 2.1,
  },
  {
    id: 4,
    store: "Chucks Super market",
    miles: 0.2,
  },
  {
    id: 5,
    store: "Herlen Resturant",
    miles: 2.5,
  },
  {
    id: 6,
    store: "Just rite",
    miles: 1.6,
  },
  {
    id: 7,
    store: "Trade Joes",
    miles: 1.0,
  },
  {
    id: 8,
    store: "Albertons",
    miles: 2.8,
  },
  {
    id: 9,
    store: "Kelvin store",
    miles: 1.8,
  },
  {
    id: 10,
    store: "Misi T Resturant",
    miles: 3.0,
  },
];

router.get("/", (req, res) => {
  const {miles} = req.query;
  const parsedMiles = parseInt(miles);
  if (!isNaN(parsedMiles)) {
    const result = superMarket.filter(
      (store) => (store.miles <= parsedMiles)
    );
    res.send(result);
  } else {
    res.send(superMarket);
  }
  res.send(201);
});

module.exports = router;