const removeMessage = require('../tools/removeMessage');
const nav_keyboard = require('../keyboard/nav_keyboard');
const mode_app = require('../tools/mode_app');
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
    let text="";
    switch (store.mode) {
        case mode_app.on_forest:
            text=`Повідомити про вирубку лісу 🪓\nПісля введення всіх даних розблокується кнопка: ПОВІДОМИТИ\nПрогрес:\n${store.isText
				? '🟢'
				: '🔴'} Повідомлення\n${store.isPicture ? '🟢' : '🔴'} Фото\n${store.isLocation ? '🟢' : '🔴'} Локація`
            break;
            case mode_app.on_landfills:
                text=`Повідомити про сміттєзвалища 🗑️\nПісля введення всіх даних розблокується кнопка: ПОВІДОМИТИ\nПрогрес:\n${store.isText
                    ? '🟢'
                    : '🔴'} Повідомлення\n${store.isPicture ? '🟢' : '🔴'} Фото\n${store.isLocation ? '🟢' : '🔴'} Локація`
                break;
                case mode_app.on_pit:
                    text=`Повідомити про вирви та ями 🕳️\nПісля введення всіх даних розблокується кнопка: ПОВІДОМИТИ\nПрогрес:\n${store.isText
                        ? '🟢'
                        : '🔴'} Повідомлення\n${store.isPicture ? '🟢' : '🔴'} Фото\n${store.isLocation ? '🟢' : '🔴'} Локація`
                    break;
                    case mode_app.on_barriers:
                        text=`Повідомити про зсуви ⛰️\nПісля введення всіх даних розблокується кнопка: ПОВІДОМИТИ\nПрогрес:\n${store.isText
                            ? '🟢'
                            : '🔴'} Повідомлення\n${store.isPicture ? '🟢' : '🔴'} Фото\n${store.isLocation ? '🟢' : '🔴'} Локація`
                        break;
                        case mode_app.on_other:
                            text=`Повідомити про про інший вид порушень\nПісля введення всіх даних розблокується кнопка: ПОВІДОМИТИ\nПрогрес:\n${store.isText
                                ? '🟢'
                                : '🔴'} Повідомлення\n${store.isPicture ? '🟢' : '🔴'} Фото\n${store.isLocation ? '🟢' : '🔴'} Локація`
                            break;

    
        default:
            break;
    }

	bot.sendMessage(
			id,
            text
			,
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
