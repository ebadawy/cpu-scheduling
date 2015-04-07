
var priority_div = '<div class="row" style="margin-top: 10px;">'+
				'<div class="col-xs-4"><input type="text" '+
				'class="form-control process-name"placeholder="Process Name">'+
				'</div><div class="col-xs-3"><input type="text"'+
				'class="form-control arrival-time" placeholder="Arival Time">'+
				'</div><div class="col-xs-3"><input type="text" '+
				'class="form-control burst-time" placeholder="Burst Time">'+
				'</div><div class="col-xs-2"><input type="text"'+
				'class="form-control priority" placeholder="Priority"></div></div>';

function priority() {
	var process_list = new ProcessList();

	//iterate to all process and build them in a list
	$inputs_container.children().each(function() {
		  var process_name = $(this).find('.form-control.process-name').val();
		  var arival_time = parseInt($(this).find('.form-control.arrival-time').val());
		  var burst_time = parseInt($(this).find('.form-control.burst-time').val());
		  var priority = parseInt($(this).find('.form-control.priority').val());

		  arival_time = isNaN(arival_time) ? 0 : arival_time;
		  burst_time = isNaN(burst_time) ? 1 : burst_time;
		  priority = isNaN(priority) ? 0 : priority;

		  var current_process = new Process(process_name, arival_time, burst_time,priority);
		  process_list.add(current_process);
	});
		
	build_chart(non_preemptive(process_list));
}

function non_preemptive(process_list) {
	var ready_list = new ProcessList();
	//sort process according to there burst time
	process_list.sort('priority');
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