letters = 'azertyuiopqsdfghjklmwxcvbn';
letters = letters.split('');

type = 'This is just a simple typing test.';
type = type.split('');
type.forEach((e) => {
	document.write(`<span class="typeletter">${e}<span>`);
});

document.addEventListener('keydown', (e) => {
	console.log(e.key);
	document.querySelector('#' + e.key).classList.add('letter-pressed');
	this.addEventListener('keyup', () => {
		document.querySelector('#' + e.key).classList.remove('letter-pressed');
	});
});
