var Node = function(data) {
	this.data = data;
	this.next = null;
}

var Queue = function() {
	this.first = null;
	this.size = null;
}

Queue.prototype.enqueue = function(data) {
	var node = new Node(data);

	if(!this.first) {
		this.first = node;
	} else {
		n = this.first;
		while(n.next) 
			n = n.next;
		n.next = node;
	}
	this.size++;
	return node;
}

Queue.prototype.dequeue = function() {
	temp = this.first;
	this.first = this.first.next;
	this.size--;
	return temp;
}

Queue.prototype.is_empty = function() {
	return this.size < 1;
}

var Process = function(name, arival_time, burst_time, priority) {
	this.name = name || "";
	this.arival_time =  arival_time || 0;
	this.burst_time = burst_time || 1;
	this.priority = priority || 0;
	this.execution_time = this.arival_time;
	this.finishing_time = this.arival_time;
	this.turn_around_time = this.finishing_time - this.arival_time;
}

Process.prototype = {
	name: function(name) {
		this.name = name;
	},
	burst_time: function(burst_time) {
		this.burst_time = burst_time;
	},
	arival_time: function(arival_time) {
		this.arival_time = arival_time;
	},
	priority: function(priority) {
		this.priority = priority;
	}
};


var ProcessList = function() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

ProcessList.prototype = {
	add: function(data) {
		var node = new Node(data);

		if(!this.head)
			this.head = node;
		else {
			var current_node = this.head;
			while(current_node.next) 
				current_node = current_node.next;
			current_node.next = node;
		}
		this.length++;

		return node;
	},
	remove: function(node) {
		//if it's the head node assign its next to be the head node
		if(this.head.data == node.data) {
			this.head = this.head.next;
			this.length--;
			return this.head;
		}
		else {
			var current_node = this.head;
			while(current_node.next) {
				if(current_node.next.data == node.data) {
					current_node.next = node.next;
					node.next = null;
					this.length--;
					return current_node;
				}
				current_node = current_node.next;
			}
		}
		return false;
	},

	//merge duplicated processes that came after each other
	merge: function() {
		var duplication_found = true;
		var current_node;
		while(duplication_found) {
			current_node = this.head;
			duplication_found = false;
			while(current_node.next){
				if(current_node.data.name === current_node.next.data.name){
					current_node.data.burst_time += current_node.next.data.burst_time;
					this.remove(current_node.next);
					duplication_found = true;
					//if the removed node was the last one break the loop
					if(!this.next)
						break;
				}
				current_node = current_node.next;
			}
		}
		return this;
	},
	swap: function(node1, node2) {
		var tmp = node1.data;
		node1.data = node2.data;
		node2.data = tmp;
	},
	is_empty: function() {
		return this.head == null;
	},

	//get the turnaround time by subtracting finishing time from arrival time
	//and then get the wating time by subtraction turnaround time from burst time
	avg_turn_around_and_wating_time: function() {
		var current_process = this.head;
		var total_turn_around_time = 0;
		var total_wating__time = 0;
		var turn_around_map = {};
		var burst_time_map = {};
		while(current_process) {
			current_process.data.finishing_time = 
			current_process.data.burst_time + 
			current_process.data.execution_time;
			current_process.data.turn_around_time = 
			current_process.data.finishing_time - 
			current_process.data.arival_time;
			turn_around_map[current_process.data.name] = 
			current_process.data.turn_around_time
			if(current_process.data.name in burst_time_map)
				burst_time_map[current_process.data.name] += current_process.data.burst_time;
			else
				burst_time_map[current_process.data.name] = current_process.data.burst_time;

			current_process = current_process.next;
		}
		var p;
		var len = 0;
		for(p in turn_around_map) {
			total_turn_around_time += turn_around_map[p];
			total_wating__time += turn_around_map[p] - burst_time_map[p];
			len++;
		}
		return [(total_wating__time/len).toFixed(2),
			(total_turn_around_time/len).toFixed(2)];
	},
	//sort processes according to there attr given in
	//the passed param 'type' using bubble sort
	sort: function(type) {
		var node = this.head;
		var swap = true;
		while(swap){
			swap = false;
			
			while(node) {
				if(node.next){

					//update next process execution time to be after the current one
					var exe_time = node.data.execution_time+node.data.burst_time;
					if(exe_time >= node.next.data.arival_time)
						node.next.data.execution_time = node.data.execution_time+
												node.data.burst_time;
					else
						node.next.data.execution_time = node.next.data.arival_time;

					switch(type) {
						case "arival_time" :
							//check if the current process came after its next
							if(node.data.arival_time > node.next.data.arival_time) {
								this.swap(node, node.next);
								swap = true;
							}
							break;
						case "burst_time":
							if(node.data.burst_time > node.next.data.burst_time) {
								this.swap(node, node.next);
								swap = true;
							}
							break;
						case "priority":
							if(node.data.priority > node.next.data.priority) {
								this.swap(node, node.next);
								swap = true;
							}
							break;
					}
				}
				node = node.next;
			}
			node = this.head;
			if(node) 
				node.data.execution_time = node.data.arival_time;
		} 
	}
};

/* ====== common used variables ====== */

var $inputs_container = $('div.inputs-container');
var fcfs_div = '<div class="row" style="margin-top: 10px;">'+
				'<div class="col-xs-4"><input type="text" '+
				'class="form-control process-name"placeholder="Process Name">'+
				'</div><div class="col-xs-3"><input type="text"'+
				'class="form-control arrival-time" placeholder="Arival Time">'+
				'</div><div class="col-xs-3"><input type="text" '+
				'class="form-control burst-time" placeholder="Burst Time">'+
				'</div></div>';
var $scheduler_type_btn = $('button.scheduler-type');
var $options_form = $('.options');
var $form_radiobtns = $(".options input[type='radio']:checked");
var scheduler_type;
var options = '<input type="radio" name="options" value="preemptive" checked>'
			 +' preemptive<input type="radio" name="options" value="nonpreemptive"style='
			 +'"margin-left: 34px;"> Non-preemptive';
var time_quantum_txtfield = '<div class="col-xs-3"><input type="text"'+
							'class="form-control  time-quantum"'+
							'placeholder="Time Quantum"></div>';


/* ====== common used functions ====== */

function process_chart(process) {
	var name = process.name;
	var execution_time = parseInt(process.execution_time);
	var arrival_time = parseInt(process.arrival_time);
	var burst_time = parseInt(process.burst_time);

	return '<li class="title" title="">'+name+'</li><li class="current" title="'+execution_time+'"><span class="bar" data-number="'+burst_time+
	'"></span><span class="number">'+(burst_time+execution_time)+'</span></li>';
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


function non_preemptive(process_list, scheduler_type) {
	var ready_list = new ProcessList();
	

	//sort process according to there burst time/priority
	if(scheduler_type === 'sjf')
		process_list.sort('burst_time');
	else 
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

//loop over all process if a process found to be the min-burst_time and not equal to zero
//add it to read_list and with burst_time 1 and decrement its burst_time, the process_added
//will be true, do this till no process is found then merge duplicated process that came
//after each other
function preemptive(process_list, scheduler_type) {
	var ready_list = new ProcessList();

	//sort process according to there burst time/priority
	if(scheduler_type === 'sjf')
		process_list.sort('burst_time');
	else
		process_list.sort('priority');


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