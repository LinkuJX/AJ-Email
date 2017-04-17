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
                <div class="artificial-row">
                    <input type="text" class="form-inline" id="player-name-input" placeholder="Player Name" value="">
                    <label for="accepted-all-id-input" class="input-label">Accepted All ID</label>
                    <input type="checkbox" id="accepted-all-id-input" data-toggle="toggle" data-on="Yes" data-off="No" data-size="mini">
                    <label for="working-days-input" class="input-label">Working Days</label>
                    <input type="checkbox" id="working-days-input" class="form-control" data-toggle="toggle" data-on="7" data-off="1/2" data-size="mini">
                </div>
                <div class="artificial-row">
                    <div class="btn-group" id="brand">
                        <button type="button" class="btn btn-default btn-md btn-brand active">mFortune</button>
                        <button type="button" class="btn btn-default btn-md btn-brand">PocketWin</button>
                        <button type="button" class="btn btn-default btn-md btn-brand">Mr Spin</button>
                    </div>
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
                    <div class="artificial-row"> <!-- Class is or CSS use --><!--First Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="ADD" data-off="ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="PayPal" data-off="PayPal" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="Card" data-off="Card" data-size="mini">
                        <input type="text" class="form-inline" placeholder="Card #" value="">
                        <input type="checkbox" data-toggle="toggle" data-on="POP" data-off="POP" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="3P" data-off="3P" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="Recent" data-off="Recent" data-size="mini">
                        <input type="date" class="form-inline">
                    </div>
                    <div class="artificial-row"><!--2nd Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="Name Change" data-off="Name Change" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="ADD Change" data-off="ADD Change" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="PP Trans." data-off="PP Trans." data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="3P Card" data-off="3P Card" data-size="mini">
                        <input type="text" class="form-inline" placeholder="3P Card #" value="">
                        <input type="checkbox" data-toggle="toggle" data-on="Payment" data-off="Payment" data-size="mini">
                        <label>£</label>
                        <input type="number" class="form-inline" placeholder="Amount" value="0">
                    </div>
                    <div class="artificial-row"><!--3rd Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="PP 3P DOB" data-off="PP 3P DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="CC 3P DOB" data-off="CC 3P DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="POP 3P DOB" data-off="POP 3P DOB" data-size="mini">
                    </div>
                    <div class="artificial-row"><!--4th Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="PP 3P ADD" data-off="PP 3P ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="CC 3P ADD" data-off="CC 3P ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="POP 3P ADD" data-off="POP 3P ADD" data-size="mini">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Cannot Accept</h3>
                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
            </div>
            <div class="panel-body">
                <div class="form-group" id="cannot-accept">
                    <div class="artificial-row"> <!-- Class is or CSS use --><!--First Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="ADD" data-off="ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="PayPal" data-off="PayPal" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="Card" data-off="Card" data-size="mini">
                        <input type="text" class="form-inline" placeholder="Card #" value="">
                        <input type="checkbox" data-toggle="toggle" data-on="POP" data-off="POP" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="3P" data-off="3P" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="Recent" data-off="Recent" data-size="mini">
                        <input type="date" class="form-inline">
                    </div>
                    <div class="artificial-row"><!--2nd Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="Name Change" data-off="Name Change" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="ADD Change" data-off="ADD Change" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="PP Trans." data-off="PP Trans." data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="3P Card" data-off="3P Card" data-size="mini">
                        <input type="text" class="form-inline" placeholder="3P Card #" value="">
                        <input type="checkbox" data-toggle="toggle" data-on="Payment" data-off="Payment" data-size="mini">
                        <label>£</label>
                        <input type="number" class="form-inline" placeholder="Amount" value="0">
                    </div>
                    <div class="artificial-row"><!--3rd Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="PP 3P DOB" data-off="PP 3P DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="CC 3P DOB" data-off="CC 3P DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="POP 3P DOB" data-off="POP 3P DOB" data-size="mini">
                    </div>
                    <div class="artificial-row"><!--4th Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="PP 3P ADD" data-off="PP 3P ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="CC 3P ADD" data-off="CC 3P ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="POP 3P ADD" data-off="POP 3P ADD" data-size="mini">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">ID Required</h3>
                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
            </div>
            <div class="panel-body">
                <div class="form-group" id="id-required">
                    <div class="artificial-row"> <!-- Class is or CSS use --><!--First Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="ADD" data-off="ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="PayPal" data-off="PayPal" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="Card" data-off="Card" data-size="mini">
                        <input type="text" class="form-inline" placeholder="Card #" value="">
                        <input type="checkbox" data-toggle="toggle" data-on="POP" data-off="POP" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="3P" data-off="3P" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="Recent" data-off="Recent" data-size="mini">
                        <input type="date" class="form-inline">
                        <input type="text" class="form-inline" placeholder="Phone #" value="">
                    </div>
                    <div class="artificial-row"><!--2nd Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="Name Change" data-off="Name Change" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="ADD Change" data-off="ADD Change" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="PP Trans." data-off="PP Trans." data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="3P Card" data-off="3P Card" data-size="mini">
                        <input type="text" class="form-inline" placeholder="3P Card #" value="">
                        <input type="checkbox" data-toggle="toggle" data-on="Payment" data-off="Payment" data-size="mini">
                        <label>£</label>
                        <input type="number" class="form-inline" placeholder="Amount" value="0">
                    </div>
                    <div class="artificial-row"><!--3rd Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="PP 3P DOB" data-off="PP 3P DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="CC 3P DOB" data-off="CC 3P DOB" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="POP 3P DOB" data-off="POP 3P DOB" data-size="mini">
                    </div>
                    <div class="artificial-row"><!--4th Row-->
                        <input type="checkbox" data-toggle="toggle" data-on="PP 3P ADD" data-off="PP 3P ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="CC 3P ADD" data-off="CC 3P ADD" data-size="mini">
                        <input type="checkbox" data-toggle="toggle" data-on="POP 3P ADD" data-off="POP 3P ADD" data-size="mini">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Cannot Accept Reasons</h3>
                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
            </div>
            <div class="panel-body">
                <div class="artificial-row">
                    <label class="checkbox-label">DOB </label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Expiry" data-off="Expiry" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="License #" data-off="License #" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Pass #" data-off="Pass #" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Name Change </label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name Before" data-off="Name Before" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Name After" data-off="Name After" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">ADD </label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Address" data-off="Address" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Logo" data-off="Logo" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Date" data-off="Date" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">ADD  Change</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Address" data-off="Address" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Logo" data-off="Logo" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Date" data-off="Date" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Paypal</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Full Name" data-off="Full Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Paypal Logo" data-off="Paypal Logo" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Paypal Transaction</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Date" data-off="Date" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Amount" data-off="Amount" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Paypal 3p Date of Birth</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Expiry" data-off="Expiry" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="License #" data-off="License #" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Pass #" data-off="Pass #" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Paypal 3p Address</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Address" data-off="Address" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Logo" data-off="Logo" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Date" data-off="Date" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Card</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="First 6" data-off="First 6" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Last 4" data-off="Last 4" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Expiry" data-off="Expiry" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">3p Card</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="First 6" data-off="First 6" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Last 4" data-off="Last 4" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Expiry" data-off="Expiry" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Credit Card 3p Date of Birth</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="DOB" data-off="DOB" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Expiry" data-off="Expiry" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="License #" data-off="License #" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Pass #" data-off="Pass #" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">Credit Card 3p Address</label>
                    <select class="selectpicker" type="form-control">
                        <option></option>
                        <option>blurred </option>
                        <option>not accepted </option>
                        <option>out of date </option>
                        <option>cannot see </option>
                    </select>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Address" data-off="Address" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Logo" data-off="Logo" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Date" data-off="Date" data-size="mini">
                </div>
                <div class="artificial-row">
                    <label class="checkbox-label">POP 3P Recent</label>
                    <input type="checkbox" data-toggle="toggle" data-on="POP" data-off="POP" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="3P" data-off="3P" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Recent" data-off="Recent" data-size="mini">
                    <label class="checkbox-label"> : </label>
                    <input type="checkbox" data-toggle="toggle" data-on="Name" data-off="Name" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Network" data-off="Network" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Date" data-off="Date" data-size="mini">
                    <input type="checkbox" data-toggle="toggle" data-on="Amount" data-off="Amount" data-size="mini">
                </div>
            </div>
        </div>
    </div>
</form>

<?php

include('end.html');

?>
