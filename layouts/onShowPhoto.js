const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
module.exports = async (id,bot,store,messageId) => {
   
    store.isPicture=true;
 
	const keyboard = [
		[
			{
                text: `❇️  Головна`, callback_data: "return_home"
            }
		],
	
	]; 
   
	store.last_mode=store.mode;
	bot.sendMessage(
			id,
			`Силка на ваше фото 💬:\n${store.appeal.urlPhoto}`,
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
            await removeMessage(id, bot,messageId);
        })
};
