<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <title inertia>{{ $meta['title'] ?? 'WRANGLE.WIN' }}</title>

    <meta property="og:title" content="{{ $meta['title'] ?? 'WRANGLE.WIN' }}">
    <meta property="og:description" content="{{ $meta['description'] ?? '' }}">
    <meta property="og:image" content="{{ $meta['image'] ?? asset('images/default-1200x630.jpg') }}">

    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Wrangle.win">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $meta['title'] ?? 'WRANGLE.WIN' }}">
    <meta name="twitter:description" content="{{ $meta['description'] ?? '' }}">
    <meta name="twitter:image" content="{{ $meta['image'] ?? asset('images/default-1200x630.jpg') }}">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>

