<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\CheckUserService;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(UserService $userService, )
    {
        $this->userService = $userService;
    }
    public function allUsers()
    {
        $users = User::paginate(25);

        return view('admin-panel.users.allusers',compact('users'));
    }

    public function blockUser($id)
    {
        $user = User::query()->find($id);

        $this->userService->block($user);

        return redirect()->back();
    }

    public function unblockUser($id)
    {
        $user = User::query()->find($id);

        $this->userService->unblock($user);

        return redirect()->back();
    }

    public function addInIAFS($id)
    {
        $user = User::query()->find($id);

        $result = CheckUserService::addUserInIAFS($user->email);

        return redirect()->back();
    }
}
