
/*----------------------------------------------------------------------------------------------------*/

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/*----------------------------------------------------------------------------------------------------*/

const formatString = (format, parameters) => 
{
	let formattedString = format;

	for (let i = 0; i < parameters.length; i++) {
		formattedString = formattedString.replace("{"+ i +"}", parameters[i]);
	}

	return formattedString;
}

/*----------------------------------------------------------------------------------------------------*/

export { sleep, formatString }