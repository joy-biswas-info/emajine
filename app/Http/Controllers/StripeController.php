<?php /** @noinspection ALL */

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function checkout()
    {
        return view('checkout');
    }

    public function session(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('stripe.sk'));
        $serviceId = $request->service_id;
        $service = Service::find($serviceId);

        $order = new Order([
            'user_id' => Auth::user()->id,
            'service_id' => $service->id,
            'amount' => $service->price,
            'stripe_session_id' => ''
        ]);
        $order->save();

        $session = \Stripe\Checkout\Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'CAD',
                        'product_data' => [
                            'name' => $service->title,
                            'description' => $service->short_description,
                        ],
                        'unit_amount' => $service->price * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'allow_promotion_codes' => true,
            'mode' => 'payment',
            'success_url' => route('success'),
            'cancel_url' => route('checkout'),
        ]);

        $order->update([
            'stripe_session_id' => $session->id,
        ]);
        return redirect()->away($session->url);
    }


    public function success(Request $request)
    {
        return response()->json('Payment successfull');
    }

    // retrive the order 
    public function retrive_session()
    {
        \Stripe\Stripe::setApiKey(config('stripe.sk'));
        $session = \Stripe\Checkout\Session::retrieve('cs_test_b1GYeAmCsjAdQKUF3LhEuqSChpgx8zwrLb9o4SBzAnOEM0jihyDRsOhUNK', []);
        return response()->json($session);
    }

}