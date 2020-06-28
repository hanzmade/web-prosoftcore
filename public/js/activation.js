$(function(){

	window.planData = [];

	$(".lightbox").colorbox();

	$('#signature-modal').on('shown.bs.modal', function () {

		$('.js-signature').jqSignature();
	});

	$('.show-search').click(function(){
		$("#search-activation-history").slideToggle();
		$(this).hide();
	});

	$('#msisdn').change(function(){
		var msisdn = $(this).val();

		$.get('/api/check-msisdn/' + msisdn)
		.done(function(data){

			if(data.length != 0)
			{
				alert('MSISDN sudah terdaftar, silahkan coba lagi.');
				$("#msisdn").val("").focus();
			}
		});
	});

	$('select[name="plan_type_id"]').change(function(e){

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
		$('#package-price').val("");

		if(planName == "Super Plan")
		{
			$('.device-data').fadeIn();
			planItem.fadeIn();
			$('input[name="periode"]').val("12");
		}
		else if(planName == "Freedom Postpaid Plus")
		{
			$('.device-data').fadeIn();
			planItem.fadeIn();
			$('input[name="periode"]').val("12");
		}
		else
		{
			$('.device-data').fadeOut();
			$('input[name="periode"]').val("12");
		}

		$('select#plan-id').change(function(){
			calculateTrans();

			if($(this).val() == "57")
			{
				$("select[name=periode]").prepend('<option value="6" selected>6 months</option>')
				calculateTrans();
			}
		});
	});

	$('select[name="periode"]').change(function(e){
		var planId = $('#plan-id').val();

		if(isNaN(parseInt(planId)))
		{
			alert("Silahkan pilih paket terlebih dahulu.");
			return;
		}

		var planPeriode = $(this).val();
		$('#total').val(0);
		$('input[name="periode"]').val(planPeriode);

		calculateTrans();	
	});

	$('select[name="transaction_type"]').change(function(e){
		e.preventDefault();	

		var transType = $(this).val();

		if(transType == "Migration")
		{
			$('#migration-letter').prop('required', true);
			$('#prepaid-screenshot').prop('required', true);
			$('#iccid').parents('.form-group').hide();
			$('#iccid').prop('required', false);
			$('#iccid').next().hide();
			$('.migration-trans').fadeIn();
		}
		else
		{
			$('#migration-letter').prop('required', false);
			$('#prepaid-screenshot').prop('required', false);
			$('#iccid').parents('.form-group').show();
			$('#iccid').prop('required', true);
			$('#iccid').next().show();
			$('.migration-trans').hide();
		}			
	});	

	$('select[name="payment_method"]').change(function(e){

		var paymentMethod = $(this).val();

		if(paymentMethod == "Debit Card" || paymentMethod == "Credit Card")
		{
			$('#payment-card').prop('required', true);
			$('.payment-edc').fadeIn();
		}
		else
		{
			$('#payment-card').prop('required', false);
			$('.payment-edc').hide();
		}

		if(paymentMethod == "Credit Card")
		{
			$('#cc_name').prop('required', true);
			$('#cc_number').prop('required', true);
			$('#cc_bank').prop('required', true);
			$('#cc_type').prop('required', true);
			$('#cc_expired').prop('required', true);
			$('.cc-data').fadeIn();
		}
		else
		{
			$('#cc_name').prop('required', false);
			$('#cc_number').prop('required', false);
			$('#cc_bank').prop('required', false);
			$('#cc_type').prop('required', false);
			$('#cc_expired').prop('required', false);
			$('.cc-data').fadeOut();
		}
	});

	$('button.cc-owner').click(function(e){
		e.preventDefault();

		var ccOwner = $(this).val();

		$(this)
			.siblings()
			.removeClass('btn-primary')
			.removeClass('active')
			.addClass('btn-default');
		$(this)
			.removeClass('btn-default')
			.addClass('btn-primary')
			.addClass('active');		

		if(ccOwner == "No")
		{
			$(".cc-owner-wrapper").show();
		}
		else
		{
			$(".cc-owner-wrapper").hide();
			$("input[name=cc_owner_id]").val("");
			$("#display-cc-owner-id").attr('src', "");
			$("#cc-owner-id").val("");
		}
	});

	/*
    $('input#payment_slip').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	console.log(data)
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        }
    });
    */	
   
    $("input[type=file]").change(function(){

        var targetDiv = $(this).attr('id');
        readURL(this, '#display-' + targetDiv);
        $('#display-' + targetDiv).show();
    });

    $("#activation-monitor .info-box").click(function(){
    	$(this).next().slideToggle();
    });

	$("form#activation-form").submit(function(){
		if($("#plan-id").val() == null)
		{
			alert("Belum pilih jenis paket pascabayar :\nFreedom Postpaid atau Super Plan?")
			return false;
		}

		if($("#plan-id").val() == "")
		{
			alert("Anda belum pilih paket.");
			return false;
		}

		if($("select[name=transaction_type]").val() == "")
		{
			alert("Belum pilih tipe transaksi: New atau Migration?")
			return false;
		}

		if($('select[name="payment_method"]').val() == "")
		{
			alert("Silahkan pilih tipe pembayaran");
			return false;
		}
	});

	$('#show-attachment').click(function(e){
		e.preventDefault();

		var attachmentButton = $('#show-attachment');

		console.log(attachmentButton.text());

		$('#attachments').slideToggle();

		if(attachmentButton.text() == "Show Attachments")
		{
			attachmentButton.text('Hide Attachments');
		}
		else
		{
			attachmentButton.text('Show Attachments');
		}
	});
});

/**
 * Get list of Activation and display it on Partner Store side
 * 
 * @return {[type]} [description]
 */
var monitorActivation = function()
{
	$.ajax({
		type: "GET",
		url: "/api/activation/store_pool",
		success: function(data){
			var rowData = "";
			var statusClass = "";


			if(data.length > 0)
			{
				for (var key in data) 
				{
					if(data[key].current_status == 1)
					{
						data[key].proceed_by = "-";
					}

				    rowData += '<div class="col-md-4 col-sm-6 col-xs-12">';
				    rowData += '<a href="/activation/monitor/'+ data[key].activation_code +'">';
				    rowData += '<div class="info-box bg-'+ data[key].status.css_class +'">';

				    if(data[key].is_rcm_replied == true)
				    {
						rowData += '<span class="store-status-rcm-replied">!</span>';
				    }

				    rowData += '<div class="row"><div class="col-5">MSISDN</div>';
				    rowData += '<div class="col-7"><strong>'+ data[key].msisdn +'</strong></div></div>';
				    rowData += '<div class="row"><div class="col-5">Pelanggan</div>';
				    rowData += '<div class="col-7"><strong>'+ data[key].subscriber +'</strong></div></div>';
				    rowData += '<div class="row"><div class="col-5">Agent 202</div>';
				    rowData += '<div class="col-7"><strong>'+ data[key].proceed_by +'</strong></div></div>';
				    rowData += '<div class="row"><div class="col-5">Status</div>';
				    rowData += '<div class="col-7"><a href="#" class="btn btn-xs btn-'+ data[key].status.css_class +'">' + data[key].status.name +'</a></div></div>';
				    rowData += '</div>';
				    rowData += '</a>';
				    rowData += '</div>';
				}

				$("#activation-monitor").html(rowData);
			}
			else
			{
				$("#activation-monitor").html('<div class="col-md-12">No Activation for today.</div>');
			}

		}
	});
}

/**
 * Activation Status message updater in Partner Store side
 * Pull latest status message on an activation Partner Store page
 * 
 * @param  {String} activationCode Activation Code
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
					statusItem += '<div class="status-attachment"><img src="'+ data[key].attachment +'" alt="" class="img-responsive"></div>';
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
 * Image resizer and display on image input type field
 * 
 * @param  {[type]} f   [description]
 * @param  {[type]} div [description]
 * @param  {Number} sz  [description]
 * @return {[type]}     [description]
 */
function handleFiles(f, div, sz = 600)
{
    for(var i =0;i<f.length;i++)
    {
      var reader = new FileReader();

      reader.onload = (function() {
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
	var periode = $('select[name="periode"]').val() ? $('select[name="periode"]').val() : 12;

	window.planData = planItems[planTypeId];

	if(planTypeId == "fpp" | planTypeId == "fp")
	{
		window.cartInfo.planPrice = parseInt(periode * window.planData.items[planId].price * 1.1);
	}
	else
	{
		window.cartInfo.planPrice = parseInt(periode * window.planData.items[planId].price);
	}


	setTimeout(function()
	{
		window.cartInfo.totalPurchase = window.cartInfo.planPrice;

		$("#package-price").val(window.cartInfo.totalPurchase.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
		$("input[name=package_price]").val(window.cartInfo.totalPurchase);

	}, 100);
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

function clearSignature() {
	$('.js-signature').jqSignature('clearCanvas');
}

function saveSignature() {
	var dataUrl = $('.js-signature').jqSignature('getDataURL');
	var img = $('<img>').attr('src', dataUrl);
	$('#disclaimer input[name="signature"]').val(dataUrl);

	$('#disclaimer .signature-wrapper').empty();
	$('#disclaimer .signature-wrapper').append('<span>TTD: </span><br/>')
	$('#disclaimer .signature-wrapper').append(img);
	$('#disclaimer .signing').hide();
	$('#disclaimer .re-sign').show();
	$('.js-signature').hide();

	$("#saveBtn").hide();
	$("#clearBtn").hide();
	$("#resetBtn").show();
}

function resetSignature()
{
	$('.js-signature').show();
	$('.js-signature').jqSignature('clearCanvas');
	$('#disclaimer .signature-wrapper').empty();
	$('#disclaimer input[name="signature"]').val("");

	$("#clearBtn").show();
	$("#saveBtn").show();
	$("#resetBtn").hide();
	$(".signing").show();
}