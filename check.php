<?php
?>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js"></script>
<script>
  $.ajax({
    url     : "//192.168.1.205:8080/wax/factor/factor",
    method  : "POST",
    data    : {
      id      : "1001",
      login   : "sysadmin",
      passwd  : "111"
    },
    success : function(data){
      console.log(data);
    }
  });
</script>
<form action="http://192.168.1.205:8080/wax/auth/login" method="post">
  <!-- <input type="text" name="id" value="1001"/>
  <br /> -->
  <input type="text" name="login" value="sysadmin"/>
  <br />
  <input type="text" name="passwd" value="111"/>
  <br />
  <input type="submit" />
</form>
