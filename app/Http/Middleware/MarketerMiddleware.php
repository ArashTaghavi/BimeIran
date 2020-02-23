<?php

namespace App\Http\Middleware;

use App\Marketer;
use Closure;

class MarketerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('marketer-token', '!');
        if ($token === '!') {
            return response()->json(['status' => 403, 'message' => 'forbidden'], 403);
        }
        $session = Marketer::where('token', $token);
        if ($session->count() == 0) {
            return response()->json(['status' => 403, 'message' => 'forbidden'], 403);
        }
        $marketer = $session->first();

        $request->headers->set('marketer', $marketer->id);
        return $next($request);
    }
}
