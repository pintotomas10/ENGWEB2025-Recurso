const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res) {
  const date = new Date().toISOString().substring(0, 16);
  try {
    const response = await axios.get('http://localhost:18000/cocktails');
    res.render('index', {
      cocktails: response.data,
      date: date
    });
  } catch (error) {
    res.status(500).render('error', { error: error });
  }
});


// Página de um cocktail
router.get('/cocktails/:id', async function(req, res) {
  try {
    const response = await axios.get(`http://localhost:18000/cocktails/${req.params.id}`);
    res.render('cocktails', { cocktail: response.data });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

// Página de um criador
// GET /criadores/:id
router.get('/criadores/:id', (req, res) => {
  const id = req.params.id;

  axios.get(`http://localhost:18000/criadores/${id}`)
    .then(response => {
      res.status(200).render('criador', {
        criador: response.data.criador,
        cocktails: response.data.cocktails
      });
    })
    .catch(error => {
      res.status(500).render('error', { error });
    });
});


module.exports = router;
