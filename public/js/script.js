$(function(){

	window.productData = "";

	$('#sidebar .menu-handler').click(function(){
		$(this).parents('#sidebar').find('ul,h2').slideToggle();
	});

	$('#inventory_id').on('select2:select', function (e) {
		var inventoryId = $(this).val();
		var requestInvData = $.ajax({
			url: "/api/inventory/model/" + inventoryId,
			error: function(error){
				console.log(error);
			}
		});

		requestInvData.done(function(data){

			window.productData = data;
			var invPrice = data.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

			if(window.cartInfo)
			{
				if(window.productData.price > window.cartInfo.planPrice)
				{
					var cashOut = window.productData.price - window.cartInfo.planPrice;

					$("#cashout").val(cashOut.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
				}
				else
				{
					$("#cashout").val(0);
				}
			}

			$("#device-price").val(invPrice);

		});
	});

	$(".product-line button").click(function(e){
		e.preventDefault();

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');

		var planTypeId = $(this).val();
		$('#total').val(0);
		var planItems = window.planItems;
		var planName = planItems[planTypeId].name;
		var planList = '<option value="">- Pilih Paket -</option>';
		var planItem = $('.plan-item');
		window.planTypeId = planTypeId;

		planItem.hide();

		$('select#plan-id').unbind('change');

		for (var key in planItems[planTypeId].items) {
			planList += '<option value="' + planItems[planTypeId].items[key].id + '">'+ planItems[planTypeId].items[key].name +'</option>';
		}

		$('.plan-item label').html(planName);
		$('.plan-item select').html(planList);
		planItem.fadeIn();
		$('.periode').fadeIn();
		$('#plan-price').val("");

		if(planName == "Super Plan")
		{
			$('.device-data').fadeIn();
			planItem.fadeIn();
			$('input[name="periode"]').val("12");
			$('button[name=periode]').removeClass('active')
		}
		else if(planName == "Freedom Postpaid Plus")
		{
			planItem.fadeIn();
			$('input[name="periode"]').val("12");
			$('button[name=periode]').removeClass('active')
		}
		else
		{
			$('input[name="periode"]').val("12");
		}

		$('select#plan-id').change(function(){
			$('input[name="periode"]').val("12");
			$('button[name=periode]').eq(0).addClass('active');
			calculateTrans();
		});
	});

	$("button.periode").click(function(e){
		e.preventDefault();
		var planId = $('#plan-id').val();
		var planPeriode = $(this).val();
		$('#total').val(0);
		$('input[name="periode"]').val(planPeriode);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');

		calculateTrans();	
	});

	$('button.trans-type').click(function(e){
		e.preventDefault();	

		var transType = $(this).val();
		$('input[name="transaction_type"]').val(transType);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');
	});	

	$('button.gender').click(function(e){
		e.preventDefault();	

		var gender = $(this).val();
		$('input[name="gender"]').val(gender);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');
	});	

	$('button.device-color').click(function(e){
		e.preventDefault();	

		var deviceColor = $(this).val();
		$('input[name="device_color"]').val(deviceColor);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');
	});

	$('button.payment-type').click(function(e){
		e.preventDefault();

		var paymentType = $(this).val();
		$('input[name="payment_type"]').val(paymentType);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');
	});

	$('button.payment-method').click(function(e){
		e.preventDefault();

		var paymentMethod = $(this).val();
		$('input[name="payment_method"]').val(paymentMethod);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');

		if(paymentMethod == "Credit Card")
		{
			$('.cc-field').show();
			$('.payment-edc').hide();
		}
		else if (paymentMethod == "Debit Card")
		{
			$('.payment-edc').show();
			$('.cc-field').hide();
		}
		else
		{
			$('.payment-edc').hide();
			$('.cc-field').hide();
		}
	});

	$('button.sales-type').click(function(e){
		e.preventDefault();

		var salesType = $(this).val();
		$('input[name="sales-type"]').val(salesType);

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');
	});

	$('.datepicker').datepicker({
		autoclose: true,
        format: 'yyyy-mm-dd'
	});

	$('#product-type a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	})

	$('.select-product').change(function(){
		var productTypeId = $(this).val();
	});

	/* Show Sales/Transaction detail */
	$('#transaction-list td,#transaction-list a.show-trans-detail').click(function(e){
		e.preventDefault();
		//$('.transaction-detail').hide();
		$('.trans-visited').removeClass('trans-visited').css('background-color','#f9f9f9');
		$(this).parents('tr').css('background','none').addClass('trans-visited').next().slideToggle();
	});

	$(".lightbox").colorbox({
		onComplete: function(){
			$("#cboxOverlay").append('<span onclick="rotateImage()" class="badge badge-secondary" style="position: absolute;right:20px;bottom:20px;cursor: pointer"><h3 class="p-1"><i class="fa fa-repeat"></i></h3></span>');
		},
		overlayClose: false
	});

    $('.chosen-select').chosen({
		width: "100%"
	});

	$('.select2').select2({
		width: '100%'
	});

	/* Submit Activation Status Update */
	$('#activation-status').submit(function(e){
		e.preventDefault();

		var accountNumber = $("input[name=account_number]").val();
		var statusNumber = $("select[name=status_id]").val();

		if(statusNumber == 3 && accountNumber == "")
		{
			$.alert({
				title: '<span class="text-warning"><i class="fa fa-exclamation-triangle"></i></span> Ups, something wrong!',
				content: 'Please fill Siebel Account Number field.',
				theme: 'light',
				animation: 'rotate',
				closeAnimation: 'scale',
				animationBounce: 1.5
			});

			$("input[name=account_number]").addClass('is-invalid');
			$("#content-loader").hide();

			return false;
		}

		$.ajaxSetup({
	      headers:{
	        'X-XSRF-Token': $('meta[name="csrf-token"]').attr('content')
	      }
	    });

		$.ajax({
			type:"POST",
			url:"/api/activation/message",
			data:$(this).serialize(),

			success:function(data){
				$("ul#activation-status-item").empty();
				document.getElementById("activation-status").reset();

				$(".activation-status-label").html('<span class="label label-'+ data[data.length - 1].status.css_class +'">'+ data[data.length - 1].status.name +'</span>');

				for (var key in data) {
				    var message = (data[key].message != null) ? data[key].message : "-";
				    var type = data[key].status.name;
				    var created = data[key].created_at;

				    $("ul#activation-status-item")
				    	.append('<li><span class="date">' + created +'</span><br/><span class="type">'+ type +'</span> : '+ message +'</li>');
				}

				$("#display-attachment").attr('src', '').css('display', 'none');
				$("#value-attachment").val("");
				$("#content-loader").hide();
				$("input[name=account_number]").val(accountNumber);
				$("input[name=account_number]").removeClass('is-invalid');
			},
			error:function(data)
			{
				console.log(data)
			}	
		});	
	});

    $("input[type=file]").change(function(){

        var targetDiv = $(this).attr('id');
        readURL(this, '#display-' + targetDiv);
        $('#display-' + targetDiv).show();
    });

	/*
		INVENTORY MODULE
	 */
	$('#inventory-transfer-item .inventory-select.inventory-category-1').css('display','block');
	$('#inventory-transfer-item .inventory-value.inventory-value-1').css('display','block');
	$('.chosen-select').chosen('destroy');
	$('.chosen-select').chosen();

	$('#inventory-transfer-item .category-select').change(function(){
		var categoryId = $(this).val();

		$('.inventory-select').hide();
		$('.inventory-value').hide();

		$('.inventory-category-' + categoryId).show();
		$('.inventory-value-' + categoryId).show();

		$('.chosen-select').chosen('destroy');
		$('.chosen-select').chosen();

	});

	$('.add-item-inventory').click(function(e){
		e.preventDefault();

		var categoryId = $(this).parents('.row').find('select[name="raw-category-id"]').val();

		if($('input[name=raw-qty]:visible').length > 0)
		{
			var modelId = $(this).parents('.row').find('.chosen-container:visible').prev('select[name=raw-model]').val();
			var modelName = $(this).parents('.row').find('.chosen-container:visible').prev('select[name=raw-model]').find('option:selected').text();
			var valueId = $(this).parents('.row').find('input[name="raw-qty"]:visible').val();
			var qty = " qty";

			if(valueId == "")
			{
				$.alert({
					title: 'Form Error',
					icon: 'fa fa-warning',
					content: 'Please fill Qty input field.',
					closeIcon: true,
					theme: 'material',
					animation: 'scale',
					closeAnimation: 'scale',
					animateFromElement: false
				});

				return false;
			}

			if(modelId === null)
			{
				$.alert({
					title: 'Form Error',
					icon: 'fa fa-warning',
					content: 'Choose a model first.',
					closeIcon: true,
					theme: 'material',
					animation: 'scale',
					closeAnimation: 'scale',
					animateFromElement: false
				});

				return false;
			}

			$(this).parents('.row').find('input[name="raw-qty"]:visible').val("");
			$(this).parents('.row').find('input[name="raw-qty"]:visible').removeClass('is-invalid');
		}
		else
		{
			var modelId = $(this).parents('.row').find('.chosen-container:visible').prev('select[name=raw-model]').val();
			var modelName = $(this).parents('.row').find('.chosen-container:visible').prev('select[name=raw-model]').find('option:selected').text();
			var valueId = $(this).parents('.row').find('input[name="raw-unique-id"]:visible').val();
			var qty = "";

			if(valueId == "")
			{
				$.alert({
					title: 'Form Error',
					icon: 'fa fa-warning',
					content: 'Please enter IMEI or ICCID number',
					closeIcon: true,
					theme: 'material',
					animation: 'scale',
					closeAnimation: 'scale',
					animateFromElement: false
				});

				return false;
			}

			if(modelId === null)
			{
				$.alert({
					title: 'Form Error',
					icon: 'fa fa-warning',
					content: 'Choose a model first.',
					closeIcon: true,
					theme: 'material',
					animation: 'scale',
					closeAnimation: 'scale',
					animateFromElement: false
				});

				return false;
			}

			$(this).parents('.row').find('input[name="raw-unique-id"]:visible').val("");
			$(this).parents('.row').find('input[name="raw-unique-id"]:visible').removeClass('is-invalid');
		}

		var itemRow = '<tr>';
			itemRow += '<td>'+ modelName +'</td>';
			itemRow += '<td>'+ valueId +' '+ qty +'</td>';
			itemRow += '<td><a href="#" class="text-danger remove-item-inventory"><i class="fa fa-window-close"></i></a>';
			itemRow += '<input type="hidden" name="inventory_item['+ inventoryCounter +'][category_id]" value="'+ categoryId +'"/>';
			itemRow += '<input type="hidden" name="inventory_item['+ inventoryCounter +'][model_id]" value="'+ modelId +'"/>';
			itemRow += '<input type="hidden" name="inventory_item['+ inventoryCounter +'][value]" value="'+ valueId +'"/>';
			itemRow += '</td>';
			itemRow += '</tr>'

		inventoryCounter++;

		$('#inventory-transfer-item table tbody tr.empty-row').remove();
		$('#inventory-transfer-item table tbody').append(itemRow);

		$('a.remove-item-inventory').unbind('click');
		$('a.remove-item-inventory').on('click', function(e){
			e.preventDefault();

			$(this).parents('tr').remove();
		});
	});

	$('a.remove-item-inventory').on('click', function(e){
		e.preventDefault();

		$(this).parents('tr').remove();
	});

	/* PRE-ORDER */
	var deviceCount = window.deviceCount;
	$('.add-preorder-device').click(function(e){
		e.preventDefault();

		var rowData = '<div class="row preorder-device">';
			rowData += '<div class="col-md-12 form-inline">';
			rowData += '<input type="text" name="devices['+ deviceCount +'][model]" class="form-control col-md-8" placeholder="Device Model" required="required" />';
			rowData += '<input type="number" name="devices['+ deviceCount +'][quota]" class="form-control col-md-3" placeholder="Quota" required="required" />';
			rowData += '<div class="col-md-1">';
			rowData += '<a href="#" class="delete-preorder-device text-danger col-md-8" d-block><i class="fa fa-minus-circle"></i></a>';
			rowData += '</div></div></div>'

		$('#preorder-device-list').append(rowData);

		$('a.delete-preorder-device').unbind('click');
		$('a.delete-preorder-device').click(function(e){
			e.preventDefault();

			$(this).parents('.col-md-12').remove();
		});

		deviceCount++;
	});

	$('a.delete-preorder-device').click(function(e){
		e.preventDefault();

		$(this).parents('.col-md-12').remove();
	});

	var preorderPlanCount = 1;

	$('.add-preorder-plan').click(function(e){
		e.preventDefault();

		var planID = $('select[name=plan_id]').val();
		var planName = $('select[name=plan_id] option:selected').text();
		var planPeriode = $('select[name=plan_periode]').val();

		var rowData = '<tr><td>'+ planName +'</td><td>'+ planPeriode +' month</td>';
			rowData += '<td><input type="hidden" name="plans['+ preorderPlanCount +'][plan_id]" value="'+ planID +'"/>';
			rowData += '<input type="hidden" name="plans['+ preorderPlanCount +'][periode]" value="'+ planPeriode +'" />';
			rowData += '<a href="#" class="delete-preorder-plan text-danger"><i class="fa fa-minus-circle"></i></a></td></tr>';

		$('table#preorder-plan-table tbody').append(rowData);

		$('a.delete-preorder-plan').unbind('click');
		$('a.delete-preorder-plan').click(function(e){
			e.preventDefault();

			$(this).parents('tr').remove();
			console.log($(this).parents('tr'));
		});

		preorderPlanCount++;
	});

	var preorderBankPromoCount = window.promoCount;

	$('.add-preorder-bank-promo').click(function(e){
		e.preventDefault();

		var bankID = $('select[name=bank_id]').val();
		var bankName = $('select[name=bank_id] option:selected').text();
		var bankValue = $('input[name=bank_value]').val();

		var rowData = '<tr><td>'+ bankName +'</td>';
			rowData += '<td><input type="text" name="bank_promos['+ preorderBankPromoCount +'][value]" value="'+ bankValue +'" class="form-control" /></td>';
			rowData += '<td><input type="hidden" name="bank_promos['+ preorderBankPromoCount +'][bank_id]" value="'+ bankID +'"/>';
			rowData += '<a href="#" class="delete-preorder-bank-promo text-danger d-block mt-2"><i class="fa fa-minus-circle"></i></a></td></tr>';

		$('table#preorder-bank-promo-table tbody').append(rowData);

		$('a.delete-preorder-bank-promo').unbind('click');
		$('a.delete-preorder-bank-promo').click(function(e){
			e.preventDefault();

			$(this).parents('tr').remove();
		});

		preorderBankPromoCount++;
	});

	$('a.delete-preorder-bank-promo').click(function(e){
		e.preventDefault();

		$(this).parents('tr').remove();
		console.log($(this).parents('tr'));
	});

});

/**
 * Status Info block on top of Activation Pool page
 * 
 * @return {[type]} [description]
 */
var getActivationStatusInfo = function()
{
	$.ajax({
		type: "GET",
		url: "/api/activation/status-info",
		success: function(data){
			for (var key in data) 
			{
				$("#queueing-count").html(data["queueing"]);
				$("#processing-count").html(data["processing"]);
				$("#pendingdoc-count").html(data["pending_document"]);
				$("#pendingsys-count").html(data["pending_system"]);
				$("#pendingcard-count").html(data["pending_card"]);
				$("#active-count").html(data["active"]);
			}
		}
	});
}

/**
 * Activation Pool
 * 
 * @return {[type]} [description]
 */
var getActivationPool = function()
{
	$.ajax({
		type:"GET",
		url:"/api/activation/pool",
		success: function(data)
		{
			var rowData = "";
			var statusClass = "";

			for (var key in data)
			{

			    rowData += '<tr>';
			    rowData += '<td><strong>' + data[key].sla +'</strong></td>';
			    rowData += '<td>' + data[key].msisdn +'</td>';


			    if(data[key].is_replied || data[key].is_rcm_replied)
			    {
			    	if(data[key].is_replied)
			    	{
			    		var isReplied = '<span class="status-replied"></span>';
						var replyMessage = ' data-toggle="tooltip" title="'+ data[key].reply_message +'"';
					}

			    	if(data[key].is_rcm_replied)
			    	{
			    		var isReplied = '<span class="status-rcm-replied">!</span>';
						var replyMessage = ' data-toggle="tooltip" title="'+ data[key].reply_message +'"';
			    	}
			    }
			    else
			    {
			    	var isReplied = '';
					var replyMessage = '';
			    }

			    rowData += '<td><a href="/activation/'+ data[key].activation_code +'" class="btn btn-sm btn-'+ data[key].status.css_class +' position-relative" '+ replyMessage +'>' + data[key].status.name +' '+ isReplied +'</a></td>';
			    rowData += '<td>' + data[key].subscriber.fullname + '</td>';
			    rowData += '<td>' + data[key].store.siebel_name +'</td>';
			    rowData += '<td>' + data[key].plan.name +'</td>';
			    rowData += '<td>' + data[key].agent_name +'</td>';

			    if(data[key].user !== null)
			    {
					rowData += '<td>' + data[key].user.fullname +'</td>';
			    }
			    else
			    {
					rowData += '<td>-</td>';
			    }
			    rowData += '</tr>';
			}

			$("#activation-pool tbody").html(rowData);
		}
	});

}

/**
 * Activation Queues
 * 
 * @return {[type]} [description]
 */
var getActivationQueues = function()
{
	$.ajax({
		type:"GET",
		url:"/api/activation/queues",
		success: function(data)
		{
			var rowData = "";
			var statusClass = "";

			for (var key in data.queues)
			{
			    rowData += '<tr>';
			    rowData += '<td>' + data.queues[key].created_at +'</td>';
			    rowData += '<td>' + data.queues[key].msisdn +'</td>';
			    rowData += '<td>' + data.queues[key].subscriber.fullname + '</td>';
			    rowData += '<td>' + data.queues[key].store.siebel_name +'</td>';
			    rowData += '<td>' + data.queues[key].plan.name +'</td>';


			    if(data.queues[key].is_replied || data.queues[key].is_rcm_replied)
			    {
			    	if(data.queues[key].is_replied)
			    	{
			    		var isReplied = '<span class="status-replied"></span>';
			    	}

			    	if(data.queues[key].is_rcm_replied)
			    	{
			    		var isReplied = '<span class="status-rcm-replied">!</span>';
			    	}
			    }
			    else
			    {
			    	var isReplied = '';
			    }

			    rowData += '<td><strong>' + data.queues[key].sla +'</strong></td>';
			    rowData += '<td><a href="/activation/'+ data.queues[key].activation_code +'" class="btn btn-sm btn-'+ data.queues[key].status.css_class +'" style="position: relative;">' + data.queues[key].status.name +' '+ isReplied +'</a></td>';
			    rowData += '</tr>';
			}

			$("#activation-queues tbody").html(rowData);
			$("#queue-counter div").html(data.total);

		}
	});
}

/**
 * Activation Status monitor on Partner Store side
 * @param  {[type]} activationCode [description]
 * @return {[type]}                [description]
 */
var monitorStatusActivation = function(activationCode)
{
	$.ajax({
		type:"GET",
		url:"/api/activation/message/" + activationCode,

		success:function(data){
			$("ul#activation-status-item").empty();
			$(".lightbox").unbind('colorbox');

			for (var key in data) {
				var message = (data[key].message != null) ? data[key].message : "-";
				var type = data[key].status.name;
				var created = data[key].created_at;
				var statusItem = "";

				statusItem += '<li>';
				statusItem += '<span class="date">' + created +'</span><br/>';
				statusItem += '<span class="type">'+ type +'</span> : '+ message;

				if(data[key].attachment)
				{
					statusItem += '<a href="'+ data[key].attachment +'" class="lightbox">';
					statusItem += '<div class="status-attachment"><img src="'+ data[key].attachment +'" alt="" class="img-fluid"></div>';
					statusItem += '</a>';
				}

				statusItem += '</li>';

				$("ul#activation-status-item").append(statusItem);
			}

			$(".lightbox").colorbox();
		},
		error:function(data)
		{
		}
	});
}

/**
 * Get Activity Log in stream mode
 * 
 * @return {[type]} [description]
 */
var getActivityStream = function()
{
	$.ajax({
		type:"GET",
		url:"/api/activity/stream",
		success:function(data)
		{
			var rowData = "";

			for (var key in data) 
			{
				if(data[key].data !== null )
				{
					var info = data[key].data;
				}
				else
				{
					var info = "";
				}

			    rowData += '<tr>';
			    rowData += '<td>' + data[key].time +'</td>';
			    rowData += '<td>' + data[key].fullname +'</td>';
			    rowData += '<td>' + data[key].log +'<br/><small>'+ info +'</small></td>';
			    rowData += '<td>' + data[key].device +'</td>';
			    rowData += '<td>' + data[key].ip_address +'</td>';
			    rowData += '</tr>';
			}

			$("#system-monitor tbody").html(rowData);
		}
	});
}

/**
 * Get Activity Log in stream mode
 *
 * @return {[type]} [description]
 */
var getActivationHeartbeat = function()
{
	$.ajax({
		type:"GET",
		url:"/api/activation/heartbeat",
		success:function(data)
		{
			var rowData = "";

			rowData +=  '<span class="text-muted">'+ data.time +'</span> : ';
			rowData +=  '<span>'+ data.fullname.replace(/\[Partner Store\]/i, ''); +'</span>';
			rowData +=  ' <span class="text-success ml-1 mr-1"><i class="fa fa-caret-right"></i></span> ';
			rowData +=  ' <span class="text-warning">'+ data.log +'</span> ';

			$("#heartbeat").html(rowData);
		}
	});
}

/**
 * Calculate Plan package price on Create Activation page
 *
 * @return {[type]} [description]
 */
var calculateTrans = function()
{
	window.cartInfo = {
		planPrice: 0,
		totalPurchase: 0,
	};

	var planItems = window.planItems;
	var planId = $("#plan-id").val();
	var planTypeId = window.planTypeId;
	var periode = $('input[name="periode"]').val() ? $('input[name="periode"]').val() : 12;

	window.planData = planItems[planTypeId];
	window.cartInfo.planPrice = parseInt(periode * window.planData.items[planId].price);

	var requestBenefit = $.ajax({
		url: "/api/plan/benefit/" + planId +"/"+ periode,
		error: function(error){
			console.log(error);
		}
	});

	var planBenefit = requestBenefit.done(function(data) {

		if(window.productData)
		{
			var regularBenefit = data.total_benefit;
			var cashOut = window.productData.price - regularBenefit;
		}
	});

	setTimeout(function()
	{
		window.cartInfo.totalPurchase = window.cartInfo.planPrice;

		$("#plan-price").val(window.cartInfo.totalPurchase.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));

		if(window.productData.price > window.cartInfo.planPrice)
		{
			var cashOut = window.productData.price - window.cartInfo.planPrice;

			$("#cashout").val(cashOut.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
		}
		else
		{
			$("#cashout").val(0);
		}

	}, 100);
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

 /**
 * Image resizer and display on image input type field
 * 
 * @param  {[type]} f   [description]
 * @param  {[type]} div [description]
 * @param  {Number} sz  [description]
 * @return {[type]}     [description]
 */
function handleFiles(f, div, sz = 600)
{
    var o=[];
    for(var i =0;i<f.length;i++)
    {
      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
            var image = new Image();
            image.onload=function(){
                maxWidth = sz;
                maxHeight = sz;
                //manage resizing
                if (image.width >= image.height) {
                    var ratio = 1 / (image.width / maxWidth);
                }
                else {
                    var ratio = 1 / (image.height / maxHeight);
                }
                var scale = 0.15;
                var canvas = document.createElement('canvas');
                canvas.width = image.width * ratio;
                canvas.height = image.height * ratio;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0,image.width, image.height, 0,0,canvas.width,canvas.height);
                var dt = canvas.toDataURL('image/jpeg');
                $(div).val(dt);
            }
            image.src=e.target.result;
        };
      })(f[i]);

    reader.readAsDataURL(f[i]);
    }
}

function readURL(input, target) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(target).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function rotateImage(){
	var angle = ($('#colorbox').data('angle') + 90) || 90;
	$('#colorbox').css({'transform': 'rotate(' + angle + 'deg)'});
	$('#colorbox').data('angle', angle);

	$(".lightbox").colorbox.resize();
}
