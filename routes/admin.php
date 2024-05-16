<?php
use App\Http\Controllers\AdminMessageController;
use App\Http\Controllers\AnonimusInvoiceController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;


Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {

    // ====================
    // Start Admin
    // ====================

    // Dashboard 
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/getusers', [UserController::class, 'getUsers']);
    Route::get('/conversation', [ConversationController::class, 'show'])->name('all.conversation');
    Route::get('/conversations/{id}', [ConversationController::class, 'singleConversation']);
    Route::get('/conversations', [AdminMessageController::class, 'adminConversations']);
    Route::get('/conversation/{id}', [AdminMessageController::class, 'show']);
    Route::get('/get-message/{id}', [AdminMessageController::class, 'getMessage']);


    // Services 
    Route::get('/add-services', [ServiceController::class, 'create'])->name('add.services');
    Route::post('/add-services', [ServiceController::class, 'store'])->name('store.services');
    Route::get('/all-services', [ServiceController::class, 'createAllServices'])->name('all.services');
    Route::delete("/service/delete/{service}", [ServiceController::class, 'destroy'])->name('delete.service');


    // invoices 
    Route::get("/anonimus/invoice", [InvoiceController::class, 'AnonimusInvoice'])->name('AnonimusInvoice');
    Route::post("/admin/create-invoice-anonimus", [AnonimusInvoiceController::class, 'store']);
    Route::get('/all-anonimus-invoice', [AnonimusInvoiceController::class, 'index']);
    Route::get('/anonimus/invoices', [AnonimusInvoiceController::class, 'showAll'])->name('anonimus.invoices');
    Route::get("/invoice", [InvoiceController::class, 'show'])->name('invoices');
    Route::post("/create-invoice", [InvoiceController::class, 'store']);
    Route::get("/invoices", [InvoiceController::class, 'showAllInvoice'])->name('all.invoices');
    Route::get("/get-invoices", [InvoiceController::class, 'allInvoice'])->name('get.invoices');
    Route::delete('/delete/anonimus-invoice/{invoice}', [AnonimusInvoiceController::class, 'destroy']);
    Route::delete('/delete/anonimus-invoice/{invoice}', [InvoiceController::class, 'destroy']);


    // Orders
    Route::get('/orders', [OrderController::class, 'orderAdmin'])->name('orders');

    // ====================
    // End Admin
    // ====================

});