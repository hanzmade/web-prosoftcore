<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class APIPostIP extends Resource
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
            'ip_address' => $this['ip_address'],
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://enerwise.local')
        ];
    }
}
