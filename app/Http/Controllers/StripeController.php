<?php /** @noinspection ALL */

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function checkout()
    {
        return view('checkout');
    }

    public function session(Request $request)
    {
        Stripe::setApiKey(config('stripe.sk'));
        $serviceId = $request->service_id;
        $service = Service::find($serviceId);

        $session = \Stripe\Checkout\Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'CAD',
                        'product_data' => [
                            'name' => $service->title,
                            'description' => strip_tags($service->short_description),
                        ],
                        'unit_amount' => $service->price * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'allow_promotion_codes' => true,
            'mode' => 'payment',
            'billing_address_collection' => 'required',
            'customer_email' => Auth::user()->email,
            'success_url' => url("/success?session_id={CHECKOUT_SESSION_ID}&service_id={$serviceId}"),
            'cancel_url' => route('services'),
        ]);

        return redirect()->away($session->url);
    }


    public function success(Request $request)
    {
        Stripe::setApiKey(config('stripe.sk'));
        $serviceId = $request->query('service_id');
        $service = Service::find($serviceId);
        $sessionId = $request->query('session_id');
        $validator = Validator::make($request->all(), [
            'payment_intent' => 'unique:orders,payment_intent',
            'stripe_session_id' => 'unique:orders,stripe_session_id',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            abort(404);
        }
        if ($service) {
            $session = \Stripe\Checkout\Session::retrieve($sessionId, []);
            if ($session->payment_status === 'paid') {
                $existingOrder = Order::where('payment_intent', $session->payment_intent)
                    ->orWhere('stripe_session_id', $sessionId)
                    ->first();

                if (!$existingOrder) {
                    $order = new Order([
                        'user_id' => Auth::user()->id,
                        'service_id' => $service->id,
                        'amount' => $service->price,
                        'stripe_session_id' => $sessionId,
                        'payment_intent' => $session->payment_intent
                    ]);

                    $order->save();
                    return Inertia::render('PaymentSuccess');
                } else {
                    return redirect('/');
                }
            }
        }
    }
    public function paymentSuccess()
    {
        return Inertia::render('PaymentSuccess');
    }

}