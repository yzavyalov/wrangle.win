<?php

namespace App\Livewire;

use App\Models\BetCategory;
use Livewire\Component;

class CreateCategory extends Component
{
    public $contentIsVisible = false;

    public $name;

    protected $rules = [
        'name' => 'required|unique:bet_categories|max:255',
    ];

    public function toggleContent()
    {
        $this->contentIsVisible = !$this->contentIsVisible;
    }

    public function saveCategory()
    {
        $validateData = $this->validate();

        BetCategory::create($validateData);

        $this->contentIsVisible = false;

        $this->dispatch('create-category');

        $this->reset('name');
    }

    public function render()
    {
        return view('livewire.create-category');
    }
}
