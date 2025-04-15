@extends('layout.admin-layout')

@section('title')
    Bet - {{ $bet->title }}
@endsection

@section('content')
        <!-- /.card-header -->
        <div class="card-body">
            <form action="{{ route('bet-edit',$bet->id) }}" id="create-bet-form" method="post" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <div class="row">
                    <label for="title">Input the bet's title</label>
                    <input name="title" type="text" value="{{ $bet->title }}" class="form-control @error('title') is-invalid @enderror">
                    @error('title')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="form-group" id="category-form">
                    <label for="categories">Select Categories</label>
                    <div class="border rounded p-2" style="max-height: 200px; overflow-y: auto;">
                        @foreach($categories as $category)
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="categories[]"
                                    value="{{ $category->id }}"
                                    id="category-{{ $category->id }}"
                                {{ in_array($category->id, $bet->categories->pluck('id')->toArray()) ? 'checked' : '' }}
                                <label class="form-check-label" for="category-{{ $category->id }}">
                                    {{ $category->name }}
                                </label>
                            </div>
                        @endforeach
                    </div>

                    @error('categories')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="row" id="category-row">
                    @livewire('create-category')
                </div>

                @role('admin')
                <div class="row">
                    <label for="">Status</label>
                    <select name="status" id="status" class="form-select">
                        @foreach(\App\Enum\BetStatusEnum::cases() as $status)
                            <option value="{{ $status->value }}"
                                {{ $bet->status === $status->value ? 'selected' : '' }}>
                                {{ $status->label() }}
                            </option>
                        @endforeach
                    </select>
                </div>
                @endrole

                <div class="row">
                    <label for="description" class="form-label">Input the bet's description</label>
                    <textarea name="description" type="text" class="form-control @error('description') is-invalid @enderror" rows="5">{{ $bet->description }}</textarea>
                    @error('description')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="row">
                    <label for="finish" class="form-label">Input the bet's date of finish</label>
                    <input name="finish" type="datetime-local" value="{{ $bet->finish }}" class="form-control @error('finish') is-invalid @enderror">
                    @error('finish')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="row">
                    <label for="source1" class="form-label">Enter a link 1 to the source where the outcome of the dispute will be indicated on the appointed date</label>
                    <input name="source1" type="text" value="{{ $bet->source1 }}" class="form-control @error('source1') is-invalid @enderror">
                    @error('source1')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="row">
                    <label for="source2" class="form-label">Enter a link 2 to the source where the outcome of the dispute will be indicated on the appointed date</label>
                    <input name="source2" type="text" value="{{ $bet->source2 }}" class="form-control @error('source2') is-invalid @enderror">
                    @error('source2')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                <div class="row">
                    <label for="source3" class="form-label">Enter a link 3 to the source where the outcome of the dispute will be indicated on the appointed date</label>
                    <input name="source3" type="text" value="{{ $bet->source3 }}" class="form-control @error('source3') is-invalid @enderror">
                    @error('source3')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>

                @livewire('create-answer',[$bet])

                <div class="row">
                    <label for="image">Download image.</label>
                    <input name="image" type="file" value="{{ old('image') }}" class="form-control @error('image') is-invalid @enderror">
                    @error('image')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                </div>
                @if($bet->image)
                    <div class="row">
                        <img src="{{ asset('storage/' . $bet->image) }}" alt="картинки" style="width: 175px; height: auto;">
                    </div>
                @endif


                @if(session()->has('message'))
                    <div class="alert alert-success mt-3">
                        {{ session('message') }}
                    </div>
                @endif

                <div class="row mt-2 justify-content-center" id="block-button">
                    <button type="submit" class="btn" id="btn-create-bet">Submit for moderation</button>
                </div>

            </form>
        </div>
@endsection


@section('style')
    <link rel="stylesheet" href="{{asset('css/admin-create-bet.css')}}">
@endsection
