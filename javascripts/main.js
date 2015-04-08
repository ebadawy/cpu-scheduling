var $scheduler_type_btn = $('button.scheduler-type');
var $options_form = $('.options');
var $form_radiobtns = $(".options input[type='radio']:checked");
var scheduler_type;
var options = '<input type="radio" name="options" value="preemptive" checked>'
			 +' preemptive<input type="radio" name="options" value="nonpreemptive"style='
			 +'"margin-left: 34px;"> Non-preemptive';

//update dropdown menu text when clicking on one of its items
$('ul.scheduler-type li').click(function() {
	scheduler_type = $(this).text().trim();
	var html = scheduler_type+' <span class="caret"></span>';
	$scheduler_type_btn.html(html);

	$options_form.empty();
	    if(scheduler_type == "Priority") {
	    	$options_form.html(options);    	
	    	$(".options input[name='options']:radio").change(function() {
				priority();
			});
	    } else if( scheduler_type == "SJF") {
	    	$options_form.html(options);    	
	    	$(".options input[name='options']:radio").change(function() {
	    		sjf();
			});
	    }
});


// update inputs numbers to matche with processes numbers
$(".processes-number").keydown(function(e){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    scheduler_type = $scheduler_type_btn.text().trim();
    // check if the pressed key is 'enter'
    if(keycode == '13'){
    	//clear all exisiting process and generate a new ones
        $inputs_container.empty();
        if(scheduler_type == "Priority")
	        for(var i = 0; i < $(this).val(); i++) 
	        	$inputs_container.append(priority_div);
	    else
	    	for(var i = 0; i < $(this).val(); i++) 
	        	$inputs_container.append(fcfs_div);
    }
});

$('#run-div').delegate('.btn.run', 'click', function() {
	scheduler_type = $scheduler_type_btn.text().trim();
	switch(scheduler_type) {
		case 'FCFS': fcfs(); break;
		case 'SJF' : sjf();  break;
		case 'Priority': priority(); break;
	}
});