module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY,
    port: process.env.PORT,
    timeExpires: 3600 * 3,
    MAX_CHARACTER: 30,
    MIN_CHARACTER: 6
};