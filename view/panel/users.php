<script>
window.DaTa = [<?php for($i = 0; $i != 20; ++$i){ ?>{id:<?php echo 1000 + $i; ?>,name:<?php echo (int) (1000 / $i); ?>,begin:<?php echo 1800 + (int) (1000 / $i); ?>,end:<?php echo 1800 + (int) (1000 / $i); ?>} <?php if( $i + 1 != 20 ) echo ','; ?><?php } ?>];

console.log(window.DaTa);
</script>

  <div class="block">
  <form class="w-4">
    <label class="label text np w-3">
      <input type="text" class="input" placeholder="Поиск" ng-model="search" />
      <i class="icon icon-search"></i>
    </label>
    <label class="w-1 np">
      <input class="button nm" type="submit" value="найти" />
    </label>
  </form>
</div>

<div class="block">
  <div class="filter">
    <h3 class="title">фильтр</h3>
    <label class="label">

    </label>
  </div>
</div>

<table class="table">
  <thead class="head">
    <tr class="tr">
      <th class="th id">ID</th>
      <th class="th name" ng-bind="lang._.archive.name"></th>
      <th class="th begin" ng-bind="lang._.archive.begin"></th>
      <th class="th end" ng-bind="lang._.archive.end"></th>
      <th class="th detail"></th>
    </tr>
  </thead>
  <tbody class="body">
      <tr class="tr" ng-repeat="tr in DaTa">
        <td class="td id" ng-bind="tr.id"></td>
        <td class="td name" ng-bind="tr.name"></td>
        <td class="td begin" ng-bind="tr.begin"></td>
        <td class="td end" ng-bind="tr.end"></td>
        <td class="td detail">Детали</td>
      </tr>
  </tbody>
</table>


<div class="pagination">
  <button class="first go disabled"><<</button>
  <button class="number go active">1</button>
  <button class="number go">2</button>
  <button class="number go">3</button>
  <button class="number go">4</button>
  <button class="number go disabled">...</button>
  <button class="number go">30</button>
  <button class="last go">>></button>
</div>
