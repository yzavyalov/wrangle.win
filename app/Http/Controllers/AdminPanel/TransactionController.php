<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Filters\TransactionFilter;
use App\Http\Requests\TransactionRequest;
use App\Http\Requests\TransactionSearchRequest;
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

    public function formSearchTransactions()
    {
        return view('admin-panel.transactions.search-form-transactions');
    }

    public function search(TransactionSearchRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(TransactionFilter::class, ['queryParams' => array_filter($data)]);

        $transactions= Transaction::filter($filter)->paginate(15)->withQueryString();

        return view('admin-panel.transactions.all-transactions',compact('transactions'));
    }
}
