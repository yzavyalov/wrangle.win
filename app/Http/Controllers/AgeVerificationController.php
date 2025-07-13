<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

class AgeVerificationController extends Controller
{
    public function verifyAge(Request $req)
    {
        $dob = $req->input('dateOfBirth'); // ISO 8601 format
        $age = Carbon::parse($dob)->age;

        if ($age >= 18) {
            return response()->json(['ok' => true]);
        }

        return response()->json(['ok' => false, 'message' => 'Underage']);
    }
}
