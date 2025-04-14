<?php

use App\Http\Controllers\AdminPanel\AdminAuthController;
use App\Http\Controllers\AdminPanel\AdminTwoFactorAuthController;
use App\Http\Controllers\AdminPanel\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('index');

Route::get('/form-reset-password', function (){dd('form here');});

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');

Route::middleware('moderator')->prefix('/admin-panel')->group(function (){
    Route::post('/check-code',[AdminTwoFactorAuthController::class, 'checkCode'])->name('check-code');
    Route::get('/', [AdminTwoFactorAuthController::class, 'showInputForm'])->name('showInputForm');
    Route::get('/index', [PageController::class, 'mainPage'])->name('admin-panel');
});
