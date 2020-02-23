<?php

namespace App\Imports;

use App\MarketerCustomer;
use Maatwebsite\Excel\Concerns\ToModel;

class CustomersImport implements ToModel
{
    public $marketer_id;

    public function __construct($marketer_id)
    {
        $this->marketer_id = $marketer_id;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new MarketerCustomer([
            'marketer_id'   => $this->marketer_id,
            'full_name'     => $row[0],
            'national_code' => $row[1],
            'phone'         => $row[2],
            'address'       => $row[3],
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ]);
    }
}
