<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\StripeClient;


class InvoiceController extends Controller
{
    public function show()
    {
        $users = User::get();
        return Inertia('Admin/Invoice/Invoice', ['users' => $users]);
    }
    public function store(Request $request)
    {

        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json('No user found');
        }

        $stripe = new StripeClient(config('stripe.sk'));
        $product = $stripe->products->create([
            'name' => $request->service,
        ]);

        $price = $stripe->prices->create(
            [
                'product' => $product['id'],
                'unit_amount' => $request->price * 100,
                'currency' => $request->currency,
            ]

        );


        $customer = $stripe->customers->create(
            [
                'name' => $user->name,
                'email' => $user->email,
                'description' => 'Invoice Level Customer',
            ]
        );


        $stripe->invoiceItems->create(
            [
                'customer' => $customer['id'],
                'price' => $price['id'],
                'quantity' => 1
            ]
        );

        $init_invoice = $stripe->invoices->create(
            [
                'customer' => $customer['id'],
                'collection_method' => 'send_invoice',
                'days_until_due' => 30,
                'auto_advance' => false,
                'pending_invoice_items_behavior' => 'include'
            ]
        );

        $stripe->invoices->finalizeInvoice($init_invoice['id'], []);

        $sent = $stripe->invoices->sendInvoice($init_invoice['id'], []);
        Invoice::create([
            'price_id' => $price['id'],
            'customer_id' => $customer['id'],
            'invoice_id' => $init_invoice['id'],
            'user_id' => $user->id,
            'currency' => $request->currency,
            'expire' => 30,
            'price' => $request->price,
            'url' => $sent['hosted_invoice_url']
        ]);
        return response()->json('Invoice Created Successfully', 200);
    }
}
