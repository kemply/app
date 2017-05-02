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
<!DOCTYPE html>
<html lang="ru" ng-app="app">
  <head>
    <base href="/" />

    <title id="title" ng-bind="title"></title>

    <link href="/css/fonts.css" rel="stylesheet" type="text/css" />
    <link href="/css/base.css" rel="stylesheet" type="text/css" />
    <link href="/css/header.css" rel="stylesheet" type="text/css" />
    <link href="/css/footer.css" rel="stylesheet" type="text/css" />
    <link href="/css/ui.css" rel="stylesheet" type="text/css" />

    <link href="/css/guide.css" rel="stylesheet" type="text/css" />
    <link href="/css/archive.css" rel="stylesheet" type="text/css" />
    <link href="/css/enquiry.css" rel="stylesheet" type="text/css" />

    <script src="/js/dictionary.js?time=<?php echo (int) microtime(true); ?>"></script>

    <script src="/js/angular/main.js"></script>
    <script src="/js/angular/cookies.js"></script>
    <script src="/js/angular/route.js"></script>
    <script src="/js/angular/sanitize.js"></script>
    <script src="/js/angular/yamap.js"></script>

    <script src="/js/app/guide.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/archive.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/enquiry.js?time=<?php echo (int) microtime(true); ?>"></script>
    <script src="/js/app/main.js?time=<?php echo (int) microtime(true); ?>"></script>
    <!-- <script src="/js/app/controller/guide.js"></script> -->
  </head>
  <body id="body">

    <header id="header" ng-controller="MainCTRL">
      <div class="row">
        <div class="logo line col-1">
          <a href="/" class="text">logotype</a>
        </div>

        <nav class="nav line col-2">
          <a class="link" ng-class="{active:currentPage == 'guide'}" href="/guide" ng-bind="lang._.nav.guide"></a>
          <a class="link" ng-class="{active:currentPage == 'archive'}" href="/archive" ng-bind="lang._.nav.archive"></a>
          <a class="link" ng-class="{active:currentPage == 'enquiry'}" href="/enquiry" ng-bind="lang._.nav.enquiry"></a>
        </nav>

        <div class="navigation line col-1">
          <div class="login-link">
            <span class="text sign-up" onclick="modal.open('sign-up')" ng-bind="lang._.nav.signUp"></span>
            <span class="text sign-in" onclick="modal.open('sign-in')" ng-bind="lang._.nav.signIn"></span>
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

    <footer id="footer" ng-controller="MainCTRL">
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
  </body>
</html>
<?php ob_end_flush(); ?>
