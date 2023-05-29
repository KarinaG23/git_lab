module.exports = function() {
	return [
		[
			{
				text: `Повідомити про вирубку лісу 🪓`,
				callback_data: 'on_forest'
			}
		],
        [
			{
				text: `Повідомити про сміттєзвалища 🗑️`,
				callback_data: 'on_landfills'
			}
		],
        [
			{
				text: `Повідомити про вирви та ями 🕳️`,
				callback_data: 'on_pit'
			}
		],
		[
			{
				text: `Повідомити про зсуви ⛰️`,
				callback_data: 'on_barriers'
			}
		],
		
        [
			{
				text: `Інформаційна дошка `,
				callback_data: 'inf_board',
				
			},
			{
				text: `Інше`,
				callback_data: 'on_other'
			}
		],
		

	];
};
