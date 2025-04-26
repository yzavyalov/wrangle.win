<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function allTransactions()
    {
        return view('admin-panel.transactions.all-transactions',['transactions' => Transaction::paginate(25)]);
    }

    public function changeStatus(TransactionRequest $request, $id)
    {
        $transaction = Transaction::query()->find($id);

        $transaction->update($request->validated());

        return redirect()->route('all-transactions');
    }
}
