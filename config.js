const config = {
    // MongoDB
    DATABASE: "mongodb://localhost:27017/webmidi",
    GOOGLE_CLIENT_ID: '439345663761-vinca9jn7fsonkj8bg6pdjr39kuevdka.apps.googleusercontent.com',
    GOOGLE_SECRET_KEY: 'x9SrxTkFiYPe2he0tPi-krl1',
    GOOGLE_CALLBACK_URL: 'http://localhost:3000/api/oauth2',
    GOOGLE_CALLBACK_SERVER_URL: 'http://localhost:3000/auth/google/callback'
};
Object.freeze(config);
module.exports = config;
