@extends('layout.admin-layout')

@section('title')
    Search transactions
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <div class="overflow-hidden shadow-sm dashboard-bg dash-window">
            <div class="container py-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Search Transactions</h5>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('search-transaction') }}" method="get">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="id" class="form-label">Transaction ID</label>
                                    <input type="text" class="form-control" id="id" name="id">
                                </div>

                                <div class="col-md-6">
                                    <label for="user_id" class="form-label">User ID</label>
                                    <input type="text" class="form-control" id="user_id" name="user_id">
                                </div>

                                <div class="col-md-6">
                                    <label for="email" class="form-label">User Email</label>
                                    <input type="text" class="form-control" id="email" name="email">
                                </div>

                                <div class="col-md-6">
                                    <label for="operation" class="form-label">Operation</label>
                                    <select id="operation" name="operation" class="form-select">
                                        <option value="">All</option>
                                        @foreach(\App\Http\Enums\TransactionOperationEnum::cases() as $operation)
                                            <option value="{{ $operation->value }}">{{ $operation->label() }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <label for="status" class="form-label">Status</label>
                                    <select id="status" name="status" class="form-select">
                                        <option value="">All</option>
                                        @foreach(\App\Http\Enums\TransactionStatusEnum::cases() as $status)
                                            <option value="{{ $status->value }}">{{ $status->label() }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <label for="method" class="form-label">Method</label>
                                    <select id="method" name="method" class="form-select">
                                        <option value="">All</option>
                                        @foreach(\App\Http\Enums\TransactionMethodEnum::cases() as $method)
                                            <option value="{{ $method->value }}">{{ $method->label() }}</option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <label for="comment" class="form-label">Comment</label>
                                    <input type="text" class="form-control" id="comment" name="comment">
                                </div>

                                <div class="col-md-6">
                                    <label for="created_at" class="form-label">Created At</label>
                                    <input type="date" class="form-control" id="created_at" name="created_at">
                                </div>
                            </div>

                            <div class="mt-4 text-end">
                                <button type="submit" class="btn btn-success">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection


@section('scripts')

@endsection
