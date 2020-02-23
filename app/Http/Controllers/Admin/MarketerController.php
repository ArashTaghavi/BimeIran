<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\Helpers\MjPersianDate;
use App\Marketer;
use App\MarketerAccount;
use App\MarketerCustomer;
use App\MarketerWithdraw;

class MarketerController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class);
    }

    public function getMarketers()
    {
        $marketers = Marketer::select('id','fname','lname','phone')->with('marketer_wallet')->get();

        $marketers->map(function($marketer) {
            $marketer->marketer_wallet->amount = number_format($marketer->marketer_wallet->amount);
            return $marketer;
        });

        return response()->json(['marketers' => $marketers]);
    }

    public function showMarketer($marketer_id)
    {
        $marketer = Marketer::where('id', $marketer_id)->with('marketer_account')->first();

        return response()->json(['marketer' => $marketer]);
    }

    public function getCustomers($marketer_id)
    {
        $customers = MarketerCustomer::select('id','full_name','national_code','phone')->where('marketer_id', $marketer_id)->get();

        return response()->json(['customers' => $customers]);
    }

    public function getCustomer($marketer_id, $customer_id)
    {
        $customer = MarketerCustomer::findOrFail($customer_id);

        return response()->json(['customer' => $customer]);
    }

    public function getWithdraws(Request $request)
    {
        $withdraws = MarketerWithdraw::select('id', 'marketer_id', 'amount', 'status', 'tracking_code', 'created_at')->orderBy('id', 'DESC')->with(['marketer'])->get();

        $withdraws->map(function ($withdraw) {
            $withdraw->amount = number_format($withdraw->amount);
            $withdraw->persian_date = MjPersianDate::jdate('d F Y', strtotime($withdraw->created_at));
            return $withdraw;
        });

        return response()->json(['withdraws' => $withdraws]);
    }

    public function getWithdraw($id)
    {
        $withdraw = MarketerWithdraw::findOrFail($id);

        $withdraw->amount = number_format($withdraw->amount);

        $marketerAccount = MarketerAccount::where('marketer_id', $withdraw->marketer_id)->first();

        $withdraw->account = $marketerAccount;

        return response()->json(['withdraw' => $withdraw]);
    }

    public function acceptWithdrawRequest(Request $request)
    {
        $withdraw = MarketerWithdraw::findOrFail($request->id);
        $withdraw->status = 1;
        $withdraw->tracking_code = $request->tracking_code;
        $withdraw->update();

        return response()->json(['status' => 202]);
    }
}
