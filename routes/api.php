<?php

use App\Http\Controllers\AgeVerificationController;
use App\Http\Controllers\AllPaymnetsLogoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Api\{BetCategoryController,
    BetCategorySearchController,
    BetController,
    BetSortController,
    BitController,
    FavoriteController,
    FavouriteBetController,
    OwnBetController,
    PaymnetsController,
    ProfileController,
    TransactionController,
    UserDataController};
use App\Http\Controllers\Payment\{
    AlphaPoController,
    PayOutController,
    WintecaController
};
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

/*
|--------------------------------------------------------------------------
| Email Verification Routes (Sanctum)
|--------------------------------------------------------------------------
*/


Route::middleware(['auth:sanctum'])->group(function () {

    // Resend verification email
    Route::post('/email/verification-notification', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified.']);
        }

        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification email sent.']);
    })->name('verification.send');
});

/*
|--------------------------------------------------------------------------
| Public Bet Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login')->name('login');
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:register')->name('register');


Route::get('/bets/carousel', [BetSortController::class, 'carousel']);
Route::get('/bets', [BetController::class, 'index']);
Route::get('/bets/{id}', [BetController::class, 'show']);
Route::get('/search-bet', [BetSortController::class, 'searchBet']);
Route::get('/finish-bets', [BetSortController::class, 'finishBet']);
Route::get('/hot-bets', [BetSortController::class, 'hotBets']);

Route::get('/bet-categories', [BetCategoryController::class, 'index']);
Route::get('/bet-categories/{id}', [BetCategoryController::class, 'show']);
Route::post('/search-category', [BetCategorySearchController::class, 'searchCategory']);

/*
|--------------------------------------------------------------------------
| Payment Webhooks
|--------------------------------------------------------------------------
*/

Route::post('/alphapo/callback', [AlphaPoController::class, 'handle']);
Route::post('/winteca/callback', [WintecaController::class, 'handle']);
Route::get('/winteca/payin/success', [WintecaController::class, 'payInSuccess']);
Route::get('/winteca/payin/fail', [WintecaController::class, 'payInFail']);
Route::get('/winteca/payin/pending', [WintecaController::class, 'payInPending']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware([EnsureFrontendRequestsAreStateful::class,'auth:sanctum', 'baduser'])->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('web');

    // Profile
    Route::get('show-my-profile',[ProfileController::class,'showProfile']);
    Route::put('update-profile', [ProfileController::class, 'updateProfile']);
    Route::put('/user/password', [UserDataController::class, 'changeUserPassword']);
    Route::get('user-data', [UserDataController::class, 'getUser']);
    Route::post('/verify-age', [AgeVerificationController::class, 'verifyAge']);
    Route::get('user-del',[ProfileController::class,'delProfile']);

    // Bets
    Route::post('/bet-categories', [BetCategoryController::class, 'store']);
    Route::post('/bets', [BetController::class, 'store']);
    Route::get('/own-bets', [OwnBetController::class, 'myBets']);
    Route::get('/own-bet/{id}/del',[OwnBetController::class,'delMyBet']);
    Route::get('/favorite-bets', [FavouriteBetController::class, 'favoriteBets']);
    Route::get('/union-own-and-favorite-bets', [FavouriteBetController::class, 'unionOwnFavBets']);
    Route::get('/favorites/{betId}', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');

    // Bits
    Route::post('bit/{answerId}', [BitController::class, 'createBit']);

    // Transactions
    Route::get('/transactions', [TransactionController::class, 'allUserTransactions']);

    //Payments
    Route::get('/all-payments-logo', AllPaymnetsLogoController::class);

    // Payments In
    Route::get('/payments/in', [PaymnetsController::class, 'allInPayments']);
    Route::get('/payments/in/method/{id}', [PaymnetsController::class, 'showMethod']);
    Route::get('/payments/in/deposit/{id}', [PaymnetsController::class, 'deposit']);


    // Payments Out
    Route::get('/payments/out', [PayOutController::class, 'allOutPayments']);
    Route::get('/payments/out/method/{id}', [PayOutController::class, 'showMethod']);
    Route::get('/payments/out/payout/{id}', [PayOutController::class, 'payOutPayment']);
    Route::post('/payments/out/payout/{id}/check-code', [PayOutController::class, 'checkCodeAndPayOut']);

    // Winteca
    Route::post('/winteca/check', [WintecaController::class, 'check']);
});

