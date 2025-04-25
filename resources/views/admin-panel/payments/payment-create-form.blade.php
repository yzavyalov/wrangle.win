@extends('layout.admin-layout')

@section('title')
    Payment - create
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <form action="{{ route('store-payment') }}" id="create-bet-form" method="post" enctype="multipart/form-data">
                @csrf

                @if(session('success-message'))
                    <div class="alert alert-info text-dark fw-bold p-3 rounded">
                        {{ session('success-message') }}
                    </div>
                @endif

                <div class="row mb-3">
                    <label for="name">Input the payment's name</label>
                    <input name="name" type="text" value="{{ old('name') }}" class="form-control @error('name') is-invalid @enderror">
                    @error('name')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>

                <div class="row mb-3">
                    <label for="link">Input the payment's API link</label>
                    <input name="link" type="text" value="{{ old('link') }}" class="form-control @error('link') is-invalid @enderror">
                    @error('link')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
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
                            <label for="commission" class="form-label">Input the commission</label>
                            <input name="commission" type="text" value="{{ old('commission') }}" class="form-control @error('commission') is-invalid @enderror">
                            @error('commission')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                        </div>

                        <div class="form-group mt-3">
                            <label for="logo">Upload logo image</label>
                            <input name="logo" type="file" class="form-control @error('logo') is-invalid @enderror">
                            @error('logo')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
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
                            <button type="submit" class="btn btn-primary" id="btn-create-bet">Create Payment</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

@endsection


@section('style')
    <link rel="stylesheet" href="{{asset('css/admin-create-bet.css')}}">
@endsection
