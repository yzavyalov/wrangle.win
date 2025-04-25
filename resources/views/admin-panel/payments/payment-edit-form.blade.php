@extends('layout.admin-layout')

@section('title')
    Payment - update
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <form action="{{ route('payment-update',$payment->id) }}" id="create-bet-form" method="post" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                @if(session('success-message'))
                    <div class="alert alert-info text-dark fw-bold p-3 rounded">
                        {{ session('success-message') }}
                    </div>
                @endif
                <div class="row">
                    <label for="name">Input the payment's name</label>
                    <input name="name" type="text" value=" {{ $payment->name }}" class="form-control @error('name') is-invalid @enderror">
                    @error('name')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="row">
                    <label for="link">Input the payment's api link</label>
                    <input name="link" type="text" value=" {{ $payment->link }}" class="form-control @error('link') is-invalid @enderror">
                    @error('link')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="col-4">
                    <div class="form-group mt-3">
                        <label for="type" class="form-label">Select Type</label>
                        @error('type')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                        <select name="type" class="form-select">
                            @foreach (\App\Http\Enums\PaymentTypeEnum::cases() as $paymentType)
                                <option value="{{ $paymentType->value }}" @if($paymentType->value == $payment->type) selected @endif>
                                    {{ $paymentType->label() }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group mt-3">
                        <label for="category" class="form-label">Select Type</label>
                        @error('category')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                        <select name="category" class="form-select">
                            @foreach (\App\Http\Enums\PaymentCategoryEnum::cases() as $paymentCategory)
                                <option value="{{ $paymentCategory->value }}" @if($paymentCategory->value == $payment->category) selected @endif>
                                    {{ $paymentCategory->label() }}
                                </option>
                            @endforeach
                        </select>
                    </div>


                    <div class="row">
                        <label for="commission" class="form-label">Input the commission</label>
                        <input name="commission" type="text" value="{{ $payment->commission }}" class="form-control @error('commission') is-invalid @enderror" rows="5"></input>
                        @error('commission')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                    </div>

                    <div class="row">
                        <img src="{{Storage::url($payment->logo)}}" alt="Payment logo" style="width:150px; height: auto;">
                        <label for="logo">Download image</label>
                        <input name="logo" type="file" value="{{ $payment->logo }}" class="form-control @error('logo') is-invalid @enderror">
                        @error('logo')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                    </div>

                    @if(session()->has('message'))
                        <div class="alert alert-success mt-3">
                            {{ session('logo') }}
                        </div>
                    @endif

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <div class="row mt-2 justify-content-center" id="block-button">
                        <button type="submit" class="btn" id="btn-create-bet">Update payment</button>
                    </div>
                </div>
            </form>
        </div>
@endsection


@section('style')
    <link rel="stylesheet" href="{{asset('css/admin-create-bet.css')}}">
@endsection
