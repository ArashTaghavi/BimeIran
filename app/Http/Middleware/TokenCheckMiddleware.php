<?php

namespace App\Http\Middleware;

use App\Session;
use Carbon\Carbon;
use Closure;

class TokenCheckMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->cookie("x-ref-token", "!");
        if ($token === "!") {
            return response()->json(["status" => 403, "message" => "forbidden"], 403);
        }

        $session = Session::where('session_key', $token);
        if ($session->count() == 0) {
            return response()->json(["status" => 403, "message" => "forbidden"], 403);
        }

        $session = $session->first();

        if (Carbon::parse($session->session_valid_until)->lt(Carbon::now())) {
            return response()->json(["status" => 403, "message" => "expired token"], 403);
        }

        $user = $session->user()->first();

        $session->last_access = Carbon::now()->format("Y-m-d H:i:s");
        $session->save();

        $request->headers->set("user", $session->user_id);

        return $next($request);
    }
}
