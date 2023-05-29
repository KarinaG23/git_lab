const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
module.exports = async (id, bot, query, store) => {
  store.step1=false;
  store.step2=true;
 
	const keyboard = [
		[
			{
                text: `❇️  Головна`, callback_data: "return_home"
            }
		],
	
	];
   

	bot.sendMessage(
			id,
			`Надішліть фото 📷 :`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
						[
							{
								text: `⬅️  Назад`,
								callback_data: store.mode
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
