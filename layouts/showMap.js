const removeMessage = require('../tools/removeMessage');

module.exports=(id, bot,query, store)=>{
    bot.sendLocation(id, store.not.latitude,store.not.longitude, {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                
                
                [
                    {
                        text: `⬅️  Назад`,
                        callback_data: `show_all_not|${store.not._id}`
                    }
                ],
                [
                    {
                        text: `❇️  Головна`, callback_data: "return_home"
                    }
                ],
            ],
            hide_keyboard: true
        })
    }).then(async (e) => { 
        await removeMessage(query.message.chat.id, bot, query.message.message_id);
    });
  
    
    
   
    

  
  
    
}