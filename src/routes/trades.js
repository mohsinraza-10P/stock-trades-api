const express = require('express');
const status = require('http-status');
const controller = require('../controllers/trades');

const router = new express.Router();

router.post('/trades', async (req, res) => {
  try {
    const result = await controller.create(req.body);
    res.status(status.CREATED).send(result);
  } catch (e) {
    res.status(status.BAD_REQUEST).send(e);
  }
});

router.get('/trades/:id', async (req, res) => {
  try {
    const result = await controller.fetch(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(status.NOT_FOUND).send(e);
  }
});

router.get('/trades', async (req, res) => {
  try {
    const result = await controller.fetchAll(req.query);
    res.send(result);
  } catch (e) {
    res.status(status.INTERNAL_SERVER_ERROR).send(e);
  }
});

router.delete('/trades/:id', (req, res) => {
  res.status(status.METHOD_NOT_ALLOWED).send();
});

router.put('/trades/:id', (req, res) => {
  res.status(status.METHOD_NOT_ALLOWED).send();
});

router.patch('/trades/:id', (req, res) => {
  res.status(status.METHOD_NOT_ALLOWED).send();
});

module.exports = router;
