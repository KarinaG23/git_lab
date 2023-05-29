const TelegramApi = require('node-telegram-bot-api');
const imgurlLoader = require('./tools/imagesTools/imgurLoader');
const getFileLink = require('./tools/getLinkforDownload');
require('dotenv').config();
const mongoose = require('mongoose');
const keyboard_home = require('./keyboard/home_keyboard');
const onStart = require('./layouts/onStart');
const home_keyboard = require('./keyboard/home_keyboard');
const mode_app = require('./tools/mode_app');
const on_forest_layout = require('./layouts/on_forest_layout');
const onText = require('./layouts/onText');
const onShowText = require('./layouts/onShowText');
const onPhoto = require('./layouts/onPhoto');
const onShowPhoto = require('./layouts/onShowPhoto');
const onShowLocation = require('./layouts/onShowLocation');
const onLocation = require('./layouts/onLocation');
const onAppeal = require('./layouts/onAppeal');
const on_landfills_layout = require('./layouts/on_landfills_layout');
const on_layouts = require('./layouts/on_layouts');
const removeMessageSingle = require('./tools/removeMessageSingle');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connect DB'));
const bot = new TelegramApi(process.env.TOKKEN, { polling: true });
const store = {
	userName: '',
	userIdTelegram: '',
	userTelegram_nik: '',
	mode: '',
	not:{},
	last_mode: '',
	sendImage: false,
	isText: false,
	notificationArr:[],
	isPicture: false,
	isLocation: false,
	step1: false,
	step2: false,
	step3: false,
	my_location:false,
	my_latitude:"",
	my_longitude:"",
	appeal: {
		textAppeal: '',
		latitude: '',
		longitude: '',
		urlPhoto: ''
	}
};

const express=require("express");
const {google}=require("googleapis");
const googleAuth = require('./tools/googleAuth');
const getNotification=require("./data/getNotification");
const onShowNotification = require('./layouts/onShowNotification');
const onShowAllNotification = require('./layouts/onShowAllNotification');
const onShowItem = require('./layouts/onShowItem');
const { show_all_not } = require('./tools/mode_app');
const showMap = require('./layouts/showMap');
const onMyLocation = require('./layouts/onMyLocation');
const showNearNotification = require('./layouts/showNearNotification');
//старт бота
bot.onText(/\/start/, async (msg) => {
	const { id } = msg.chat;
	const firstName = msg.from.first_name || '';
	const lastName = msg.from.last_name || '';
	store.userName = firstName + ' ' + lastName;
	store.userIdTelegram = msg.from.id;
	store.userTelegram_nik = msg.from.username;
	store.notificationArr=await getNotification();

	onStart(id, bot, home_keyboard, msg.message_id);
});

// обробка головного меню
bot.on('callback_query', async (query) => {
	const id = query.message.chat.id;
	const data = query.data;
	switch (data) {
		//вирубка лісу
		case mode_app.on_forest:
			store.mode = mode_app.on_forest;
			//старт обробнику
			if (store.last_mode != mode_app.on_forest && store.last_mode != '') {
				store.appeal.urlPhoto = '';
				store.appeal.latitude = '';
				store.appeal.textAppeal = '';
			}
			on_layouts(id, bot, query, store);
			console.log('Вирубка лісу');
			break;
		//сміттє звалище
		case mode_app.on_landfills:
			store.mode = mode_app.on_landfills;
			if (store.last_mode != mode_app.on_landfills && store.last_mode != '') {
				store.appeal.urlPhoto = '';
				store.appeal.latitude = '';
				store.appeal.textAppeal = '';
			}
			on_layouts(id, bot, query, store);
			console.log('сміттє звалище');
			break;
		case mode_app.on_pit:
			store.mode = mode_app.on_pit;
			if (store.last_mode != mode_app.on_pit && store.last_mode != '') {
				store.appeal.urlPhoto = '';
				store.appeal.latitude = '';
				store.appeal.textAppeal = '';
			}
			on_layouts(id, bot, query, store);
			console.log('вирви ями');
			break;
		case mode_app.on_barriers:
			store.mode = mode_app.on_barriers;
			if (store.last_mode != mode_app.on_barriers && store.last_mode != '') {
				store.appeal.urlPhoto = '';
				store.appeal.latitude = '';
				store.appeal.textAppeal = '';
			}
			on_layouts(id, bot, query, store);
			console.log('зсуви');
			break;
		case mode_app.on_other:
			store.mode = mode_app.on_other;
			if (store.last_mode != mode_app.on_other && store.last_mode != '') {
				store.appeal.urlPhoto = '';
				store.appeal.latitude = '';
				store.appeal.textAppeal = '';
			}
			on_layouts(id, bot, query, store);
			console.log('Інше');
			break;
		case mode_app.inf_board:
			store.mode = mode_app.inf_board;
			store.notificationArr=await getNotification();
				onShowNotification(id, bot, query, store)
			    console.log('інфо табло');
			break;
			case mode_app.show_all_not:
			store.mode = mode_app.show_all_not;
				onShowAllNotification(id, bot, query, store)
			    console.log('інфо табло');
			break;
			case mode_app.show_map:
				showMap(id, bot,query, store)
				break;
				
				case mode_app.show_near_not:
			      onMyLocation(id, bot, query, store)
				break;


				//show_near_not
		//повернення на головну сторінку
		case mode_app.return_home:
			store.last_mode = store.mode;
			store.mode = '';
			store.step1 = false;
			store.step2 = false;
			store.step3 = false;
			store.step3 = false;
			store.step3 = false;
			console.log('Головна');
			store.notificationArr=await getNotification();
			await onStart(id, bot, keyboard_home, query.message.message_id);

			break;
	}
});

// обробка steps
bot.on('callback_query', async (query) => {
	const id = query.message.chat.id;
	const data = query.data;
	//відправити текст

	if (data == mode_app.send_message) {
		onText(id, bot, query, store);
		console.log('Введення тексту');
	}
	//надіслати фото
	if (data == mode_app.send_photo) {
		onPhoto(id, bot, query, store);
		console.log('надсилання фото');
	}
	//надсилання локації
	if (data == mode_app.send_location) {
		onLocation(id, bot, query, store);
		console.log('надсилання локації');
	}
	//надсилання звернення
	if (data == mode_app.send_appeal) {
		// onLocation(id, bot, query, store)
		onAppeal(id, bot, query, store);
		console.log('надсилання звернення');
	}
	if (data.indexOf("show_all_not|") != -1) {
		const idMessage= data.split("|")[1] 
		onShowItem(id, bot, query, store,idMessage)
	
	
	};
});

bot.on('message', async (msg) => {
	const { id } = msg.chat;
	if (store.step1) {
		store.appeal.textAppeal = msg.text;
		await onShowText(id, bot, store, msg.message_id);
	}else{
		
		await removeMessageSingle(id, bot,msg.message_id);
	}
});

bot.on('photo', async (msg) => {
	const { id } = msg.chat;
	if (store.step2) {
		const resp = await bot.getFile(msg.photo[2].file_id);
		const pathUpload = getFileLink(resp.file_path);
		const link = await imgurlLoader(pathUpload);
		console.log(link);
		store.appeal.urlPhoto = link;
		onShowPhoto(id, bot, store, msg.message_id);
	}else{
		
		await removeMessageSingle(id, bot,msg.message_id);
	}
});

bot.on('location',async (msg) => {
	const { id } = msg.chat;
	if (store.step3 == true) {
		store.appeal.latitude = msg.location.latitude;
		store.appeal.longitude = msg.location.longitude;
		onShowLocation(id, bot, store, msg.message_id);
	}else if(store.my_location){
store.my_latitude=msg.location.latitude;
store.my_longitude=msg.location.longitude;
store.my_location=false;
showNearNotification(id, bot, store, msg.message_id)

	}else{
		
		await removeMessageSingle(id, bot,msg.message_id);
	}
});
