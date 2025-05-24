@extends('layout.admin-layout')

@section('title')
    Payments' logs
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <div class="overflow-hidden shadow-sm dashboard-bg dash-window">
            <div class="p-6">
                <p>Payments' logs</p>

                {{-- Форма поиска по response --}}
                <form method="GET" action="{{ route('search-logs') }}" class="mb-3">
                    <div class="input-group">
                        <input
                            type="text"
                            name="response"
                            class="form-control"
                            placeholder="Search by response"
                            value="{{ request('response') }}"
                        >
                        <button class="btn btn-primary" type="submit">Search</button>
                    </div>
                </form>

                <div style="overflow-x: auto; width: 100%;">
                    <table id="transactions-table" class="table table-bordered table-striped" style="min-width: 900px;">
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">payment</th>
                            <th scope="col">payment_logtable_type</th>
                            <th scope="col">payment_logtable_id</th>
                            <th scope="col">response</th>
                            <th scope="col">created_at</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($logs as $log)
                            <tr>
                                <td>{{ $log->id }}</td>
                                <td>{{ $log->payment->name }}</td>
                                <td>{{ $log->payment_logtable_type }}</td>
                                <td>{{ $log->payment_logtable_id }}</td>
                                <td style="max-width: 300px; word-break: break-word;">{{ $log->response }}</td>
                                <td>{{ $log->created_at }}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            {{ $logs->links('pagination::bootstrap-5') }}
        </div>
    </div>



@endsection


@section('scripts')

@endsection
