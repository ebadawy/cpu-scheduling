
var $inputs_container = $('div.inputs-container');

var fcfs_div = '<div class="row" style="margin-top: 10px;">'+
				'<div class="col-xs-4"><input type="text" '+
				'class="form-control process-name"placeholder="Process Name">'+
				'</div><div class="col-xs-3"><input type="text"'+
				'class="form-control arrival-time" placeholder="Arival Time">'+
				'</div><div class="col-xs-3"><input type="text" '+
				'class="form-control burst-time" placeholder="Burst Time">'+
				'</div></div>';

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
	build_chart(process_list);

}

function process_chart(process) {
	var name = process.name;
	var execution_time = parseInt(process.execution_time);
	var arrival_time = parseInt(process.arrival_time);
	var burst_time = parseInt(process.burst_time);

	return '<li class="title" title="">'+name+' '+ execution_time +
	' : '+(burst_time+execution_time)+'</li><li class="current" title="'+burst_time+'"><span class="bar" data-number="'+burst_time+
	'"></span><span class="number"></span></li>';
}

function build_chart(process_list) {
	var $chart = $('.chart');
	$chart.empty();
	var process = process_list.head;
	while(process) {
		$chart.append(process_chart(process.data));
		process = process.next;
	}
	$chart.horizBarChart({
      selector: '.bar',
      speed: 3000
    });
}

