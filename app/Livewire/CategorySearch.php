<?php

namespace App\Livewire;

use App\Models\BetCategory;
use Livewire\Component;

class CategorySearch extends Component
{
    public $name; // Поле поиска

    public function categories(){
        return BetCategory::orderBy('name')->get();
    }

    public function updateCategories()
    {
        // Фильтруем категории на основе ввода
        return BetCategory::where('name', 'like', '%' . $this->name . '%')
            ->orderBy('name')
            ->get();
    }

    public function render()
    {
        return view('livewire.category-search',['categories' => $this->updateCategories()]);
    }
}




