const key = 'theme';
const ctx = document.documentElement;

const cachedTheme = localStorage.getItem(key);
if (cachedTheme) {
	ctx.dataset[key] = cachedTheme;
}

document.addEventListener('DOMContentLoaded', () => {
	const themePicker = document.getElementById('theme-picker');
	if (!themePicker) return;

	const initialTheme = cachedTheme ?? 'auto';
	themePicker.querySelector('input[checked]').removeAttribute('checked');
	themePicker.querySelector(`input[value="${initialTheme}"]`).setAttribute('checked', '');

	themePicker.addEventListener('change', (e) => {
		const theme = e.target.value;
		if (theme === 'auto') {
			delete ctx.dataset[key];
			localStorage.removeItem(key);
		} else {
			ctx.dataset[key] = theme;
			localStorage.setItem(key, theme);
		}
	});
});
