<?php

namespace App\Http\Controllers\Marketer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\MarketerMiddleware;
use App\Helpers\MjPersianDate;
use Validator;
use App\MarketerAccount;
use App\MarketerWallet;
use App\MarketerWithdraw;

class FinancialController extends Controller
{
    public function __construct()
    {
        $this->middleware(MarketerMiddleware::class);
    }

    public function getAccountInfo(Request $request)
    {
        $accountInfo = MarketerAccount::where('marketer_id', $request->header('marketer'))->first();

        return response()->json(['account_info' => $accountInfo], 200);
    }

    public function updateAccountInfo(Request $request)
    {
        $accountInfo = MarketerAccount::where('marketer_id', $request->header('marketer'))->first();
        $accountInfo->bank_name = $request->bank_name;
        $accountInfo->account_number = $request->account_number;
        $accountInfo->shaba_number = $request->sheba_number;
        $accountInfo->card_number = $request->card_number;
        $accountInfo->update();

        return response()->json(['status' => 202]);
    }

    public function getWithdraws(Request $request)
    {
        $withdraws = MarketerWithdraw::select('id', 'amount', 'status', 'tracking_code', 'created_at')->where('marketer_id', $request->header('marketer'))->orderBy('id', 'DESC')->get();

        $withdraws->map(function ($withdraw) {
            $withdraw->amount = number_format($withdraw->amount);
            $withdraw->persian_date = MjPersianDate::jdate('d F Y', strtotime($withdraw->created_at));
            return $withdraw;
        });

        return response()->json(['withdraws' => $withdraws]);
    }

    public function handleWithdrawRequest(Request $request)
    {
        $messages = [
            'withdraw_amount.required' => 'مبلغ برداشت وجه نمی تواند خالی باشد.',
        ];

        $validator = Validator::make($request->all(), [
            'withdraw_amount' => 'required',
        ], $messages);
        if ($validator->fails()) return response($validator->errors(), 405);

        if ($request->withdraw_amount <= 100000)
        {
            return response()->json([
                "status" => -1,
                "error" => "less_equal_zero"
            ], 406);
        }

        $wallet = MarketerWallet::where('marketer_id', $request->header('marketer'))->first();

        if ($request->withdraw_amount > $wallet->amount)
        {
            return response()->json([
                "status" => -1,
                "error" => "greater_than_wallet"
            ], 406);
        }

        $marketerWithdraw = new MarketerWithdraw();
        $marketerWithdraw->marketer_id = $request->header('marketer');
        $marketerWithdraw->amount = $request->withdraw_amount;
        $marketerWithdraw->save();

        $wallet->amount = $wallet->amount - $request->withdraw_amount;
        $wallet->update();

        return response()->json(['status' => 201]);
    }
}
