<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\TokenCheckMiddleware;
use Validator;
use App\Order;
use App\Receiver;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware(TokenCheckMiddleware::class);
    }

    public function submitOrder(Request $request)
    {
        $messages = [
            'fullname.required'          => 'نام و نام خانوادگی تحویل گیرنده نمی تواند خالی باشد.',
            'phone.required'             => 'تلفن همراه تحویل گیرنده نمی تواند خالی باشد.',
            'receiver_province.required' => 'استان تحویل گیرنده نمی تواند خالی باشد.',
            'receiver_city.required'     => 'شهر تحویل گیرنده نمی تواند خالی باشد.',
            'landline_phone.required'    => 'تلفن ثابت تحویل گیرنده نمی تواند خالی باشد.',
            'address.required'           => 'آدرس تحویل گیرنده نمی تواند خالی باشد.',
            'address.max'                => 'آدرس حداکثر می تواند 255 کاراکتر باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'fullname'          => 'required',
            'phone'             => 'required',
            'receiver_province' => 'required',
            'receiver_city'     => 'required',
            'landline_phone'    => 'required',
            'address'           => 'required|max:255',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $order = new Order;
        $order->user_id = $request->header('user');
        $order->insurance = $request->insurance;
        $order->price = $request->price;
        $order->details = $request->details;
        $order->save();

        $receiver = new Receiver();
        $receiver->order_id = $order->id;
        $receiver->fullname = $request->fullname;
        $receiver->phone = $request->phone;
        $receiver->province = $request->receiver_province;
        $receiver->city = $request->receiver_city;
        $receiver->area = $request->section;
        $receiver->landline_phone = $request->landline_phone;
        $receiver->postal_code = $request->postal_code;
        $receiver->address = $request->address;
        $receiver->save();

        return response()->json(['order_id' => $order->id]);
    }
}
