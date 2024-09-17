document.addEventListener('DOMContentLoaded', () => {
	const special = ['ContextMenu', 'Meta', 'Tab', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'Enter', 'AltLeft', 'AltRight', 'CapsLock', 'BracketLeft', 'Backspace', 'F5'];
	const wrapper = document.querySelector('.type');
	const wpm = document.querySelector('.wpm');

	//selectors

	const wordCountSelect = document.querySelector('.word-count');

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
		'div',
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
	let index = 0;
	let wordCount = 25;

	// flags

	let TIMED = false;
	let GAME_END = false;

	function generateString(words, count) {
		let r = '';
		while (count - 1 > 0) {
			r += `${words[Math.floor(Math.random() * words.length)]} `;
			--count;
		}
		return (r += `${words[Math.floor(Math.random() * words.length)]}`);
	}

	function startTimer() {
		return Date.now();
	}

	function getWPM(start) {
		let curr = Date.now();
		return Math.floor(index / 5 / ((curr - start) / 60000));
	}

	function endGame() {
		GAME_END = true;
		// document.querySelector('.end-screen').classList.remove('hidden');
	}


	function generateTest(words, wordCount) {
		wrapper.innerHTML = '';
		// creates letters in DOM
		let string = generateString(words, wordCount);
		const wordsArray = string.split(' ');

		wordsArray.forEach(word => {
			const div = document.createElement('div');
			div.classList.add('word');
			wrapper.appendChild(div);
			word.split('').forEach(letter => {
				const l = document.createElement('span');
				toType.push(letter);
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
		const spacer = document.createElement('span');
		spacer.classList.add('totype');
		spacer.innerHTML = '';
		wrapper.appendChild(spacer);

	}
	let toType = [];
	string = generateTest(words, wordCount);
	let letters = document.querySelectorAll('.totype');

	wordCountSelect.addEventListener('change', e => {
		toType = [];
		timer = 0;
		index = 0;
		wordCount = e.target.value
		string = generateTest(words, wordCount);
		letters = document.querySelectorAll('.totype');
	})


	document.addEventListener('keydown', e => {
		if (GAME_END) {
			return;
		}
		if (!TIMED) {
			timer = startTimer();
			TIMED = true;
		}

		if (index < 1) index = 0;

		// delete letter if key is backspace
		if (e.code == 'Backspace') {
			--index;
			letters[index].classList.remove('wrong');
			letters[index].classList.remove('checked');
			index < letters.length ? letters[index + 1].classList.remove('current') : null;
			letters[index].classList.add('current');

			letters[index].innerHTML = toType[index] == ' ' ? '&nbsp;' : toType[index];
			// }
			// return;
		}

		// ignore key if it is special
		if (!special.includes(e.code)) {
			if (toType[index] === e.key) {
				letters[index].classList.add('checked');
			} else {
				letters[index].classList.add('wrong');
			}
			letters[index].innerHTML = e.code == 'Space' ? '&nbsp;' : e.key;
			index < letters.length ? letters[index + 1].classList.add('current') : null;
			letters[index].classList.remove('current');

			++index;
		}
		// style keyboard

		if (index + 1 == letters.length) {
			endGame();
			stopTimer();
			return;
		}
		document.querySelector('#' + e.code).classList.add('letter-pressed');
		this.addEventListener('keyup', () => {
			document.querySelector('#' + e.code).classList.remove('letter-pressed');
			return;
		});

		// update wpm
		if (index > 1) wpm.innerText = 'wpm: ' + getWPM(timer);
	});
});