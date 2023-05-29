const removeMessage = require("../tools/removeMessage");
module.exports=async(id,bot,home_keyboard,messageId)=>{
bot.sendPhoto(id,"https://imgur.com/zwZnq1i",{
    reply_markup: JSON.stringify({ inline_keyboard: home_keyboard(),hide_keyboard: true })
}).then(async (e) => { 
            await removeMessage(id, bot,messageId);
        })
}      