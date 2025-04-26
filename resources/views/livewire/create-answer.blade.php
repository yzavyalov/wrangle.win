<div>
    <div id="answers-container">
        @foreach($answers as $index => $answer)
            <div class="row mb-2" wire:key="answer-{{ $index }}">
                <label for="answer{{ $index + 1 }}">Describe the result {{ $index + 1 }} very precisely.</label>
                <div class="d-flex align-items-center">
                    <input type="text" name="answers[]" class="form-control @error('answers.' . $index) is-invalid @enderror" wire:model="answers.{{ $index }}">
                    @if($index >= 2)
                        <button type="button" class="btn btn-danger ms-2" wire:click="removeAnswer({{ $index }})">Delete</button>
                    @endif
                </div>
                @error('answers.' . $index)<span class="text-danger fw-bold">{{ $message }}</span>@enderror
            </div>
        @endforeach
    </div>
    <div class="text-center">
        <button type="button" class="btn btn-create-answer mt-2" wire:click="addAnswer">Add answer option</button>
    </div>
</div>
