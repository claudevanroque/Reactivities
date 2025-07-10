const formatDateAndTime = (date: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};
	return new Date(date).toLocaleDateString('en-US', options);
}

const getDateInputValue = (dateString: string | undefined) => {
	if (!dateString) return '';
	return new Date(dateString).toISOString().split('T')[0]; // YYYY-MM-DD
};


export {formatDateAndTime, getDateInputValue}; 