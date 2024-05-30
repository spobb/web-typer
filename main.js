document.addEventListener('DOMContentLoaded', () => {
	let letters = 'azertyuiopqsdfghjklmwxcvbn';
	const special = ['Tab', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'Enter', 'AltLeft', 'AltRight', 'CapsLock', 'BracketLeft'];
	const wrapper = document.querySelector('.type');
	letters = letters.split('');

	let type = '';
	type = type.split('');
	type.forEach((e) => {
		if (e == ' ') e = '&nbsp;';
		const l = document.createElement('span');
		l.classList.add('typeletter');
		l.innerHTML = e;
		document.querySelector('.type').appendChild(l);
	});

	console.log(wrapper.childNodes.length);
	document.addEventListener('keydown', (e) => {
		console.log(e.code);
		if (e.code == 'Backspace') {
			if (wrapper.childNodes.length > 3) wrapper.removeChild(wrapper.childNodes[wrapper.childNodes.length - 3]);
			return;
		}
		document.querySelector('#' + e.code).classList.add('letter-pressed');
		this.addEventListener('keyup', () => {
			document.querySelector('#' + e.code).classList.remove('letter-pressed');
			return;
		});
		if (special.includes(e.code)) {
			return;
		}
		const l = document.createElement('span');
		l.classList.add('typeletter');
		if (e.key == ' ') {
			l.innerHTML = '&nbsp;';
		} else {
			l.innerHTML = e.key;
		}
		wrapper.insertBefore(l, document.querySelector('.cursor'));
	});
});
