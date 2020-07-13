<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class APIPostChange extends Resource
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
            'modbus' => $this['modbus_address'],
            'tenant_name' => $this['tenant_name'],
            'ip_id' => $this['ip_id'],
            'location' => $this['location'],
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://enerwise.local')
        ];
    }
}
