@extends('layout.applight')

@section('content')
<form method="POST" action="{{ route('admin.login.post') }}">
    @csrf
    @if(isset($error))
        <div class="alert alert-danger">
            {{ $error }}
        </div>
    @endif
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Login</button>
</form>
@endsection
