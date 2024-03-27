<?php

use App\Http\Controllers\AdminMessageController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\Message\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/message', [MessageController::class, 'index'])->name('messages');
    Route::get('/messages/{id}', [MessageController::class, 'getMessage']);
    Route::post('/send-message', [MessageController::class, 'sendMessage'])->name('send.message');
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::post('/create-conversations', [ConversationController::class, 'createConversation']);
    // Route::post('/create-conversations', [ConversationController::class, 'createConversation']);
    Route::get('/files/{conversationId}', [FileController::class, 'getFile']);
    Route::post('/file', [FileController::class, 'uploadFile']);

    //! Service routes 
    Route::get('/services', [ServiceController::class, 'show'])->name('services');
    Route::get('/all-services', [ServiceController::class, 'index'])->name('all.services');
    Route::get('/single/{service}', [ServiceController::class, 'single'])->name('single.services');
    Route::get('/single-service/{service}', [ServiceController::class, 'getSingleService'])->name('single.services');
    Route::get('/checkout', [StripeController::class, 'checkout'])->name('checkout');
    Route::post('/session', [StripeController::class, 'session'])->name('session');
    Route::get('/success', [StripeController::class, 'success'])->name('success');
    Route::get('/payment-success', [StripeController::class, 'paymentSuccess'])->name('payment_success');
    // Order Route 
    Route::get('/orders', [OrderController::class, 'index']);

    // Invoice 
    Route::get('/invoices', [InvoiceController::class, 'index']);
    // Review 
    Route::post('/add-review', [ReviewController::class, 'store']);
});

Route::get('/reviews/{serviceId}', [ReviewController::class, 'index']);
Route::get('/', [ServiceController::class, 'show'])->name('services');
Route::get('/services', [ServiceController::class, 'show'])->name('services');
Route::get('/all-services', [ServiceController::class, 'index'])->name('all.services');
Route::get('/single/{service}', [ServiceController::class, 'single'])->name('single.services');
Route::get('/single-service/{service}', [ServiceController::class, 'getSingleService'])->name('single.services');




require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
