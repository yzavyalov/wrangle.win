<div>
    @foreach ($methods as $method)
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <img src="{{ asset('storage/' . $method->logo) }}" style="height: 40px;" class="me-2">
                    <strong>{{ $method->title }}</strong>
                </div>
                <button wire:click="save({{ $method->id }})" class="btn btn-sm btn-success">Save</button>
            </div>
            <div class="card-body">
                @foreach ($selectedPayments[$method->id] ?? [] as $index => $data)
                    <div class="border rounded p-3 mb-3">
                        <div class="row g-2">
                            <div class="col-md-4">
                                <label>Payment</label>
                                <select
                                    wire:model="selectedPayments.{{ $method->id }}.{{ $index }}.payment_id"
                                    class="form-select @error('selectedPayments.' . $method->id . '.' . $index . '.payment_id') is-invalid @enderror"
                                >
                                    <option value="">-- Select --</option>
                                    @foreach ($allPayments as $payment)
                                        <option value="{{ $payment->id }}">{{ $payment->name }}</option>
                                    @endforeach
                                </select>
                                @error('selectedPayments.' . $method->id . '.' . $index . '.payment_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-2">
                                <label>Order</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    wire:model="selectedPayments.{{ $method->id }}.{{ $index }}.order_by"
                                >
                            </div>

                            <div class="col-md-2">
                                <label>FTD</label>
                                <input
                                    type="text"
                                    class="form-control @error('selectedPayments.' . $method->id . '.' . $index . '.FTD') is-invalid @enderror"
                                    wire:model="selectedPayments.{{ $method->id }}.{{ $index }}.FTD"
                                >
                                @error('selectedPayments.' . $method->id . '.' . $index . '.FTD')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-2">
                                <label>FTD Limits</label>
                                <input
                                    type="text"
                                    class="form-control @error('selectedPayments.' . $method->id . '.' . $index . '.FTD_limits') is-invalid @enderror"
                                    wire:model="selectedPayments.{{ $method->id }}.{{ $index }}.FTD_limits"
                                >
                                @error('selectedPayments.' . $method->id . '.' . $index . '.FTD_limits')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-2">
                                <label>STD</label>
                                <input
                                    type="text"
                                    class="form-control @error('selectedPayments.' . $method->id . '.' . $index . '.STD') is-invalid @enderror"
                                    wire:model="selectedPayments.{{ $method->id }}.{{ $index }}.STD"
                                >
                                @error('selectedPayments.' . $method->id . '.' . $index . '.STD')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-2">
                                <label>STD Limits</label>
                                <input
                                    type="text"
                                    class="form-control @error('selectedPayments.' . $method->id . '.' . $index . '.STD_limits') is-invalid @enderror"
                                    wire:model="selectedPayments.{{ $method->id }}.{{ $index }}.STD_limits"
                                >
                                @error('selectedPayments.' . $method->id . '.' . $index . '.STD_limits')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-auto align-self-end">
                                <button
                                    type="button"
                                    wire:click="removePayment({{ $method->id }}, {{ $index }})"
                                    class="btn btn-danger btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                @endforeach

                <button type="button" wire:click="addPayment({{ $method->id }})" class="btn btn-secondary btn-sm mt-2">
                    Add Payment
                </button>
            </div>
        </div>
    @endforeach

    @if (session()->has('message'))
        <div class="alert alert-success mt-3">{{ session('message') }}</div>
    @endif
</div>
