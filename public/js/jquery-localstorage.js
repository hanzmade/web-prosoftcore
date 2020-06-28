var storedData =  jQuery.parseJSON(localStorage.getItem('dataArray'));
$.each(storedData, function( i, v){
    $(':input[name='+ v.name +']').val(v.value);

    if(v.name.includes("photo")){
    	var rep = v.name.replace('_', '-');
    	var img_src_id = "display-" + rep;
    	
    	//push value tu src
    	$('#'+ img_src_id).attr('src', v.value).show();

    	//remove attr required
    	$('#'+ rep).removeAttr("required");
    }
});