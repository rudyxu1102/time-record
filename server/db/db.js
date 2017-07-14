const mongoose =require('mongoose')
const Schema = mongoose.Schema


const InfoSchema = new Schema(
    {
        openid: String,
        name: String,
        avatarUrl: String,
        keepDays: Number,
        logDays: Number,
        point: Number,
        rank: Boolean
    },
    { versionKey: false }
)


const Models = {
    Info: mongoose.model('Info', InfoSchema)
}


mongoose.connect('mongodb://127.0.0.1/time')

const db = mongoose.connection

db.on('error',console.error.bind(console,'Database connection error.'));
db.once('open', () => {
    console.log('The database has connected.')
});

module.exports = Models