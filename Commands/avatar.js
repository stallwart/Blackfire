const Discord = require("discord.js")
module.exports = class {
      constructor() {
        this.name = "avatar",
        this.alias = ["Avatar", "AVATAR", "AV", "av", "Av"],
        this.usage = "c!avatar yada c!avatar @etiket"
    }
   async run(Blackfire, message, args) {
      if(!message.guild) return;
   let BlackfireAV = message.mentions.members.first();
  if(!BlackfireAV) {
    message.channel.send({files: [message.author.avatarURL({ dynamic: true, size: 512 })]}).catch(() => {
      console.log('Yetkim Yetmiyor.')
    })
  }
  if(BlackfireAV) {
    message.channel.send({files: [BlackfireAV.user.avatarURL({ dynamic: true, size: 512 })]}).catch(() => {
      console.log('Yetkim Yetmiyor.')
    })
  }  
     
   }
}
