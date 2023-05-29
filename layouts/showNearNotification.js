const calcDistance = require("../tools/calcDistance");
const removeMessage = require("../tools/removeMessage");

module.exports=(id, bot,store, messageId)=>{

    let distance;
    

        distance=store.notificationArr.filter(el=>{
            let dist=calcDistance({lat:store.my_latitude,lng:store.my_longitude},{lat:el.latitude,lng:el.longitude});
            if(dist<1000){
                return true;
            }
        })
        if(distance.length>0){
            let keyboard=distance.map(el=>
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
                await removeMessage(id, bot,messageId);
              
            })

        }


}