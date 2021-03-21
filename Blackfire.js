const Discord = require("discord.js");
const { Client, RichEmbed } = require("discord.js");

const Blackfire = new Discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });// Discorda bağlanırken sorun yaşamaması için :).
const { CommandHandler } = require("djs-commands");// Komut Modülü
const db = require('mariafire') 
// Merhaba Ben Soulfire. Mariafire olarak MariaDB kullanarak kolay bir veritabanı kodladık. Quickdb gibi kullanabileceğiniz bir veritabanı


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };
(async () => {
    await db.connect({ host: 'localhost', user:'ahmet', port: 3306, password: 'mariafiretest', database: 'testdb', connectionLimit: 5}, 'soul')  
  
    console.log(db.version)
 


require('dotenv').config();// .env içindir. Token & Database için çok önemli modüldür. Gizli kılar.

const CH = new CommandHandler({
    folder: __dirname + "/Commands/",
  timeout: 1.4,
  prefix: ["/"]
})//komutu çalıştırmak ve komutları çekmek için olan kısımdır.

Blackfire.on("message", async (message) => {
    if(message.channel.type === 'dm') return;
    if(message.author.type === 'bot') return;

    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);

    if(!cmd) return;

    try{

        cmd.run(Blackfire,message,args)

    }catch(e){
        console.log(e)
    }
  console.log(`${message.author.tag} adlı kullanıcı ${command} adlı kodu kullandı! Komutu kullandığı kanal: ${message.channel.name} || Sunucu: ${message.guild.name}`)
//Komutu kim kullanmış kim nerede ne yapıyor kısmı.
});


Blackfire.on('ready', () => {
console.log(`${Blackfire.user.tag} Aktif halde.`)
Blackfire.user.setStatus('dnd').catch(console.error)})//Profile ne koyacağını sen yap!

Blackfire.login(process.env.CLIENT_TOKEN).catch(console.error);//Stabil çalışmasını sağlar.
