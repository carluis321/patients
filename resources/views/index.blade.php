<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel React</title>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/css/app.css')
    @viteReactRefresh
    @vite('resources/js/main.jsx')
</head>
<body class="bg-gray-300 h-screen">
    <div id="root" class="h-full shadow-2xl"></div>
</body>
</html>