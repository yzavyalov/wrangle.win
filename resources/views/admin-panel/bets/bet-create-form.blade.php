@extends('layout.admin-layout')

@section('title')
    Bet - create
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            @livewire('create-bet')
        </div>
@endsection


@section('style')
    <link rel="stylesheet" href="{{asset('css/admin-create-bet.css')}}">
@endsection
