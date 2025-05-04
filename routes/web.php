<?php

use App\Http\Controllers\AdminPanel\AdminAuthController;
use App\Http\Controllers\AdminPanel\AdminTwoFactorAuthController;
use App\Http\Controllers\AdminPanel\BetCategoryController;
use App\Http\Controllers\AdminPanel\BetController;
use App\Http\Controllers\AdminPanel\BitController;
use App\Http\Controllers\AdminPanel\PageController;
use App\Http\Controllers\AdminPanel\PaymentController;
use App\Http\Controllers\AdminPanel\TransactionController;
use App\Http\Controllers\AdminPanel\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

Route::fallback(function () {
    if(Auth()->id()==null)

    // return redirect()->to('/');

    return redirect()->to('/404');
});

Route::get('/', function () {
    return Inertia::render('Home');
})->name('index');


Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::get('/prediction', function () {
    return Inertia::render('Prediction');
});

Route::get('/new_bet', function () {
    return Inertia::render('NewBet');
});

Route::get('/profile', function () {
    return Inertia::render('Profile', ['auth' => Auth::check(), 'user' => Auth::user(), 'session' => session()->all()]);
});

Route::get('/categories', function () {
    return Inertia::render('Categories');
});

Route::get('/404', function () {
    return Inertia::render('Page404');
});


Route::get('/form-reset-password', function (){dd('form here');});

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');

Route::middleware('moderator')->prefix('/admin-panel')->group(function (){
    Route::post('/check-code',[AdminTwoFactorAuthController::class, 'checkCode'])->name('check-code');
    Route::get('/', [AdminTwoFactorAuthController::class, 'showInputForm'])->name('showInputForm');
    Route::get('/index', [PageController::class, 'mainPage'])->name('admin-panel');

    Route::get('/bets-all',[BetController::class,'allBets'])->name('bets-all');
    Route::get('/bet-show/{id}',[BetController::class,'show'])->name('bet-show');
    Route::put('/bet-edit/{id}',[BetController::class,'update'])->name('bet-edit');
    Route::get('/bet-del/{id}',[BetController::class,'del'])->name('bet-del');
    Route::get('/bet-create',[BetController::class,'create'])->name('bet-create');
    Route::get('/bet-select-form',[BetController::class,'selectForm'])->name('bet-select-form');
    Route::get('/bet-select',[BetController::class, 'select'])->name('bet-select');
    Route::get('/bets-and-bits',[BetController::class,'betsAndBits'])->name('bets-and-bits');
    Route::post('/bet/add-winner',[BetController::class, 'nominateWinner'])->name('bet-add-winner');

    Route::get('/all-bits',[BitController::class,'allbits'])->name('bits-all');

    Route::resource('bet-categories', BetCategoryController::class);
    Route::get('/search-bet-category',[BetCategoryController::class,'searchCategory'])->name('search-category');

    Route::get('/all-transactions',[TransactionController::class,'allTransactions'])->name('all-transactions');
    Route::post('/transaction-change-status/{id}',[TransactionController::class,'changeStatus'])->name('transaction-change-status');

    Route::get('/all-users',[UserController::class,'allUsers'])->name('all-users');
    Route::get('/block-user/{id}',[UserController::class,'blockUser'])->name('block-user');
    Route::get('/unblock-user/{id}',[UserController::class,'unblockUser'])->name('unblock-user');
    Route::get('/add-black-list/{id}',[UserController::class,'addInIAFS'])->name('add-iafs');

    Route::get('/all-payments',[PaymentController::class,'index'])->name('all-payments');
    Route::get('/create-payments',[PaymentController::class,'create'])->name('create-payment');
    Route::post('/store-payments',[PaymentController::class,'store'])->name('store-payment');
    Route::get('/show-payment/{id}',[PaymentController::class,'showEditForm'])->name('payment-show');
    Route::put('/update-payment/{id}',[PaymentController::class,'updatePaymnet'])->name('payment-update');
    Route::get('/del-payment/{id}',[PaymentController::class,'delPaymnet'])->name('payment-del');
});
