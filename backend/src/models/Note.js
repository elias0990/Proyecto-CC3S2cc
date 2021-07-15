const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
    {
        title: String,
        content: { type: String, required: true},
        author: { type: String },
        date: Date,
        img: { type: String},
        comentario:String,
        categoria:String,
        usuario:String,
        precio:String,
        archivo:String
    }, {
        timestamps: true
    });

module.exports = model('Note', noteSchema);