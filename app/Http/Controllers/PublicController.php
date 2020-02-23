<?php

namespace App\Http\Controllers;

use App\CarBrand;
use App\CarModel;
use App\City;
use App\CompanyInfo;
use App\Helpers\MjPersianDate;
use App\Province;
use App\Reminder;
use App\Specialty;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Validator;

class PublicController extends Controller
{
    public function getCompanyInfo()
    {
        $companyInfo = CompanyInfo::findOrFail(1);

        return response()->json(['company_info' => $companyInfo]);
    }

    public function getCars()
    {
        $cars = CarBrand::all();
        $current_year = MjPersianDate::jdate('Y', Carbon::now()->timestamp, '', 'Asia/Tehran', 'en');

        return response()->json(['cars' => $cars, 'current_year' => $current_year]);
    }

    public function getCarModels($car_brand_id)
    {
        $models = CarModel::select('id', 'title', 'from_year', 'to_year')->where('car_brand_id', $car_brand_id)->get();

        return response()->json(['car_models' => $models]);
    }

    public function getSpecialties($medic_id)
    {
        $specialties = Specialty::select('id', 'name')->where('medic_id', $medic_id)->orderBy('id', 'desc')->get();

        return response()->json(['specialties' => $specialties]);
    }

    public function getProvinces()
    {
        $provinces = Province::all();

        return response()->json(['provinces' => $provinces]);
    }

    public function getCities($province_id)
    {
        $cities = City::where('province_id', $province_id)->get();

        return response()->json(['cities' => $cities]);
    }

    public function storeReminder(Request $request)
    {
        $messages = [
            'fullname.required' => 'پر کردن تمامی موارد ستاره دار الزامی است.',
            'phone.required' => 'پر کردن تمامی موارد ستاره دار الزامی است.',
            'insurance_name.required' => 'پر کردن تمامی موارد ستاره دار الزامی است.',
            'deadline.required' => 'پر کردن تمامی موارد ستاره دار الزامی است.',
            'phone.min' => 'لطفا شماره همراه خود را در 11 رقم و به درستی وارد کنید.',
            'phone.max' => 'لطفا شماره همراه خود را در 11 رقم و به درستی وارد کنید.',
        ];

        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'phone' => 'required|min:11|max:11',
            'insurance_name' => 'required',
            'deadline' => Rule::requiredIf(!empty($request->hasInsurance) && ($request->hasInsurance == '1')),
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        if (!$request->has('hasInsurance')) {
            return response()->json(['error' => 'no_ins_check'], 406);
        }

        $reminder = new Reminder;
        $reminder->insurance = $request->insurance_name;
        $reminder->fullname = $request->fullname;
        $reminder->phone = $request->phone;
        $reminder->description = $request->description;
        if ($request->hasInsurance == '1') {
            $reminder->has_insurance = 1;
            $reminder->deadline = $request->deadline;
        } else {
            $reminder->has_insurance = 0;
        }
        if (!empty($request->insurance_company)) {
            $reminder->insurance_company = $request->insurance_company;
        }
        if (!empty($request->insurance_number)) {
            $reminder->insurance_number = $request->insurance_number;
        }
        $reminder->code = rand(10000, 99999);
        $reminder->save();
        $response = $request->all();
        $response['code'] = $reminder->code;
        return response()->json(['message' => $response]);
    }

    public function loadCalendar(Request $request)
    {
        $nextm = $request->month;
        $nexty = $request->year;

        $parametersm = '+' . $nextm . ' month';
        $parametersy = '+' . $nexty . ' year';

        $this_month = MjPersianDate::jdate("m", strtotime($parametersm));
        $this_year = MjPersianDate::jstrftime('%Y', strtotime($parametersy));
        $this_day = MjPersianDate::jstrftime('%d');

        $timestamp_start_day_of_month1 = MjPersianDate::jmktime(6, 15, 34, $this_month, 1, $this_year);

        $days_num = MjPersianDate::jdate("t", $timestamp_start_day_of_month1, "", "", "en");
        ?>

        <div class="mj-row mj-calendar-header">
            <div class="mj-col-10" onclick="calendar(this,<?php echo $nexty - 1; ?>,<?php echo $nextm; ?>)">&laquo;
            </div>
            <div class="mj-col-10" onclick="calendar(this,<?php echo $nexty; ?>,<?php echo $nextm - 1; ?>)">&lsaquo;
            </div>
            <div class="mj-col-60">
                <?php
                $tstm = MjPersianDate::jmktime(6, 15, 34, $this_month, MjPersianDate::jstrftime('%e'), $this_year);
                echo MjPersianDate::jdate('F  Y', $tstm);
                ?>
            </div>
            <div class="mj-col-10" onclick="calendar(this,<?php echo $nexty; ?>,<?php echo $nextm + 1; ?>)">&rsaquo;
            </div>
            <div class="mj-col-10" onclick="calendar(this,<?php echo $nexty + 1; ?>,<?php echo $nextm; ?>)">&raquo;
            </div>
        </div>

        <div class="mj-calendar-body">

            <div class="mj-row mj-calendar-weekdays">
                <div class="mj-col-14">شنبه</div>
                <div class="mj-col-14">یکشنبه</div>
                <div class="mj-col-14">دوشنبه</div>
                <div class="mj-col-14">سه شنبه</div>
                <div class="mj-col-14">چهارشنبه</div>
                <div class="mj-col-14">پنجشنبه</div>
                <div class="mj-col-14">جمعه</div>
            </div>

            <div class="mj-row mj-calendar-days">
                <?php
                $offset = MjPersianDate::jdate('w', MjPersianDate::jmktime(6, 15, 34, $this_month, 1, $this_year), '', '', 'en');
                if ($offset > 0) {
                    for ($k = 1; $k <= $offset; $k++) {
                        ?>
                        <div class="mj-col-14"></div>
                        <?php
                    }
                }
                ?>
                <?php
                $i = 1;
                for ($j = 1; $j <= $days_num; $j++) {
                    ?>
                    <div class="mj-col-14" <?php echo MjPersianDate::jdate("Y-m-d") == MjPersianDate::jdate('Y-m-d', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year)) ? "id='today'" : ""; ?>
                         data-year="<?php echo MjPersianDate::jdate('Y', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year), '', 'Asia/Tehran', 'en'); ?>"
                         data-month="<?php echo MjPersianDate::jdate('m', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year), '', 'Asia/Tehran', 'en'); ?>"
                         data-month_name="<?php echo MjPersianDate::jdate('F', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year)); ?>"
                         data-day="<?php echo MjPersianDate::jdate('d', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year), '', 'Asia/Tehran', 'en'); ?>"
                         data-day_name="<?php echo MjPersianDate::jdate('l', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year)); ?>"
                         onclick="select_cal(this)">
              <span class="date-cell
                    <?php
              echo MjPersianDate::jdate("Y-m-d") == MjPersianDate::jdate('Y-m-d', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year)) ? "active " : "";
              ?>">
              <?php
              if ($i <= $days_num and $i >= 1) {
                  if (MjPersianDate::jdate('d', MjPersianDate::jmktime(6, 15, 34, $this_month, $i, $this_year)) == "01") {
                      $i = 1;
                  }
                  echo $i++;
              }
              ?>
              </span>
                    </div>
                <?php } ?>
            </div>
            <div class="today-btn mb-3 mt-3" onclick="calendar(this,0,0);">
                امروز
            </div>
        </div>
        <?php
    }
}
