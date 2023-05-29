const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
module.exports = async (id, bot, query, store) => {
 
   store.isPicture=store.appeal.urlPhoto===""?false:true;
   store.isLocation=store.appeal.latitude===""||store.appeal.longitude===""?false:true;
   store.isText=store.isText=store.appeal.textAppeal===""?false:true;
    store.step1=false;
    store.step2=false;
    store.step3=false;
    console.log(store.appeal.textAppeal);
	const keyboard = [ 
		[
			{
				text: `Ввести текст повідомлення 💬`,
				callback_data: `send_message`
			}
		],
		[
			{
				text: `Надіслати фото 📷`,
				callback_data: `send_photo`
			}
		],
		[
			{
				text: `Надіслати геолокацію 🗺️`,
				callback_data: `send_location`
			}
		]
	];
    if(store.isPicture&&store.isLocation&&store.isText){
        keyboard.push([{
                 text: `ПОВІДОМИТИ ✉️`,
				callback_data: `send_appeal`
        }])
    }

	bot.sendMessage(
			id,
			`Повідомити про сміттєзвалища 🗑️\nПісля введення всіх даних розблокується кнопка: ПОВІДОМИТИ\nПрогрес:\n${store.isText
				? '🟢'
				: '🔴'} Повідомлення\n${store.isPicture ? '🟢' : '🔴'} Фото\n${store.isLocation ? '🟢' : '🔴'} Локація`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
						[
							{
								text: `⬅️  Назад`,
								callback_data: 'return_home'
							}
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
		});
};
