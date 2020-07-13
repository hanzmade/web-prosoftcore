<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::get('/get_all', 'APIController@index');
Route::get('/get_monthly', 'APIController@index_monthly');
Route::get('/get_trending/{year}/{month}/{location}/{ip}', 'APIController@trending');
Route::get('/get_stand_comparison', 'APIController@get_stand_comparison');
Route::get('/dynamic_change/{ip}', 'APIController@fetch');

Route::get('/get_all_ip', 'ConfigController@get_all_ip');
Route::get('/get_all_location', 'ConfigController@get_all_location');
Route::get('/get_all_tarif', 'ConfigController@get_all_tarif');
Route::get('/get_all_phase', 'ConfigController@get_all_phase');
Route::get('/get_ip/{ip}', 'ConfigController@get_ip');
Route::get('/get_selected_modbus', 'ConfigController@get_selected_modbus');
Route::get('/get_serial_number/{mod_addr}', 'ConfigController@get_serial_number');

Route::post('/insert_modbus_data', 'APIController@insert_modbus_data');

Route::post('/execute_insert_new_device','ConfigController@execute_insert_new_device');