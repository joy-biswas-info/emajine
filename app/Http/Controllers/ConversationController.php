<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function show()
    {
        return Inertia::render('Admin/Conversation/Conversation');
    }
    public function index()
    {
        $userRole = Auth::user()->role;
        $userId = Auth::user()->id;
        if ($userRole === "Admin") {
            $data = Conversation::with('recipient', 'sender')->orderBy('updated_at', 'desc')->get();
            return response()->json($data, 200);
        } else {
            $data = Conversation::where('from_id', $userId)->orWhere('to_id', $userId)->get();
            return response()->json($data, 200);
        }

    }

    public function createConversation(Request $request)
    {
        $fromUserId = Auth::user()->id;
        $toUserId = $request->recepeant;
        $conversation = Conversation::where(function ($query) use ($fromUserId, $toUserId) {
            $query->where('from_id', $fromUserId)->where('to_id', $toUserId);
        })->orWhere(function ($query) use ($fromUserId, $toUserId) {
            $query->where('from_id', $toUserId)->where('to_id', $fromUserId);
        })->firstOrNew();

        if (!$conversation->exists) {
            $conversation->from_id = $fromUserId;
            $conversation->to_id = $toUserId;
            $conversation->last_message = $request->message;
            $conversation->save();
        } else {
            if ($request->message) {
                $conversation->update(['last_message' => $request->message]);
            }
        }
        return response()->json(['conversation' => $conversation]);
    }
    public function updateConversation(Request $request)
    {
        $conversation = Conversation::find($request->conversation_id);
        $userRole = Auth::user()->role;
        if ($conversation && $userRole === "Admin") {
            $conversation->update(['seen_by_admin' => true]);
        } else {
            $conversation->update(['seen_by_user' => true]);
        }

        return response()->json('Updated');

    }

    public function conversation(Request $request)
    {
        $userId = Auth::user()->id;
        $conversation = Conversation::where('from_id', $userId)->get();
        return response()->json(['conversation' => $conversation]);
    }
    public function singleConversation($id)
    {
        $conversation = Conversation::where('from_id', $id)->with('sender')->get();
        return response()->json($conversation, 200);
    }
}
