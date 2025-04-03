<?php

namespace App\Traits;

use App\Http\Enums\StatusCodeEnum;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Throwable;

trait JsonResponseTrait
{
    /**
     * @param string $message
     * @param ResourceCollection|JsonResource|\Illuminate\Support\Collection|JsonResponse|EloquentCollection|array $data
     * @return JsonResponse
     */
    protected function successJsonAnswer200(string $message, ResourceCollection|JsonResource|\Illuminate\Support\Collection|JsonResponse|EloquentCollection|array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_200, true, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_200->value);
    }

    /**
     * @param string $message
     * @param ResourceCollection|JsonResource|array $data
     * @return JsonResponse
     */
    protected function successJsonAnswer201(string $message, ResourceCollection|JsonResource|array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_201, true, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_201->value);
    }

    /**
     * @param string $message
     * @return JsonResponse
     */
    protected function successJsonAnswer204(string $message): JsonResponse
    {
        return response()->json(
            $this->responseArrayWithoutData(StatusCodeEnum::CODE_204, true, $message)
        );
    }

    /**
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    // TODO Видалити після повного впровадження трейту та використання при помилках методу handleException()
    protected function errorJsonAnswer404(string $message, array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_404, false, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_404->value);
    }

    /**
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    // TODO Видалити після повного впровадження трейту та використання при помилках методу handleException()
    protected function errorJsonAnswer409(string $message, array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_409, false, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_409->value);
    }

    /**
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    // TODO Видалити після повного впровадження трейту та використання при помилках методу handleException()
    protected function errorJsonAnswer412(string $message, array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_412, false, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_412->value);
    }

    /**
     * @param string $message
     * @param JsonResource|array $data
     * @return JsonResponse
     */
    // TODO Видалити після повного впровадження трейту та використання при помилках методу handleException()
    protected function errorJsonAnswer403(string $message = 'You not allowed to do this action', JsonResource|array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_403, false, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_403->value);
    }

    /**
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    // TODO Видалити після повного впровадження трейту та використання при помилках методу handleException()
    protected function errorJsonAnswer400(string $message, array $data = []): JsonResponse
    {
        return response()->json(
            $this->responseArray(StatusCodeEnum::CODE_400, false, $message, $data)
        )->setStatusCode(StatusCodeEnum::CODE_400->value);
    }

    /**
     * @param StatusCodeEnum $code
     * @param bool $success
     * @param string $message
     * @param $data
     * @return array
     */
    protected function responseArray(StatusCodeEnum $code, bool $success, string $message, $data): array
    {
        return [
            'status' => $code->value,
            'success' => $success,
            'message' => $message,
            'data' => $data
        ];
    }

    /**
     * @param StatusCodeEnum $code
     * @param bool $success
     * @param string $message
     * @return array
     */
    protected function responseArrayWithoutData(StatusCodeEnum $code, bool $success, string $message): array
    {
        return [
            'status' => $code->value,
            'success' => $success,
            'message' => $message,
            'data' => []
        ];
    }

    /**
     * @param Throwable $exception
     * @return JsonResponse
     */
    public function handleException(Throwable $exception): JsonResponse
    {
//		// Отримуємо код помилки або використовуємо 400 за замовчуванням
//		$statusCode = method_exists($exception, 'getStatusCode')
//			? $exception->getStatusCode()
//			: ($exception->getCode() ?: 400);

        // Визначаємо статус код за замовчуванням
        $statusCode = 400;

        // Можна додавати специфічні Exceptions, які не мають getStatusCode()
        // Перевіряємо, чи це ValidationException і чи має він статус 422
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            $statusCode = 422;
        }
        // Якщо Exception має метод getStatusCode(), використовуємо його
        elseif (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        }
        // В іншому випадку використовуємо код з getCode() або залишаємо 400
        elseif ($exception->getCode()) {
            $statusCode = $exception->getCode();
        }

        $message = $exception->getMessage() ?: 'An error occurred';

        // Отримуємо додаткові дані з заголовків, якщо доступні
        $data = method_exists($exception, 'getHeaders') ? $exception->getHeaders() : [];

        return response()->json([
            'status' => $statusCode,
            'success' => false,
            'message' => $message,
            'data' => $data, // Додаємо дані до відповіді
        ])->setStatusCode($statusCode);
    }
}
