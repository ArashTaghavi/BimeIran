<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;
use App\Http\Controllers\Controller;
use App\Http\Middleware\TokenCheckMiddleware;
use Validator;
use App\Marketer;
use App\ToMarketer;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(TokenCheckMiddleware::class);
    }

    public function getUser(Request $request)
    {
        $user = User::where('id', $request->header('user'))->with(['wallet', 'province', 'city', 'to_marketer'])->first();

        return response()->json(['user' => $user]);
    }

    public function updateUser(Request $request, $id)
    {
        $messages = [
            'national_code.min'       => 'لطفا کد ملی خود را در 10 رقم و به درستی وارد کنید.',
            'national_code.max'       => 'لطفا کد ملی خود را در 10 رقم و به درستی وارد کنید.',
            'birthday_day.required'   => 'تاریخ تولد باید به صورت کامل وارد گردد.',
            'birthday_month.required' => 'تاریخ تولد باید به صورت کامل وارد گردد.',
            'birthday_year.required'  => 'تاریخ تولد باید به صورت کامل وارد گردد.',
            'email.email'             => 'ایمیل وارد شده اشتباه است.',
            'province_id.numeric'     => 'استان وارد شده اشتباه است.',
            'city_id.required'        => 'در صورت انتخاب استان، انتخاب شهر نیز الزامی است.',
            'address.max'             => 'آدرس حداکثر می تواند 255 کاراکتر باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'fname'          => 'nullable',
            'lname'          => 'nullable',
            'national_code'  => 'nullable|min:10|max:10',
            'birthday_day'   =>  Rule::requiredIf(!empty($request->birthday_month) || !empty($request->birthday_year)),
            'birthday_month' =>  Rule::requiredIf(!empty($request->birthday_day) || !empty($request->birthday_year)),
            'birthday_year'  =>  Rule::requiredIf(!empty($request->birthday_month) || !empty($request->birthday_day)),
            'email'          => 'nullable|email',
            'job'            => 'nullable',
            'province_id'    => 'nullable|numeric',
            'city_id'        =>  Rule::requiredIf(!empty($request->province_id)),
            'address'        => 'nullable|max:255',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $user = User::where('id', $request->header("user"))->first();

        $user->fname = $request->fname;
        $user->lname = $request->lname;
        $user->national_code = $request->national_code;
        if (!empty($request->birthday_day)) {
            $user->birthday = $request->birthday_year . '-' . $request->birthday_month . '-' . $request->birthday_day;
        }
        $user->email = $request->email;
        $user->job = $request->job;
        $user->province_id = $request->province_id;
        $user->city_id = $request->city_id;
        $user->address = $request->address;

        $user->update();

        $user = User::where('id', $request->header("user"))->with(['wallet', 'province', 'city', 'to_marketer'])->first();

        return response()->json(['status' => 204, 'user' => $user]);
    }

    public function toMarketerRequest(Request $request)
    {
        $messages = [
            'national_code.required' => 'وارد کردن شماره ملی الزامی است.',
            'national_code.min'      => 'شماره ملی وارد شده اشتباه است.',
            'national_code.max'      => 'شماره ملی وارد شده اشتباه است.',
            'tel.required'           => 'وارد کردن شماره تماس الزامی است.',
            'tel.min'                => 'شماره تماس وارد شده اشتباه است.',
            'tel.max'                => 'شماره تماس وارد شده اشتباه است.',
            'address.required'       => 'وارد کردن آدرس الزامی است.',
            'address.max'            => 'آدرس حداکثر می تواند 255 کاراکتر باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'national_code' => 'required|min:10|max:10',
            'tel'           => 'required|min:11|max:11',
            'address'       => 'required|max:255',
            'national_cart' => 'required',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        if ($request->file("national_cart"))
        {
            $image = $request->file("national_cart");

            if ($image->getSize() > 1 * 1024 * 1024)
            {
                return response()->json([
                    "status" => -1,
                    "error" => "large_image"
                ], 406);
            }

            $clientExt = $image->getClientOriginalExtension();
            if ($clientExt !== 'png' && $clientExt !== 'jpg' && $clientExt !== 'jpeg')
            {
              return response()->json([
                "status" => -1,
                "error" => "wrong_extension"
              ], 406);
            }

            $image_name = time() . "." . $image->getClientOriginalExtension();

            Image::make($image)->save("images/national-carts/$image_name");
        }
        else
        {
            return response()->json([
                "status" => -1,
                "error" => "no_image"
            ], 406);
        }

        $user = User::where('id', $request->header("user"))->first();

        $to_marketer_request = new ToMarketer();

        $to_marketer_request->user_id = $user->id;
        $to_marketer_request->national_code = $request->national_code;
        $to_marketer_request->tel = $request->tel;
        $to_marketer_request->address = $request->address;
        $to_marketer_request->national_cart = $image_name;

        $to_marketer_request->save();

        $user = User::where('id', $request->header("user"))->with(['wallet', 'province', 'city', 'to_marketer'])->first();

        return response()->json(['status' => 204, 'user' => $user]);
    }

    public function changePassword(Request $request)
    {
        $messages = [
            'current_password.required' => 'وارد کردن گذر واژه فعلی الزامی است.',
            'current_password.min' => 'گذر واژه فعلی حداقل باید 8 رقم باشد.',
            'new_password.required' => 'وارد کردن گذر واژه جدید الزامی است.',
            'new_password.min' => 'گذر واژه جدید حداقل باید 8 رقم باشد.',
            'new_password.confirmed' => 'گذر واژه های وارد شده با یکدیگر همخوانی ندارند.',
            'new_password.different' => 'گذر واژه جدید نمی تواند مشابه گذر واژه فعلی باشد.'
        ];

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|min:8',
            'new_password'     => 'required|min:8|confirmed|different:current_password'
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $user = User::where('id', $request->header("user"))->first();

        if (!Hash::check($request->current_password, $user->password))
        {
            return response()->json(['status' => -1, 'error' => 'wrong_password'], 406);
        }

        $user->password = Hash::make($request->new_password);

        $user->save();

        return response()->json(['status' => 204]);
    }

    public function resetMarketerPassword(Request $request)
    {
        $marketer = Marketer::where('phone', $request->phone)->first();
        $marketer->password = Hash::make($request->password);
        $marketer->update();

        return response()->json(['status' => 202]);
    }
}
