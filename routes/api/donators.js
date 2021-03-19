const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const donators = require('../../Donators');

const idFilter = req => member => member.id === parseInt(req.params.id);

// Get all donators
router.get('/' , (req, res) => res.json(donators));

// Get single donator
router.get('/:id', (req, res) => {
  const found = donators.some(idFilter(req));

  if(found){
    res.json(donators.filter(idFilter(req)));
  } else {
    res.status(400).send({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create donator
router.post('/', (req, res) => {
  const newDonator = {
    ...req.body,
    id: uuid.v4()
  };

  if(!newDonator.name || !newDonator.phone || !newDonator.bloodType){
    return res.status(400).send({ msg: 'Please include a name, phone and blood type.' });
  } 

  donators.push(newDonator);
  res.json(donators);
});

// Update donator
router.put('/:id', (req, res) => {
  const found = donators.some(idFilter(req));

  if(found){
    donators.forEach((donator, i) => {
      if(idFilter(req)(donator)) {
        const updatedDonator = {...donator, ...req.body};
        donators[i] = updatedDonator;
        res.json({ msg: 'Donator updated', updatedDonator });
      }
    })
  } else {
    res.status(400).send({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete donator
router.delete('/:id', (req, res) => {
  const found = donators.some(idFilter(req));

  if(found){
    res.json({
      msg: 'Donator deleted',
      donators: donators.filter(donator => !idFilter(req)(donator))
    });
  } else {
    res.status(400).send({ msg: `No member with the id of ${req.params.id}` });
  }
})

module.exports = router;