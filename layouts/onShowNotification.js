const removeMessage = require("../tools/removeMessage");

module.exports=(id, bot, query, store)=>{
    let keyboard=[[{
        text:`Переглянути всі повідомлення ${store.notificationArr.length>0?"("+store.notificationArr.length+")":""}`,
        callback_data:`show_all_not`
    }],
    [{
        text:"Переглянути повідомлення про небезпеку поблизу",
        callback_data:`show_near_not`
    }]
]

bot.sendMessage(
    id,
    "Меню:"
    ,
    {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                ...keyboard,
               
                [
                    {
                        text: `❇️  Головна`, callback_data: "return_home"
                    }
                ],
            ],
            hide_keyboard: true
        })
    }
)
.then(async (e) => {
    await removeMessage(query.message.chat.id, bot, query.message.message_id);
});

}