<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function getFile(Request $request, $conversationId)
    {

        $data = File::where('conversation_id', $conversationId)->get();
        return response()->json($data, 200);
    }

    public function uploadFile(Request $request)
    {
        $validatedData = $request->validate([
            'file' => 'required',
            'conversation_id' => 'required'
        ]);

        // Get the current timestamp
        $timestamp = now()->timestamp;
        // Generate a unique name for the thumbnail using the timestamp
        $customeFileName = $timestamp . '_' . 'emajine' . '.' . $request->file('file')->getClientOriginalExtension();

        // Store the file with the custom name
        $filePath = $request->file('file')->storeAs('files', $customeFileName, 'public');

        $file = File::create([
            'conversation_id' => $validatedData['conversation_id'],
            'file' => $filePath,
        ]);
        return response()->json('file uploaded', 200);
    }
}
