<?php
/** Note: server uses Apache/2.2.22 **/
error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);

session_start();

include('head.html');
?>
<h2>About</h2>
<div>
	<p>Looking pretty since 2017</p>
	<p>If you have any questions, suggestions or complaints contact:</p>
	<ul class="centered">
		<li>/u/cobertor4 (bugs or suggestions to lightbinding code)</li>
		<li>/u/linkux18 (bugs or suggestions to lightbinding design)</li>
	</ul>
	<p>Made by AJ Sadler. Updated by Cobertor. Beautified by Linku</p>
</div>

<?php

include('end.html');

?>
