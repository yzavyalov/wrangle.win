@extends('layout.admin-layout')

@section('title')
    Bets and bits
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $err)
                        <li>{{ $err }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif
        <div class="overflow-hidden shadow-sm dashboard-bg dash-window">
            <div class="p-6">
                <table id="transactions-table" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Category</th>
                        <th scope="col">User_email</th>
                        <th scope="col">title</th>
                        <th scope="col">description</th>
                        <th scope="col">answers</th>
                        <th scope="col">winner</th>
                        <th scope="col">Sum</th>
                        <th scope="col">finish</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($bets as $bet)
                        <tr>
                            <td>{{ $bet->id }}</td>
                            <td>@foreach($bet->categories as $category) {{$category->name}}, @endforeach</td>
                            <td>{{ $bet->owner->email }}</td>
                            <td>
                                @can('edit all bet')
                                    <a href="{{ route('bet-edit',$bet->id) }}">{{ $bet->title }}</a>
                                @endcan
                            </td>
                            <td>{{ $bet->description }}</td>
                            <td>@foreach($bet->answers as $answer) {{ $answer->description }} - {{$answer->bits()->sum('sum')}}, @endforeach</td>
                            @if(isset($bet->winnerAnswer))
                                <td>{{ $bet->winnerAnswer->description }}</td>
                            @else
                                <td></td>
                            @endif

                            <td>{{ $bet->bits()->sum('sum') }}</td>
                            <td>{{ $bet->finish }}</td>
                            <td>
                                <!-- Кнопка для открытия модалки -->
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nominateWinnerModal{{ $bet->id }}">
                                    Nominate a winner
                                </button>

                                <!-- Модальное окно для выбора победителя -->
                                <div class="modal fade" id="nominateWinnerModal{{ $bet->id }}" tabindex="-1" aria-labelledby="nominateWinnerModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="nominateWinnerModalLabel">Nominate a winner for Bet #{{ $bet->id }}</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <!-- Форма для выбора победителя -->
                                                <form action="{{ route('bet-add-winner') }}" method="POST">
                                                    @csrf
                                                    <div class="mb-3">
                                                        <label for="winnerAnswer{{ $bet->id }}" class="form-label">Select winner</label>
                                                        <select class="form-select" name="winner_answer_id" id="winnerAnswer{{ $bet->id }}" required>
                                                            <option value="">Select an answer</option>
                                                            @foreach($bet->answers as $answer)
                                                                <option value="{{ $answer->id }}">{{ $answer->description }} - {{ $answer->bits()->sum('sum') }}</option>
                                                            @endforeach
                                                        </select>
                                                        <input type="hidden" name="bet_id" value="{{ $bet->id }}">
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" class="btn btn-primary">Nominate Winner</button>
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
            {{ $bets->links('pagination::bootstrap-5') }}
        </div>
    </div>
@endsection


@section('scripts')

@endsection
