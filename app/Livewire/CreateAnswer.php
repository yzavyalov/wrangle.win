<?php

namespace App\Livewire;

use Livewire\Component;

class CreateAnswer extends Component
{
    public $answers = []; // Инициализируем массив

    public $bet;

    public function mount($bet = null)
    {
        if ($bet && $bet->answers()->exists())
        {
            $this->answers = $bet->answers()->pluck('description')->toArray();
        }
        else
        {
            // При монтировании компонента заполняем первые два поля
            $this->answers = ['', ''];
        }
    }

    public function addAnswer()
    {
        $this->answers[] = ''; // Добавляем новый пустой элемент в массив
    }

    public function removeAnswer($index)
    {
        unset($this->answers[$index]); // Удаляем элемент
        $this->answers = array_values($this->answers); // Переиндексация массива
    }


    public function render()
    {
        return view('livewire.create-answer');
    }
}
