const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    id: Number,
    title: String
}
)

module.exports = mongoose.model("tickets", ticketSchema)