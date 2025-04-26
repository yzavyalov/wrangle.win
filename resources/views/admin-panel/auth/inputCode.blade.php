<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>AdminLTE 3 | Beesmart-Dashboard</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

  @yield('style')
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">



  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="row">
      <div class="card flex">
        <form action="{{route('check-code')}}" method="post">
          @csrf
          @if (isset($errors) && $errors->any())
            <div class="alert alert-danger">
              <ul>
                @foreach ($errors->all() as $error)
                  <li>{{ $error }}</li>
                @endforeach
              </ul>
            </div>
          @endif
          <div>We have sent the code to your email. Please enter it.</div>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Input code from email" aria-label="Recipient's username" aria-describedby="button-addon2" name="code">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">ENTER</button>
          </div>
        </form>
        <div id="timer">The code sent to you by email will be valid: 10:00</div>
        <div class="text-center"><button class="btn btn-outline-secondary" type="button" onclick="window.location.href='{{route('showInputForm')}}'">Send new code</button></div>
      </div>
    </div>
  </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script>
    // Функция для отображения таймера
    function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "The code sent to you by email will be valid: " + minutes + ":" + seconds;

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    }

    // Запуск таймера при загрузке страницы
    window.onload = function () {
      var tenMinutes = 60 * 10,
        display = document.querySelector('#timer');
      startTimer(tenMinutes, display);
    };
  </script>

