const config = {
	'developer': {
		'domain': 'http://localhost:5000',
		'appName': "Estágio Web",
		'version': "0.0.0.1",
		'company': "Stage developer",
		'year': "2019"
	},
	'production': {
		'domain': 'http://localhost:5000',
		'appName': "Estágio Web",
		'version': "0.0.0.1",
		'company': "Stage developer",
		'year': 2019
	}
}

const environment = 'developer';

export const Properties = config[environment];