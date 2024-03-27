<?php
use App\Http\Controllers\AdminMessageController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;


Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {

    // ====================
    // Start Admin
    // ====================
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/getusers', [UserController::class, 'getUsers']);
    Route::get('/conversation', [ConversationController::class, 'show'])->name('all.conversation');
    Route::get('/conversations', [AdminMessageController::class, 'adminConversations']);
    Route::get('/conversation/{id}', [AdminMessageController::class, 'show']);
    Route::get('/get-message/{id}', [AdminMessageController::class, 'getMessage']);


    // Add Services 
    Route::get('/add-services', [ServiceController::class, 'create'])->name('add.services');
    Route::post('/add-services', [ServiceController::class, 'store'])->name('store.services');
    Route::get('/all-services', [ServiceController::class, 'createAllServices'])->name('all.services');



    // Sent invoices 
    Route::get("/invoice", [InvoiceController::class, 'show'])->name('invoices');
    Route::post("/create-invoice", [InvoiceController::class, 'store']);

    // ====================
    // End Admin
    // ====================

});