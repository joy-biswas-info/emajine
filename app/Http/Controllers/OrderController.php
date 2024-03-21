<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Charge;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\StripeClient;

class OrderController extends Controller
{
    public function show()
    {
        return Inertia("Checkout/Checkout");
    }

}

