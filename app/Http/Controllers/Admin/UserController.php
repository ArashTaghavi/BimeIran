<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class)->except(['login']);
    }

    public function getUsers()
    {
        $users = User::select('id','fname','lname','phone')->get();

        return response()->json(['users' => $users]);
    }

    public function show($user_id)
    {
        $user = User::where('id', $user_id)->with(['wallet', 'province', 'city'])->first();

        return response()->json(['user' => $user]);
    }
}
