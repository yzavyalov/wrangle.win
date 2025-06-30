@extends('layout.admin-layout')

@section('title')
    Payment. Add money.
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
       @livewire('add-money-manual')
    </div>

@endsection


@section('scripts')

@endsection
