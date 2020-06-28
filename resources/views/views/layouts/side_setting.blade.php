<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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

    <!-- Styles -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/font-awesome.min.css">
    <link href="/css/bootstrap-datepicker.min.css" rel="stylesheet">
    <link href="/js/jquery.chosen/chosen.min.css" rel="stylesheet">
    <link href="/css/bootstrap-chosen.css" rel="stylesheet">
    <link href="/js/jquery.select2/select2.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/js/jquery.confirm/jquery-confirm.min.css">
    <link href="/css/colorbox.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" href="/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="/css/buttons.dataTables.min.css">
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
    <div id="app" class="container-fluid">
            <div>
                <div id="header" class="row">
                    <div id="content-loader" style="display: none;">
                        <img src="/img/content-loader.gif" alt=""> <span class="random-load"></span>...
                    </div>
                    <div class="col-md-6">
                        <div id="logo" class="pull-left">
                            <table id="dynamic_field" class="table table-bordered-table-sm">
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href="/"><img src="img/Logo Baru.png" class="img-fluid"/></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6 class="ml-3 text-right mt-3"><i class="fa fa-clock-o"></i>
                            <script>
                                var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
                                var date = new Date();
                                var day = date.getDate();
                                var month = date.getMonth();
                                var thisDay = date.getDay(),
                                        thisDay = myDays[thisDay];
                                var yy = date.getYear();
                                var year = (yy < 1000) ? yy + 1900 : yy;
                                document.write(thisDay + ", " + day + " " + months[month] + " " + year);
                            </script>
                            <span id="clock"></span>
                        </h6>

                        <ul class="m-0 p-0 dropdown user-menu pull-right pb-3">
                                
                                <li class="pl-0 ml-0"><span id="online-status"></span>
                                    @if(Auth::user())   
                                        <span class="enerwise-tag enerwise-blue enerwise-round enerwise-font-size-12">{{ Auth::user()->fullname ? Auth::user()->fullname : Auth::user()->name }}</span>
                                        <!--
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item"><a href="/register"><font size="2px">Register</font></a>
                                            <a class="dropdown-item"><a href="/profile/change_password"><font size="2px">Change Password</font></a>
                                            <a class="dropdown-item">
                                                <a href="{{ url('/logout') }}"
                                                onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();"> <font size="2px">Logout</font> </a>
                                                <form id="logout-form"
                                                    action="{{ url('/logout') }}"
                                                    method="POST"
                                                    style="display: none;">
                                                    {{ csrf_field() }}
                                                </form>
                                            </a>
                                        </div>  -->
                                    @else
                                    <span class="enerwise-tag enerwise-blue enerwise-round enerwise-font-size-12">Guest</span>
                                    @endif
                                </li>
                            
                        </ul>
                    </div>
                </div>
            </div>

            

        <div id="body-wrapper">
            <div class="row no-gutters">
                <div class="col-md-2">
                    @section('sidebar')
                    <!-- Page Container -->
                    <div class="enerwise-content enerwise-margin-top" style="max-width:1400px;">

                    <!-- The Grid -->
                        <div class="enerwise-row-padding">
                            <!-- Left Column -->
                                <div class="enerwise-third">
                                

                                    <div class="enerwise-blue enerwise-text-white enerwise-card-4">
                                        <div class="enerwise-container">
                                            <i class="enerwise-margin-right enerwise-large enerwise-text-white"><center><span class="enerwise-tag enerwise-amber enerwise-round"><strong>MENU</strong></span></center></i>
                                            <a href="/" class="link-left"><i class="fa fa-home fa-fw enerwise-margin-right enerwise-large enerwise-text-white"></i>Home</a></p>
                                            <p><a href="/documentation" class="link-left"><i class="fa fa-book fa-fw enerwise-margin-right enerwise-large enerwise-text-white"></i>Documentation</a></p>
                                            <p><a href="/white_paper" class="link-left"><i class="fa fa-file fa-fw enerwise-margin-right enerwise-large enerwise-text-white"></i>White Paper</a></p>

                                            <hr>
                                            
                                            <p><a href="/support" class="link-left"><i class="fa fa-support fa-fw enerwise-margin-right enerwise-large enerwise-text-white"></i>Support</a></p>

                                            </br>
                                        </div>
                                    </div><br>
                
                                </div>
                                <div class="enerwise-third">
                                
                                    <div class="enerwise-blue enerwise-text-white enerwise-card-4">
                                        <div class="enerwise-container">
                                            <i class="enerwise-margin-right enerwise-large enerwise-text-white"><center><span class="enerwise-tag enerwise-amber enerwise-round"><strong>PRE-ORDER</strong></span></center></i>
                                            <a class="link-left"><i class="fa fa-user fa-fw enerwise-margin-right enerwise-large enerwise-text-white"></i>Admin  | </a>
                                            <button type="button" class="btn btn-success btn-sm mdlFire fa fa-whatsapp fa-3x enerwise-large enerwise-text-white"  data-target="#modal-1" ></button>
                                            <hr>
                                            
                                            <p><i class="fa fa-phone fa-fw enerwise-margin-right enerwise-large enerwise-text-white"></i><font style="color:white">(021) 222-35961</font></p>

                                            </br>
                                        </div>
                                    </div><br>
                                </div>
                                
                        </div>
                        
                    </div>
                </div>
                <div class="col-md-10"> 
                    <div id="content">
                        @yield('content')
                        @include('layouts.footer')
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
