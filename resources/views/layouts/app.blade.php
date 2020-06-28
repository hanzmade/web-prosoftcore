<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta content="" name="descriptison">
    <meta content="" name="keywords">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Probolinggo Software Core</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/chat.css">
    <link rel="stylesheet" type="text/css" href="css/w3.css">
    <link rel="stylesheet" type="text/css" href="css/w3-4.css">
    <link rel="stylesheet" type="text/css" href="css/font-googleapis.css">
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <style>
    html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif}
    </style>

    <!-- Favicons -->
    <link href="/img/favicon.png" rel="icon">
    <link href="/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/vendor/icofont/icofont.min.css" rel="stylesheet">
    <link href="/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="/vendor/venobox/venobox.css" rel="stylesheet">
    <link href="/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="/vendor/aos/aos.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="/css/style.css" rel="stylesheet">
    <style>
        .sidebar, h2:hover { cursor: pointer; }
        .panel-body {background:#FFFFFF;}
    </style>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-117545218-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-117545218-1');
    </script>
    <!-- Scripts -->

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
            ]) !!};
        </script>
    </head>
    <body>
    <!--
    <div id="top-notification" style="display: none;padding: 10px;background: #bd0007;">
        <div class="blinking text-center">
            <a href="#" style="color: #fff;">
                Sistem akan OFFLINE dalam : <h3 class="mb-0 pb-0 text-center" id="clock"></h3>
            </a>
        </div>
    </div>
    -->    
        <div id="body-wrapper">
            <div class="row no-gutters">
                <div class="col-md-12">
                    <div id="content">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
        
        <div class="circle-chat fixed">
            <center><i class="fa fa-comment fa-2x enerwise-text-white center"></i></center>
            <div class="center-things-chat-badge"><span class="fa-stack fa-3x has-badge" data-count="5"></span></div>
        </div>
        
        <!-- Modal -->
        <div class="modal fade mymodal" id="modal-1" role="dialog" >
        
            <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="padding:35px 50px;">
                <button type="button" class="close" data-dismiss="modal"> <i class='fa fa-times enerwise-text-white'></i></button>
<!--
                <h4 class="modal-title">A demo of modal with min/max options</h4>
                </div>
-->
                <div class="modal-body"  style="padding:40px 50px;">
                <p><button onclick="window.location.href = 'https://wa.me/6282232693426';" type="button" class="btn btn-success">PRE-ORDER VIA WHATSAPP</button></p>
                </div>
<!--
                <div class="modal-footer"  style="padding:40px 50px;">
                <p>Place the footer options like Ok, Cancel buttons here</p>
                </div>
-->        
            </div>      
            </div>
        </div>  
        @section('scripts')
        <!-- Scripts -->
        <script src="/js/jquery-3.2.1.min.js"></script>
        <script src="/js/popper.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/jquery.select2/select2.min.js"></script>
        <script src="/js/jquery.chosen/chosen.jquery.min.js"></script>
        <script src="/js/jquery.confirm/jquery-confirm.min.js"></script>
        <script src="/js/jquery.countdown/jquery.countdown.min.js"></script>
        <script src="/js/jquery.colorbox-min.js"></script>
        <script src="/js/bootstrap-datepicker.min.js"></script>
        <script src="/js/script.js?1554697990"></script>
        <script src="/js/jquery.dataTables.min.js"></script>
        <script src="/js/dataTables.buttons.min.js"></script>
        <script src="/js/buttons.flash.min.js"></script>
        <script src="/js/jszip.min.js"></script>
        <script src="/js/pdfmake.min.js"></script>
        <script src="/js/vfs_fonts.js"></script>
        <script src="/js/buttons.html5.min.js"></script>
        <script src="/js/buttons.print.min.js"></script>

        <script>
            //Minimize/Maximize
            $(document).ready(function(){ 
                

                var $content, $modal, $apnData, $modalCon; 

                $content = $(".min");   


                //To fire modal
                $(".mdlFire").click(function(e){

                    e.preventDefault();

                    var $id = $(this).attr("data-target"); 

                    $($id).modal({backdrop: false, keyboard: false}); 

                    }); 
            

                $(".modalMinimize").on("click", function(){

                            $modalCon = $(this).closest(".mymodal").attr("id");  

                            $apnData = $(this).closest(".mymodal");

                            $modal = "#" + $modalCon;

                            $(".modal-backdrop").addClass("display-none");   

                            $($modal).toggleClass("min");  

                                if ( $($modal).hasClass("min") ){ 

                                    $(".minmaxCon").append($apnData);  

                                    $(this).find("i").toggleClass( 'fa-minus').toggleClass( 'fa-clone');

                                } 
                                else { 

                                        $(".container").append($apnData); 

                                        $(this).find("i").toggleClass( 'fa-clone').toggleClass( 'fa-minus');

                                        };

                            });

                    $("button[data-dismiss='modal']").click(function(){   

                            $(this).closest(".mymodal").removeClass("min");

                            $(".container").removeClass($apnData);   

                            $(this).next('.modalMinimize').find("i").removeClass('fa fa-clone').addClass( 'fa fa-minus');

                        }); 

            });
            //End Minimize/Maximize
        </script>
        
        <script>
            //Show clock
            function startTime()
            {
                var today=new Date(),
                        curr_hour=today.getHours(),
                        curr_min=today.getMinutes(),
                        curr_sec=today.getSeconds();
                curr_hour=checkTime(curr_hour);
                curr_min=checkTime(curr_min);
                curr_sec=checkTime(curr_sec);
                document.getElementById('clock').innerHTML=curr_hour+":"+curr_min+":"+curr_sec;
            }

            function checkTime(i)
            {
                if (i<10) { i="0" + i; }
                return i;
            }

            setInterval(startTime, 500);

            setInterval(function()
            {
                if(navigator.onLine)
                {
                    $('#online-status').html('<span class="badge badge-success">Online</span>');
                    $('input[type=submit]').attr('disabled', false);
                }
                else
                {
                    $('#online-status').html('<span class="badge badge-danger">Offline</span>');
                    $('input[type=submit]').attr('disabled', true);
                }
            }, 1000);
        </script>
        <script>
            setTimeout(function () {
                $("#top-notification").slideDown();
            }, 1000);

            setInterval(function() {
                $('.blinking').fadeOut(1000);
                $('.blinking').fadeIn(1000);
            }, 1000);

        </script>
        <script>
            $(document).ready(function(){
                $('.selectpicker').select2();

                $('.multi').select2({
                    placeholder: "- Select -"
                });
            });
        </script>
        <script>
            $('#inbox').tooltip('show')
        </script>
        @show
    </body>
    </html>
