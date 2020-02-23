<?php

namespace App\Http\Controllers;

use App\Marketer;
use App\Http\Middleware\MarketerMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;

class MarketerController extends Controller
{
    public function __construct()
    {
        $this->middleware(MarketerMiddleware::class)->except(['login']);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);
        if ($validator->fails()) return response($validator->errors(), 405);

        $marketer = Marketer::where('phone', $request->username);

        if ($marketer->count() === 0) {
            return response()->json(['status' => -1, 'error' => 'wrong_creds'], 406);
        }
        $marketer = $marketer->first();
        if (!Hash::check($request->password, $marketer->password)) {
            return response()->json(['status' => -1, 'error' => 'wrong_creds'], 406);
        }
        $marketer->token = str_random(255);
        $marketer->update();

        return response()->json(['status' => 1, 'token' => $marketer->token]);
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

        $marketer = Marketer::where('id', $request->header('marketer'))->first();

        if (!Hash::check($request->current_password, $marketer->password))
        {
            return response()->json(['status' => -1, 'error' => 'wrong_password'], 406);
        }

        $marketer->password = Hash::make($request->new_password);

        $marketer->update();

        return response()->json(['status' => 204]);
    }
}
