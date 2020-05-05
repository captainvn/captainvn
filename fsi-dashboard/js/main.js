$(document).ready(function(){
	//CONFIG BEGIN
	function config_dashboard(data){
		for(i=0;i < data.settings.length; i++){
			var target = data.settings[i].target;
			var check = data.settings[i].check;
			if(check==true){
				$('.onoffswitch_input[data-target="'+target+'"]').attr('checked', "true");
			}else{
				$('.onoffswitch_input[data-target="'+target+'"]').removeAttr('checked');
			}
			for(j=0;j < data.settings[i].child.length; j++){
				var target = data.settings[i].child[j].target;
				var check = data.settings[i].child[j].check;
				if(check==true){
					$('.onoffswitch_input[data-target="'+target+'"]').attr('checked', "true");
				}else{
					$('.onoffswitch_input[data-target="'+target+'"]').removeAttr('checked');
				}
			}			
		}
	}
	var data_dashboard = jQuery.parseJSON($(".data_dashboard").val());
	config_dashboard(data_dashboard);
	function config_dashboard_showHide(target){
		target.each(function(){
			var content = $(this).attr("data-target");
			if($(this).attr("checked")){
				$(content).show();
			}else{
				$(content).hide();
			}
		});
	}
	config_dashboard_showHide(jQuery(".dashboard_settings .onoffswitch_input"));
	var onoffswitch_count = 0;
	jQuery('.onoffswitch_input').each(function(){
		$(this).attr("id","onoffswitch_count"+onoffswitch_count);
		$(this).next("label").attr("for","onoffswitch_count"+onoffswitch_count);
		onoffswitch_count ++;
	});
	$(document).on('change','.onoffswitch_input', function(event) {
	    event.preventDefault();
	    var content = $(this).attr("data-target");
		if($(this).is(":checked")){
			$(content).show();
			if($(this).hasClass("onoffswitch_input_parent")){
				$(this).parents(".dbs_content_item").removeClass("no_act");
			} 			
		}else{
			$(content).hide();
			if($(this).hasClass("onoffswitch_input_parent")){
				$(this).parents(".dbs_content_item").addClass("no_act");
			} 			
		}
	});
	jQuery('.dbs_content_check').each(function(){
		var target = $(this).find(".onoffswitch_input");
		if(!target.attr("checked")){
			$(this).parents(".dbs_content_item").addClass("no_act");
		}else{
			$(this).parents(".dbs_content_item").removeClass("no_act");
		}		
	});
	$(document).on('click','.item_switch_thumb a', function(event) {
	    event.preventDefault();
	    var target = $(this).attr("href");
	    $('html, body').animate({
	        scrollTop: $(target).offset().top
	    }, 150);

		border_target = $(this).attr("data-target");
		border_animation(border_target);
	});
	function border_animation(target) {
		$(target).removeClass("target-ed").addClass("target-ed").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass("target-ed");
		}); 
	}
	$(document).on('click','.item_switch_thumb a', function(event) {
	    event.preventDefault();
	    var target = $(this).attr("href");
	    $('html, body').animate({
	        scrollTop: $(target).offset().top
	    }, 150);

		border_target = $(this).attr("data-target");
		border_animation(border_target);
	});
	$(document).on('click','.dbs_btn', function(e) {
	    event.preventDefault();
	    $(".dashboard_settings").toggleClass("active");
	});
	//CONFIG BEGIN


	jQuery('.scrollbar-inner').scrollbar();
	$(document).on('click','#scrollspy_Nav .nav > li > a', function(event) {
	    event.preventDefault();
	    var target = $(this).attr("href");
	    $('html, body').animate({
	        scrollTop: $(target).offset().top
	    }, 150);
	});




	if(jQuery("#SaleOverviewChart").length != 0){
		Highcharts.chart('SaleOverviewChart', {
		  chart: {
		    type: 'column'
		  },
		  title: {
		    text: ''
		  },
		  xAxis: {
		    categories: ['Quý I', 'Quý II', 'Quý III', 'Quý IV']
		  },
		  yAxis: {
		    min: 0,
		    title: {
		      text: 'Doanh thu(tỷ)'
		    },
		    stackLabels: {
		      enabled: false,
		      style: {
		        fontWeight: 'bold',
		        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		      }
		    }
		  },
		  tooltip: {
		    headerFormat: '<b>{point.x}</b><br/>',
		    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
		  },
		  plotOptions: {
		    column: {
		      stacking: 'normal',
		      dataLabels: {
		        enabled: false,
		        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		      }
		    }
		  },
		  colors: ["#FECE57", "#9FD46A"],
		  series: [{
		    name: 'Hoàn thành',
		    data: [5, 3, 4, 7]
		  }, {
		    name: 'Giá trị hủy',
		    data: [2, 2, 3, 2]
		  }]
		});	
	}
	if(jQuery("#LicenseOverviewChart").length != 0){
		Highcharts.chart('LicenseOverviewChart', {
		    chart: {
		        type: 'line'
		    },
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
		    },
		    yAxis: {
		        title: {
		            text: 'Số lượng'
		        }
		    },
		    plotOptions: {
		        line: {
		            dataLabels: {
		                enabled: true
		            },
		            enableMouseTracking: false
		        }
		    },
		    series: [{
		        name: 'Tất cả',
		        data: [70, 69, 95, 145, 184, 215, 252, 265, 233, 183, 139, 96]
		    }, {
		        name: 'Docpro',
		        data: [39, 42, 57, 85, 119, 152, 170, 166, 142, 103, 66, 48]
		    }, {
		        name: 'Ione SDK',
		        data: [93, 25, 75, 58, 191, 125, 107, 116, 182, 103, 66, 48]
		    }, {
		        name: 'Ione API',
		        data: [34, 45, 55, 89, 112, 150, 176, 162, 143, 106, 68, 98]
		    }]
		});
	}	
	if(jQuery(".giaithuongnv").length != 0){
	  	$('.giaithuongnv').owlCarousel({
	  		items:3,
		    loop:true,
		    margin:10,
		    nav:false,
		    autoplay:true,
		    responsive:{
		        0:{
		            items:2
		        },
		        600:{
		            items:3
		        },
		        1000:{
		            items:3
		        }
		    }
		});
  	}
	if(jQuery("#taskOverviewChart").length != 0){
		Highcharts.chart('taskOverviewChart', {
		  chart: {
		    type: 'line'
		  },
		  title: {
		    text: ' '
		  },
		  xAxis: {
		    categories: ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06']
		  },
		  yAxis: {
		    title: {
		      text: 'Số lượng công việc'
		    }
		  },
		  plotOptions: {
		    line: {
		      dataLabels: {
		        enabled: true
		      },
		      enableMouseTracking: false
		    }
		  },
		  series: [{
		    name: 'Công việc được giao',
		    data: [2, 4, 4, 8, 4, 4, 0]
		  }, {
		    name: 'Cong việc quá hạn',
		    data: [0, 1, 0, 0, 4, 0, 0]
		  }]
		});	  	
	}
	$(".btnMenuMobile").click(function(){
	    $(".nav-side-menu").toggleClass("main");
	});
	$('[data-toggle="tooltip"]').tooltip(); 
	$('input[name="daterange"]').daterangepicker();

});

$(window).scroll(function(){
	// var Headernav = $('.navbar').height();
	// if ($(window).scrollTop() >= Headernav) {
	//     $('.Nav').addClass('fixed-header');
	// }
	// else {
	//     $('.Nav').removeClass('fixed-header');
	// }
});