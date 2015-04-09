console.log("here");
function sjf() {
	var process_list = new ProcessList();

	// iterate to all process and build them in a list
	$inputs_container.children().each(function() {
		  var process_name = $(this).find('.form-control.process-name').val();
		  var arival_time = parseInt($(this).find('.form-control.arrival-time').val());
		  var burst_time = parseInt($(this).find('.form-control.burst-time').val());
		  
		  //check if the input wasn't a number put a default values 
		  arival_time = isNaN(arival_time) ? 0 : arival_time;
		  burst_time = isNaN(burst_time) ? 1 : burst_time;

		  var current_process = new Process(process_name, arival_time, burst_time);
		  process_list.add(current_process);
	});

	var list, arr;

	//get the selected radio_btn value
	var option_val = $(".options input[type='radio']:checked").val();
	if(option_val == 'preemptive'){
		list = preemptive(process_list, 'sjf'); 
		arr = list.avg_turn_around_and_wating_time();
		build_chart(list);
		$('.avarage-time').html(arr[0]);
		$('.turn-around-time').html(arr[1]);
	}
	else{
		list = non_preemptive(process_list, 'sjf'); 
		arr = list.avg_turn_around_and_wating_time();
		build_chart(list);
		$('.avarage-time').html(arr[0]);
		$('.turn-around-time').html(arr[1]);
	}

}