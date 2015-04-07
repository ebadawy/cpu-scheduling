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

var Process = function(name, arival_time, burst_time, priority) {
	this.name = name || "";
	this.arival_time =  arival_time || 0;
	this.burst_time = burst_time || 1;
	this.priority = priority || 0;
	this.execution_time = arival_time;
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

	swap: function(node1, node2) {
		var tmp = node1.data;
		node1.data = node2.data;
		node2.data = tmp;
	},
	is_empty: function() {
		return this.head == null;
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

