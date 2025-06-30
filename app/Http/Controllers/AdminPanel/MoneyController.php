<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;

class MoneyController extends Controller
{
    public function index()
    {
        return view('admin-panel.transactions.payment-add-money-from-admin-form');
    }
}
