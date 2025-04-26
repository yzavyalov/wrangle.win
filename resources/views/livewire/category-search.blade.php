<div>
    <!-- Поле поиска -->
    <form wire:submit.prevent="updateCategories" class="mb-3 d-flex gap-2">
        <input type="text" class="form-control" placeholder="Name category..." wire:model="name">
        <button type="submit" class="btn btn-primary">Search category</button>
    </form>

    <!-- Форма с чекбоксами -->
    <form action="#" method="post">
        @csrf
        <div class="border rounded p-3 mb-3" style="max-height: 300px; overflow-y: auto;">
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            @foreach($categories as $category)
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        name="categories[]"
                        value="{{ $category->id }}"
                        id="category{{ $category->id }}">

                    <label class="form-check-label" for="category{{ $category->id }}">
                        {{ $category->name }}
                    </label>
                </div>
            @endforeach
        </div>

        <!-- Кнопка SELECT -->
        <div class="row justify-content-center">
            <button type="submit" class="btn btn-success">SELECT</button>
        </div>
    </form>
</div>
