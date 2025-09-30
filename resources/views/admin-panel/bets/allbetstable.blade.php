@extends('layout.admin-layout')

@section('title', 'All bets')

@section('content')
            <!-- Форма поиска -->
        <div class="card">
            <form id="quickForm" action="{{ route('bet-select') }}" method="get">
                @csrf
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="bet_id">Bet ID</label>
                                <input type="text" name="bet_id" class="form-control" id="bet_id" placeholder="Enter bet ID" value="{{ request('bet_id') }}">
                            </div>
                            <input type="hidden" name="table" value="1">
                            <div class="form-group">
                                <label for="status">Status</label>
                                <select name="status" id="status" class="form-control">
                                    <option value="">-- All --</option>
                                    @foreach($statuses as $status)
                                        <option value="{{ $status->value }}" {{ request('status') == $status->value ? 'selected' : '' }}>
                                            {{ $status->label() }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="finish">Finish date</label>
                                <input type="date" name="finish" class="form-control" id="finish" value="{{ request('finish') }}">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="user_id">User ID</label>
                                <input type="text" name="user_id" class="form-control" id="user_id" placeholder="Enter user ID" value="{{ request('user_id') }}">
                            </div>
                            <div class="form-group">
                                <label for="created_at">Created date</label>
                                <input type="date" name="created_at" class="form-control" id="created_at" value="{{ request('created_at') }}">
                            </div>
                            <div class="form-group">
                                <label for="title">Text from title or description</label>
                                <input type="text" name="title" class="form-control" id="title" placeholder="Enter text from title or description" value="{{ request('title') }}">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="categories">Categories</label>
                        <div class="border rounded p-3 mb-3" style="max-height: 6em; overflow-y: auto;">
                            @foreach($categories as $category)
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        name="categories[]"
                                        value="{{ $category->id }}"
                                        id="category{{ $category->id }}"
                                        {{ is_array(request('categories')) && in_array($category->id, request('categories')) ? 'checked' : '' }}
                                    >
                                    <label class="form-check-label" for="category{{ $category->id }}">
                                        {{ $category->name }}
                                    </label>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                <div class="text-center mb-4">
                    <button type="submit" class="btn btn-primary al">Submit</button>
                </div>
            </form>


            <!-- Таблица ставок -->
            <div class="table-responsive">
                <table id="betsTable" class="table table-bordered table-striped" style="width:100%">
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
                        @hasrole(['admin', 'finance manager'])<th>winner</th>@endhasrole
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($bets as $bet)
                        <tr>
                            <td>{{ $bet->id }}</td>
                            <td>{{ $bet->user_id }}</td>
                            <td>{{ $bet->categories->pluck('name')->join(', ') }}</td>
                            <td><a href="{{ route('bet-show',$bet->id) }}">{{ $bet->title }}</a></td>
                            <td>{{ $bet->image }}</td>
                            <td>{{ \App\Http\Enums\BetStatusEnum::from($bet->status)->label() }}</td>
                            <td>{{ $bet->description }}</td>
                            <td>{{ $bet->finish }}</td>
                            <td>{{ $bet->created_at }}</td>
                            @hasrole(['admin', 'finance manager'])
                            <td>
                                @if(!empty($bet->winnerAnswer))
                                    {{$bet->winnerAnswer->description}}
                                @else
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
                            @endif
                            @endhasrole
                            <td>
                                <button class="btn btn-sm btn-primary mb-1" onclick="window.location.href='{{ route('bet-show',$bet->id) }}'">EDIT</button>
                                <button class="btn btn-sm btn-danger" onclick="if(confirm('Are you sure?')) window.location.href='{{ route('bet-del',$bet->id) }}'">DELETE</button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>

                <div class="mt-3">
                    {{ $bets->links('pagination::bootstrap-5') }}
                </div>
            </div>
        </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('#betsTable').DataTable({
                responsive: true,
                autoWidth: false,
                scrollX: true,
                pageLength: 15,
                lengthChange: false,
                searching: true,
                ordering: true,
                order: [[0, 'desc']],
            });
        });
    </script>
@endsection
