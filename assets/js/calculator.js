function calculate() {
	const basedOn = input.get('based_on').index().val();
	const firstDay = input.get('first_day').date().raw();
	let avgCyclesLength = input.get('avg_cycles_length').index().val();
	const ultrasoundDate = input.get('ultrasound_date').date().raw();
	const pregnancyWeeks = input.get('pregnancy_weeks').val();
	const pregnancyDays = input.get('pregnancy_days').val();
	const conceptionDate = input.get('conception_date').date().raw();
	const transferDate = input.get('transfer_date').date().raw();
	let embryoAge = input.get('embryo_age').index().val();
	avgCyclesLength = avgCyclesLength + 22;
	embryoAge = embryoAge + 3;
	if(!input.valid()) return;

	else if(basedOn === 0) {
		if(!firstDay) {
			return input.error('first_day', 'Enter the first day', true);
		}
		else {
			const date = new Date(firstDay);
			const startDate = new Date(firstDay);
			const cycleDays = Number(avgCyclesLength - 28);
			startDate.setDate(date.getDate() + cycleDays);
			showResult(startDate);
		}
	}
	else if(basedOn === 1) {
		if(!ultrasoundDate) {
			input.error('ultrasound_date', 'Enter the date of the ultrasound');
		}
		if(!pregnancyWeeks) {
			input.error('pregnancy_weeks', 'Enter the pregnancy length at that time');
		}
		if(!input.valid()) return;
		const date = ultrasoundDate;
		const days = Number(pregnancyWeeks * 7) + Number(pregnancyDays);
		const startDate = ultrasoundDate;
		startDate.setDate(date.getDate() - days);
		showResult(startDate);
	}
	else if(basedOn === 2) {
		const date = conceptionDate;
		const startDate = conceptionDate;
		startDate.setDate(date.getDate() - 14);
		showResult(startDate);
	}
	else if(basedOn === 3) {
		const date = new Date(transferDate);
		const startDate = new Date(transferDate);
		startDate.setDate(date.getDate() - Number(embryoAge) - 14);
		showResult(startDate);
	}
}

function dateDiff(startingDate, endDate) {
	if(!startingDate || !endDate) {
		return false;
	}
	return Math.floor((endDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24));
}

function showResult(date){
	const days = dateDiff(date, new Date());
	if(days < 0 || days > 294) {
		_('not-pregnant').style = 'display: block';
		_('result').style = 'display: none';
		_('milestones').style = 'display: none';
		output.val(`It's likely that you are not pregnant yet.`).set('not-pregnant-result');
	}
	else {
		_('not-pregnant').style = 'display: none';
		_('result').style = 'display: block';
		_('milestones').style = 'display: block';
		let trimester = Math.floor(days / 90) + 1;
		switch(trimester) {
			case 1:
				trimester = 'First';
				break;
			case 2:
				trimester = 'Second';
				break;
			case 3:
				trimester = 'Third';
		}
		const currentWeek = (Math.floor(days / 7) + 1);
		let size = 'On average, your baby weighs less than 1 gram at this stage.';
		let babySize = BABY_SIZE_CHART.find(item => item.week === currentWeek - 1);
		if(babySize) {
			size = `${babySize.usLength} (${babySize.euLength}) and ${babySize.usWeight} (${babySize.euWeight})`;
		}
		const estimatedDueDate = new Date();
		estimatedDueDate.setDate(estimatedDueDate.getDate() + (280 - days));
		const conceiveDate = new Date(date);
		conceiveDate.setDate(conceiveDate.getDate() + 14);
		output.val(trimester).set('trimester');
		output.val(convertDateToDMY(conceiveDate)).set('conceive-date');
		output.val(weekDate(date, 1, 1)).set('week-1-date');
		output.val(weekDate(date, 3, 1)).set('week-3-date');
		output.val(weekDate(date, 4, 1)).set('week-4-date');
		output.val(weekDate(date, 6, 2)).set('week-6-date');
		output.val(weekDate(date, 13, 1)).set('week-13-date');
		output.val(weekDate(date, 18, 4)).set('week-18-date');
		output.val(weekDate(date, 23, 1)).set('week-23-date');
		output.val(weekDate(date, 28, 1)).set('week-28-date');
		output.val(convertDateToDMY(estimatedDueDate)).set('estimate-due-date');
		output.val(size).set('baby-size');
		output.val('Week {#23}')
			.replace('{#23}', `#${currentWeek}`).set('current-date')
	}
}

function convertDateToDMY(date) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return `${months[monthIndex]} ${day}, ${year}`;
}

const BABY_SIZE_CHART = [
	{
		week: 8,
		usLength: '0.62 inches',
		usWeight: '0.71 ounces',
		euLength: '1.57 cm',
		euWeight: '20 grams',
	},
	{
		week: 9,
		usLength: '0.91 inches',
		usWeight: '0.95 ounces',
		euLength: '2.3 cm',
		euWeight: '27 grams',
	},
	{
		week: 10,
		usLength: '1.22 inches',
		usWeight: '1.23 ounces',
		euLength: '3.1 cm',
		euWeight: '35 grams',
	},
	{
		week: 11,
		usLength: '1.61 inches',
		usWeight: '1.59 ounces',
		euLength: '4.1 cm',
		euWeight: '45 grams',
	},
	{
		week: 12,
		usLength: '2.13 inches',
		usWeight: '2.05 ounces',
		euLength: '5.4 cm',
		euWeight: '58 grams',
	},
	{
		week: 13,
		usLength: '2.64 inches',
		usWeight: '2.58 ounces',
		euLength: '6.7 cm',
		euWeight: '73 grams',
	},
	{
		week: 14,
		usLength: '5.79 inches',
		usWeight: '3.28 ounces',
		euLength: '14.7 cm',
		euWeight: '93 grams',
	},
	{
		week: 15,
		usLength: '6.57 inches',
		usWeight: '4.13 ounces',
		euLength: '16.7 cm',
		euWeight: '117 grams',
	},
	{
		week: 16,
		usLength: '7.32 inches',
		usWeight: '5.15 ounces',
		euLength: '18.6 cm',
		euWeight: '146 grams',
	},
	{
		week: 17,
		usLength: '8.03 inches',
		usWeight: '6.38 ounces',
		euLength: '20.4 cm',
		euWeight: '181 grams',
	},
	{
		week: 18,
		usLength: '8.74 inches',
		usWeight: '7.87 ounces',
		euLength: '22.2 cm',
		euWeight: '223 grams',
	},
	{
		week: 19,
		usLength: '9.45 inches',
		usWeight: '9.63 ounces',
		euLength: '24 cm',
		euWeight: '273 grams',
	},
	{
		week: 20,
		usLength: '10.12 inches',
		usWeight: '11.68 ounces',
		euLength: '25.7 cm',
		euWeight: '331 grams',
	},
	{
		week: 21,
		usLength: '10.79 inches',
		usWeight: '14.07 ounces',
		euLength: '27.4 cm',
		euWeight: '399 grams',
	},
	{
		week: 22,
		usLength: '11.42 inches',
		usWeight: '1.05 pounds',
		euLength: '29 cm',
		euWeight: '478 grams',
	},
	{
		week: 23,
		usLength: '12.05 inches',
		usWeight: '1.25 pounds',
		euLength: '30.6 cm',
		euWeight: '568 grams',
	},
	{
		week: 24,
		usLength: '12.68 inches',
		usWeight: '1.48 pounds',
		euLength: '32.2 cm',
		euWeight: '670 grams',
	},
	{
		week: 25,
		usLength: '13.27 inches',
		usWeight: '1.73 pounds',
		euLength: '33.7 cm',
		euWeight: '785 grams',
	},
	{
		week: 26,
		usLength: '13.82 inches',
		usWeight: '2.01 pounds',
		euLength: '35.1 cm',
		euWeight: '913 grams',
	},
	{
		week: 27,
		usLength: '14.41 inches',
		usWeight: '2.33 pounds',
		euLength: '36.6 cm',
		euWeight: '1055 grams',
	},
	{
		week: 28,
		usLength: '14.8 inches',
		usWeight: '2.67 pounds',
		euLength: '37.6 cm',
		euWeight: '1210 grams',
	},
	{
		week: 29,
		usLength: '15.47 inches',
		usWeight: '3.04 pounds',
		euLength: '39.3 cm',
		euWeight: '1379 grams',
	},
	{
		week: 30,
		usLength: '15.95 inches',
		usWeight: '3.44 pounds',
		euLength: '40.5 cm',
		euWeight: '1559 grams',
	},
	{
		week: 31,
		usLength: '16.46 inches',
		usWeight: '3.86 pounds',
		euLength: '41.8 cm',
		euWeight: '1751 grams',
	},
	{
		week: 32,
		usLength: '16.93 inches',
		usWeight: '4.3 pounds',
		euLength: '43 cm',
		euWeight: '1953 grams',
	},
	{
		week: 33,
		usLength: '17.36 inches',
		usWeight: '4.77 pounds',
		euLength: '44.1 cm',
		euWeight: '2162 grams',
	},
	{
		week: 34,
		usLength: '17.84 inches',
		usWeight: '5.24 pounds',
		euLength: '45.3 cm',
		euWeight: '2377 grams',
	},
	{
		week: 35,
		usLength: '18.23 inches',
		usWeight: '5.72 pounds',
		euLength: '46.3 cm',
		euWeight: '2595 grams',
	},
	{
		week: 36,
		usLength: '18.62 inches',
		usWeight: '6.20 pounds',
		euLength: '47.3 cm',
		euWeight: '2813 grams',
	},
	{
		week: 37,
		usLength: '19.02 inches',
		usWeight: '6.68 pounds',
		euLength: '48.3 cm',
		euWeight: '3028 grams',
	},
	{
		week: 38,
		usLength: '19.41 inches',
		usWeight: '7.13 pounds',
		euLength: '49.3 cm',
		euWeight: '3236 grams',
	},
	{
		week: 39,
		usLength: '19.72 inches',
		usWeight: '7.57 pounds',
		euLength: '50.1 cm',
		euWeight: '3435 grams',
	},
	{
		week: 40,
		usLength: '20.08 inches',
		usWeight: '7.98 pounds',
		euLength: '51 cm',
		euWeight: '3619 grams',
	},
	{
		week: 41,
		usLength: '20.39 inches',
		usWeight: '8.35 pounds',
		euLength: '51.8 cm',
		euWeight: '3787 grams',
	},
]

function weekDate(start, week, weeks = 1) {
	const startDate = new Date(start);
	startDate.setDate(startDate.getDate() + ((week - 1) * 7) + 1);
	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + (weeks * 7) - 1);
	return convertDateToDMY(startDate) + ' - ' + convertDateToDMY(endDate);
}
