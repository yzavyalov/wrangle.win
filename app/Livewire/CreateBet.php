<?php

namespace App\Livewire;

use App\Models\BetCategory;
use Livewire\Component;

class CreateBet extends Component
{
    public $title;
    public $image;
    public $description;
    public $finish;
    public $category;
    public $categories;



    protected $listeners = ['create-category' => 'refreshCategories'];
    public function refreshCategories()
    {
        $this->categories = BetCategory::orderBy('name')->get(); // Обновление списка категорий
    }



    public function render()
    {
        return view('livewire.create-bet',['categories' => $this->refreshCategories()]);
    }

}
