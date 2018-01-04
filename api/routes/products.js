const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello /product GET request!'
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello /product POST request!'
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'This produt is on special',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an id'
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product'
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product'
  });
});

module.exports = router;