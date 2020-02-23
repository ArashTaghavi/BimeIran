<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\CompanyInfo;
use App\Marketer;
use App\MarketerWithdraw;
use App\Reminder;
use App\User;
use App\ToMarketer;
use Validator;

class StatisticsController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class);
    }

    public function updateCompanyInfo(Request $request)
    {
        $messages = [
            'telegram.url'  => 'لینک وارد شده برای آدرس تلگرام اشتباه است.',
            'instagram.url' => 'لینک وارد شده برای آدرس اینستاگرام اشتباه است.',
            'whatsapp.url'  => 'لینک وارد شده برای آدرس واتساپ اشتباه است.'
        ];

        $validator = Validator::make($request->all(), [
            'telegram'  => 'sometimes|url',
            'instagram' => 'sometimes|url',
            'whatsapp'  => 'sometimes|url',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        $companyInfo = CompanyInfo::findOrFail(1);
        $companyInfo->phone = $request->phone;
        $companyInfo->address = $request->address;
        if ($request->has('telegram')) {
            $companyInfo->telegram = $request->telegram;
        }
        if ($request->has('instagram')) {
            $companyInfo->instagram = $request->instagram;
        }
        if ($request->has('whatsapp')) {
            $companyInfo->whatsapp = $request->whatsapp;
        }
        $companyInfo->update();

        return response()->json(['company_info' => $companyInfo], 202);
    }

    public function getStatistics()
    {
        $marketerQty = Marketer::count();
        $reminderQty = Reminder::where('status', '<', 4)->count();
        $userQty = User::count();
        $toMarketerQty = ToMarketer::where('status', 0)->count();
        $withdrawQty = MarketerWithdraw::where('status', 0)->count();

        return response()->json([
            'marketer_qty' => $marketerQty,
            'reminder_qty' => $reminderQty,
            'user_qty' => $userQty,
            'to_marketer_qty' => $toMarketerQty,
            'withdraw_qty' => $withdrawQty
        ]);
    }
}
