document.addEventListener('DOMContentLoaded', () => {
	const special = ['Tab', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'Enter', 'AltLeft', 'AltRight', 'CapsLock', 'BracketLeft'];
	const wrapper = document.querySelector('.type');
	const wpm = document.querySelector('.wpm');

	let timer = 0;

	let string = 'HEHEHeHA';

	// creates letters in DOM

	const toType = string.split('');
	toType.forEach((letter) => {
		if (letter == ' ') letter = '&nbsp;';
		const l = document.createElement('span');
		l.classList.add('totype');
		l.innerHTML = letter;
		document.querySelector('.type').appendChild(l);
	});

	function startTimer() {
		return Date.now();
	}

	function getWPM(start) {
		let curr = Date.now();
		return Math.floor(i / 5 / ((curr - start) / 60000));
	}

	const letters = document.querySelectorAll('.totype');

	let i = 0;
	let TIMED = false;

	document.addEventListener('keydown', (e) => {
		//handle keystrokes and style them as pressed
		if (!TIMED) {
			timer = startTimer();
			TIMED = true;
		}
		wpm.innerText = 'WPM:' + getWPM(timer);

		// delete letter if key is backspace
		if (e.code == 'Backspace') {
			// if (letters.length > 0) wrapper.removeChild(letters[letters.length - 1]);
			--i;
			letters[i].classList.remove('wrong');
			letters[i].classList.remove('checked');
			i < letters.length ? letters[i + 1].classList.remove('current') : null;
			letters[i].classList.add('current');
			if (toType[i] == ' ') {
				letters[i].innerHTML = '&nbsp;';
				return;
			}
			letters[i].innerText = toType[i];
			return;
		}

		// ignore key if it is special
		if (special.includes(e.code)) {
			return;
		}

		if (e.key == ' ') {
			e.key = '&nbsp;';
		}

		if (toType[i] === e.key) {
			letters[i].classList.add('checked');
		} else {
			letters[i].classList.add('wrong');
			letters[i].innerText = e.key;
		}
		i < letters.length ? letters[i + 1].classList.add('current') : null;
		letters[i].classList.remove('current');

		const l = document.createElement('span');

		++i;
		// l.classList.add('typeletter');

		// wrapper.insertBefore(l, document.querySelector('.cursor'));

		// style keyboard

		document.querySelector('#' + e.code).classList.add('letter-pressed');
		this.addEventListener('keyup', () => {
			document.querySelector('#' + e.code).classList.remove('letter-pressed');
			return;
		});

		if (i > letters.length) {
			document.write('VOUS AVEZ FINI!!!!!!!!!!!!!!!!!!!!!!!!');
			stopTimer();
		}
	});
});
