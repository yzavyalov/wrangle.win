<div>
    <form action="#" id="create-bet-form" method="post" enctype="multipart/form-data">
        @csrf
        @if(session('success-message'))
            <div class="alert alert-info text-dark fw-bold p-3 rounded">
                {{ session('success-message') }}
            </div>
        @endif
        <div class="row">
            <label for="title">Input the bet's title</label>
            <input name="title" type="text" value=" {{ old('title') }}" class="form-control @error('title') is-invalid @enderror" wire:model="title">
            @error('title')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>
        <div class="form-group" id="category-form">
            <label for="categories">Select Categories</label>
            <div class="border rounded p-2" style="max-height: 200px; overflow-y: auto;">
                @foreach($categories as $category)
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="categories[]"
                               value="{{ $category->id }}"
                               id="category-{{ $category->id }}"
                            {{ in_array($category->id, old('categories', [])) ? 'checked' : '' }}>
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

        <div class="row">
            <label for="description" class="form-label">Input the bet's description</label>
            <textarea name="description" type="text" value="{{ old('description') }}" class="form-control @error('description') is-invalid @enderror" rows="5"></textarea>
            @error('description')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>
        <div class="row">
            <label for="finish" class="form-label">Input the bet's date of finish</label>
            <input name="finish" type="datetime-local" value="{{ old('finish') }}" class="form-control @error('finish') is-invalid @enderror">
            @error('finish')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>
        <div class="row">
            <label for="source1" class="form-label">Enter a link 1 to the source where the outcome of the dispute will be indicated on the appointed date</label>
            <input name="source1" type="text" value="{{ old('source1') }}" class="form-control @error('source1') is-invalid @enderror">
            @error('source1')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>
        <div class="row">
            <label for="source2" class="form-label">Enter a link 2 to the source where the outcome of the dispute will be indicated on the appointed date</label>
            <input name="source2" type="text" value="{{ old('source2') }}" class="form-control @error('source2') is-invalid @enderror">
            @error('source2')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>
        <div class="row">
            <label for="source3" class="form-label">Enter a link 3 to the source where the outcome of the dispute will be indicated on the appointed date</label>
            <input name="source3" type="text" value="{{ old('source3') }}" class="form-control @error('source3') is-invalid @enderror">
            @error('source3')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>
        @livewire('create-answer')
        <div class="row">
            <label for="image">Download image.</label>
            <input name="image" type="file" value="{{ old('image') }}" class="form-control @error('image') is-invalid @enderror">
            @error('image')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
        </div>

        @if(session()->has('message'))
            <div class="alert alert-success mt-3">
                {{ session('image') }}
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
            <button type="submit" class="btn" id="btn-create-bet">Submit for moderation</button>
        </div>

    </form>
</div>
