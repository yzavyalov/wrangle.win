@extends('layout.admin-layout')

@section('title')
    All payments.
@endsection

@section('content')
    <!-- /.card-header -->
    <div class="card-body">
        <table id="example1" class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>type</th>
                <th>category</th>
                <th>commission</th>
                <th>logo</th>
                <th>link</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($payments as $payment)
                <tr>
                    <td>{{ $payment->id }}</td>
                    <td>{{ $payment->name }}</td>
                    <td>{{ \App\Http\Enums\PaymentTypeEnum::from($payment->type)->label() }}</td>
                    <td>{{ \App\Http\Enums\PaymentCategoryEnum::from($payment->category)->label() }}</td>
                    <td>{{ $payment->commission }}</td>
                    <td>{{ $payment->logo }}</td>
                    <td>{{ $payment->link }}</td>
                    <td>
                        <button class="btn btn-info" onclick="window.location.href='{{ route('payment-show',$payment->id) }}'">EDIT</button>
                        <button class="btn btn-danger"
                            onclick="if (confirm('Are you shure?')) window.location.href='{{ route('payment-del',$payment->id) }}'">
                            DELETE
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection


@section('scripts')

@endsection
