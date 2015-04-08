
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
	
	//get the selected radio_btn value
	var option_val = $(".options input[type='radio']:checked").val();
	if(option_val == 'preemptive')
		build_chart(preemptive(process_list, 'priority'));
	else
		build_chart(non_preemptive(process_list, 'priority'));
}