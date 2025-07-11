




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEJhbS9hMTY2TXpUR2NjeTZyYlk1YmFNRW9meEVmTW9LdTJvSjdBR3RFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienV6cVV1cENSNXp5SnMyZzNyY3VTWE5RTVBoeTJ5ZzIxQlYzWUJyVW1uMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSnZsRzREc3hhUVZJZEc1czA0MFo5QjFlMmU2bmFNbHJuRnY2MG9rNFVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4eE5rU1VzREpURXVnekVIT3Vodit2Q05RNE5JZ2ROYnlka1RhQlViRjF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMRnZ4UjVLVXRpTWxraWxZWjdxSGJ6cTRIVklKTElLbGdnaXQ4SVhORmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkN3Mzl2dFRxdUNLTERjRWNQY0ZGT2FBN09lUk4xdEVZM1loVjJHS2Q0aWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk9PSEJyN1lXcUMyNzI5ZVhZanpTWjJyY2hydVVSRjZGbUNIOVZDek5YST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEdnNktSSzdHOFFBcXZjZTZrTFM0THFCOVE4R2pESStFbjZ2NzFBSVpRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHYXpwNnpoTGtKZWhud295cFVQU1M5amJTQWIvZENkU3EySEJQUVdzMm9wTndTRTFEWU1leUpNWVpZOVB6bVFSUVlLNTdKbE05MkE4eGZ0MTQwbUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiIzL2JXc0hKL05JcnFXbFdoeWg4Mmk5L053L0dDL2ZwcllKc1lQamh0NmZrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODI3MjY1Njc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjcwRjRDRDFBNjM0NzFEQTBCQzYyQUI1NTg2MDg4Qzg5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIyNzAyNzJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODI3MjY1Njc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU4REVFN0EzNkFDOTY5RjRCNEU0ODg0MDNEN0I3ODc4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIyNzAyNzJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODI3MjY1Njc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjI2N0M0NDA5MENDNDExNzgxMzA1QUMwMjc2NTJGNDFBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTIyNzAzMTV9XSwibmV4dFByZUtleUlkIjozNSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjM1LCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkpLNVc2UFhGIiwibWUiOnsiaWQiOiIyNzgyNzI2NTY3NjoxMkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJSZW5laWx3ZSIsImxpZCI6IjU3Mjc4MzM4MjI4MzM5OjEyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFRlbHZvR0VLMkx4c01HR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNGU4aVR0RFhRcEFJYUhuU2ZKaGlqaWpvQXlrckNsQm5ram9ZZ1lpVVEzZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieExGMldCNERaRzVESlZLZE5SRTNaRnFmdlE0bVRCOHdqKzBZQXA1L1FKUDhZcXNnamNLZ1VCN0l3cnRsdHZwbXhCTFdyZWQzQk5CQU5TazZlQkdSQWc9PSIsImRldmljZVNpZ25hdHVyZSI6Im8wZTVkR1lubGY5b0FiRDdYOWdWUURRTXludTkzVDJDVHpjaCtiRWsrclNiak42NFozbzVYV3dqMlpnbUJRd3hDdUM2UzNRb0UvRkJDMHpWMC9ZZ0JnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc4MjcyNjU2NzY6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUh2SWs3UTEwS1FDR2g1MG55WVlvNG82QU1wS3dwUVo1STZHSUdJbEVONCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyMjcwMjY3LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUp2ciJ9',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "254799056874",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
