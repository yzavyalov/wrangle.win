<?php

namespace App\Livewire;

use App\Http\Enums\TransactionMethodEnum;
use App\Models\User;
use App\Services\TransactionService;
use Livewire\Component;

class AddMoneyManual extends Component
{
    public string $email = '';
    public ?User $user = null;
    public string $message = '';
    public $lastTransactions = [];

    public bool $showTopUp = false;
    public $topUpAmount = null;

    protected TransactionService $transactionService;

    public function mount(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function search()
    {
        $this->reset(['user', 'message', 'lastTransactions']);

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $this->message = 'Invalid email format.';
            return;
        }

        $this->user = User::where('email', $this->email)->first();

        if (!$this->user) {
            $this->message = 'User not found.';
            return;
        }

        $this->loadTransactions();
    }

    public function loadTransactions()
    {
        if (!$this->user) {
            $this->lastTransactions = collect();
            return;
        }

        $this->lastTransactions = $this->user->transactions()
            ->latest()
            ->take(10)
            ->get();
    }

    public function showTopUpForm()
    {
        $this->showTopUp = true;
    }

    public function topUp()
    {
        $this->validate([
            'topUpAmount' => 'required|numeric|min:0.01',
        ]);

        app(TransactionService::class)->debit(
            $this->user->id,
            $this->topUpAmount,
            'Manual top-up via admin panel',
            TransactionMethodEnum::BONUS
        );

        $this->topUpAmount = null;
        $this->showTopUp = false;
        $this->message = 'Balance successfully topped up.';
        $this->loadTransactions();
    }

    public function render()
    {
        return view('livewire.add-money-manual');
    }
}
