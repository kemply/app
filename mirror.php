<?php
  $begin = microtime(true);
  session_name('JSESSION');
  session_start();

  $url      = $_POST['url'];
  unset($_POST['url']);

  $context  = stream_context_create(array(
    'http'    => array(
      'method'  => 'POST',
      'content' => http_build_query($_POST),
      'header'  =>
                    "Host: app.loc\r\n" .
                    "Accept: application/json, text/plain, */*\r\n" .
                    "Accept-Encoding:gzip, deflate\r\n" .
                    "Connection: close\r\n" .
                    "Content-Type: application/x-www-form-urlencoded\r\n" .
                    "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n" .
                    "Cookie: $_SERVER[HTTP_COOKIE]"
    )
  ));

  $step1 = microtime(true);
  $result = file_get_contents($url, false, $context);

  exit(0);
