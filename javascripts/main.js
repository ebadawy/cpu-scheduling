var $scheduler_type_btn = $('button.scheduler-type');

//update dropdown menu text when clicking on one of its items
$('ul.scheduler-type li').click(function() {
	var html = $(this).text().trim()+' <span class="caret"></span>';
	$scheduler_type_btn.html(html);
});

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
	var scheduler_type = $scheduler_type_btn.text().trim();
	switch(scheduler_type) {
		case 'FCFS': 
			fcfs(); 
			break;
	}
});
