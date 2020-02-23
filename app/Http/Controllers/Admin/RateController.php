<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\MedicRates;
use App\Rate;
// use App\TravelPlan;

class RateController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class);
    }

    public function getInsuranceRates()
    {
        $rates = Rate::select('id', 'insurance_id','name','rate')->with(['insurance'])->get();

        $rates->map(function ($rate) {
            if ($rate->rate > 10) {
                $rate->rate = number_format($rate->rate);
            }
            return $rate;
        });

        return response()->json(['rates' => $rates]);
    }

    public function showInsuranceRate($id)
    {
        $rate = Rate::select('id', 'name', 'rate')->where('id', $id)->first();

        return response()->json(['rate' => $rate]);
    }

    public function editInsuranceRate(Request $request, $id)
    {
        $messages = [
            'rate.required' => 'نرخ نمی تواند خالی باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'rate' => 'required',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $rate = Rate::findOrFail($id);
        $rate->rate = $request->rate;
        $rate->update();

        return response()->json(['status' => 202]);
    }

    public function getMedicRates()
    {
        $rates = MedicRates::select('id', 'name','rate','rate_with_plastic_surgery')->get();

        $rates->map(function ($rate) {
            if ($rate->rate > 10) {
                $rate->rate = number_format($rate->rate);
            }
            if ($rate->rate_with_plastic_surgery > 10) {
                $rate->rate_with_plastic_surgery = number_format($rate->rate_with_plastic_surgery);
            }
            return $rate;
        });

        return response()->json(['rates' => $rates]);
    }

    public function showMedicRate($id)
    {
        $rate = MedicRates::select('id', 'name', 'rate', 'rate_with_plastic_surgery')->where('id', $id)->first();

        return response()->json(['rate' => $rate]);
    }

    public function editMedicRate(Request $request, $id)
    {
        $messages = [
            'rate.required' => 'نرخ نمی تواند خالی باشد.',
            'rate_with_plastic_surgery.required' => 'نرخ پوشش جراحی پلاستیک نمی تواند خالی باشد.'
        ];

        $validator = Validator::make($request->all(), [
            'rate' => 'required',
            'rate_with_plastic_surgery' => 'required',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $rate = MedicRates::findOrFail($id);
        $rate->rate = $request->rate;
        $rate->rate_with_plastic_surgery = $request->rate_with_plastic_surgery;
        $rate->update();

        return response()->json(['status' => 202]);
    }
}
