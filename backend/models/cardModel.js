const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    productId: {
        type: Schema.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    addons: {
        type: [
            {
                text: { type: String, required: true }, // Option text
                price: { type: Number, required: true } // Option price, if needed
            }
        ],
        default: []
    },
    price:{
        type:Number,
        required:true
    }
}, { timestamps: true });

module.exports = model('cardProducts', cardSchema);
