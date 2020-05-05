var demo_tasks = {
	"data":[
		{"id":1, "text":"Project #1", "start_date":"28-11-2018", "duration":"5", "status": "done"},
		{"id":2, "text":"Task #1", "start_date":"01-12-2018", "duration":"8", "parent":"1", "status": "done"},

		{"id":3, "text":"Task #2", "start_date":"12-12-2018", "duration":"5", "parent":"1", "status": "inprogress"},
		{"id":4, "text":"Task #2.1", "start_date":"21-12-2018", "duration":"4", "parent":"3", "status": "done"},
		{"id":5, "text":"Task #2.2", "start_date":"23-12-2018", "duration":"6", "parent":"3", "status": "inprogress"},
		{"id":6, "text":"Task #2.3", "start_date":"12-12-2018", "duration":"3", "parent":"3", "status": "inprogress"},
		{"id":7, "text":"Task #2.3.1", "start_date":"13-12-2018", "duration":"7", "parent":"6", "status": "done"},
		{"id":8, "text":"Task #2.3.2", "start_date":"21-12-2018", "duration":"4", "parent":"6", "status": "done"},
		{"id":9, "text":"Task #2.4", "start_date":"24-12-2018", "duration":"5", "parent":"3", "status": "overdue"},
		{"id":10, "text":"Task #3", "start_date":"24-12-2018", "duration":"4", "parent":"1", "status": "done"},
		{"id":11, "text":"Task #4", "start_date":"24-12-2018", "duration":"3", "parent":"1", "status": "overdue"},
		
		{"id":12, "text":"Task #5", "start_date":"13-12-2018", "duration":"5", "parent":"1", "status": "inprogress"},
		{"id":13, "text":"Task #5.1", "start_date":"12-12-2018", "duration":"7", "parent":"12", "status": "done"},
		{"id":14, "text":"Task #5.1.1", "start_date":"12-12-2018", "duration":"6", "parent":"13", "status": "inprogress"},
		{"id":15, "text":"Task #5.1.2", "start_date":"12-12-2018", "duration":"5", "parent":"13", "status": "done"},
		{"id":16, "text":"Task #5.2", "start_date":"12-12-2018", "duration":"7", "parent":"12", "status": "done"}
	]
};

//--DOCUMENT READY FUNCTION BEGIN
jQuery(document).ready(function () {
	$("#gantt_here").GanttChart({
		base: 45,
		data_name: demo_tasks,
		treegrid_padding: 30,
		treegrid_width: 550
	});
});
//--DOCUMENT READY FUNCTION END

//--WINDOW LOADED FUNCTION BEGIN
jQuery(window).bind("load", function () {
    
});
//--WINDOW LOADED FUNCTION END

//--WINDOW RESIZE FUNCTION BEGIN
jQuery(window).resize(function () {
    
});
//--WINDOW RESIZE FUNCTION END