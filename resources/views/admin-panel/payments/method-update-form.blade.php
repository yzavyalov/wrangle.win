@extends('layout.admin-layout')

@section('title')
    Payment method - update - {{ $method->title }}
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <form action="{{ route('method-update', $method->id) }}" id="create-bet-form" method="post" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                @if(session('success-message'))
                    <div class="alert alert-info text-dark fw-bold p-3 rounded">
                        {{ session('success-message') }}
                    </div>
                @endif

                <div class="row mb-3">
                    <label for="title">Input the payment method's title</label>
                    <input name="title" type="text" value="{{ $method->title }}" class="form-control @error('title') is-invalid @enderror">
                    @error('title')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>


                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mt-3">
                            <label for="type" class="form-label">Select Type</label>
                            @error('type')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                            <select name="type" class="form-select">
                                @foreach (\App\Http\Enums\PaymentTypeEnum::cases() as $paymentType)
                                    <option value="{{ $paymentType->value }}" @selected($method->type == $paymentType->value)>
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
                                    <option value="{{ $paymentCategory->value }}" @selected($method->category == $paymentCategory->value)>
                                        {{ $paymentCategory->label() }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

{{--                        <div class="form-group mt-3">--}}
{{--                            <label for="comission" class="form-label">Input the commission</label>--}}
{{--                            <input name="comission" type="text" value="{{ $method->comission }}" class="form-control @error('comission') is-invalid @enderror">--}}
{{--                            @error('comission')<span class="text-danger fw-bold">{{ $message }}</span> @enderror--}}
{{--                        </div>--}}

{{--                        <div class="form-group mt-3">--}}
{{--                            <label for="fixfee" class="form-label">Input the fix_fee</label>--}}
{{--                            <input name="fixfee" type="text" value="{{ $method->fixfee }}" class="form-control @error('fixfee') is-invalid @enderror">--}}
{{--                            @error('fixfee')<span class="text-danger fw-bold">{{ $message }}</span> @enderror--}}
{{--                        </div>--}}

                        <div class="form-group mt-3">
                            <label for="logo">Upload logo image</label>

                            {{-- Показываем текущее изображение, если есть --}}
                            @if(!empty($method->logo)) {{-- замените $model на нужную переменную --}}
                            <div class="mb-2">
                                <img src="{{ asset('storage/' . $method->logo) }}" alt="Current Logo" style="max-height: 100px;">
                            </div>
                            <p class="text-muted">Current logo shown above. You can upload a new one to replace it.</p>
                            @endif

                            {{-- Поле выбора нового файла --}}
                            <input name="logo" type="file" class="form-control @error('logo') is-invalid @enderror">
                            @error('logo')
                            <span class="text-danger fw-bold">{{ $message }}</span>
                            @enderror
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
