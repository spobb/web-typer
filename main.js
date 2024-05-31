document.addEventListener('DOMContentLoaded', () => {
	const special = ['ContextMenu', 'Meta', 'Tab', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'Enter', 'AltLeft', 'AltRight', 'CapsLock', 'BracketLeft'];
	const wrapper = document.querySelector('.type');
	const wpm = document.querySelector('.wpm');

	const words = [
		'int',
		'float',
		'function',
		'let',
		'var',
		'document',
		'element',
		'async',
		'await',
		'const',
		'string',
		'if',
		'while',
		'for',
		'return',
		'querySelector',
		'Math',
		'classList',
		'<div>',
		'addEventListener',
		'break',
		'default',
		'switch',
		'do',
		'continue',
		'double',
		'typeof',
		'instanceof',
		'private',
		'protected',
		'static',
		'throw',
		'new',
		'with',
		'yield',
		'import',
		'export',
		'goto',
		'try',
		'this',
		'declare',
		'array',
		'else',
		'elseif',
		'foreach',
		'namespace',
		'require',
		'print',
		'sprintf',
		'printf',
		'include',
		'echo',
		'clone',
		'case',
		'abstract',
		'and',
		'as',
		'html',
		'php',
		'js',
		'javascript',
		'react',
		'background',
		'display',
		'for(i = 0; i < max; ++i)',
		'flex',
		'align-items',
		'justify-content',
		'a',
		'input',
		'select',
		'option',
		'img',
		'span',
		'class',
		'id',
		'main',
		'head',
		'body',
		'header',
		'footer',
		'script',
	];

	// initialize global variables

	let timer = 0;
	let TIMED = false;

	let index = 0;

	let wordCount = 10;

	function generateTest(words, count) {
		let r = '';
		let i = 0;
		count -= 1;
		while (count > i) {
			r += words[Math.floor(Math.random() * words.length)];
			r += ' ';
			++i;
		}
		r += words[Math.floor(Math.random() * words.length)];
		r += '';
		return r;
	}

	function startTimer() {
		return Date.now();
	}

	function getWPM(start) {
		let curr = Date.now();
		return Math.floor(index / 5 / ((curr - start) / 60000));
	}

	let string = generateTest(words, wordCount);

	// creates letters in DOM
	const strArray = string.split('');
	let toType = [];

	strArray.forEach((e) => {
		toType.push(e == ' ' ? (e = '&nbsp;') : e);
	});

	toType.forEach((letter) => {
		// if (letter == ' ') letter = '&nbsp;';
		const l = document.createElement('span');
		l.classList.add('totype');
		l.innerHTML = letter;
		document.querySelector('.type').appendChild(l);
	});

	const letters = document.querySelectorAll('.totype');

	document.addEventListener('keydown', (e) => {
		//handle keystrokes and style them as pressed
		if (!TIMED) {
			timer = startTimer();
			TIMED = true;
		}
		if (index < 1) index = 0;

		wpm.innerText = 'WPM:' + getWPM(timer);

		// delete letter if key is backspace
		if (e.code == 'Backspace') {
			if (index > 0) {
				--index;
				letters[index].classList.remove('wrong');
				letters[index].classList.remove('checked');
				index < letters.length ? letters[index + 1].classList.remove('current') : null;
				letters[index].classList.add('current');

				letters[index].innerHTML = toType[index];
			}
			return;
		}

		// ignore key if it is special
		if (!special.includes(e.code)) {
			if (toType[index] === e.key) {
				letters[index].classList.add('checked');
			} else {
				letters[index].classList.add('wrong');
				letters[index].innerHTML = e.key;
				if (e.code == 'Space') {
					letters[index].innerHTML = '&nbsp;';
				}
			}
			index < letters.length ? letters[index + 1].classList.add('current') : null;
			letters[index].classList.remove('current');

			const l = document.createElement('span');

			++index;
			// l.classList.add('typeletter');

			// wrapper.insertBefore(l, document.querySelector('.cursor'));
		}
		// style keyboard

		document.querySelector('#' + e.code).classList.add('letter-pressed');
		this.addEventListener('keyup', () => {
			document.querySelector('#' + e.code).classList.remove('letter-pressed');
			return;
		});

		if (index > letters.length) {
			document.write('VOUS AVEZ FINI!!!!!!!!!!!!!!!!!!!!!!!!');
			stopTimer();
		}
	});
});
