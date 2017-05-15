<?php
  // session_name('JSESSIONID'); // Указать название Cookie = JSESSIONID
  // session_start();            // Старт сессии
  // $hash = session_id();       // Получить хеш-ключ сессии
  // header('Set-Cookie: JSESSIONID=' . $hash . '; path=/; domain=.app.loc');
  //  // Переопределить значение Set-Cookie для отправки

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
<!DOCTYPE html>
<html lang="ru" ng-app="app">
  <head>
    <base href="/" />

    <title id="title" ng-bind="title"></title>

    <link href="/img/favicon.png" rel="icon" />

    <link href="/css/fonts.css" rel="stylesheet" type="text/css" />
    <link href="/css/base.css" rel="stylesheet" type="text/css" />
    <link href="/css/header.css" rel="stylesheet" type="text/css" />
    <link href="/css/footer.css" rel="stylesheet" type="text/css" />
    <link href="/css/ui.css" rel="stylesheet" type="text/css" />

    <link href="https://file.myfontastic.com/ABA5yUrw93ntWVEnGgxxn4/icons.css" rel="stylesheet" type="text/css" />

    <link href="/css/guide.css" rel="stylesheet" type="text/css" />
    <link href="/css/archive.css" rel="stylesheet" type="text/css" />
    <link href="/css/enquiry.css" rel="stylesheet" type="text/css" />

    <script src="/js/md5.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/dictionary.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/JSON2HTML.js?time=<?php echo (int) microtime(true); ?>"></script>

    <script src="/js/angular/main.js"></script>
    <script src="/js/angular/cookies.js"></script>
    <script src="/js/angular/route.js"></script>
    <script src="/js/angular/sanitize.js"></script>
    <script src="/js/angular/yamap.js"></script>

    <script src="/js/app/controller/user.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/controller/modal.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/main.js?time=<?php echo (int) microtime(true); ?>"></script>

    <script src="/js/app/guide.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/archive.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/enquiry.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/panel.js?time=<?php echo (int) microtime(true); ?>"></script>

    <script src="/test.php"></script>
  </head>
  <body id="body" ng-controller="MainCTRL" ng-keyup="modal.close($event)" ng-class="{noscroll:(modal.signIn||modal.signUp)}">

    <header id="header">
      <div class="row">
        <div class="logo line col-1">
          <a href="/" class="text">logotype</a>
        </div>

        <nav class="nav line col-2">
          <a class="link" ng-class="{active:currentPage == 'guide'}" href="/guide" ng-bind="lang._.nav.guide"></a>
          <a class="link" ng-class="{active:currentPage == 'archive'}" href="/archive" ng-bind="lang._.nav.archive"></a>
          <a class="link" ng-class="{active:currentPage == 'enquiry'}" href="/enquiry" ng-bind="lang._.nav.enquiry"></a>
          <a class="link" ng-class="{active:currentPage == 'panel'}" href="/panel">Функциональная панель</a>
        </nav>

        <div class="navigation line col-1" ng-controller="user">
          <div class="login-link">
            <span class="text sign-up" open-modal="signUp" ng-bind="lang._.nav.signUp"></span>
            <span class="text sign-in" open-modal="signIn" ng-bind="lang._.nav.signIn"></span>
          </div>

          <div class="lang-dropdown">
            <div class="options">
              <i class="icon icon-translate"></i>
              <span class="lang" ng-bind="lang.use.name"></span>
              <a ng-click="setLang(l)" class="lang" ng-bind="l.name" ng-repeat="l in lang.list" ng-if="l.code != lang.use.code"></a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div id="content" ng-view></div>

    <footer id="footer">
      <div class="row">

        <div class="col-1">
          <nav class="nav line col-1">
            <a class="link" ng-class="{active:currentPage == 'guide'}" href="/guide" ng-bind="lang._.nav.guide"></a>
            <a class="link" ng-class="{active:currentPage == 'archive'}" href="/archive" ng-bind="lang._.nav.archive"></a>
            <a class="link" ng-class="{active:currentPage == 'enquiry'}" href="/enquiry" ng-bind="lang._.nav.enquiry"></a>
          </nav>
        </div>

        <div class="col-2">
          <p class="copy">&copy; {{lang._.copy.text}}</p>
        </div>

        <div class="autor col-1">
          {{lang._.copy.by}} <a href="http://factor.kz" class="link">{{lang._.copy.autor}}</a>
        </div>
      </div>
    </footer>

    <div id="sign-in" class="modal" data="signIn" ng-click="modal.close($event)" ng-class="{active:modal.signIn}">
      <div class="inner col-1">
        <h3 class="title">Авторизация</h3>
        <form class="form" ng-submit="signIn()" ng-controller="user">
          <label class="label text">
            <input type="text" class="input" placeholder="Логин" ng-model="login" required>
            <i class="icon icon-user"></i>
          </label>
          <label class="label text">
            <input type="password" class="input" placeholder="Пароль" ng-model="password" required>
            <i class="icon icon-key"></i>
          </label>
          <button class="button">Войти</button>
        </form>
      </div>
    </div>

    <div id="sign-up" class="modal" data="signUp" ng-click="modal.close($event)" ng-class="{active:modal.signUp}">
      <div class="inner col-1">
        <h3 class="title">Регистрация</h3>
        <form class="form" ng-submit="signUp()" ng-controller="user">
          <label class="label text">
            <input type="text" class="input" placeholder="Фамилия" ng-model="lastname" required>
            <i class="icon icon-user"></i>
          </label>

          <label class="label text">
            <input type="password" class="input" placeholder="Имя" ng-model="firstname" required>
            <i class="icon icon-key"></i>
          </label>

          <label class="label text">
            <input type="password" class="input" placeholder="Отчество" ng-model="patronymic" required>
            <i class="icon icon-key"></i>
          </label>
          <button class="button">Войти</button>
        </form>
      </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js"></script>

  </body>
</html>
<?php ob_end_flush(); ?>
