<div>
    <button wire:click="toggleContent" type="button" class="btn mt-3" id="main-button">
        {{ $contentIsVisible ? 'Close form' : 'Create new category' }}
    </button>
    @if ($contentIsVisible)
        <div class="row">
            <form wire:submit.prevent="saveCategory">
                @csrf
                <label for="name" id="label-category-create">Input categories name</label>
                <input class="form-control @error('name') is-invalid @enderror" type="text" name="name" wire:model="name">
                @error('name')<span class="text-danger fw-bold">{{ $message }}</span> @enderror
                <button type="submit" class="btn mt-1" id="button-add-category">Save your category</button>
            </form>
        </div>
    @endif
</div>
