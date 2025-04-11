<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserDataResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserDataController extends Controller
{
    public function getUser()
    {
        return $this->successJsonAnswer200('User',UserDataResource::make(Auth::user()));
    }
}
