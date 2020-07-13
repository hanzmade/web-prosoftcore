<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class APIALL extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $pemakaian = 0.001;
        $pemakaian_table = 0.001;
        $current_stand = $this['modbus']['current_stand'];
        $last_stand = $this['modbus']['last_stand'];
        $last_stand_table = $this['last_active_energy'];
        $pemakaian = (float)str_replace(",",".",$current_stand) - (float)str_replace(",",".",$last_stand);

        $current_stand_table = $this['active_energy'];
        $pemakaian_table = (float)str_replace(",",".",$current_stand_table) - (float)str_replace(",",".",$last_stand_table);
        $tarif = $this['modbus']['tarif'];
        $billing = $pemakaian_table * $tarif;
        return [
            'i_avg' => $this['current'],
            'tenant_name' => $this['modbus']['tenant_name'],
            'v_avg' => $this['voltage'],
            'power' => $this['active_power'],
            'energy' => $this['active_energy'],
            'freq' => $this['frequency'],
            'power_factor' => $this['power_factor'],
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://project.local')
        ];
    }
}
