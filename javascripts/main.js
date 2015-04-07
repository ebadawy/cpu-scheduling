// update inputs numbers to matche with processes numbers
$(".processes-number").keydown(function(e){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    
    // check if the pressed key is 'enter'
    if(keycode == '13'){
    	//clear all exisiting process and generate a new ones
        $inputs_container.empty();
        for(var i = 0; i < $(this).val(); i++) 
        	$inputs_container.append(fcfs_div);
    }
});

$('#run-div').delegate('.btn.run', 'click', function() {
	var scheduler_type = $('button.scheduler-type').text().trim();
	switch(scheduler_type) {
		case 'FCFS': 
			fcfs(); 
			break;
	}
});
