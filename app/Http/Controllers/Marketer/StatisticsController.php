<?php

namespace App\Http\Controllers\Marketer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\MarketerMiddleware;
use App\MarketerCustomer;
use App\MarketerWallet;
use App\News;

class StatisticsController extends Controller
{
    public function __construct()
    {
        $this->middleware(MarketerMiddleware::class);
    }

    public function getStatistics(Request $request)
    {
        $wallet = MarketerWallet::where('marketer_id', $request->header('marketer'))->first();
        $walletAmount = number_format($wallet->amount);

        $customersQty = MarketerCustomer::where('marketer_id', $request->header('marketer'))->count();

        $news = News::orderBy('id', 'DESC')->get();

        return response()->json([
            'customers_qty' => $customersQty,
            'wallet_amount' => $walletAmount,
            'news' => $news
        ]);
    }
}
