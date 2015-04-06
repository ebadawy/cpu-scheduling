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
	this.size += 1;
	return node;
}

Queue.prototype.dequeue = function() {
	temp = this.first;
	this.first = this.first.next;
	this.size -= 1;
	return temp;
}

var Process = function() {
	this.name = null;
	this.burst_time = null;
	this.arival_time = null;
	this.priority = null;
}

Process.prototype.name = function(name) {
	this.name = name;
}


Process.prototype.burst_time = function(burst_time) {
	this.burst_time = burst_time;
}


Process.prototype.arival_time = function(arival_time) {
	this.arival_time = arival_time;
}


Process.prototype.name = function(arival_time) {
	this.arival_time = arival_time;
}