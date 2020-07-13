<?php

namespace App\Http\Controllers;

use Redis;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Resources\APIGetMonthly as APIGetMonthlyResource;

class APIController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // Return collection of articles as a resource
        //return APIGetAllResource::collection($data_kwh);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function fetch($ip){
        
    }

    public function get_stand_comparison()
    {

    }

    public function insert_modbus_data(Request $request)
    {
    
    }

    public function trending($year,$month,$location,$ip)
    {
       
    }

    public function index_monthly()
    {
        $user="";
        $user = [['id' => "1",
                 'name' => "hanif",
                 'address' => "cisauk",
                 'email' => "gmail"],
                 ['id' => "2",
                 'name' => "ramadhan",
                 'address' => "tangerang",
                 'email' => "yahoo"],];
                 
        return response()->json($user);
    }
}
