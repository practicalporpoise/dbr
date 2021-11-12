const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				wolves: {
					blue: 'rgb(6, 50, 200)',
					green: 'rgb(18, 138, 54)'
				}
			}
		}
	},

	plugins: []
};

module.exports = config;
