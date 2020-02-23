<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\Reminder;

class ReminderController extends Controller
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class);
    }

    public function getReminders()
    {
        $reminders = Reminder::select('id','fullname','phone','deadline','code')->where('status', '<', 4)->get();

        return response()->json(['reminders' => $reminders]);
    }

    public function show($reminder_id)
    {
        $reminder = Reminder::where('id', $reminder_id)->first();

        return response()->json(['reminder' => $reminder]);
    }

    public function update(Request $request, $reminder_id)
    {
        $reminder = Reminder::where('id', $reminder_id)->first();
        $reminder->status = $request->status;
        $reminder->description = $request->description;
        $reminder->update();

        return response()->json(['reminder' => $reminder]);
    }
}
