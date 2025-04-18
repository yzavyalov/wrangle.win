@extends('layout.admin-layout')

@section('title')
    All transactions
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
                <div class="overflow-hidden shadow-sm dashboard-bg dash-window">
                    <div class="p-6">
                        <p>Transactions</p>
                        <table id="transactions-table"  class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">user</th>
                                <th scope="col">operation</th>
                                <th scope="col">status</th>
                                <th scope="col">method</th>
                                <th scope="col">sum</th>
                                <th scope="col">remaining</th>
                                <th scope="col">comment</th>
                                <th scope="col">created_at</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($transactions as $transaction)
                                <tr>
                                    <td>{{ $transaction->id }}</td>
                                    <td>{{ $transaction->user->name }}</td>
                                    <td>{{ \App\Http\Enums\TransactionOperationEnum::from($transaction->operation)->label()   }}</td>
                                    <td>{{ \App\Http\Enums\TransactionStatusEnum::from($transaction->status)->label() }}</td>
                                    <td>{{ \App\Http\Enums\TransactionMethodEnum::from($transaction->method)->label() }}</td>
                                    <td>{{ $transaction->sum }}</td>
                                    <td>{{ $transaction->remaining }}</td>
                                    <td>{{ $transaction->comment }}</td>
                                    <td>{{ $transaction->created_at }}</td>

                                    <td>
                                        <!-- Кнопка для открытия модалки -->
                                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nominateWinnerModal{{ $transaction->id }}">
                                            Change status
                                        </button>

                                        <!-- Модальное окно для выбора победителя -->
                                        <div class="modal fade" id="nominateWinnerModal{{ $transaction->id }}" tabindex="-1" aria-labelledby="nominateWinnerModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="nominateWinnerModalLabel">Status of transaction number #{{ $transaction->id }}</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <!-- Форма для выбора победителя -->
                                                        <form action="{{ route('transaction-change-status',$transaction->id) }}" method="POST">
                                                            @csrf
                                                            <div class="mb-3">
                                                                <label for="winnerAnswer{{ $transaction->id }}" class="form-label">Transaction's status</label>
                                                                <select class="form-select" name="status" id="winnerAnswer{{ $transaction->id }}" required>
                                                                    @foreach (\App\Http\Enums\TransactionStatusEnum::cases() as $status)
                                                                        <option value="{{ $status->value }}" @if($transaction->status === $status->value) selected @endif>
                                                                            {{ $status->label() }}
                                                                        </option>
                                                                    @endforeach
                                                                </select>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" class="btn btn-primary">Change status</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    {{ $transactions->links('pagination::bootstrap-5') }}
                </div>
    </div>
@endsection


@section('scripts')

@endsection
