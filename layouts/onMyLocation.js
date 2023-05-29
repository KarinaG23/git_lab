const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
module.exports = async (id, bot, query, store) => {
  store.my_location=true;
 
	const keyboard = [
		[
			{
                text: `❇️  Головна`, callback_data: "return_home"
            }
		],
	
	];
   

	bot.sendMessage(
			id,
			`Вкажіть ваші координати : 🗺️`,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
						[
							{
								text: `⬅️  Назад`,
								callback_data: "inf_board"
							}
						]
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
            // bot.sendLocation(id, 48.316304039880144, 25.954859670180316, {
            //     live_period: 86400,
            // });
		});

};
