<?php

use App\Http\Controllers\AdminPanel\AdminAuthController;
use App\Http\Controllers\AdminPanel\AdminTwoFactorAuthController;
use App\Http\Controllers\AdminPanel\BetCategoryController;
use App\Http\Controllers\AdminPanel\BetController;
use App\Http\Controllers\AdminPanel\BitController;
use App\Http\Controllers\AdminPanel\MoneyController;
use App\Http\Controllers\AdminPanel\PageController;
use App\Http\Controllers\AdminPanel\PaymentController;
use App\Http\Controllers\AdminPanel\PaymentMethodsController;
use App\Http\Controllers\AdminPanel\PaymentTrustConditionsController;
use App\Http\Controllers\AdminPanel\TransactionController;
use App\Http\Controllers\AdminPanel\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Bet;

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


Auth::routes();

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

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware(['signed','web'])
    ->name('verification.verify');

Route::get('/prediction', function () {         // temp route
    return Inertia::render('Prediction');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/terms', function () {
    return Inertia::render('Terms');
});

Route::get('/rules', function () {
    return Inertia::render('Rules');
});

Route::get('/privacy_policy', function () {
    return Inertia::render('PrivacyPolicy');
});

Route::get('/bet/{id}', function ($id) {
    $bet = Bet::findOrFail($id);

    return Inertia::render('Bet', [
        'bet' => $bet,
    ]);
});



Route::get('/categories', function () {
    return Inertia::render('Categories');
});

Route::get('/hots', function () {
    return Inertia::render('Hots');
});

Route::get('/404', function () {
    return Inertia::render('Page404');
});

Route::get('/form-reset-password',[PasswordResetController::class,'resetForm'] );

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');

Route::get('/auth/{provider}/redirect',[SocialController::class,'redirect'])->name('social.redirect');
Route::get('/auth/{provider}/callback',[SocialController::class,'callback'])->name('social.callback');

Route::middleware('authentication')->group(function (){
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');

    Route::get('/new_bet', function () {
        return Inertia::render('NewBet');
    });

});

Route::middleware('moderator')->prefix('/admin-panel')->group(function (){
    Route::post('/check-code',[AdminTwoFactorAuthController::class, 'checkCode'])->name('check-code');
    Route::get('/', [AdminTwoFactorAuthController::class, 'showInputForm'])->name('showInputForm');
    Route::get('/index', [PageController::class, 'mainPage'])->name('admin-panel');

    Route::get('/bets-all',[BetController::class,'allBets'])->name('bets-all');
    Route::get('/bet-show/{id}',[BetController::class,'show'])->name('bet-show');
    Route::put('/bet-edit/{id}',[BetController::class,'update'])->name('bet-edit');
    Route::get('/bet-del/{id}',[BetController::class,'del'])->name('bet-del');
    Route::get('/bet-create',[BetController::class,'create'])->name('bet-create');
    Route::post('/bet-store',[BetController::class,'store'])->name('bet-store');
    Route::get('/bet-select-form',[BetController::class,'selectForm'])->name('bet-select-form');
    Route::get('/bet-select',[BetController::class, 'select'])->name('bet-select');
    Route::get('/bets-and-bits',[BetController::class,'betsAndBits'])->name('bets-and-bits');
    Route::post('/bet/add-winner',[BetController::class, 'nominateWinner'])->name('bet-add-winner');

    Route::get('/all-bits',[BitController::class,'allbits'])->name('bits-all');

    Route::resource('bet-categories', BetCategoryController::class);
    Route::get('/search-bet-category',[BetCategoryController::class,'searchCategory'])->name('search-category');

    Route::get('/all-transactions',[TransactionController::class,'allTransactions'])->name('all-transactions');
    Route::post('/transaction-change-status/{id}',[TransactionController::class,'changeStatus'])->name('transaction-change-status');
    Route::get('/search-form-transactions',[TransactionController::class,'formSearchTransactions'])->name('search-form-transactions');
    Route::get('/search-transaction',[TransactionController::class,'search'])->name('search-transaction');

    Route::get('/payment-logs',[PaymentController::class,'allPaymentLogs'])->name('payment-logs');
    Route::get('/payment-logs/search',[PaymentController::class,'searchPaymentLogs'])->name('search-logs');

    Route::get('/all-users',[UserController::class,'allUsers'])->name('all-users');
    Route::get('/block-user/{id}',[UserController::class,'blockUser'])->name('block-user');
    Route::get('/unblock-user/{id}',[UserController::class,'unblockUser'])->name('unblock-user');
    Route::get('/add-black-list/{id}',[UserController::class,'addInIAFS'])->name('add-iafs');

    Route::get('/all-payments',[PaymentController::class,'index'])->name('all-payments');
    Route::get('/create-payments',[PaymentController::class,'create'])->name('create-payment');
    Route::post('/store-payments',[PaymentController::class,'store'])->name('store-payment');
    Route::get('/show-payment/{id}',[PaymentController::class,'showEditForm'])->name('payment-show');
    Route::put('/update-payment/{id}',[PaymentController::class,'updatePaymnet'])->name('payment-update');
    Route::get('/del-payment/{id}',[PaymentController::class,'delPayment'])->name('payment-del');
    Route::get('/payment/{id}/conditions/create',[PaymentTrustConditionsController::class,'create'])->name('form-payment-conditions');
    Route::post('/payment/conditions/save',[PaymentTrustConditionsController::class,'save'])->name('payment-conditions-save');
    Route::get('/payment/{id}/conditions/edit',[PaymentTrustConditionsController::class,'edit'])->name('payment-conditions-edit');
    Route::put('/payment/conditions/update',[PaymentTrustConditionsController::class,'update'])->name('payment-conditions-update');
    Route::get('/transaction/from-admin',[MoneyController::class,'index'])->name('from-admin-form');

    Route::get('/all-methods',[PaymentMethodsController::class,'all'])->name('all-methods');
    Route::get('/method/create',[PaymentMethodsController::class,'create'])->name('create-method-form');
    Route::post('method/store',[PaymentMethodsController::class,'store'])->name('store-method');
    Route::get('/method/{id}',[PaymentMethodsController::class,'show'])->name('method-show');
    Route::put('/method/{id}/update',[PaymentMethodsController::class,'update'])->name('method-update');
    Route::get('/method/{id}/del',[PaymentMethodsController::class,'delete'])->name('method-del');

    Route::get('/cascade-setup',[PaymentMethodsController::class,'cascadeSet'])->name('cascade-setup');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
