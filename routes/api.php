<?php

use App\Http\Controllers\Api\BetCategoryController;
use App\Http\Controllers\Api\BetController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialController;
use Illuminate\Http\Request;
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
Route::get('/auth/{provider}/redirect',[SocialController::class,'redirect'])->name('social.redirect');
Route::get('/auth/{provider}/callback',[SocialController::class,'callback'])->name('social.callback');

Route::get('/bets', [BetController::class,'index']);
Route::get('/bets/{id}', [BetController::class,'show']);

Route::get('/bet-categories', [BetCategoryController::class,'index']);
Route::get('/bet-categories/{id}', [BetCategoryController::class,'show']);



Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::post('/bet-categories',[BetCategoryController::class,'store']);
    Route::post('/bets',[BetController::class,'store']);
});


