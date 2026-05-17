<?php

namespace App\Http\Controllers\Api\KYC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DiditVerificationController extends Controller
{
    public function createSession(Request $request)
    {
        $user = $request->user();

        $response = Http::withHeaders([
            'x-api-key' => config('didit.api_key'),
            'Content-Type' => 'application/json',
        ])->post('https://verification.didit.me/v3/session/', [
            'workflow_id' => config('didit.workflow_id'),
            'callback' => config('didit.callback_url'),
            'vendor_data' => (string) ($user->id ?? 15),
        ]);

        if (!$response->successful()) {
            return response()->json([
                'message' => 'Could not create verification session.',
                'error' => $response->json(),
            ], 422);
        }

        $data = $response->json();

        $user->update([
            'verification_status' => 'pending',
            'didit_session_id' => $data['session_id'] ?? null,
            'didit_verification_url' => $data['url'] ?? null,
        ]);

        return response()->json([
            'session_id' => $data['session_id'] ?? null,
            'session_token' => $data['session_token'] ?? null,
            'verification_url' => $data['url'] ?? null,
            'status' => $data['status'] ?? null,
        ]);
    }

    public function webhook(Request $request)
    {
        $rawBody = $request->getContent();
        $signature = $request->header('X-Signature-V2');

        $expected = hash_hmac(
            'sha256',
            $rawBody,
            config('didit.webhook_secret')
        );

        if (!$signature || !hash_equals($expected, $signature)) {
            Log::error('Invalid signature', ['expected' => $expected, 'signature' => $signature]);
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        $payload = $request->json()->all();
        $userId = $payload['vendor_data'] ?? null;
        $status = $payload['status'] ?? null;

        if (!$userId || !$status) {
            return response()->json(['message' => 'Ignored'], 200);
        }

        $user = \App\Models\User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 200);
        }

        $normalizedStatus = match ($status) {
            'Approved' => 'approved',
            'Declined' => 'declined',
            'In Review' => 'in_review',
            'Abandoned' => 'abandoned',
            'Expired' => 'expired',
            default => 'pending',
        };

        $user->update([
            'verification_status' => $normalizedStatus,
            'is_verified' => $status === 'Approved',
            'verified_at' => $status === 'Approved' ? now() : $user->verified_at,
            'didit_session_id' => $payload['session_id'] ?? $user->didit_session_id,
            'didit_decision' => $payload['decision'] ?? $payload,
        ]);

        return response()->json(['ok' => true]);
    }
}
