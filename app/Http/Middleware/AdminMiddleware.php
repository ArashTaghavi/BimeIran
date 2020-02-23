<?php

namespace App\Http\Middleware;

use App\Admin;
use Closure;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('admin-token', '!');
        if ($token === '!') {
            return response()->json(['status' => 403, 'message' => 'forbidden'], 403);
        }
        $session = Admin::where('token', $token);
        if ($session->count() == 0) {
            return response()->json(['status' => 403, 'message' => 'forbidden'], 403);
        }
        $admin = $session->first();

        $request->headers->set('admin', $admin->id);
        return $next($request);
    }
}
