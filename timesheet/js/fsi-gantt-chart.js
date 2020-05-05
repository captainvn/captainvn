var GanttChart_act = {
    init: function (container,base,treegrid_padding,treegrid_width) {
        GanttChart_act.onEvent(base);
        GanttChart_act.upEvent(container,base,treegrid_padding,treegrid_width);
    },
    upEvent: function(container,base,treegrid_padding,treegrid_width){
    	if(!container){
    		container = jQuery(document);
    	}
    	container.find(".gantt_layout_cell.grid_cell").css("width",treegrid_width);
    	container.find(".gantt_layout_cell.grid_cell").resizable({
			handles: "e",
			minWidth: treegrid_width,
    	});
		//For resize
		var og_left,last_left,og_width,last_width;
	    container.find(".gantt_task_resizable").resizable({
			handles: "e, w",
			minWidth: base,
			containment: "parent",
			start: function(event, ui) {
			    og_left = ui.originalPosition.left;
			    og_width = ui.originalSize.width;
			},
			resize: function(event, ui) {
			},
			stop: function(event, ui) {
			    last_left = ui.position.left;
			    last_width = ui.size.width;

			    if(last_width != og_width && last_left != og_left){
			    //RESIZE BÊN TRÁI
					var d = last_left % base;
					var b = 0;
					var f = 0;
					if(d > base/2){
						b = base - d
						f = last_left + b;
						ui.helper.css("left",f);
						ui.helper.css("width",og_width - f + og_left);
					}else{
						ui.helper.css("left",last_left - d);
						ui.helper.css("width",last_width + d );
					}
			    }else{
			    //RESIZE BÊN PHẢI
			    	last_left = Math.abs(last_width -  og_width);
					var d = last_left % base;
					var b = base - d;
					if(d > base/2){
						ui.helper.css("width",last_width > og_width ? last_width + b : last_width - b);
					}else{
						ui.helper.css("width",last_width > og_width ? last_width - d : last_width + d);
					}
			    }
			},

	    });
		//For drag
    	var star_cout,stop_cout;
	    container.find(".gantt_task_draggable").draggable({
	    	axis: "x",
	    	containment: "parent",
			start: function( event, ui) {
				star_cout = ui.position.left
			},
			drag: function( event, ui) {
			},
			stop: function( event, ui) {
				stop_cout = ui.position.left
				var d = stop_cout % base;
				var b = 0;
				var f = 0;
				if(d >= base/2){
					b = base - d;
					f = stop_cout + b;
					ui.helper.css("left",f);
				}else{
					f = stop_cout - d;
					ui.helper.css("left",f);
				}
			}
	    });

		container.find(".gantt_row_task").each(function(){

			var task_id = $(this).attr("task_id");
			var data_parent = $(this).attr("data-parent");
			if($(".gantt_row_task[data-parent="+task_id+"]").length != 0){
				$(this).addClass("parent_row_task");
				$(this).addClass("active");
			}
			if($(".gantt_row_task[task_id="+data_parent+"]").length != 0){
				var level = 1;
				if($(".gantt_row_task[task_id="+data_parent+"]").attr("row-task-level")){
					level = level + parseInt($(".gantt_row_task[task_id="+data_parent+"]").attr("row-task-level"));
				}
				$(this).attr("row-task-level",level);
			}else{
				$(this).attr("row-task-level","0");
			}
			var padding_final =  parseInt($(this).attr("row-task-level"))*treegrid_padding;
			$(this).find(".gantt_cell_info").css("padding-left",padding_final);
			$(this).attr("data-toggle","is_show");
		});

    },
	onEvent: function (base) {
		$(document).on('click', '.gantt_close', function(){
		    var primary_parent = $(this).parents(".gantt_row_task");
		    var task_id = primary_parent.attr("task_id");
		    primary_parent.toggleClass("active");
		    var child = $(".gantt_row_task[data-parent="+task_id+"]");
		    var count = 0;
		    GanttChart_fn.init_loop(count,child,jQuery(".gantt_task_bg"),jQuery(".gantt_bars_area"));
		    GanttChart_fn.update_position(base,jQuery(".gantt_bars_area"));
		});

	}
};
var GanttChart_fn = {
	first_html: function(target){
		var html =  '<div class="gantt_layout_cell gantt_layout_root gantt_layout gantt_layout_y gantt_container gantt_layout_cell_border_left gantt_layout_cell_border_top gantt_layout_cell_border_right gantt_layout_cell_border_bottom">'+
		            '<div class="gantt_layout_cell gantt_layout gantt_layout_x  gantt_layout_cell_border_transparent">'+
		                '<div class="gantt_layout_cell  grid_cell gantt_layout_outer_scroll gantt_layout_outer_scroll_vertical gantt_layout_outer_scroll gantt_layout_outer_scroll_horizontal gantt_layout_cell_border_right" >'+
		                    '<div class="gantt_layout_content">'+
		                        '<div class="gantt_tree_grid">'+
		                            '<div class="gantt_tree_grid_content"></div>'+
		                            '<div class="gantt_grid_data"></div>'+
		                        '</div>'+
		                    '</div>'+
		                '</div>'+
		                '<div class="gantt_layout_cell  timeline_cell gantt_layout_outer_scroll gantt_layout_outer_scroll_vertical gantt_layout_outer_scroll gantt_layout_outer_scroll_horizontal">'+
		                    '<div class="gantt_layout_content">'+
		                        '<div class="gantt_task">'+
		                            '<div class="gantt_task_scale"></div>'+
		                            '<div class="gantt_data_area" >'+
		                                '<div class="gantt_task_bg"></div>'+
		                                '<div class="gantt_bars_area"></div>'+
		                            '</div>'+
		                        '</div>'+
		                    '</div>'+
		                '</div>'+
		            '</div>'+
		        '</div>';
		target.append(html);
	},
	init_loop: function(count,child,bg_target,area_target){
	  count++;
	  var length = child.length;
	  if(length!=0){
	      child.each(function(){
	        var task_id = $(this).attr("task_id");
	        var task_id_sort = task_id.replace("grow_","");

	        if(count > 1){
	           var data_parent = $(this).attr("data-parent");
	           var parent = $(".gantt_row_task[task_id="+data_parent+"]");
	           if(parent.is(":visible")){
	              if($(this).attr("data-toggle") == "is_show"){
	                  $(this).show();
	                  bg_target.find(".gantt_task_row[task_id="+task_id_sort+"]").show();
	                  area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").show();
	                  area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").removeClass("loop_hide");
	              }else{
	                 $(this).hide();
	                 bg_target.find(".gantt_task_row[task_id="+task_id_sort+"]").hide();
	                 area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").hide();
	                 area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").addClass("loop_hide");
	              }
	           }else{
	              $(this).hide();
	              bg_target.find(".gantt_task_row[task_id="+task_id_sort+"]").hide();
	              area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").hide();
	              area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").addClass("loop_hide");
	           }
	        }else{
	          if( $(this).is(":visible")){
	              $(this).hide();
	              bg_target.find(".gantt_task_row[task_id="+task_id_sort+"]").hide();
	              area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").hide();
	              area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").addClass("loop_hide");
	              $(this).attr("data-toggle","is_hide");
	          }else{
	             $(this).show();
	             bg_target.find(".gantt_task_row[task_id="+task_id_sort+"]").show();
	             area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").show();
	             area_target.find(".gantt_task_line[task_id="+task_id_sort+"]").removeClass("loop_hide");
	             $(this).attr("data-toggle","is_show");
	          }
	        }


	        var child = $(".gantt_row_task[data-parent="+task_id+"]");
	        GanttChart_fn.init_loop(count,child,bg_target,area_target);
	    });
	  }
	},
	update_position: function(base,area_target){
		var length = area_target.find(".gantt_task_line:not(.loop_hide)").length;
		for(i = 0; i < length; i++){
			var top_position = parseInt(i)*parseInt(base);
			area_target.find(".gantt_task_line:not(.loop_hide)").eq(i).css("top",top_position);
		}

	},
	duration_to_date_fn: function(data_name){
		var arr = [];
		for(i=0;i < data_name.data.length; i++){
		    var temp = new Object();
		    var date = new Date(data_name.data[i].start_date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		    date.setHours(0,0,0,0);
		    var end_date = date.addDays(parseInt(data_name.data[i].duration)-1);
		    end_date.setHours(0,0,0,0);

		    var day = date.getDate();
		    var end_day = end_date.getDate();
		    var month = date.getMonth() + 1;
		    var end_month = end_date.getMonth() + 1;
		    var year = date.getFullYear();
		    var end_year = end_date.getFullYear();

		    var weekday = new Array('Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy');
		    var dayOfWeek = weekday[date.getDay()];
		    var end_dayOfWeek = weekday[end_date.getDay()];

		    if(day < 10){
		       day = "0" + day;
		    }
		    if(end_day < 10){
		       end_day = "0" + end_day;
		    }
		    if(month < 10){
		       month = "0" + month;
		    }
		    if(end_month < 10){
		       end_month = "0" + end_month;
		    }

		    temp["id"] = data_name.data[i].id;
		    temp["text"] = data_name.data[i].text;
		    temp["start_date"] = day+"-"+month+"-"+year;
		    temp["end_date"] = end_day+"-"+end_month+"-"+end_year;
		    if(data_name.data[i].parent){
		         temp["parent"] = data_name.data[i].parent;
		    }
		    temp["open"] = data_name.data[i].open;
		    arr.push(temp);
		}
		return arr;
	},
	get_min_max_date_fn: function(data_name){
		var arr = [];
		var minDate = new Date(-8640000000000000);
		var maxDate = new Date(8640000000000000);
		for(i=0;i < data_name.length; i++){
		    var date = new Date(data_name[i].start_date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		    date.setHours(0,0,0,0);
		    var end_date = new Date(data_name[i].end_date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		    date.setHours(0,0,0,0);
		    if(date.getTime() < maxDate.getTime()){
		      maxDate = date;
		    }
		    if(end_date.getTime() > minDate.getTime()){
		      minDate = end_date;
		    }
		}
		var temp_get_min_max_date = new Object();
		var min_day = maxDate.getDate();
		var min_month = maxDate.getMonth() + 1;
		var min_year = maxDate.getFullYear();
		var max_day = minDate.getDate();
		var max_month = minDate.getMonth() + 1;
		var max_year = minDate.getFullYear();
		if(min_day < 10){
		  min_day = "0" + min_day;
		}
		if(max_day < 10){
		  max_day = "0" + max_day;
		}
		if(min_month < 10){
		  min_month = "0" + min_month;
		}
		if(max_month < 10){
		  max_month = "0" + max_month;
		}
		temp_get_min_max_date["min_date"] = min_day+"-"+min_month+"-"+min_year;
		temp_get_min_max_date["max_date"] = max_day+"-"+max_month+"-"+max_year;
		arr.push(temp_get_min_max_date);
		return arr;
	},
	count_day: function(startDate, stopDate) {
	    var diffDays;
	    startDate = new Date(startDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
	    startDate.setHours(0,0,0,0);
	    stopDate = new Date(stopDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
	    stopDate.setHours(0,0,0,0);
	    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	    diffDays = Math.round(Math.abs((startDate.getTime() - stopDate.getTime())/(oneDay))+1);
	   return diffDays;
	},
	build_layout: function(base,data_name,gantt_task_bg,gantt_bars_area,min_max_arr){
		for(i=0;i < data_name.data.length; i++){
			var left_position = (GanttChart_fn.count_day(min_max_arr[0].min_date, data_name.data[i].start_date)*base);
			var top_position = i*base;
			var width_position = data_name.data[i].duration*base;
			var status_task = data_name.data[i].status;
			var diffDays = GanttChart_fn.count_day(min_max_arr[0].min_date, min_max_arr[0].max_date);
			if(diffDays < 30){
			  diffDays = 30;
			}
			diffDays = diffDays + 2;
			var gantt_task_cell = '<div class="gantt_task_cell" style="width: '+base+'px"></div>';
			var gantt_task_cell_time = gantt_task_cell.times(diffDays);
			gantt_task_bg.append('<div class="gantt_task_row" style="height: '+base+'px" task_id="'+data_name.data[i].id+'">'+gantt_task_cell_time+'</div>');

			var task_html = '<div task_id="'+data_name.data[i].id+'" class="gantt_task_draggable gantt_task_resizable gantt_task_line gantt_bar_task gantt_task_'+status_task+'"'+
							'style="left: '+left_position+'px;top: '+top_position+'px;height: '+base+'px;line-height: '+base+'px;width: '+width_position+'px;">'+
		        			'<div class="gantt_task_progress_wrapper"></div>'+
		      				'</div>';

		  	gantt_bars_area.append(task_html);
		}
	},
	getDates: function(startDate, finishDate) {
		startDate = new Date(startDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		startDate.setHours(0,0,0,0);
		finishDate = new Date(finishDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		finishDate.setHours(0,0,0,0);

		startDate = startDate.minusDays(1);
		finishDate = finishDate.addDays(1);


		var dateArray = new Array();
		var currentDate = startDate;
		while (currentDate <= finishDate) {
			dateArray.push(currentDate)
			currentDate = currentDate.addDays(1);
		}
		return dateArray;
	},
	date_by_date: function(base,min_max_arr,target){
		var start_day = min_max_arr[0].min_date;
		var finish_day = min_max_arr[0].max_date;
		var dateArray = GanttChart_fn.getDates(start_day, finish_day);
		var first_month = 0;
		for (i = 0; i < dateArray.length; i ++ ) {
	        var date_arr = dateArray[i];
			var day = date_arr.getDate();
			var month = date_arr.getMonth() + 1;
			var year = date_arr.getFullYear();
			var weekday = new Array('Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy');
	        var sort_weekday = new Array('CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7');
	        var dayOfWeek = sort_weekday[date_arr.getDay()];
			    if(day < 10){
		       day = "0" + day;
		    }
		    if(month < 10){
		       month = "0" + month;
		    }

	        if(first_month == 0){
	           first_month = parseInt(month);
	        }

	        if(jQuery(document).find('.gantt_datetime_'+month+'_'+year+'').length == 0){
	            target.append('<div class="gantt_datetime gantt_datetime_'+month+'_'+year+'">'+
	                          '<div class="gantt_datetime_top" style="height: '+base/2+'px;line-height: '+base/2+'px">'+month+'-'+year+'</div>'+
	                          '<div class="gantt_datetime_bottom"></div>'+
	                          '</div>');
	        }
	        jQuery(document).find('.gantt_datetime_'+month+'_'+year+'').find('.gantt_datetime_bottom').append('<div class="gantt_datetime_day" style="width: '+base+'px;height: '+base+'px"><span style="width: '+base+'px;height:'+base/2+'px;line-height: '+base/2+'px">'+dayOfWeek+'</span><span style="width: '+base+'px;height:'+base/2+'px;line-height: '+base/2+'px">'+day+'</span></div>');
		}
	},
	treegrid_init: function(target,data_name,base){

		for(i=0;i < data_name.data.length; i++){

			var first_html = '<div class="gantt_row gantt_row_task" task_id="grow_'+data_name.data[i].id+'" style="height: '+base+'px">';
			if(data_name.data[i].parent){
				first_html = '<div class="gantt_row gantt_row_task" task_id="grow_'+data_name.data[i].id+'" data-parent="grow_'+data_name.data[i].parent+'" style="height: '+base+'px">';
			}

			var html = first_html+
							'<div class="gantt_cell_left">'+
				        		'<div class="gantt_cell gantt_cell_info">'+
				            		'<div class="gantt_tree_icon gantt_close">'+
				                		'<i class="fa fa-minus" aria-hidden="true"></i>'+
				            		'</div>'+
				            		'<div class="gantt_tree_content">'+data_name.data[i].text+'</div>'+
				        		'</div>'+
			        		'</div>'+
			        		'<div class="gantt_cell_right">'+
				        		'<div class="gantt_cell gantt_cell_date">'+
				            		'<div class="gantt_tree_content">'+data_name.data[i].start_date+'</div>'+
				        		'</div>'+
				        		'<div class="gantt_cell gantt_cell_duration">'+
				            		'<div class="gantt_tree_content">'+data_name.data[i].duration+'</div>'+
				        		'</div>'+
					        	'<div class="gantt_cell gantt_cell_add gantt_last_cell">'+
					            	'<div class="gantt_add">'+
				                		'<i class="fa fa-plus" aria-hidden="true"></i>'+
				            		'</div>'+
				        		'</div>'+
			        		'</div>'+
			    		'</div>';
			target.find(".gantt_grid_data").append(html);
		}
		Object.keys(data_name.data[0]).forEach(function(key){
				var string;
				switch (key) {
				  case "id":
				    string = "Id";
				    break;
				  case "status":
				    string = "Trạng thái";
				    break;
				  case "parent":
				     string = "Cha";
				    break;
				  case "text":
				    string = "Công việc";
				    break;
				  case "start_date":
				    string = "Ngày bắt đầu";
				    break;
				  case "duration":
				    string = "Số ngày";
				}

			if(key == "id" || key == "status" || key == "parent" ){
				//Do Nothing
			}else{

				var html = '<div class="gantt_grid_head_cell gantt_grid_head_'+key+'">'+string+'</div>';
				target.find(".gantt_tree_grid_content").append(html);
			}
		});
		var last_html = '<div class="gantt_grid_head_cell gantt_grid_head_add gantt_last_cell">'+
        					'<div class="gantt_tree_grid_icon gantt_tree_grid_close">'+
            					'<i class="fa fa-plus" aria-hidden="true"></i>'+
        					'</div>'+
    					'</div>';
    	target.find(".gantt_tree_grid_content").append(last_html);
    	target.find(".gantt_tree_grid_content").css("height",base+(base/2)+1);
	},
	init_layout: function(base, data_name,treegrid_padding,target){
		GanttChart_fn.first_html(target);
		var duration_to_date = GanttChart_fn.duration_to_date_fn(data_name);
		var get_min_max_date = GanttChart_fn.get_min_max_date_fn(duration_to_date);
		GanttChart_fn.build_layout(base,data_name,jQuery(".gantt_task_bg"),jQuery(".gantt_bars_area"),get_min_max_date);

		GanttChart_fn.date_by_date(base,get_min_max_date,jQuery(".gantt_task_scale"));
		GanttChart_fn.treegrid_init(jQuery(".gantt_tree_grid"),data_name,base);




	}
}
String.prototype.times = function(n) {
    return Array.prototype.join.call({length: n+1}, this);
};
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}
Date.prototype.minusDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() - days);
    return dat;
}

$.fn.GanttChart = function(option) {
	GanttChart_fn.init_layout(option.base,option.data_name,option.treegrid_padding,jQuery(this));
	GanttChart_act.init(jQuery(document),option.base,option.treegrid_padding,option.treegrid_width);
};