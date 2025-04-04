<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CheckUserService
{
    /**
     * Проверяет, существует ли пользователь с таким email в системе IAFS.
     *
     * @param string $email
     * @param string $agent
     * @param string $platform
     * @return bool|null Возвращает true если пользователь найден, false если не найден, null в случае ошибки
     */
    public static function iafsCheck(string $email): ?bool
    {
        $token = env('IAFS_SYSTEM_KEY');

        $response = Http::withToken($token)
            ->post('https://www.iafs.info/api/check-user', [
                'user' => [
                    'email' => $email,
                ],
            ]);

        if ($response->successful())
        {
            $data = $response->json();

            $result = self::parseArray($data);
        }
        else
        {
            $result = false;
        }

        return $result;
    }

    protected static function parseArray(array $data): bool
    {
        foreach ($data as $arrOne) {
            if (!is_array($arrOne)) continue;

            foreach ($arrOne as $result) {
                if (!is_array($result)) continue;

                if (($result['chargeback_initiator'] ?? 0) === 1 || ($result['span_email'] ?? 0) === 1) {
                    return true;
                }
            }
        }

        return false;
    }

}

