<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class OrderController extends Controller
{
    public function index()
    {
        try {
            $userId = Auth::user()->id;
            $data = Order::where('user_id', $userId)->with('service')->get();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json('An error occured:' . $th->getMessage());
        }

    }
    public function orderAdmin()
    {
        $data = Order::get();
        return response()->json($data, 200);
    }

    public function updateOrder()
    {
        return response()->json('Order updated', 200);
    }

}

