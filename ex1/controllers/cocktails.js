const Cocktails = require('../models/cocktails.js') 

// GET /cocktails
module.exports.getAll = () => {
    return Cocktails.find({}, {
      _id: 1,
      nome: 1,
      categoria: 1,
      criador: 1
    }).exec()
}

// GET /cocktails/:id
module.exports.getById = id => {
    return Cocktails.findById(id).exec()
}

// GET /cocktails?ingrediente=EEEE
module.exports.getByIngrediente = ingrediente => {
    return Cocktails.find(
      { ingredientes: { $regex: ingrediente, $options: 'i' } }, // procura ingrediente na lista (case insensitive)
      { _id: 1, nome: 1, ingredientes: 1 }
    ).exec()
}

module.exports.getCriadoresComCocktails = () => {
    return Cocktails.aggregate([
      {
        $group: {
          _id: "$criador",
          cocktails: { $push: "$nome" }
        }
      },
      {
        $project: {
          _id: 0,
          criador: "$_id",
          cocktails: 1
        }
      },
      {
        $sort: { criador: 1 } // ordena alfabeticamente pelo nome do criador
      }
    ]).exec()
}
  
module.exports.getIngredientesComCocktails = () => {
    return Cocktails.aggregate([
      { $unwind: "$ingredientes" },       // separa cada ingrediente individualmente
      {
        $group: {
          _id: "$ingredientes",            // agrupa por ingrediente
          cocktails: { $push: "$nome" }   // lista dos cocktails com esse ingrediente
        }
      },
      {
        $project: {
          _id: 0,
          ingrediente: "$_id",
          cocktails: 1
        }
      },
      { $sort: { ingrediente: 1 } }        // ordena alfabeticamente
    ]).exec()
}

module.exports.getCategoriasComCocktails = () => {
    return Cocktails.aggregate([
      {
        $group: {
          _id: "$categoria",
          cocktails: { $push: "$nome" }
        }
      },
      {
        $project: {
          _id: 0,
          categoria: "$_id",
          cocktails: 1
        }
      },
      {
        $sort: { categoria: 1 }
      }
    ]).exec()
}
  

// POST /cocktails
module.exports.insert = cocktail => {
    const novo = new Cocktails(cocktail)
    return novo.save()
}

// PUT /cocktails/:id
module.exports.update = (id, cocktail) => {
    return Cocktails.findByIdAndUpdate(id, cocktail, { new: true }).exec()
}

// DELETE /cocktails/:id
module.exports.delete = id => {
    return Cocktails.findByIdAndDelete(id).exec()
}