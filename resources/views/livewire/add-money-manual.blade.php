<div>
    <form wire:submit.prevent="search" class="d-flex align-items-center gap-2 mb-3">
        <input type="email" wire:model.defer="email" class="form-control w-auto" placeholder="Enter user email">
        <button type="submit" class="btn btn-primary">Search</button>
    </form>

    @if($message)
        <div class="alert alert-info">{{ $message }}</div>
    @endif

    @if($user)
        <div class="alert alert-success">
            <strong>User found:</strong><br>
            Name: {{ $user->name }}<br>
            Email: {{ $user->email }}<br>
            ID: {{ $user->id }}<br>
            Balance: {{ $user->balance->balance ?? 0 }}

            <button wire:click="showTopUpForm" class="btn btn-success mt-2">Top up the balance</button>

            @if($showTopUp)
                <form wire:submit.prevent="topUp" class="mt-3">
                    <div class="input-group">
                        <input type="number" step="0.01" min="0" wire:model.defer="topUpAmount" class="form-control" placeholder="Enter amount">
                        <button type="submit" class="btn btn-primary">Top Up</button>
                    </div>
                    @error('topUpAmount') <small class="text-danger">{{ $message }}</small> @enderror
                </form>
            @endif
        </div>

        <h5 class="mt-3">Last 10 Transactions:</h5>
        <ul class="list-group">
            @forelse($lastTransactions as $tx)
                <li class="list-group-item">
                    #{{ $tx->id }} — {{ \App\Http\Enums\TransactionOperationEnum::from($tx->operation)->label() }} —
                    {{ \App\Http\Enums\TransactionStatusEnum::from($tx->status)->label() }} —
                    {{ \App\Http\Enums\TransactionMethodEnum::from($tx->method)->label() }} —
                    {{ $tx->sum }} —
                    {{ $tx->comment }} —
                    {{ $tx->created_at->format('Y-m-d H:i') }}
                </li>
            @empty
                <li class="list-group-item">No transactions found.</li>
            @endforelse
        </ul>
    @endif
</div>

