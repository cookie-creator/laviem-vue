<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function __construct()
    {

    }

    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('showed', 'asc')
            ->paginate(50);

        Notification::where('user_id', $user->id)
            ->where('showed', 0)
            ->update(['showed' => 1]);

        return NotificationResource::collection($notifications);
    }
}
