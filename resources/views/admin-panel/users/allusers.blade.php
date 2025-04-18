@extends('layout.admin-layout')

@section('title')
    All users
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <div class="row">Total users: {{ $users->count() }}</div>
        <table id="example1" class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>balance</th>
                <th>Bits count</th>
                <th>All bits sum</th>
                <th>winning amount</th>
                <th>created_at</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }} @if($user->hasRole('badUser')) <span style="color: red">User in block</span> @endif</td>
                    <td>{{ $user->email }}</td>
                    <td>@if(isset($user->balance)) {{$user->balance->balance}}@else 0  @endif</td>
                    <td>{{ $user->bits->count() }}</td>
                    <td>{{ $user->bits->sum('sum') }}</td>
                    <td>{{ $user->debitTransactions->sum('sum') }}</td>
                    <td>{{ $user->created_at }}</td>
                    <td>
                        @if($user->hasRole('badUser'))
                            <button onclick="window.location.href='{{ route('unblock-user',$user->id) }}'">Unblock user</button>
                        @else
                            <button onclick="window.location.href='{{ route('block-user',$user->id) }}'">Block user</button>
                        @endif
                        <button onclick="window.location.href='{{ route('add-iafs',$user->id) }}'">Add user in IAFS base</button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {{ $users->links('pagination::bootstrap-5') }}
    </div>
@endsection


@section('scripts')

@endsection
