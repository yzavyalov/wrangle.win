<?php

namespace App\Http\Enums;

enum StatusCodeEnum : int
{
    case CODE_200 = 200;
    case CODE_201 = 201;
    case CODE_204 = 204;
    case CODE_404 = 404;
    case CODE_409 = 409;
    case CODE_412 = 412;
    case CODE_403 = 403;
    case CODE_400 = 400;
}
