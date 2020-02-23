<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Helpers\MjPersianDate;
use App\CarBrand;
use App\CarModel;
use App\Discount;
use App\MedicRates;
use App\Rate;
use App\Specialty;
use App\TravelPlan;

class CalculationController extends Controller
{
    /**
     * Calculation for fire insurance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function calculateFireInsurance(Request $request)
    {
        $propery_area = $request->area;
        $price_per_meter = $request->building_cost_per_meter;
        $furniture_value = $request->furniture_value;

        $total_wealth = ($propery_area * $price_per_meter) + $furniture_value;

        $rates = Rate::where('latin_name', 'fire')->first()->rate;

        if ($request->hasStealingOption) {
            $rates += Rate::where('latin_name', 'stealing')->first()->rate;
        }

        if ($request->hasLandslideOption) {
            $rates += Rate::where('latin_name', 'landslide')->first()->rate;
        }

        if ($request->hasPipeBurstOption) {
            $rates += Rate::where('latin_name', 'pipe_burst')->first()->rate;
        }

        if ($request->hasEarthquakeOption) {
            $rates += Rate::where('latin_name', 'earthquake')->first()->rate;
        }

        if ($request->hasRainingOption) {
            $rates += Rate::where('latin_name', 'snow_rain_waste')->first()->rate;
        }

        if ($request->hasPlainCrashOption) {
            $rates += Rate::where('latin_name', 'plane_crash')->first()->rate;
        }

        if ($request->hasFloodOption) {
            $rates += Rate::where('latin_name', 'flood')->first()->rate;
        }

        if ($request->hasStormOption) {
            $rates += Rate::where('latin_name', 'storm')->first()->rate;
        }

        $final_insurance_price = $total_wealth * $rates;

        $wrong_discount_code = 0;

        if ($request->customer_discount_code)
        {
            $discount = Discount::where('code', $request->customer_discount_code)->first();

            if ($discount)
            {
                $final_insurance_price = $final_insurance_price - $discount->amount;
            }
            else
            {
                $wrong_discount_code = 1;
            }
        }

        return response()->json([
            'temp_final_cost'          => number_format($final_insurance_price),
            'wrong_discount_code'      => $wrong_discount_code,
        ]);
    }

    /**
     * Calculation for earthquake insurance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function calculateEarthquakeInsurance(Request $request)
    {
        $propery_area = $request->area;
        $price_per_meter = $request->building_cost_per_meter;
        $furniture_value = $request->furniture_value;

        $total_wealth = ($propery_area * $price_per_meter) + $furniture_value;

        $rates = Rate::where('latin_name', 'fire')->first()->rate;
        $rates += Rate::where('latin_name', 'earthquake')->first()->rate;

        $final_insurance_price = $total_wealth * $rates;

        $wrong_discount_code = 0;

        if ($request->customer_discount_code)
        {
            $discount = Discount::where('code', $request->customer_discount_code)->first();

            if ($discount)
            {
                $final_insurance_price = $final_insurance_price - $discount->amount;
            }
            else
            {
                $wrong_discount_code = 1;
            }
        }

        return response()->json([
            'temp_final_cost'          => number_format($final_insurance_price),
            'wrong_discount_code'      => $wrong_discount_code,
        ]);
    }

    /**
     * Calculation for thirdparty insurance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function calculateThirdpartyInsurance(Request $request)
    {
        $cylidner_qty = CarModel::where('id', $request->car_model_id)->first()->cylinder_number;

        if ($request->car_brand_id == 1 || $request->car_brand_id == 82) {
            $basic_rate = Rate::where('latin_name', 'pride_paykan')->first()->rate;
            $daily_penalty = Rate::where('latin_name', 'pride_paykan_daily_penalty')->first()->rate;
        } elseif ($cylidner_qty < 4) {
            $basic_rate = Rate::where('latin_name', 'less_than_4_cylinder')->first()->rate;
            $daily_penalty = Rate::where('latin_name', 'less_than_4_cylinder_daily_penalty')->first()->rate;
        } elseif ($cylidner_qty > 4) {
            $basic_rate = Rate::where('latin_name', 'more_than_4_cylinder')->first()->rate;
            $daily_penalty = Rate::where('latin_name', 'more_than_4_cylinder_daily_penalty')->first()->rate;
        } else {
            $basic_rate = Rate::where('latin_name', 'exact_4_cylinder')->first()->rate;
            $daily_penalty = Rate::where('latin_name', 'exact_4_cylinder_daily_penalty')->first()->rate;
        }

        switch ($request->financial_commitment_level) {
            case 18000000:
                $commitment_rate = 1.125;
                break;
            case 28000000:
                $commitment_rate = 1.20833260;
                break;
            case 45000000:
                $commitment_rate = 1.35;
                break;
            case 80000000:
                $commitment_rate = 1.5444429;
                break;
            case 110000000:
                $commitment_rate = 1.71111075;
                break;
            case 180000000:
                $commitment_rate = 2.1;
                break;
            default:
                $commitment_rate = 1;
                break;
        }
        $basic_rate = $basic_rate * $commitment_rate;

        if ($request->property_damage_qty_value && $request->property_damage_qty_value > 0)
        {
            switch ($request->property_damage_qty_value) {
                case 1:
                    $property_damage_rate = 20;
                    break;
                case 2:
                    $property_damage_rate = 30;
                    break;
                case 3:
                    $property_damage_rate = 40;
                    break;
                default:
                    $property_damage_rate = 20;
                    break;
            }
        }

        if ($request->life_damage_qty_value && $request->life_damage_qty_value > 0)
        {
            switch ($request->life_damage_qty_value) {
                case 1:
                    $life_damage_rate = 30;
                    break;
                case 2:
                    $life_damage_rate = 70;
                    break;
                case 3:
                    $life_damage_rate = 100;
                    break;
                default:
                    $life_damage_rate = 30;
                    break;
            }
        }

        if ($request->driver_damage_qty_value && $request->driver_damage_qty_value > 0)
        {
            switch ($request->driver_damage_qty_value) {
                case 1:
                    $driver_damage_rate = 30;
                    break;
                case 2:
                    $driver_damage_rate = 70;
                    break;
                case 3:
                    $driver_damage_rate = 100;
                    break;
                default:
                    $driver_damage_rate = 30;
                    break;
            }
        }

        if (isset($life_damage_rate) && isset($property_damage_rate)) {
            if ($property_damage_rate == 40 && $life_damage_rate == 30) {
                $thirdparty_penalty = $property_damage_rate;
            } else {
                $thirdparty_penalty = $life_damage_rate;
            }
        } elseif (isset($life_damage_rate)) {
            $thirdparty_penalty = $life_damage_rate;
        } elseif (isset($property_damage_rate)) {
            $thirdparty_penalty = $property_damage_rate;
        }

        if (isset($thirdparty_penalty) && $thirdparty_penalty > 100) {
            $thirdparty_penalty = 100;
        }

        if (isset($thirdparty_penalty))
        {
            $thirdparty_discount = ((100 + $thirdparty_penalty - $request->prev_thirdparty_discount_value) / 100);
        }
        else
        {
            $thirdparty_discount = ((100 - 5 - $request->prev_thirdparty_discount_value) / 100);
        }

        if (isset($driver_damage_rate))
        {
            $driver_discount = ((100 + $driver_damage_rate - $request->prev_driver_discount_value) / 100);
        }
        else
        {
            $driver_discount = ((100 - 5 - $request->prev_driver_discount_value) / 100);
        }

        $final_insurance_price = ($basic_rate * $thirdparty_discount) + (189000 * $driver_discount);

        $current_year = MjPersianDate::jdate('Y', Carbon::now()->timestamp, '', 'Asia/Tehran', 'en');
        $car_birthday = $request->car_birthday;
        $car_age = $current_year - $car_birthday;
        if ($car_age > 15)
        {
            $old_age_rate = ($car_age - 15) * 0.02;
            if ($old_age_rate > 0.2) {
                $final_insurance_price = $final_insurance_price * 1.2;
            } else {
                $final_insurance_price = $final_insurance_price * (1 + $old_age_rate);
            }
        }

        $final_insurance_price = $final_insurance_price * 1.09;

        $current_date = date('Y-m-d', Carbon::now()->timestamp);
        $prev_ins_finish_year = $request->prevInsFinishYear;
        $prev_ins_finish_month = $request->prevInsFinishMonth;
        $prev_ins_finish_day = $request->prevInsFinishDay;
        $prev_ins_gregorian_finish_date = MjPersianDate::jalali_to_gregorian($prev_ins_finish_year, $prev_ins_finish_month, $prev_ins_finish_day, '-');
        $date1 = date_create($current_date);
        $date2 = date_create($prev_ins_gregorian_finish_date);
        $date_diff = date_diff($date1, $date2)->format("%R%a");
        $sign = $date_diff[0];
        if ($sign === '-')
        {
            $delay_days = substr($date_diff, 1);
            $daily_penalty = $daily_penalty * $delay_days;
            $final_insurance_price = $final_insurance_price + $daily_penalty;
        }

        $wrong_discount_code = 0;

        if ($request->customer_discount_code)
        {
            $discount = Discount::where('code', $request->customer_discount_code)->first();

            if ($discount)
            {
                $final_insurance_price = $final_insurance_price - $discount->amount;
            }
            else
            {
                $wrong_discount_code = 1;
            }
        }

        return response()->json([
            'temp_final_cost'     => number_format($final_insurance_price),
            'wrong_discount_code' => $wrong_discount_code,
        ]);
    }

    /**
     * Calculation for body insurance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function calculateBodyInsurance(Request $request)
    {
        $accessories_value = $request->vehicle_accessories_value;
        $car_value = $request->vehicle_value;
        if ($car_value < 5000000)
        {
            return response()->json(['status' => -1, 'error' => 'too_cheap_car'], 406);
        }

        $current_year = MjPersianDate::jdate('Y', Carbon::now()->timestamp, '', 'Asia/Tehran', 'en');
        $car_birthday = $request->car_birthday;
        $car_age = $current_year - $car_birthday;

        $total_car_value = $car_value + $accessories_value;

        $made_in_persian = CarModel::where('id', $request->car_model_id)->first()->from_year;
        if ($made_in_persian < 1600) {
            $rates = 0.0135;
        } else {
            if ($car_age > 4) {
                $rates = 0.0135;
            } else {
                $rates = 0.01215;
            }
        }

        if ($request->hasGlassBreakOption) {
            $rates += Rate::where('latin_name', 'glass_break')->first()->rate;
        }

        if ($request->hasChemicalsSplashOption) {
            $rates += Rate::where('latin_name', 'chemical_splash')->first()->rate;
        }

        if ($request->hasStealingAtOnceOption) {
            $rates += Rate::where('latin_name', 'car_stealing')->first()->rate;
        }

        if ($request->hasFluctuationOption) {
            $rates += Rate::where('latin_name', 'bazar_fluctuation')->first()->rate;
        }

        if ($request->hasNaturalDisastersOption) {
            $rates += Rate::where('latin_name', 'natural_disasters')->first()->rate;
        }

        if ($request->hasTransportationOption) {
            $rates += Rate::where('latin_name', 'repetitive_transportation')->first()->rate;
        }

        $final_insurance_price = $total_car_value * $rates * 1.09;

        if ($car_age > 15)
        {
            return response()->json(['status' => -1, 'error' => 'too_old_car'], 406);
        }
        if ($car_age > 10)
        {
            $old_age_rate = ($car_age - 10) * 0.05;
            $final_insurance_price = $final_insurance_price * (1 + $old_age_rate);
        }

        if ($request->hasBeenUsed == '1')
        {
            $final_insurance_price = $final_insurance_price * 0.7;
        }

        if ($request->prev_body_discount_value)
        {
            switch ($request->prev_body_discount_value) {
                case 1:
                    $body_discount_value = 25;
                    break;
                case 2:
                    $body_discount_value = 35;
                    break;
                case 3:
                    $body_discount_value = 45;
                    break;
                case 4:
                    $body_discount_value = 60;
                    break;
                default:
                    $body_discount_value = 0;
                    break;
            }

            $final_insurance_price = $final_insurance_price * ((100 - $body_discount_value) / 100);
        }

        $wrong_discount_code = 0;

        if ($request->customer_discount_code)
        {
            $discount = Discount::where('code', $request->customer_discount_code)->first();

            if ($discount)
            {
                $final_insurance_price = $final_insurance_price - $discount->amount;
            }
            else
            {
                $wrong_discount_code = 1;
            }
        }

        return response()->json([
            'temp_final_cost'     => number_format($final_insurance_price),
            'wrong_discount_code' => $wrong_discount_code,
        ]);
    }

    /**
     * Calculation for travel insurance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function calculateTravelInsurance(Request $request)
    {
        $travel_duration = $request->travel_duration_latin;

        $basic_rate = TravelPlan::where('id', $request->travel_plan_id)->first()->$travel_duration;

        $range_1_12_cost  = $basic_rate * 1 * $request->zero_to_12_age;
        $range_13_65_cost = $basic_rate * 2 * $request->thirteen_to_65_age;
        $range_66_70_cost = $basic_rate * 3 * $request->sixtySix_to_70_age;
        $range_71_75_cost = $basic_rate * 4 * $request->seventyOne_to_75_age;
        $range_76_80_cost = $basic_rate * 6 * $request->seventySix_to_80_age;
        $range_81_85_cost = $basic_rate * 8 * $request->eightyOne_to_85_age;

        $final_insurance_price = $range_1_12_cost  + $range_13_65_cost +
                                 $range_66_70_cost + $range_71_75_cost +
                                 $range_76_80_cost + $range_81_85_cost;

        $wrong_discount_code = 0;

        if ($request->customer_discount_code)
        {
            $discount = Discount::where('code', $request->customer_discount_code)->first();

            if ($discount)
            {
                $final_insurance_price = $final_insurance_price - $discount->amount;
            }
            else
            {
                $wrong_discount_code = 1;
            }
        }

        return response()->json([
            'temp_final_cost'     => number_format($final_insurance_price),
            'wrong_discount_code' => $wrong_discount_code,
        ]);
    }

    /**
     * Calculation for travel insurance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function calculateMedicInsurance(Request $request)
    {
        $specialty_id = $request->specialty_id;
        $specialty_cat = Specialty::where('id' ,$specialty_id)->first()->category;

        if ($specialty_cat < 8 && $request->beautySurgeryOption == '1') {
            $rate = MedicRates::where('id', $specialty_cat)->first()->rate_with_plastic_surgery;
        } else {
            $rate = MedicRates::where('id', $specialty_cat)->first()->rate;
        }

        $final_insurance_price = $rate;

        if ($request->prev_medic_discount_value)
        {
            if ($specialty_cat < 8)
            {
                switch ($request->prev_medic_discount_value) {
                    case 1:
                        $medic_discount_value = 15;
                        break;
                    case 2:
                        $medic_discount_value = 25;
                        break;
                    case 3:
                        $medic_discount_value = 35;
                        break;
                    case 4:
                        $medic_discount_value = 45;
                        break;
                    default:
                        $medic_discount_value = 0;
                        break;
                }
            } else {
                switch ($request->prev_medic_discount_value) {
                    case 1:
                        $medic_discount_value = 10;
                        break;
                    case 2:
                        $medic_discount_value = 20;
                        break;
                    case 3:
                        $medic_discount_value = 20;
                        break;
                    case 4:
                        $medic_discount_value = 20;
                        break;
                    default:
                        $medic_discount_value = 0;
                        break;
                }
            }

            $final_insurance_price = $final_insurance_price * ((100 - $medic_discount_value) / 100);
        }

        $wrong_discount_code = 0;

        if ($request->customer_discount_code)
        {
            $discount = Discount::where('code', $request->customer_discount_code)->first();

            if ($discount)
            {
                $final_insurance_price = $final_insurance_price - $discount->amount;
            }
            else
            {
                $wrong_discount_code = 1;
            }
        }

        return response()->json([
            'temp_final_cost'     => number_format($final_insurance_price),
            'wrong_discount_code' => $wrong_discount_code,
        ]);
    }
}
