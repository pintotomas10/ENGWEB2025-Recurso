var express = require('express');
var router = express.Router();
var Cocktails = require('../controllers/cocktails'); 

// GET /cocktails?ingrediente=EEEE
router.get('/', function(req, res, next) {
  const { ingrediente } = req.query

  if (ingrediente) {
    Cocktails.getByIngrediente(ingrediente)
      .then(data => {
        if (data.length) res.status(200).jsonp(data)
        else res.status(404).jsonp({ error: 'Nenhum cocktail encontrado com esse ingrediente' })
      })
      .catch(error => res.status(500).jsonp(error))
  } else {
    // Se não passou ingrediente, devolve todos (já tem a função getAll)
    Cocktails.getAll()
      .then(data => {
        if (data.length) res.status(200).jsonp(data)
        else res.status(404).jsonp({ error: 'Nenhum cocktail encontrado' })
      })
      .catch(error => res.status(500).jsonp(error))
  }
})


// GET /cocktails/:id
router.get('/:id', function(req, res, next) {
  const { id } = req.params

  Cocktails.getById(id)
    .then(data => {
      if (data) res.status(200).jsonp(data)
      else res.status(404).jsonp({ error: 'Cocktail não encontrado' })
    })
    .catch(error => res.status(500).jsonp(error))
})

// GET /criadores
router.get('/criadores', function(req, res, next) {
  Cocktails.getCriadoresComCocktails()
    .then(data => {
      if (data.length) res.status(200).jsonp(data)
      else res.status(404).jsonp({ error: 'Nenhum criador encontrado' })
    })
    .catch(error => res.status(500).jsonp(error))
})

// GET /criadores/:id
// GET /criadores/:id
router.get('/criadores/:id', function(req, res) {
  const idCriador = req.params.id;

  Cocktails.find({ 'criador.id': idCriador })
    .then(cocktails => {
      if (cocktails.length === 0) {
        res.status(404).jsonp({ error: 'Criador não encontrado ou sem cocktails' });
      } else {
        res.status(200).jsonp({
          criador: cocktails[0].criador, // assumimos que todos têm o mesmo criador
          cocktails: cocktails
        });
      }
    })
    .catch(error => res.status(500).jsonp({ error: error.message }));
});



// GET /ingredientes
router.get('/ingredientes', function(req, res, next) {
  Cocktails.getIngredientesComCocktails()
    .then(data => {
      if (data.length) res.status(200).jsonp(data)
      else res.status(404).jsonp({ error: 'Nenhum ingrediente encontrado' })
    })
    .catch(error => res.status(500).jsonp(error))
})

// GET /categorias
router.get('/categorias', function(req, res, next) {
  Cocktails.getCategoriasComCocktails()
    .then(data => {
      if (data.length) res.status(200).jsonp(data)
      else res.status(404).jsonp({ error: 'Nenhuma categoria encontrada' })
    })
    .catch(error => res.status(500).jsonp(error))
})

// POST /cocktails
router.post('/', function(req, res, next) {
  Cocktails.insert(req.body)
    .then(data => {
      if (data) res.status(201).jsonp(data);
      else res.status(500).jsonp({ error: 'Falha ao criar cocktail' });
    })
    .catch(error => res.status(500).jsonp(error));
});

// PUT /cocktails/:id
router.put('/:id', function(req, res, next) {
  Cocktails.update(req.params.id, req.body)
    .then(data => {
      if (data) res.status(200).jsonp(data);
      else res.status(404).jsonp({ error: 'Cocktail não encontrado para atualização' });
    })
    .catch(error => res.status(500).jsonp(error));
});

// DELETE /cocktails/:id
router.delete('/:id', function(req, res, next) {
  Cocktails.delete(req.params.id)
    .then(data => {
      if (data) res.status(200).jsonp(data);
      else res.status(404).jsonp({ error: 'Cocktail não encontrado para remoção' });
    })
    .catch(error => res.status(500).jsonp(error));
});

module.exports = router;