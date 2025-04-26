@extends('layout.admin-layout')

@section('title')
    Edit bet  category - {{$category->name}}
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 navbox">
            <div class="overflow-hidden shadow-sm dashboard-bg dash-window">
                <div class="p-6">
                    <div>
                        <form action="{{ route('bet-categories.update',$category->id) }}" method="post" class="form-group">
                            @method('PUT')
                            @csrf
                            @if(session('success-message'))
                                <div class="alert alert-info text-dark fw-bold p-3 rounded">
                                    {{ session('success-message') }}
                                </div>
                            @endif
                            <div class="row">
                                <div class="col">
                                    <label for="menu_status" class="form-label">Menu status</label>
                                    <select name="menu_status">
                                        <option @if($category->menu_status === 1) selected @endif value="1">In Menu</option>
                                        <option @if($category->menu_status !== 1) selected @endif value="0">No</option>
                                    </select>
                                    @error('menu_status')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="name">Name</label>
                                    <input name="name" type="text" value="{{ $category->name }}" class="form-control @error('name') is-invalid @enderror">
                                    @error('menu_status')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <span>Quantity of bets - {{ $category->bets()->count() }}</span>
                                </div>
                            </div>

                            @if(session()->has('message'))
                                <div class="alert alert-success mt-3">
                                    {{ session('message') }}
                                </div>
                            @endif

                            <div class="row mt-2 text-center" id="block-button">
                                <div class="col">
                                    <button type="submit" class="btn btn-info" id="btn-create-bet">Submit for moderation</button>
                                </div>
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
