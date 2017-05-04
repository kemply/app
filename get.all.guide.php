<?php

  $DIR = __DIR__ . '/api/guide';
  $ALL = array();


  foreach(scandir($DIR) as $file)
    if( in_array($file, array('.', '..', 'all.json')))
      continue;
    else {
      $JSON = json_decode(file_get_contents( "$DIR/$file" ));
      array_push($ALL, array(
        'url'       => "/api/guide/$file",
        'shortName' => $JSON->shortName,
        'fullName'  => $JSON->fullName
      ));
    }

  if( $DEVELOPER_MODE = false )
    echo '<pre>', print_r($ALL), '</pre>';
  else echo json_encode($ALL);
