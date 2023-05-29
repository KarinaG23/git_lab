const removeMessage = require('../tools/removeMessage');
module.exports = async (id, bot, query, store,message_id) => {
    
  

   const  element=store.notificationArr.find(el=>{
        return el._id==message_id
    })
store.not=element;
text=`Заголовок: ${element.title}
Текст повідомлення: ${element.text}
latitude: ${element.latitude} 
longitude: ${element.longitude}
Дата:${element.date}` 
	bot.sendMessage(
			id,
            text
			,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
                        
                        [
							{
								text: `Подивитись на карті`,
								callback_data: `show_map`
							}
						],
						[
							{
								text: `⬅️  Назад`,
								callback_data: "show_all_not"
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
};
