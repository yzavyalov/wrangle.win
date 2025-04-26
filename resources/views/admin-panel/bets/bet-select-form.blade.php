@extends('layout.admin-layout')

@section('title')
    Bet - select
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <!-- form start -->
            <form id="quickForm" action="{{ route('bet-select') }}" method="get">
                @csrf
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="table">Select a table to display the search</label>
                                <select name="table" id="table" class="form-control">
                                    <option value="1" checked>All bets table</option>
                                    <option value="2">Bets and bits</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="id">ID bet</label>
                                <input type="id" name="id" class="form-control" id="id" placeholder="Enter bets id">
                            </div>
                            <div class="form-group">
                                <label for="status">Status</label>
                                <select name="status" id="status" class="form-control">
                                    <option value="">-- All --</option>
                                    @foreach($statuses as $status)
                                        <option value="{{ $status->value }}">
                                            {{ $status->label() }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="user_id">User ID</label>
                                <input type="text" name="user_id" class="form-control" id="user_id" placeholder="Enter user_id">
                            </div>
                            <div class="form-group">
                                <label for="email">User email</label>
                                <input type="text" name="email" class="form-control" id="email" placeholder="Enter user email">
                            </div>
                        </div>
                    </div>




                    <div class="form-group">
                        <label for="finish">Finish date</label>
                        <input type="date" name="finish" class="form-control" id="finish">
                    </div>

                    <label for="finish">Categories</label>
                    <div class="border rounded p-3 mb-3" style="max-height: 300px; overflow-y: auto;">
                        @foreach($categories as $category)
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="categories[]"
                                    value="{{ $category->id }}"
                                    id="category{{ $category->id }}">

                                <label class="form-check-label" for="category{{ $category->id }}">
                                    {{ $category->name }}
                                </label>
                            </div>
                        @endforeach
                    </div>

                    <div class="form-group">
                        <label for="title">Text from title or description</label>
                        <input type="text" name="title" class="form-control" id="title" placeholder="Enter text from title or description">
                    </div>

                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
@endsection


@section('style')
    <link rel="stylesheet" href="{{asset('css/admin-create-bet.css')}}">
@endsection
