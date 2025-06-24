<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Http\Resources\CurrentUserResource;
use App\Http\Resources\TransactionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function allUserTransactions(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15);

        $page = $request->input('page', 1);

        $user = Auth::user();

        $transactions = $user->transactions()
            ->orderByDesc('created_at') // или ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        $user = CurrentUserResource::make($user);

        $transactions = TransactionResource::collection($transactions);

        return $this->successJsonAnswer200('User\'s transactions!',compact('user','transactions'));
    }
}
