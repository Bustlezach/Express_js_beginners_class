const { Router } = require('express');
const router = Router();

const groceryList = [
  {
    item: 'Milk',
    quantity: 2,
  },
  {
    item: 'Nescafe',
    quantity: 1,
  },
  {
    item: 'soya oil',
    quantity: 4,
  },
  {
    item: 'Cereal',
    quantity: 1,
  },
  {
    item: 'corn flakes',
    quantity: 3,
  },
];

// ROUTES

router.get('/', (request, response) => {
  response.send(groceryList);
});

// ROUTE PARAMETER
router.get('/:item', (request, response) => {
  const result = groceryList.filter(item => {
    return (item.item === request.params.item);
  });
  response.send(result);
  response.send(200);
});

router.post('/', (resquest, response) => {
  console.log(resquest.body);
  groceryList.push(resquest.body);
  response.send(201);
});

module.exports = router;