<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class APIPostLocation extends Resource
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
            'location_name' => $this['location_name'],
        ];
    }

    public function with($request) {
        return [
            'version' => '1.0.0',
            'author_url' => url('http://enerwise.local')
        ];
    }
}
