@extends('layout.admin-layout')

@section('title')
    Payment - {{ $payment->name }}. Trust conditions setup.
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <form action="{{ route('payment-conditions-save') }}" method="POST">
            @csrf {{-- Не забудьте про CSRF защиту, если вы используете POST --}}
            <input type="hidden" id="payment_id" name="payment_id" value="{{ $payment->id }}">

            <div class="mb-3">
                <label for="number_deposits" class="form-label">Number of Deposits</label>
                <input type="text" name="number_deposits" id="number_deposits" class="form-control" value="{{ old('number_deposits') }}">
            </div>

            <div class="mb-3">
                <label for="value_deposits" class="form-label">Value of Deposits</label>
                <input type="text" name="value_deposits" id="value_deposits" class="form-control" value="{{ old('value_deposits') }}">
            </div>

            <div class="mb-3">
                <label for="number_withdraw" class="form-label">Number of Withdrawals</label>
                <input type="text" name="number_withdraw" id="number_withdraw" class="form-control" value="{{ old('number_withdraw') }}">
            </div>

            <div class="mb-3">
                <label for="value_withdraw" class="form-label">Value of Withdrawals</label>
                <input type="text" name="value_withdraw" id="value_withdraw" class="form-control" value="{{ old('value_withdraw') }}">
            </div>

            <div class="mb-3">
                <label for="registration_days" class="form-label">Registration Days</label>
                <input type="text" name="registration_days" id="registration_days" class="form-control" value="{{ old('registration_days') }}">
            </div>

            <div class="text-center mt-4">
                <button type="submit" class="btn btn-primary" id="btn-create-bet">Save Conditions</button>
            </div>
        </form>
    </div>

@endsection


@section('scripts')

@endsection
