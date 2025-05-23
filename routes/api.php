<?php

use App\Http\Controllers\Api\BetCategoryController;
use App\Http\Controllers\Api\BetCategorySearchController;
use App\Http\Controllers\Api\BetController;
use App\Http\Controllers\Api\BetSortController;
use App\Http\Controllers\Api\BitController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\PaymnetsController;
use App\Http\Controllers\Api\UserDataController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Payment\AlphaPoController;
use App\Http\Controllers\Payment\DepositController;
use App\Http\Controllers\Payment\PayOutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register', [AuthController::class, 'register'])->middleware('web');
Route::post('/login', [AuthController::class, 'login'])->name('login')->middleware('web');

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);


Route::get('/bets/carousel',[BetSortController::class,'carousel']);
Route::get('/bets', [BetController::class,'index']);
Route::get('/bets/{id}', [BetController::class,'show']);
Route::get('/search-bet',[BetSortController::class,'searchBet']);
Route::get('/finish-bets',[BetSortController::class,'finishBet']);
Route::get('/hot-bets',[BetSortController::class,'hotBets']);


Route::get('/bet-categories', [BetCategoryController::class,'index']);
Route::get('/bet-categories/{id}', [BetCategoryController::class,'show']);
Route::post('/search-category',[BetCategorySearchController::class,'searchCategory']);


//Вебхуки AlphaPo
Route::post('/alphapo/callback', [AlphaPoController::class, 'handle']);
//Route::post('/alphapo/signature', [AlphaPoController::class, 'generateSignatureExample']);

Route::middleware(['auth:sanctum','baduser'])->group(function (){
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('web');
    Route::put('/update-profile',[UserDataController::class,'updateProfile']);
    Route::put('/user/password', [UserDataController::class,'changeUserPassword']);

    Route::post('/bet-categories',[BetCategoryController::class,'store']);
    Route::post('/bets',[BetController::class,'store']);
    Route::post('/favorites/{betId}', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');
    Route::get('/own-bets',[BetSortController::class,'myBets']);
    Route::get('/favorite-bets',[BetSortController::class,'favoriteBets']);

    Route::post('bit/{answerId}',[BitController::class,'createBit']);
    Route::get('user-data',[UserDataController::class,'getUser']);

    //Payments
    Route::get('/payments/in',[PaymnetsController::class,'allInPayments']);
    Route::get('/payments/in/{id}',[PaymnetsController::class,'showIn']);
    Route::post('/payment/in/cryptoprocessing/deposit',[DepositController::class,'alphaPoDeposit']);
    Route::post('/payment/in/cryptoprocessing/new-deposit-adres',[DepositController::class,'alphaNewDepositAdres']);

    Route::get('/payment/deposit/cryptoprocessing/invoice/create',[DepositController::class,'cryptoInvoiceCreate']);

    Route::get('/payments/out',[PaymnetsController::class,'allOutPayments']);

    Route::get('/payment/deposit/cryptoprocessing/currency-list',[AlphaPoController::class,'cryptoList']);
    Route::get('/payment/deposit/cryptoprocessing/pare',[AlphaPoController::class,'pare']);
    Route::post('/payment/deposit/cryptoprocessing/rates',[AlphaPoController::class,'rates']);

    Route::get('/payments/out',[PaymnetsController::class,'allOutPayments']);
    Route::post('/payments/out/cryptoprocessing/payout',[PayOutController::class,'payoutCrypto']);



    Route::post('payment/payout/cryptoprocessing',[PayOutController::class,'payoutCrypto']);
});


