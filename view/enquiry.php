<?php
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Expires: " . date("r"));

  function minify($html){
    $search = array(
      '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
      '/[^\S ]+\</s',     // strip whitespaces before tags, except space
      '/(\s)+/s',         // shorten multiple whitespace sequences
      '/<!--(.|\s)*?-->/' // Remove HTML comments
    );

    $replace = array(
      '>',
      '<',
      '\\1',
      ''
    );

    return str_replace('> <', '><', preg_replace($search, $replace, $html));
  };

  ob_start('minify');
?>

<div id="enquiry">
  <div class="content row">
    <h1 class="title"><span class="text">Справка</span></h1>
  </div>

  <div class="blocks row center">
    <div class="card col-1 row-1">
      <a href="/enquiry/faq" class="block faq">
        <i class="icon icon-help"></i>
        <span class="name">Часто задаваемые вопросы</span>
      </a>
    </div>

    <div class="card col-1 row-1">
      <a href="/enquiry/manual" class="block manual">
        <i class="icon icon-book"></i>
        <span class="name">Руководство пользователя</span>
      </a>
    </div>

    <div class="card col-1 row-1">
      <a href="/enquiry/feedback" class="block feedback">
        <i class="icon icon-feedback"></i>
        <span class="name">Обратная связь</span>
      </a>
    </div>

    <div class="card col-1 row-1">
      <a href="/enquiry/for-owners" class="block for-owners">
        <i class="icon icon-winrar"></i>
        <span class="name">Информация для фондообразовательей</span>
      </a>
    </div>
  </div>

  <div class="content row">
    <h2 class="title small col-3"><span class="text">Контакты</span></h2>
  </div>

  <div class="row center">
    <div class="col-3">

      <div class="contact col-1">
        <span class="key">Адрес:</span>
        <span class="value">Арай 53, Левый берег, г. Астана</span>
      </div>

      <div class="contact col-1 offset-1">
        <span class="key">Сайт:</span>
        <a href="http://factor.kz" class="value link" target="_blank">factor.kz</a>
      </div>

      <div class="contact col-1">
        <span class="key">Телефон:</span>
        <span class="value">+7 777 123 4567</span>
      </div>

      <div class="contact col-1 offset-1">
        <span class="key">Email:</span>
        <a href="mailto:support@factor.kz" class="value link">support@factor.kz</a>
      </div>

    </div>
  </div>

  <ya-map id="map"
    ya-zoom="16"
    ya-center="[71.433494, 51.135751]"
    ya-controls="zoomControl typeSelector  fullscreenControl"
    ya-after-init="afterMapInit($target)">
      <ya-geo-object
        ya-source="geoObject"
        ya-options="{draggable:false}"></ya-geo-object>
  </ya-map>

  <script type="text/javascript">
    // var map, placemark;
    // ymaps.ready(()=>{
    //   map = new ymaps.Map("map", {
    //     center: [51.135751, 71.433494],
    //     zoom: 16,
    //     controls: ['zoomControl', 'typeSelector',  'fullscreenControl']
    //   });
    //
    //   placemark = new ymaps.Placemark(
    //     [51.135751, 71.433494], {
    //       hintContent: 'КСИ "Фактор"',
    //       balloonContent: 'Software Студия'
    //   });
    //
    //   map.geoObjects.add(placemark);
    //   map.behaviors.disable('scrollZoom');
    // });
  </script>
</div>
