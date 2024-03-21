<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {

        return Inertia::render(
            'Messages/Messages',
        );
    }

    public function sendMessage(Request $request)
    {
        $validatedData = $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        $fromUserId = Auth::user()->id;
        $conversation = Conversation::find($request->conversatioId);
        if (!$conversation->exists) {
            return response()->json("error", 404);
        }
        // Create and save the message
        $message = new Message();
        $message->message = $validatedData['message'];
        $message->to_id = $conversation->to_id;
        $message->from_id = $fromUserId;
        $conversation->update(['last_message' => $message->message = $validatedData['message']]);
        $conversation->messages()->save($message);
        // Return the response
        return response()->json($message);

    }

    public function getMessage($id)
    {
        $data = Message::latest('created_at')->where('conversation_id', $id)->paginate(10);
        return response()->json($data, 200);
    }
}
