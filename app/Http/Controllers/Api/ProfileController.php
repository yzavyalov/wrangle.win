<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserDataResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function showProfile()
    {
        return $this->successJsonAnswer200('Your profile.', UserDataResource::make(Auth::user()));
    }

    public function updateProfile(ProfileRequest $request)
    {
        $validateData = $request->validated();

        $user = Auth::user();

        $user->update($validateData);

        return $this->successJsonAnswer200('Your profile.', UserDataResource::make($user));
    }

    public function delProfile()
    {
        $user = Auth::user();

        $user->update(['email' => $user->email . '_deleted_' . now()->timestamp,'password'=>Hash::make('Aa123456!')]);

        $user->removeRole('user');

        $user->assignRole('badUser');

        return $this->successJsonAnswer200('Your profile was deleted.');
    }
}
