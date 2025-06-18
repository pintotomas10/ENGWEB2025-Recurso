const mongoose = require('mongoose')

// Subdocumento: Criador
const criadorSchema = new mongoose.Schema({
    id: { type: String, default: null },
    nome: { type: String, default: null }
}, { _id: false })

// Documento principal: Cocktail
const cocktailSchema = new mongoose.Schema({
    _id: String, // ex: "a1", "abc", etc.
    nome: String,
    foto: { type: String, default: null },
    categoria: { type: String, default: null },
    servidoEm: { type: String, default: null },
    preparacao: { type: String, default: null },
    ingredientes: { type: [String], default: [] },
    criador: { type: criadorSchema, default: null }
}, { versionKey: false })

module.exports = mongoose.model('cocktails', cocktailSchema)
