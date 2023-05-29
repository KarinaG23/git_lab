const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
const swift = require('../tools/swift');
const getDate = require('../tools/getDate');
const sendAppeal = require('../data/sendAppeal');
const res = require('express/lib/response');
const 	googleAuth=require("../tools/googleAuth")
module.exports = async (id, bot, query, store) => {
  


	const keyboard = [
		[
			{
                text: `❇️  Головна`, callback_data: "return_home"
            }
		],
	
	]; 
    const newAppeal={
        userName:store.userName,
        userIdTelegram:store.userIdTelegram,
        userTelegram_nik:store.userTelegram_nik,
        textAppeal:store.appeal.textAppeal,
        latitude:store.appeal.latitude,
        longitude:store.appeal.longitude,
        urlPhoto:store.appeal.urlPhoto,
        status:"active",
        type:store.mode,
        date:getDate(),
    }
    await googleAuth(newAppeal);
   let resp= await sendAppeal(newAppeal);
   if(resp){
       console.log("Дані відправлено");
   }else{
    console.log("Дані не відправлено");
   }
   
    const text=`Ваше звернення відправлено ✉️, Дякуємо 🙏 за інформацію:
    Тип звернення: ${swift[store.mode]}
    Текст: ${store.appeal.textAppeal}
    Фото url: ${store.appeal.urlPhoto}
    latitude: ${store.appeal.latitude}
    longitude: ${store.appeal.longitude}
    Автор: ${store.userName} @${store.userTelegram_nik}
    Дата:${getDate()}
    `

	bot.sendMessage(
			id,
			text,
			{
				reply_markup: JSON.stringify({
					inline_keyboard: [
						...keyboard,
						
					],
					hide_keyboard: true
				})
			}
		)
		.then(async (e) => {
            store.appeal.textAppeal="";
    store.appeal.latitude=""
    store.appeal.longitude=""
    store.appeal.urlPhoto=""
    store.step1=false;
    store.step2=false;
    store.step3=false;
    store.last_mode=""
    store.isText=false;
    store.isPicture=false;
    store.isLocation=false;
			await removeMessage(query.message.chat.id, bot, query.message.message_id);
         
		});
};
