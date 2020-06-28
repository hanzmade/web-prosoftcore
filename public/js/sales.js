$(document).ready(function(){
	$('.select2').select2();

	var salesPrograms = window.salesPrograms;
	var salesProgramItem = "";

	for (var key in window.salesPrograms) {
		salesProgramItem += '<option value="' + salesPrograms[key].id + '">'+ salesPrograms[key].title +'</option>';
	}

	$("#promo-program-select")
	.append(salesProgramItem)
	.change(function(){

		var paymentType = $('select[name=payment_type]').val();
		var planId = $('select[name=plan_id]').val();
		var periode = $('select[name=periode]').val() ? $('select[name=periode]').val() : 12;
		var deviceId = $('input[name=inventory_model]').val();
		var salesPrograms = window.salesPrograms;
		var programComponents = window.programComponents;
		var planBenefits = window.planBenefits;

		if(paymentType && planId && periode && deviceId)
		{
			calculateRegBenefit(planId, periode);
			calculatePromo(paymentType, planId, periode, deviceId);
			setTimeout(calculateCustPay(), 5000)
		}
	});

	$('select[name=plan_id], select[name=periode]').change(function(){

		var planId = $('select[name=plan_id]').val();
		var periode = $('select[name=periode]').val();

		if(planId && periode)
		{
			calculateRegBenefit(planId, periode);
		}
	});

	$('select[name=inventory_id]').change(function(){
		var inventoryId = $(this).val();

		$.ajax({
			type: "GET",
			url: "/api/inventory/model/" + inventoryId,
			success: function(data){
				$('input[name=device_price]').val(data.price);
				$('input[name=inventory_model]').val(data.id);
				$('#device-price').val(data.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
			}
		});
	});

	$(".change-date").click(function(e){
		e.preventDefault();
		$(".datepicker").removeAttr("disabled");
	});
});

function calculateRegBenefit(planId,periode)
{
	var planBenefits = window.planBenefits;
	var planPrice = window.planData.items[planId].price;
	var currentPlanBenefit = planBenefits[planId][periode];

	if(currentPlanBenefit.type == "%")
	{
		var packageValue = planPrice * periode;
		var totalPlanBenefit = packageValue * (parseInt(currentPlanBenefit.value)/100);
	}

	if(currentPlanBenefit.type == "IDR")
	{
		var totalPlanBenefit = currentPlanBenefit.value;
	}

	$('.plan-benefit-wrapper').show();
	$('#plan-benefit').val('('+ totalPlanBenefit.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + ')');
	$('input[name=plan_benefit]').val(totalPlanBenefit);
}

function calculatePromo(paymentType,planId,periode = 12,deviceId)
{
	var selectedSalesProgram = $("#promo-program-select").val();
	var planPrice = window.planData.items[planId].price;
	var programComponents = window.programComponents;
	var salesPrograms = window.salesPrograms;
	var planBenefits = window.planBenefits;

	console.log(salesPrograms[selectedSalesProgram]);

	// Check all value on array structure
	if(typeof salesPrograms[selectedSalesProgram]["components"][paymentType] !== 'undefined')
	{
		if(typeof salesPrograms[selectedSalesProgram]["components"][paymentType][periode] !== 'undefined')
		{
			if(typeof salesPrograms[selectedSalesProgram]["components"][paymentType][periode][planId] !== 'undefined')
			{
				if(typeof salesPrograms[selectedSalesProgram]["components"][paymentType][periode][planId][deviceId] !== 'undefined')
				{
					var promoComponents = salesPrograms[selectedSalesProgram]["components"][paymentType][periode][planId][deviceId];
				}
				else
				{
					if(salesPrograms[selectedSalesProgram]["components"][paymentType][periode][planId][1])
					{
						var promoComponents = salesPrograms[selectedSalesProgram]["components"][paymentType][periode][planId][1];
					}
					else
					{
						var promoComponents = false;
					}
				}
			}
			else
			{
				var promoComponents = false;
			}
		}
		else
		{
			var promoComponents = false;
		}
	}
	else
	{
		var promoComponents = false;
	}

	console.log(promoComponents)

	if(paymentType && planId && periode && deviceId)
	{
		var currentPlanBenefit = planBenefits[planId][periode];
		var devicePrice = $('input[name=device_price]').val();
		var programData = salesPrograms[selectedSalesProgram];
		var totalSubsidy = 0;

		if(promoComponents)
		{
			if(promoComponents.isat)
			{
				totalSubsidy += parseInt(promoComponents.isat);
			}

			if(promoComponents.ppp)
			{
				totalSubsidy += parseInt(promoComponents.ppp);
			}

			if(promoComponents.principal)
			{
				totalSubsidy += parseInt(promoComponents.principal);
			}

			if(totalSubsidy > 0)
			{
				$('#promo-program').val('('+ totalSubsidy.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +')');
				$('.promo-program-wrapper').show();
				$('input[name=promo_program]').val(totalSubsidy);
				$('input[name=promo_program_id]').val($('#promo-program-select').val());
			}

			if(currentPlanBenefit.type == "%")
			{
				var packageValue = planPrice * periode;
				var totalPlanBenefit = packageValue * (parseInt(currentPlanBenefit.value)/100);
				var cashOut = devicePrice - totalPlanBenefit - totalSubsidy;
			}

			if(currentPlanBenefit.type == "IDR")
			{
				var totalPlanBenefit = currentPlanBenefit.value;
				var cashOut = devicePrice - totalPlanBenefit - totalSubsidy;
			}

			if(promoComponents.free_cashout)
			{
				cashOut = 0;
			}

			$('input[name=cashout]').val(cashOut);
			$('#cashout').val(cashOut.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
		}
		else
		{
			$('input[name=cashout]').val(0);
			$('#cashout').val(0);
			$('#promo-program').val(0);
			$('.promo-program-wrapper').hide();
			$('input[name=promo_program]').val(0);
			$('input[name=promo_program_id]').val("");
		}
	}
}

function calculateCustPay()
{
	var packagePrice = $("input[name=package_price]").val();
	var devicePrice = $("input[name=device_price]").val();
	var planBenefit = $("input[name=plan_benefit]").val();
	var promoProgram = $("input[name=promo_program]").val() ? $("input[name=promo_program]").val() : 0;
	//var totalPayment = (parseInt(packagePrice) + parseInt(devicePrice)) - (parseInt(planBenefit) + parseInt(promoProgram));
	var totalPayment = ((parseInt(packagePrice) * 1.1) + parseInt(devicePrice)) - (parseInt(planBenefit) + parseInt(promoProgram));

	if(packagePrice && devicePrice && planBenefit)
	{
		$("#total-payment").val(totalPayment.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
		$("input[name=total_payment]").val(totalPayment);
	}
}
