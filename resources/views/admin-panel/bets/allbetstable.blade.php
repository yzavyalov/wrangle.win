@extends('layout.admin-layout')

@section('title')
    All bets
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <table id="example1" class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>user_id</th>
                <th>category_id</th>
                <th>title</th>
                <th>image</th>
                <th>status</th>
                <th>description</th>
                <th>finish</th>
                <th>created_at</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($bets as $bet)
                <tr>
                    <td>{{ $bet->id }}</td>
                    <td>{{ $bet->user_id }}</td>
                    <td>{{ $bet->categories->pluck('name') }}</td>
                    <td><a href="{{ route('bet-show',$bet->id) }}">{{ $bet->title }}</a></td>
                    <td>{{ $bet->image }}</td>
                    <td>{{ \App\Http\Enums\BetStatusEnum::from($bet->status)->label() }}</td>
                    <td>{{ $bet->description }}</td>
                    <td>{{ $bet->finish }}</td>
                    <td>{{ $bet->created_at }}</td>
                    <td>
                        <button onclick="window.location.href='{{ route('bet-show',$bet->id) }}'">EDIT</button>
                        <button
                            onclick="if (confirm('Are you shure?')) window.location.href='{{ route('bet-del',$bet->id) }}'">
                            DELETE
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {{ $bets->links('pagination::bootstrap-5') }}
    </div>
@endsection


@section('scripts')

@endsection
