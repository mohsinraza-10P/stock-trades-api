const express = require('express');
const httpStatus = require('http-status');
const controller = require('../controllers/trades');

const router = new express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await controller.create(req.body);
    res.status(httpStatus.CREATED).send(result);
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await controller.fetch(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(httpStatus.NOT_FOUND).send(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await controller.fetchAll(req.query);
    res.send(result);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

router.delete('/:id', (req, res) => {
  res.status(httpStatus.METHOD_NOT_ALLOWED).send();
});

router.put('/:id', (req, res) => {
  res.status(httpStatus.METHOD_NOT_ALLOWED).send();
});

router.patch('/:id', (req, res) => {
  res.status(httpStatus.METHOD_NOT_ALLOWED).send();
});

module.exports = router;
