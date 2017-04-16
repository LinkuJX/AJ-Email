<?php
/** Note: server uses Apache/2.2.22 **/
error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);

session_start();


include('head.html');
?>

<div class="page-header">
    <h2>(A)J's Pleasant Email Generator</h2>
    <small>Remember to double check the output!</small>
</div>

<form>
    <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">General Info</h3>
                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
            </div>
            <div class="panel-body">
                <div class="form-group col-xs-3" id="player-name">
                    <label for="player-name-input">Player Name:</label>
                    <input type="text" class="form-control" id="player-name-input">
                </div>
                <div class="radio-inline col-xs-2" id="accepted-all-id">
                    <label for="accepted-all-id-radio">
                        Accepted All ID:
                    </label>
                    <form id="accepted-all-id-radio">
                        <label class="radio-inline">
                            <input type="radio" name="accepted-all-id-radio-option" id="accepted-all-id-radio-option-1">
                            Yes
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="accepted-all-id-radio-option" id="accepted-all-id-radio-option-2">
                            No
                        </label>
                    </form>
                </div>
                <div class="radio-inline col-xs-2" id="working-days">
                    <label for="working-days-radio">
                        Working Days:
                    </label>
                    <form id="working-days-radio">
                        <label class="radio-inline">
                            <input type="radio" name="working-days-radio-option" id="working-days-radio-option-1">
                            1/2
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="working-days-radio-option" id="working-days-radio-option-2">
                            7
                        </label>
                    </form>
                </div>
                <div class="radio-inline col-xs-4" id="game-type">
                    <label for="game-type-radio">
                        Game Type:
                    </label>
                    <form id="game-type-radio">
                        <label class="radio-inline">
                            <input type="radio" name="game-type-radio-option" id="game-type-radio-option-1">
                            MF
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="game-type-radio-option" id="game-type-radio-option-2">
                            PW
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="game-type-radio-option" id="game-type-radio-option-3">
                            SP
                        </label>
                    </form>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Received</h3>
                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
            </div>
            <div class="panel-body">
                <div class="form-group" id="received">
                    <div>
                        <div class="checkbox-inline">
                            <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="ADD" data-off="ADD" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="PayPal" data-off="PayPal" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="Card" data-off="Card" data-size="mini">
                            <label for="card-card-number" class="checkbox-label">Card #:</label>
                            <input type="text" class="form-control">
                            <input type="checkbox" data-toggle="toggle" data-on="POP" data-off="POP" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="3P" data-off="3P" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="Recent" data-off="Recent" data-size="mini">
                            <label for="pop-3p-recent-date" class="checkbox-label">Date:</label>
                            <input type="date" class="form-control">
                        </div>
                    </div>
                    <div>
                        <div class="checkbox-inline">
                            <input type="checkbox" data-toggle="toggle" data-on="Name Change" data-off="Name Change" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="ADD Change" data-off="ADD Change" data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="PP Trans." data-off="PP Trans." data-size="mini">
                            <input type="checkbox" data-toggle="toggle" data-on="3P Card" data-off="3P Card" data-size="mini">
                            <label for="threep-card-number" class="checkbox-label">3P Card #:</label>
                            <input type="text" class="form-control">
                            <input type="checkbox" data-toggle="toggle" data-on="Payment" data-off="Payment" data-size="mini">
                            <label for="payment-amount" class="checkbox-label">Amount:</label>
                            <input type="number" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<script id="outputTemplate" type="text/x-jsrender">
##[Countdown]({{:CountdownUrl}})  

Teams
---

{{:Standings}}

--- 

Streams
---

{{:Streams}}
{{:StreamsYt1}}

{{:StreamsYt2}}

---

Hosts
---

{{:Hosts}}

---

Casters
---

{{:Casters}}

---

Schedule
---

{{:Schedule}}

* All times are APPROXIMATE and the schedule should be used as a general guideline.

* All matches will be played on patch [{{:Patch}}]({{:PatchLinkNumber}}).

---

{{:Footer}}
</script>

<script id="streamsTemplate" type="text/x-jsrender">
* [{{:Name}}]({{:Link}})
</script>

<script id="castersTemplate" type="text/x-jsrender">
* {{:Name}} [Twitter]({{:Twitter}})
</script>

<script id="footerStuffTemplate" type="text/x-jsrender">
{{:Title}}
---
{{for Content}}
{{:}}
{{/for}}

---

</script>

<?php

include('end.html');

?>
