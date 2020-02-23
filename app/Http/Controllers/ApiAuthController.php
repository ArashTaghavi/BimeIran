<?php

namespace App\Http\Controllers;

use App\Lib\SendSMS;
use App\Session;
use App\User;
use App\Wallet;
use Carbon\Carbon;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class ApiAuthController extends Controller
{
    public function request_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|numeric'
        ]);
        if ($validator->fails()) return response($validator->errors(), 405);

        if (User::where('phone', $request->phone)->exists())
        {
            $user = User::where('phone', $request->phone)->first();

            if ($user->password)
            {
                return response()->json([
                    'status' => 3,
                    'phone'  => $request->phone,
                ]);
            }
            else
            {
                $loginToken = rand(10000, 99999);

                $user->sessions()->create([
                    'login_key' => $loginToken,
                    'login_key_valid_until' => Carbon::now()->addMinutes(5)
                ]);

                // $sms = new SendSMS();
                // $sms->send(array($user->phone),'کد فعال سازی شما : ' . $loginToken . ' شرکت بیمه گسترش  اقتصاد');

                return response()->json([
                    'status' => 2,
                    'phone'  => $request->phone,
                ]);
            }
        }
        else
        {
            $loginToken = rand(10000, 99999);

            $user = new User();
            $user->phone = $request->phone;
            $user->save();

            $user->sessions()->create([
                'login_key' => $loginToken,
                'login_key_valid_until' => Carbon::now()->addMinutes(5)
            ]);

            $user->wallet()->create([
                'amount' => '0'
            ]);

            // $sms = new SendSMS();
            // $sms->send(array($user->phone),'کد فعال سازی شما : ' . $loginToken . ' شرکت بیمه گسترش  اقتصاد');

            return response()->json([
                'status' => 2,
                'phone'  => $request->phone
            ]);
        }
    }

    public function authenticate_token(Request $request)
    {
        $messages = [
            'token.min' => 'کد 5 رقمی وارد شده اشتباه است.',
            'token.required' => 'وارد کردن کد 5 رقمی ارسال شده الزامی است.',
            'password.required' => 'وارد کردن گذر واژه الزامی است.',
            'password.min' => 'گذر واژه حداقل باید 8 رقم باشد.',
            'password.confirmed' => 'گذر واژه های وارد شده با یکدیگر همخوانی ندارند.'
        ];

        $validator = Validator::make($request->all(), [
            'phone' => 'required',
            'token' => 'required|min:5',
            'password' => 'required|min:8|confirmed'
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) return;

        $session = $user->sessions()->where('login_key', $request->token);
        if ($session->count() == 0) return response()->json(['status' => -1, 'error' => 'wrong_token'], 406);
        $session = $session->first();

        if (Carbon::now()->gt($session->login_key_valid_until)) {
            return response()->json(['status' => -1, 'error' => 'too_late'], 406);
        }

        $session->login_key = null;
        $session->login_key_valid_until = null;
        $session->session_key = str_random(255);
        $session->session_valid_until = Carbon::now()->addDays(5);
        $session->save();

        if ($request->has('fname')) {
            $user->fname = $request->fname;
        }
        if ($request->has('lname')) {
            $user->lname = $request->lname;
        }
        $user->password = Hash::make($request->password);
        $user->update();

        return response()->json([
            'status' => 1,
            'token'  => $session->session_key,
            'user'   => $user
        ])->cookie('x-ref-token', $session->session_key, 7200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required',
            'password' => 'required|min:8'
        ]);
        if ($validator->fails()) return response($validator->errors(), 405);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) return;

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['status' => -1, 'error' => 'wrong_password'], 406);
        }

        $session = new Session();
        $session->user_id = $user->id;
        $session->session_key = str_random(255);
        $session->session_valid_until = Carbon::now()->addDays(5);
        $session->save();

        return response()->json([
            'status' => 1,
            'token'  => $session->session_key,
            'user'   => $user
        ])->cookie('x-ref-token', $session->session_key, 7200);
    }

    public function forgot_password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required',
        ]);
        if ($validator->fails()) return response($validator->errors(), 405);

        $user = User::where('phone', $request->phone)->first();

        if(!$user) {
            return response()->json(['status' => -1, 'error' => 'wrong_number'], 406);
        }

        $loginToken = rand(10000, 99999);

        $user->sessions()->create([
            'login_key' => $loginToken,
            'login_key_valid_until' => Carbon::now()->addMinutes(5)
        ]);

        // $sms = new SendSMS();
        // $sms->send(array($user->phone),'کد فعال سازی شما : ' . $loginToken . ' شرکت بیمه گسترش  اقتصاد');

        return response()->json([
            'status' => 4
        ]);
    }

    public function logout(Request $request)
    {
        Session::where('session_key', $request->token)->delete();

        return response()->json([
            'status' => 1
        ]);
    }

}
