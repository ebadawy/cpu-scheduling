
function round_robin() {
	var process_list = new ProcessList();

	// iterate to all process and build them in a list
	$inputs_container.children().each(function() {
		  var process_name = $(this).find('.form-control.process-name').val();
		  var arival_time = parseInt($(this).find('.form-control.arrival-time').val());
		  var burst_time = parseInt($(this).find('.form-control.burst-time').val());

		  arival_time = isNaN(arival_time) ? 0 : arival_time;
		  burst_time = isNaN(burst_time) ? 1 : burst_time;

		  var current_process = new Process(process_name, arival_time, burst_time);
		  process_list.add(current_process);
	});
	
	//sort all processes according to there arival time
	process_list.sort('arival_time');

	var current_process = process_list.head;
	var current_time = 0;
	var request_queue = new Queue();
	var time_quantum = parseInt($('.time-quantum').val());
	time_quantum = (isNaN(time_quantum)) ? 1 : time_quantum;
	var ready_list = new ProcessList();
	var tmp_process;

	while(current_process || !request_queue.is_empty()) {
		
		//check if there is any process that's ready to enter the request queue
		while(current_process && current_process.data.arival_time <= current_time) {
			request_queue.enqueue(current_process.data);
			current_process = current_process.next;
		}

		//if request queue is not empty dequeue the firts process and add it
		//to ready list, if its burst time is less than time quantum
		//increment the current time by it burst time or increment the 
		//current time by time quantem and decrement the process burst time
		//by time quantum and enqueu it to request queue after checking
		//for any other process that's ready to enter the request queue
		if(!request_queue.is_empty()) {
			var p = request_queue.dequeue();
			if(p.data.burst_time > time_quantum) {
				tmp_process = 
				new Process(p.data.name, p.data.arival_time, time_quantum);
				tmp_process.execution_time = current_time;
				console.log(tmp_process);
				ready_list.add(tmp_process);
				p.data.burst_time -= time_quantum;
				current_time += time_quantum;
				
				//check if there is any process that's ready to enter the request queue
				while(current_process && current_process.data.arival_time <= current_time) {
					request_queue.enqueue(current_process.data);
					current_process = current_process.next;
				}

				request_queue.enqueue(p.data)

			} else if(p.data.burst_time != 0) {
				p.data.execution_time = current_time;
				ready_list.add(p.data);
				current_time += p.data.burst_time;
			}
		} else 
			current_time += 1;
	}
	ready_list = ready_list.merge();
	var arr = ready_list.avg_turn_around_and_wating_time();

	$('.avarage-time').html(arr[0]);
	$('.turn-around-time').html(arr[1]);

	build_chart(ready_list.merge());
	// $('.avarage-time').html(process_list.get_average_time());

}