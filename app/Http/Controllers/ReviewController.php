<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Auth;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($serviceId)
    {

        $review = Review::where('service_id', $serviceId)->with('user')->get();
        return response()->json($review, 200);

    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'service_id' => 'required',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review = Review::create([
            'user_id' => auth()->id(),
            'service_id' => $validatedData['service_id'],
            'review' => $validatedData['review'],
            'rating' => $validatedData['rating'],
        ]);

        return response()->json(['message' => 'Review stored successfully'], 201);

    }
    public function update()
    {

    }

}
