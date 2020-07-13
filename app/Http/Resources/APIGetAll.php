<?php

namespace App\Http\Resources;

use App\Tarif;
use App\DataKWH;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\Resource;

class APIGetAll extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $timestamp = '1900-01-01 00:00:00';
        $date = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, 'Asia/Jakarta');
        $date->setTimezone('UTC');
        $current_time = $date->now();
        $hour = $current_time->hour;

        $sp_starttime_baseload1 = Tarif::where('id',2)
                                        ->pluck('starttime_baseload1');
        $sp_endtime_baseload1 = Tarif::where('id',2)
                                        ->pluck('endtime_baseload1');
        $sp_starttime_baseload2 = Tarif::where('id',2)
                                        ->pluck('starttime_baseload2');
        $sp_endtime_baseload2 = Tarif::where('id',2)
                                        ->pluck('endtime_baseload2');
        $sp_starttime_peakload = Tarif::where('id',2)
                                        ->pluck('starttime_peakload');
        $sp_endtime_peakload = Tarif::where('id',2)
                                        ->pluck('endtime_peakload');
        $pemakaian = 0.001;
        $pemakaian_table = 0.001;
        $current_stand = $this['modbus']['current_stand'];
        $last_stand = $this['modbus']['last_stand'];
        $last_stand_table = $this['last_active_energy'];
        $pemakaian = (int)$current_stand - (int)$last_stand;
        $current_stand_table = $this['active_energy'];
        $pemakaian_table = (int)$current_stand_table - (int)$last_stand_table;
        $tarifs=$this['tarif'];
        /*
        if($this['modbus']['tarif'] == 1)
        {
            $tarifs = $this['modbus']['tariff']['single_tarif'];
        }
        else
        {
            if($hour >= (int)$sp_starttime_baseload1[0] && $hour <= (int)$sp_endtime_baseload1[0])
            {
                $tarifs = $this['modbus']['tariff']['tarif_baseload1'];
            }
            else if($hour >= (int)$sp_starttime_baseload2[0] && $hour <= (int)$sp_endtime_baseload2[0])
            {
                $tarifs = $this['modbus']['tariff']['tarif_baseload2'];
            }
            else if($hour >= (int)$sp_starttime_peakload[0] && $hour <= (int)$sp_endtime_peakload[0])
            {
                $tarifs = $this['modbus']['tariff']['tarif_peakload'];
            }
        }
        */
        $billing = $pemakaian_table * (int)$tarifs;
        return [
            'id' => $this['id'],
            'recorded_date' => $this['recorded_date'],
            'modbus_address' => $this['modbus']['tenant_name'],
            'serial_number' => $this['serial_number'],
            'capacity' => $this['capacity'],
            'current' => $this['current'],
            'voltage' => $this['voltage'],
            'frequency' => $this['frequency'],
            'last_stand' => (int)$this['modbus']['last_stand'],
            'last_stand_table' => (int)$this['last_active_energy'],
            'current_stand' => (int)$this['active_energy'],
            'pemakaian' => $pemakaian,
            'pemakaian_table' => $pemakaian_table,
            'remark' => $this['remark'],
            'tarif' => $tarifs,
            'billing' => $billing,
            'realtime_energy' => (int)$this['active_energy'],
            'location' => $this['modbus']['locate']['location_name'],
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://project.local')
        ];
    }
}
