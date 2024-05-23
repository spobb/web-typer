letters = 'azertyuiopqsdfghjklmwxcvbn';
letters = letters.split('');
// letters.forEach((e) => {
// document.write('<span id="' + e + '" class="letter">' + e + '</span>');
// if (e == 'p' || e == 'm') document.write('<br>');
// });

document.addEventListener('keydown', (e) => {
	console.log(e.key);
	document.querySelector('#' + e.key).classList.add('letter-pressed');
	this.addEventListener('keyup', () => {
		document.querySelector('#' + e.key).classList.remove('letter-pressed');
	});
});
