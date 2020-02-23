<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\Marketer;
use App\MarketerAccount;
use App\MarketerWallet;
use App\ToMarketer;
use App\User;

class ToMarketerController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class);
    }

    public function getToMarketerRequests()
    {
        $toMarketers = ToMarketer::select('id', 'user_id', 'national_code','tel', 'status')->orderBy('id', 'DESC')->with(['user'])->get();

        return response()->json(['to_marketers' => $toMarketers]);
    }

    public function show($to_marketer_id)
    {
        $toMarketer = ToMarketer::where('id', $to_marketer_id)->with(['user'])->first();

        return response()->json(['to_marketer' => $toMarketer]);
    }

    public function acceptRequest(Request $request)
    {
        $toMarketer = ToMarketer::findOrFail($request->id);
        $toMarketer->status = 1;
        $toMarketer->update();

        $user = User::where('id', $toMarketer->user_id)->first();

        $marketer = new Marketer();
        $marketer->fname = $user->fname;
        $marketer->lname = $user->lname;
        $marketer->phone = $user->phone;
        $marketer->password = Hash::make($request->national_code);
        $marketer->save();

        $account = new MarketerAccount();
        $account->marketer_id = $marketer->id;
        $account->save();

        $wallet = new MarketerWallet();
        $wallet->marketer_id = $marketer->id;
        $wallet->amount = '0';
        $wallet->save();

        return response()->json(['status' => 202]);
    }

    public function rejectRequest(Request $request)
    {
        $toMarketer = ToMarketer::findOrFail($request->id);

        $toMarketer->status = 2;
        $toMarketer->admin_message = $request->admin_message;
        $toMarketer->update();

        return response()->json(['status' => 202]);
    }
}
