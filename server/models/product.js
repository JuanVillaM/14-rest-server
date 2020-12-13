const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    price: { type: Number, required: [true, 'The price is required'] },
    description: { type: String, required: false },
    avalaible: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Product', productSchema);