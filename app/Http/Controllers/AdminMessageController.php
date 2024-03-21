<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Number;

class AdminMessageController extends Controller
{
    public function show($id)
    {
        return Inertia::render('Admin/AdminMessage', ["param" => $id]);
    }

    public function getMessage($id)
    {
        $data = Message::latest('created_at')->where('conversation_id', $id)->paginate(10);
        return response()->json($data, 200);
    }
}
