<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\File;
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
        if (Auth::user()->role === 'Admin') {
            $conversation->update(['seen_by_admin' => true]);
            $conversation->update(['seen_by_user' => false]);
        } else {
            $conversation->update(['seen_by_admin' => false]);
            $conversation->update(['seen_by_user' => true]);
        }
        ;
        $conversation->messages()->save($message);
        if ($request->hasFile('file')) {
            $timestamp = now()->timestamp;
            $customeFileName = $timestamp . '_' . 'emajine' . '.' . $request->file('file')->getClientOriginalExtension();
            $filePath = $request->file('file')->storeAs('files', $customeFileName, 'public');
            $file = File::create([
                'file' => $filePath,
                'message_id' => $message->id
            ]);
        }
        // Return the response
        return response()->json($message);

    }

    public function getMessage($id)
    {
        $data = Message::latest('created_at')->with('file', "fromUser", "toUser")->where('conversation_id', $id)->paginate(30);
        return response()->json($data, 200);
    }
}
