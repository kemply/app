<link href="/compiler.php/panel.scss?time=<?php echo (int) microtime(true); ?>" rel="stylesheet" type="text/css" />

<div id="sidebar" class="col-1">
  <a href="/panel/users" class="link" ng-class="{active: (module == 'users')}">
    <i class="icon icon-users"></i>
    Пользователи
  </a>
  <a href="/panel/nsa" class="link" ng-class="{active: (module == 'nsa')}">
    <i class="icon icon-file-settings"></i>
    НСА
  </a>
  <a href="/panel/archiver" class="link" ng-class="{active: (module == 'archiver')}">
    <i class="icon icon-upload"></i>
    Архиватор
  </a>
</div>
<div class="parent offset-1">
  <div id="content" class="col-3" html-ng-bind="content"></div>
</div>
