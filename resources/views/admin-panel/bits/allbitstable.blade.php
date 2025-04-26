@extends('layout.admin-layout')

@section('title')
    All bits
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <table id="example1" class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>user_id</th>
                <th>user_email</th>
                <th>bet_id</th>
                <th>answer_id</th>
                <th>sum</th>
                <th>created_at</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($bits as $bit)
                <tr>
                    <td>{{ $bit->id }}</td>
                    <td>{{ $bit->user_id }}</td>
                    <td>{{ $bit->user->email }}</td>
                    <td>{{ $bit->bet_id }}</td>
                    <td>{{ $bit->answer_id }}</td>
                    <td>{{ $bit->sum }}</td>
                    <td>{{ $bit->created_at }}</td>
                    <td>
{{--                        <button onclick="window.location.href='{{ route('bet-show',$bit->id) }}'">EDIT</button>--}}
{{--                        <button--}}
{{--                            onclick="if (confirm('Are you shure?')) window.location.href='{{ route('bet-del',$bit->id) }}'">--}}
{{--                            DELETE--}}
{{--                        </button>--}}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {{ $bits->links('pagination::bootstrap-5') }}
    </div>
@endsection


@section('scripts')

@endsection
