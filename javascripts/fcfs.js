$(document).ready(function() {

	var $inputs_container = $('div.inputs-container');

	var input_div = '<div class="row" style="margin-top: 10px;">'+
					'<div class="col-xs-4"><input type="text" '+
					'class="form-control process-name"placeholder="Process Name">'+
					'</div><div class="col-xs-3"><input type="text"'+
					'class="form-control arrival-time" placeholder="Arival Time">'+
					'</div><div class="col-xs-3"><input type="text" '+
					'class="form-control burst-time" placeholder="Burst Time">'+
					'</div></div>';

	// update inputs numbers to matche with processes numbers
	$(".processes-number").keydown(function(e){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        
        // check if the pressed key is 'enter'
        if(keycode == '13'){
            $inputs_container.empty();
            for(var i = 0; i < $(this).val(); i++) 
            	$inputs_container.append(input_div);
        }
    });

	$('#run-div').delegate('.btn.run', 'click', function() {
		var process_list = new ProcessList();

		//iterate to all process and build them in a list
		$inputs_container.children().each(function() {

		  var process_name = $(this).find('.form-control.process-name').val();
		  var arrival_time = parseInt($(this).find('.form-control.arrival-time').val());
		  var burst_time = parseInt($(this).find('.form-control.burst-time').val());

		  var current_process = new Process(process_name, arrival_time, burst_time);
		  process_list.add(current_process);
		});
		
		//sort process acording to there arival time
		process_list.sort();
		build_chart(process_list);
	});

	function process_chart(process) {
		var name = process.name;
		var execution_time = parseInt(process.execution_time);
		var arrival_time = parseInt(process.arrival_time);
		var burst_time = parseInt(process.burst_time);

		console.log(process.execution_time+1);
		return '<li class="current" title="'+name+' '+ execution_time +
		' : '+(burst_time+execution_time)+'"><span class="bar" data-number="'+burst_time+
		'"></span><span class="number">'+burst_time+'</span></li>';
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

});