var succ = $('#succ').html();
var storedData = localStorage.getItem('dataArray');

if(storedData){
	localStorage.removeItem('dataArray');
}