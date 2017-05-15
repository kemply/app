<?php
  session_name('JSESSIONID');
  session_start();

  if( !isSet($_SESSION['isset']) ){
    $header = get_headers('http://api.app.loc:8080/wax/a/platform/ru', 1);
    $cook = preg_split('/(\=|\;)/i', $header['Set-Cookie']);

    header('Set-Cookie: JSESSIONID=' . $cook[1] . '; path=/; domain=.app.loc');
    header('content-type: text/javascript; charset=UTF-8');

    session_id($cook[1]);
    $_SESSION['isset'] = 'yes';
    $_SESSION['token'] = $cook[1];
  }

  echo 'var token = "' . $_SESSION['token'] . '"';
