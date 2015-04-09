function fcfs() {
	var process_list = new ProcessList();

	//iterate to all process and build them in a list
	$inputs_container.children().each(function() {
		  var process_name = $(this).find('.form-control.process-name').val();
		  var arrival_time = parseInt($(this).find('.form-control.arrival-time').val());
		  var burst_time = parseInt($(this).find('.form-control.burst-time').val());

		  var current_process = new Process(process_name, arrival_time, burst_time);
		  process_list.add(current_process);
		});
		
	//sort process according to there arival time & build the chart
	process_list.sort('arival_time');
	var arr = process_list.avg_turn_around_and_wating_time();

	$('.avarage-time').html(arr[0]);
	$('.turn-around-time').html(arr[1]);
	build_chart(process_list);
	// $('.avarage-time').html(process_list.get_average_time());
}