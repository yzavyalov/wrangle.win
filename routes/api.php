<?php

use App\Http\Controllers\AgeVerificationController;
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
    Route::put('/update-profile', [UserDataController::class, 'updateProfile']);
    Route::put('/user/password', [UserDataController::class, 'changeUserPassword']);
    Route::get('user-data', [UserDataController::class, 'getUser']);
    Route::post('/verify-age', [AgeVerificationController::class, 'verifyAge']);

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

    // Payments In
    Route::get('/payments/in', [PaymnetsController::class, 'allInPayments']);
    Route::get('/payments/in/method/{id}', [PaymnetsController::class, 'showMethod']);
    Route::get('/payments/in/deposit/{id}', [PaymnetsController::class, 'deposit']);

//    Route::post('/payment/in/cryptoprocessing/deposit', [DepositController::class, 'alphaPoDeposit']);
//    Route::post('/payment/in/cryptoprocessing/new-deposit-adres', [DepositController::class, 'alphaNewDepositAdres']);
//    Route::get('/payment/deposit/cryptoprocessing/invoice/create', [DepositController::class, 'cryptoInvoiceCreate']);

    Route::get('/payment/deposit/cryptoprocessing/currency-list', [AlphaPoController::class, 'cryptoList']);
    Route::get('/payment/deposit/cryptoprocessing/pare', [AlphaPoController::class, 'pare']);
    Route::post('/payment/deposit/cryptoprocessing/rates', [AlphaPoController::class, 'rates']);

    // Payments Out
    Route::get('/payments/out', [PayOutController::class, 'allOutPayments']);
    Route::get('/payments/out/method/{id}', [PayOutController::class, 'showMethod']);
    Route::get('/payments/out/payout/{id}', [PayOutController::class, 'payOutPayment']);
    Route::post('/payments/out/payout/{id}/check-code', [PayOutController::class, 'checkCodeAndPayOut']);

    Route::post('payment/payout/cryptoprocessing', [PayOutController::class, 'payoutCrypto']);
    Route::post('/payments/out/cryptoprocessing/payout', [PayOutController::class, 'payoutCrypto']);

    // Winteca
    Route::post('/winteca/check', [WintecaController::class, 'check']);
});

