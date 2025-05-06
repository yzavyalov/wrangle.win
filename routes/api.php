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
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);


Route::get('/bets', [BetController::class,'index']);
Route::get('/bets/{id}', [BetController::class,'show']);
Route::post('/search-bet',[BetSortController::class,'searchBet']);
Route::get('/finish-bets',[BetSortController::class,'finishBet']);
Route::get('/hot-bets',[BetSortController::class,'hotBets']);

Route::get('/bet-categories', [BetCategoryController::class,'index']);
Route::get('/bet-categories/{id}', [BetCategoryController::class,'show']);
Route::post('/search-category',[BetCategorySearchController::class,'searchCategory']);

Route::get('/payments/in',[PaymnetsController::class,'allInPayments']);
Route::get('/payments/out',[PaymnetsController::class,'allOutPayments']);

Route::middleware(['auth:sanctum','baduser'])->group(function (){
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::post('/bet-categories',[BetCategoryController::class,'store']);
    Route::post('/bets',[BetController::class,'store']);
    Route::post('/favorites/{betId}', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');
    Route::get('/own-bets',[BetSortController::class,'myBets']);
    Route::get('/favorite-bets',[BetSortController::class,'favoriteBets']);

    Route::post('bit/{answerId}',[BitController::class,'createBit']);
    Route::get('user-data',[UserDataController::class,'getUser']);
});


