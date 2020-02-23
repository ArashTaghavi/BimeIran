<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class)->except(['login']);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) return response($validator->errors(), 405);

        $admin = Admin::where('email', $request->email);

        if ($admin->count() === 0) {
            return response()->json(['status' => -1, 'error' => 'wrong_creds'], 406);
        }
        $admin = $admin->first();
        if (!Hash::check($request->password, $admin->password)) {
            return response()->json(['status' => -1, 'error' => 'wrong_creds'], 406);
        }
        $admin->token = str_random(255);
        $admin->update();

        return response()->json(['status' => 1, 'token' => $admin->token]);
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

        $admin = Admin::where('id', $request->header('admin'))->first();

        if (!Hash::check($request->current_password, $admin->password))
        {
            return response()->json(['status' => -1, 'error' => 'wrong_password'], 406);
        }

        $admin->password = Hash::make($request->new_password);

        $admin->update();

        return response()->json(['status' => 204]);
    }
}
