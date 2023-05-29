const removeMessage = require("../tools/removeMessage");

module.exports=(id, bot, query, store)=>{
    let keyboard=store.notificationArr.map(el=>
        {
            return[{
                text:  `Заголовок: ${el.title}`,
                callback_data:`show_all_not|${el._id}`
            }]
        })

bot.sendMessage(
    id,
    "Список повідомлень"
    ,
    {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                ...keyboard,
                [
                    {
                        text: `⬅️  Назад`,
                        callback_data: "inf_board"
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
    }
)
.then(async (e) => {
    await removeMessage(query.message.chat.id, bot, query.message.message_id);
});

}