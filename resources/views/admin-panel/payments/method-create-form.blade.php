@extends('layout.admin-layout')

@section('title')
    Payment method - create
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <form action="{{ route('store-method') }}" id="create-bet-form" method="post" enctype="multipart/form-data">
                @csrf

                @if(session('success-message'))
                    <div class="alert alert-info text-dark fw-bold p-3 rounded">
                        {{ session('success-message') }}
                    </div>
                @endif

                <div class="row mb-3">
                    <label for="title">Input the payment method's title</label>
                    <input name="title" type="text" value="{{ old('title') }}" class="form-control @error('title') is-invalid @enderror">
                    @error('title')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>


                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mt-3">
                            <label for="type" class="form-label">Select Type</label>
                            @error('type')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                            <select name="type" class="form-select">
                                @foreach (\App\Http\Enums\PaymentTypeEnum::cases() as $paymentType)
                                    <option value="{{ $paymentType->value }}" @selected(old('type') == $paymentType->value)>
                                        {{ $paymentType->label() }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group mt-3">
                            <label for="category" class="form-label">Select Category</label>
                            @error('category')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                            <select name="category" class="form-select">
                                @foreach (\App\Http\Enums\PaymentCategoryEnum::cases() as $paymentCategory)
                                    <option value="{{ $paymentCategory->value }}" @selected(old('category') == $paymentCategory->value)>
                                        {{ $paymentCategory->label() }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group mt-3">
                            <label for="logo">Upload logo image</label>
                            <input name="logo" type="file" class="form-control @error('logo') is-invalid @enderror">
                            @error('logo')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                        </div>

                        <div class="row mb-3">
                            <label for="currency">Input the payment method's currency</label>
                            <input name="currency" type="text" value="{{ old('currency') }}" class="form-control @error('currency') is-invalid @enderror">
                            @error('currency')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                        </div>

                        @if(session('logo'))
                            <div class="alert alert-success mt-3">
                                {{ session('logo') }}
                            </div>
                        @endif

                        @if ($errors->any())
                            <div class="alert alert-danger mt-3">
                                <ul class="mb-0">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <div class="row mt-4 justify-content-center" id="block-button">
                            <button type="submit" class="btn btn-primary" id="btn-create-bet">Create Method</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

@endsection


@section('style')
    <link rel="stylesheet" href="{{asset('css/admin-create-bet.css')}}">
@endsection
