<!-- @extends('layout.applight')
@section('content')
    <div>
        Code for your verifacation.
    </div>
    <div class="div">{{$code}}</div>
@endsection -->


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Verification Code</title>
</head>

<body style="margin:0; padding:0; font-family:sans-serif; background:#f0f0f0;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0; padding:40px 0;">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#D9D9D9; border-radius:8px; overflow:hidden;">
                <!-- Header -->
                <tr>
                    <td align="center" style="background:#FFD700; padding:40px 20px;">
                        <img src="https://wrangle.win/images/logo.svg" alt="Wrangle Logo" width="60" style="display:block; margin-bottom:10px;">
                        <h1 style="margin:0; font-size:24px; color:#000;">WRANGLE WIN</h1>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:30px 40px; color:#333;">
                        <p style="font-size:16px;">Dear {{ $userName ?? 'User' }},</p>

                        <p style="user-select: none;">
                            you need to copy this code and paste it into the form on the site
                        </p>

                        <!-- Код для копіювання одним блоком -->
                        <p style="text-align:center; font-size:20px; font-weight:bold; letter-spacing:2px; margin: 10px 0;">
                            {{ $code }}
                        </p>

                        <!-- Красива таблиця з кружечками -->
                        <table cellpadding="0" cellspacing="10" align="center" style="margin: 10px auto;">
                            <tr>
                                @foreach(str_split($code) as $digit)
                                    <td style="background:#FFD700; padding:15px 20px; border-radius:50%; font-size:20px; font-weight:bold;">
                                        {{ $digit }}
                                    </td>
                                @endforeach
                            </tr>
                        </table>

                        <p style="font-size:14px;">
                            This code will expire in <strong>10 minutes</strong>.<br>
                            If you did not request this code, please ignore this message.
                        </p>

                        <p style="font-size:16px;">
                            Best regards,<br>Wrangle.win team
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:20px 40px; font-size:12px; color:#777;">
                        <p>DADORI CAPITAL INC.<br>British Virgin Islands<br>
                            <a href="mailto:wrangle@wrangle.win" style="color:#333;">wrangle@wrangle.win</a></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>

</html>
