module.exports = function(m) {
	m.user.create({
		name: 'Adam',
		email: 'a@b.com',
		password: '123'
	})
	.catch(e => {
		console.log(e);
	});

	m.question.bulkCreate([/*{
		text: 'Who\'s the CEO of SumoMe?'
	}, {
		text: 'What industry is SumoMe in?'
	}, {
		text: 'What\'s SumoMe\'s score on Glassdoor?'
	}, {
		text: 'What company did Noah Kagan join after leaving facebook?'
	}, {
		text: 'What\'s the name of Noah Kagan\'s $1000 per month entrepreneur course?'
	}, {
		text: 'What\'s SumoMe\'s value proposition?'
	}, */{
		text: 'How do you feel about the election outcome?'
	}, {
		text: 'How do you feel about growth hacking?'
	}])
	.catch(e => {
		console.log(e);
	});

	m.choice.bulkCreate([/*{
		question_id: 1,
		text: 'Mark Zuckerberg'
	}, {
		question_id: 1,
		text: 'Bill Gates'
	}, {
		question_id: 1,

	}*/{
		question_id: 1,
		text: 'I\'m ready for America to be great again'
	}, {
		question_id: 1,
		text: 'Can\'t wait for Obamacare to disappear'
	}, {
		question_id: 1,
		text: 'Meh, I didn\'t vote'
	}, {
		question_id: 1,
		text: 'I\'m ready to leave the country'
	}, {
		question_id: 1,
		text: 'I\'m ready to leave the planet'
	}, {
		question_id: 2,
		text: 'It\'s awesome. Can\'t wait to get rich'
	}, {
		question_id: 2,
		text: 'Meh. It\'s nothing new'
	}, {
		question_id: 2,
		text: 'Bah. It\'s modern snakeoil.'
	}])
	.catch(e => {
		console.log(e);
	});
};