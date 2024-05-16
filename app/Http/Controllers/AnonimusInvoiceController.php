<?php

namespace App\Http\Controllers;

use App\Models\AnonimusInvoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Invoice;
use Stripe\Stripe;
use Stripe\StripeClient;
use Stripe\Invoice as StripeInvoice;

class AnonimusInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->role;
        if ($user !== "Admin") {
            abort(403);
        }
        Stripe::setApiKey(config('stripe.sk'));
        $data = AnonimusInvoice::all();
        $invoicesData = [];
        foreach ($data as $item) {
            $invoice = StripeInvoice::retrieve($item->invoice_id);
            $invoicesData[] = [
                'id' => $item->id,
                'invoice_id' => $invoice->id,
                'amount_due' => $invoice->amount_due,
                'amount_paid' => $invoice->amount_paid,
                'status' => $invoice->status,
                'url' => $invoice->hosted_invoice_url,
            ];
        }
        ;
        return response()->json($invoicesData, 200);
    }
    public function showAll()
    {
        return Inertia("Admin/Invoice/AnonimusInvoices");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        $stripe = new StripeClient(config('stripe.sk'));

        // have to find out the service using the service id and add the service id to the invoice service id 
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
                'name' => $request->name,
                'email' => $request->user_email,
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
        AnonimusInvoice::create([
            'invoice_id' => $init_invoice['id'],
            'user_email' => $request->user_email,
            'user_name' => $request->name,
            'currency' => $request->currency,
            'expire' => 30,
            'price' => $request->price,
            'url' => $sent['hosted_invoice_url'],
        ]);
        return response()->json(['message' => 'Invoice Created Successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($c)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($c)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnonimusInvoice $invoice)
    {
        $invoice->delete();
        return response()->json('Invoice deleted successfully', 200);
    }
}
