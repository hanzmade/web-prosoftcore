<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class APIGetSelectedModbus extends Resource
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
            'modbus_address' => $this['modbus_address'],
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://project.local')
        ];
    }
}
