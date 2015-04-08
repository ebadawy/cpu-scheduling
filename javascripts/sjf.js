
function sjf() {
	var process_list = new ProcessList();

	//iterate to all process and build them in a list
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

	// var process_name = "A";
	// var arival_time = 0;
	// var burst_time = 1;
	// var p1 = new Process(process_name, arival_time, burst_time);
	// process_list.add(p1);
	// console.log(p1);

	// process_name = "B";
	// arival_time = 3;
	// burst_time = 3;
	// var p2 = new Process(process_name, arival_time, burst_time);
	// process_list.add(p2);

	// process_name = "C";
	// arival_time = 2;
	// burst_time = 5;
	// var p3 = new Process(process_name, arival_time, burst_time);
	// process_list.add(p3);
		
	build_chart(preemptive(process_list));
}

function non_preemptive(process_list) {
	var ready_list = new ProcessList();
	//sort process according to there burst time
	process_list.sort('burst_time');
	var current_time = 0;
	var current_process = process_list.head;
	var incr_current_time = true;

	while(current_process) {
		while(current_process) {
			//check if the current procees ready to be excuted then move it to
			//ready_list and update the current time to be at the current process end
			if(current_process.data.arival_time <= current_time) {
				current_process.data.execution_time = current_time;
				ready_list.add(current_process.data);
				process_list.remove(current_process);
				current_time = current_time + current_process.data.burst_time;
				incr_current_time = false;
				break;
			}
			current_process = current_process.next;
		}
		if(incr_current_time)
			current_time++;
		incr_current_time = true;
		current_process = process_list.head;
	}
	return ready_list;
} 

//loop over all process if a process found to be the min-burst_time and not equal to zero
//add it to read_list and with burst_time 1 and decrement its burst_time, the process_added
//will be true, do this till no process is found then merge duplicated process that came
//after each other
function preemptive(process_list) {
	var ready_list = new ProcessList();
	console.log(process_list);

	//sort process according to there burst time
	process_list.sort('burst_time');
	var current_time = 0;
	var current_process = process_list.head;
	var tmp_process;
	var process_added = true; // flag for detecting if a process found with min-burst_time
	while(process_added) {
		process_added = false;
		while(current_process) {
				if(current_process.data.arival_time <= current_time &&
					current_process.data.burst_time != 0) {
					new_process_added = true;
					current_process.data.burst_time--;
					current_process.data.execution_time = current_time;

					tmp_process = new Process();
					tmp_process.name = current_process.data.name;
					tmp_process.arival_time = current_process.data.arival_time;
					tmp_process.burst_time = 1;
					tmp_process.priority = current_process.data.priority;
					tmp_process.execution_time = current_process.data.execution_time;
					
					ready_list.add(tmp_process);

					if(current_process.data.burst != 0)
						process_added = true;
					
					break;
			}
			
			if(current_process.data.burst != 0)
				process_added = true;
			
			current_process = current_process.next;
		}
		if(current_time > 100)
			break;
		current_time++;
		current_process = process_list.head;
	}
	return ready_list.merge();
}