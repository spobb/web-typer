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
		'return;',
		'querySelector',
		'classList.remove()',
		'<div>',
		'addEventListener',
		'break;',
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
		'case:',
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
	const wordsArray = string.split(' ');
	let toType = [];

	// strArray.forEach((e) => {
	// toType.push(e);
	// });
	wordsArray.forEach((word) => {
		const div = document.createElement('div');
		div.classList.add('word');
		wrapper.appendChild(div);
		word.split('').forEach((letter) => {
			toType.push(letter);
			const l = document.createElement('span');
			l.classList.add('totype');
			if (letter == ' ') {
				l.innerHTML = '&nbsp;';
			} else {
				l.innerHTML = letter;
			}
			div.appendChild(l);
		});
		if (wrapper.childElementCount - document.querySelectorAll('.type-space').length < wordsArray.length) {
			toType.push(' ');
			const space = document.createElement('span');
			space.classList.add('totype', 'type-space');
			space.innerHTML = '&nbsp;';
			wrapper.appendChild(space);
		}
	});

	toType.forEach((letter) => {
		// if (letter == ' ') letter = '&nbsp;';
	});
	//add div around first word and last word
	// wrapper.prepend(div);

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

				letters[index].innerHTML = toType[index] == ' ' ? '&nbsp;' : toType[index];
			}
			return;
		}

		// ignore key if it is special
		if (!special.includes(e.code)) {
			// e.key = e.code == 'Space' ? '&nbsp;' : e.key;
			if (toType[index] === e.key) {
				letters[index].classList.add('checked');
			} else {
				letters[index].classList.add('wrong');
			}
			letters[index].innerHTML = e.code == 'Space' ? '&nbsp;' : e.key;
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
