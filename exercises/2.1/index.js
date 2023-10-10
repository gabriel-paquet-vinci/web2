function addDateTime(message) {
    const dateTimeNow = new Date();
    console.log(dateTimeNow.toLocaleDateString() + ' ' + dateTimeNow.toLocaleTimeString() + ' : ' + message)
    return dateTimeNow.toLocaleDateString() + ' ' + dateTimeNow.toLocaleTimeString() + ' : ' + message;
}

alert(addDateTime('This is the best moment to have a look at this website !'));