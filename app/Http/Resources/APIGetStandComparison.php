<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class APIGetStandComparison extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this['id'],
            'modbus_address' => $this['modbus_address'],
            'location' => $this['locate']['location_name'],
            'last_stand' => $this['last_stand'],
            'current_stand' => $this['current_stand']
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://enerwise.local')
        ];
    }
}
