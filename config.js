require('dotenv').config();
const convict = require('convict');

const convictConfig = convict({
    ENV: {
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        arg: 'nodeEnv',
        env: 'NODE_ENV'
    },
    SERVER: {
        IP: {
            format: "ipaddress",
            default: '127.0.0.1',
            arg: 'serverIp',
            env: 'SERVER_IP'
        },
        PORT: {
            format: 'port',
            default: 3000,
            arg: 'serverPort',
            env: 'SERVER_PORT'
        },
    },
    DATABASE: {
        IP: {
            format: "ipaddress",
            default: '127.0.0.1',
            arg: 'databaseIp',
            env: 'DATABASE_IP'
        },
        PORT: {
            format: 'port',
            default: 27017,
            arg: 'databasePort',
            env: 'DATABASE_PORT'
        },
        NAME: {
            format: String,
            default: 'webmidi',
            arg: 'databaseName',
            env: 'DATABASE_NAME'
        }
    },
    GOOGLE_OAUTH: {
        CLIENT_ID: {
            format: String,
            default: '439345663761-vinca9jn7fsonkj8bg6pdjr39kuevdka.apps.googleusercontent.com',
            arg: 'googleOAuthClientId',
            env: 'GOOGLE_OAUTH_CLIENT_ID'
        },
        SECRET_KEY: {
            format: String,
            default: 'x9SrxTkFiYPe2he0tPi-krl1',
            arg: 'googleOAuthSecretKey',
            env: 'GOOGLE_OAUTH_SECRET_KEY'
        },
    }
});

const config = {
    // MongoDB
    DATABASE: `mongodb://${convictConfig.get('DATABASE.IP')}:${convictConfig.get('DATABASE.PORT')}/${convictConfig.get('DATABASE.NAME')}`,
    // Google OAuth
    GOOGLE_CLIENT_ID: convictConfig.get('GOOGLE_OAUTH.CLIENT_ID'),
    GOOGLE_SECRET_KEY: convictConfig.get('GOOGLE_OAUTH.SECRET_KEY'),
    GOOGLE_CALLBACK_URL: `http://${convictConfig.get('SERVER.IP')}:${convictConfig.get('SERVER.PORT')}/api/oauth2`,
    GOOGLE_CALLBACK_SERVER_URL: `http://${convictConfig.get('SERVER.IP')}:${convictConfig.get('SERVER.PORT')}/auth/google/callback`,
    // SERVER
    SERVER_IP: convictConfig.get('SERVER.IP'),
    SERVER_PORT: convictConfig.get('SERVER.PORT'),
    ENVIRONMENT: convictConfig.get('ENV')
};
Object.freeze(config);
module.exports = config;
