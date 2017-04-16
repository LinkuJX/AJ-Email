var regions = ["eu", "na", "lck", "lms", "lpl"];

var Standings = {};
var Schedules = {};
var StreamsByRegion = {};
var HostsByRegion = {};
var CastersByRegion = {};
var FooterStuff = [];

// Google doc links:
var URL_STREAMS = "https://docs.google.com/spreadsheets/d/17Cn2MLHHDbCUEGxrH7cvr2of36Gtbzte6szeY-tRqao/pub?output=csv&gid=1103251992";
var URL_HOSTS   = "https://docs.google.com/spreadsheets/d/17Cn2MLHHDbCUEGxrH7cvr2of36Gtbzte6szeY-tRqao/pub?output=csv&gid=0";
var URL_CASTERS = "https://docs.google.com/spreadsheets/d/17Cn2MLHHDbCUEGxrH7cvr2of36Gtbzte6szeY-tRqao/pub?output=csv&gid=1156371059";
var URL_FOOTER  = "https://docs.google.com/spreadsheets/d/17Cn2MLHHDbCUEGxrH7cvr2of36Gtbzte6szeY-tRqao/pub?output=csv&gid=1496519766";

$(document).ready(function(){
    // bind generate button click to function
    $("#btn-generate").click(function(e){
        console.log(Standings);
        
        if (Standings == null || Standings.length === 0) {
            alert("Data not ready yet...");
            return;
        }
        
        var selectedRegion = $("#select-region").val();
        console.log("Selected region: " + selectedRegion);
        
        var countdownLink = $("#countdown-input").val();
        console.log("countdown link: " + countdownLink);

        var patchNumber = $("#patch-input").val();
        console.log("patch number: " + patchNumber);
        var patchNumberNoDecimal = patchNumber.split('.').join('');
        console.log("patch number no decimal: " + patchNumberNoDecimal);

        if ($("#streams-yt-1").val() != "") {
            var youtubeLink1 = "* [Stream #1 on YouTube]("+$("#streams-yt-1").val()+")";
            console.log("youtube link 1: " + youtubeLink1);
        } else {
            var youtubeLink1 = "";
        }
        if ($("#streams-yt-2").val() != "") {
            var youtubeLink2 = "* [Stream #2 on YouTube]("+$("#streams-yt-2").val()+")";
            console.log("youtube link 2: " + youtubeLink2);
        } else {
            var youtubeLink2 = "";
        }
        
        var outputData = {
            CountdownUrl: countdownLink,
            Patch: patchNumber,
            PatchLinkNumber: "http://na.leagueoflegends.com/en/news/game-updates/patch/patch-" + patchNumberNoDecimal + "-notes",
            Standings: $('#textarea-standings-output').val(),
            Schedule: $('#textarea-schedule-output').val(),
            Streams: $('#textarea-streams-output').val(),
            StreamsYt1: youtubeLink1,
            StreamsYt2: youtubeLink2,
            Hosts: $('#textarea-hosts-output').val(),
            Casters: $('#textarea-casters-output').val(),
            Footer: $('#textarea-end-info-output').val()
            // add more {{:variables}} present in the template here
        }
        var template = $.templates('#outputTemplate');
        var output = template.render(outputData);
        $("#textarea-output").val(output);
    });
    
    // when dropdown for region ganges
    $("#region-select").change(function () {
        var selectedRegion = $(this).find(":selected").val();
        console.log("Region: " + selectedRegion);
        
        // set val of textarea-standings-output
        $('#textarea-standings-output').val(Standings[selectedRegion]);
        console.log("set val of textarea-standings-output");
        
        // set val of textarea-streams-output
        console.log("streams by region:", StreamsByRegion);
        var regionStreams = StreamsByRegion[selectedRegion];
        console.log("Selected Region Streams: ", regionStreams);
        var template = $.templates('#streamsTemplate');
        var output = template.render(regionStreams);
        $("#textarea-streams-output").val(output);
        console.log("set val of textarea-streams-output");
        
        // set val of textarea-hosts-output
        template = $.templates('#castersTemplate');
        output = template.render(HostsByRegion[selectedRegion]);
        $("#textarea-hosts-output").val(output);
        console.log("set val of textarea-hosts-output");
        
        // set val of textarea-casters-output
        template = $.templates('#castersTemplate');
        output = template.render(CastersByRegion[selectedRegion]);
        $("#textarea-casters-output").val(output);
        console.log("set val of textarea-casters-output");
        
        // set val of textarea-schedule-output
        $('#textarea-schedule-output').val(Schedules[selectedRegion]);
        console.log("set val of textarea-schedule-output");
        
        // set value of textarea-end-info-output
        //output = "";
        //console.log("FooterStuff: ", FooterStuff);
        //for (var i = 0; i < FooterStuff.length; i++) {
        //    console.log("[" + i + "] = ", FooterStuff[i]);
        //    template = $.templates('#footerStuffTemplate');
        //    output += template.render(FooterStuff[i]);
        //}
        template = $.templates('#footerStuffTemplate');
        output = template.render(FooterStuff);
        $("#textarea-end-info-output").val(output);
        console.log("set val of textarea-end-info-output");
    });
    
    // Fill Standings array
    regions.forEach(function(region) {
        $.ajax({
            type: "GET",
            url: "py/"+region+"_standings.txt",
            dataType: "text",
        }).done(function(response) {
            console.log("Loaded standings for region "+region+"!");
            console.log(response);
            Standings[region] = response;
        }).fail(function(response) {
            // add here something when error happens if needed
            console.error(response);
        }).always(function() {
            // add here something that always happens
        });
    });
    
    // Fill Schedules array
    regions.forEach(function (region) {
        $.ajax({
            type: "GET",
            url: "py/" + region + "_schedule.txt",
            dataType: "text",
        }).done(function (response) {
            console.log("Loaded schedule for region " + region + "!");
            console.log(response);
            Schedules[region] = response;
        }).fail(function (response) {
            // add here something when error happens if needed
            console.error(response);
        }).always(function () {
            // add here something that always happens
        });
    });
    
    // Collapsible panels
    $(document).on('click', '.panel-heading span.clickable', function(e){
        var $this = $(this);
        if(!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });
});

/*

##[Countdown](https://www.timeanddate.com/countdown/generic?iso=20170212T12&p0=4551&msg=NA+LCS+Spring+Split+2017+%7C+Week+4+-+Day+3&font=cursive)

----
**Make sure to PM us suggestions/questions!**


**NOTICE**: Keep the threads to LCS discussions. If there are any mistakes in the thread (such as countdown, schedule, timezones) PLEASE, PM us instead of posting in the thread! That way we can react to it faster and the thread stays about LCS.

We're going to continue hosting IRC chat for this Summer split.
To join us, simply click [here](http://webchat.xertion.org/?channels=tournamentthreads), enter a Nickname of your choice and press Connect.
Alternatively, you can connect using your IRC client of choice at irc.xertion.org:6667 and join #TournamentThreads.

#Notice: [Start of the season - 10 bans on pro-play](http://www.lolesports.com/en_US/articles/start-season-10-bans-pro-play)

----

Teams
---


| Rank | Team | Set W-L | Matches W-L | Streak | Last Five | Information |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|1|[Cloud9](http://cloud9.gg/)|8-0|16-4|8W|5-0|[EsportsWikis](http://lol.esportswikis.com/wiki/Cloud9) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/cloud9)|
|2|[FlyQuest](https://www.flyquest.gg/)|6-2|14-5|1L|3-2|[EsportsWikis](http://lol.esportswikis.com/wiki/FlyQuest) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/flyquest)|
|2|[Team SoloMid](http://tsm.gg/)|6-2|12-9|1L|4-1|[EsportsWikis](http://lol.esportswikis.com/wiki/Team_SoloMid) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-solomid)|
|4|[Phoenix1](http://phoenix1.gg/)|4-4|11-8|3L|2-3|[EsportsWikis](http://lol.esportswikis.com/wiki/Phoenix1) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/phoenix1)|
|4|[Immortals](https://immortals.gg/)|4-4|9-10|2W|3-2|[EsportsWikis](http://lol.esportswikis.com/wiki/Immortals) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/immortals)|
|4|[Echo Fox](http://live.echofox.gg/)|4-4|10-10|2W|3-2|[EsportsWikis](http://lol.esportswikis.com/wiki/Echo_Fox) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/echo-fox)|
|7|[Counter Logic Gaming](http://clgaming.net/)|3-5|8-11|1W|2-3|[EsportsWikis](http://lol.esportswikis.com/wiki/Counter_Logic_Gaming) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/counter-logic-gaming)|
|8|[Team Liquid](https://www.teamliquidpro.com/)|2-6|7-13|2L|1-4|[EsportsWikis](http://lol.esportswikis.com/wiki/Team_Liquid) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-liquid)|
|8|[Team Dignitas](http://team-dignitas.net/)|2-6|7-13|1W|1-4|[EsportsWikis](http://lol.esportswikis.com/wiki/Team_Dignitas) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-dignitas)|
|10|[Team EnVyUs](https://teamenvyus.com/)|1-7|3-14|3L|1-4|[EsportsWikis](http://lol.esportswikis.com/wiki/Team_EnVyUs) // [LoL Esports](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-envy)|

---

Streams
---

* [Stream #1 on Twitch](http://www.twitch.tv/nalcs1)

* [Stream #2 on Twitch](https://www.twitch.tv/nalcs2)   

* [Stream #1 on Youtube](https://www.youtube.com/watch?v=VyBZMQ88NrE)   

* [Stream #2 on Youtube](https://www.youtube.com/watch?v=aPBRinHE_PI)

* Watch both streams at the same time on [kadgar](http://kadgar.net/live/nalcs1/nalcs2) or [multitwitch](http://multitwitch.tv/nalcs1/nalcs2).

* [Stream on Azubu.tv](http://www.azubu.tv/Riot_Games)

* [Comment Stream](http://reddit-stream.com/comments/5tnmwx)



---
Host
---

*  James 'Dash' Patterson [Twitter](https://twitter.com/RiotDash)


---

Casters
---

* Sam 'Kobe' Hartman-Kenzler [Twitter](https://twitter.com/RiotKobe)

* Joshua 'Jatt' Leesman [Twitter](https://twitter.com/RiotJatt)

* Rivington 'Riv' Bisland III [Twitter](https://twitter.com/RivingtonThe3rd)

* David 'Phreak' Turley [Twitter](https://twitter.com/RiotPhreak)

* Aidan 'Zirene' Moon [Twitter](https://twitter.com/lolzirene)

* Julian 'Pastrytime' Carr [Twitter](https://twitter.com/Pastrytime)

* Isaac 'Azael' Cummings Bentley [Twitter](https://twitter.com/riotazael)

* Clayton 'CaptainFlowers' Raines [Twitter](https://twitter.com/captainflowers2)


---

Schedule
---
|Day 1|Game|PST|EST|GMT|CET|IST|KST|AEDT|Result|Discussion|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
Stream 1|DIG vs. FLY|15:00|18:00|23:00|00:00|04:30|08:00|10:00|0-0||
Stream 1|NV vs. P1|18:00|21:00|02:00|03:00|07:30|11:00|13:00|0-0||
|**Day 2**||
Stream 1|CLG vs. IMT|12:00|15:00|20:00|21:00|01:30|05:00|07:00|0-0||
Stream 2|TL vs. DIG|12:00|15:00|20:00|21:00|01:30|05:00|07:00|0-0||
Stream 1|C9 vs. TSM|15:00|18:00|23:00|00:00|04:30|08:00|10:00|0-0||
Stream 2|NV vs. EFX|15:00|18:00|23:00|00:00|04:30|08:00|10:00|0-0||
|**Day 3**||
Stream 1|FLY vs. TSM|12:00|15:00|20:00|21:00|01:30|05:00|07:00|0-0||
Stream 2|IMT vs. EFX|12:00|15:00|20:00|21:00|01:30|05:00|07:00|0-0||
Stream 1|P1 vs. C9|15:00|18:00|23:00|00:00|04:30|08:00|10:00|0-0||
Stream 2|TL vs. CLG|15:00|18:00|23:00|00:00|04:30|08:00|10:00|0-0||


* All times are APPROXIMATE and the schedule should be used as a general guideline.

* All matches will be played on [7.3](http://na.leagueoflegends.com/en/news/game-updates/patch/patch-73-notes).




---

Coverage
---

* [Riot Games](http://www.lolesports.com/en_US/na-lcs/na_2017_spring/schedule/default)

* [EsportsWikis Coverage](http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/2017_Season/Spring_Season)

* [EsportsWikis Live  - Live Twitter Updates on Stream 1](https://twitter.com/LoL_ESWLive)

* [EsportsWikis Live  - Live Twitter Updates on Stream 2](https://twitter.com/LoL_ESWLive2)

* [Esportsbetting Coverage](http://www.esports-betting.pro/lol/lcs-2017-lcs-season-7/)



---

VoDs
---

* [VoDs on Reddit](http://www.reddit.com/r/LoLeventVoDs/)
* [VoDs on LoL Esports](http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/2017_Season/Spring_Season/VODs)

*/

/** copy button */
var clipboard = new Clipboard('button.btn');

clipboard.on('success', function(e) {
    e.clearSelection();
    $("body").scrollTop(0);
});

clipboard.on('error', function(e) {
    alert("Error copying! Use control+c instead");
});

/****** Load Google Sheets ******/

// Streams
$.post("../php/getJSON.php", { feed: URL_STREAMS })
.done(function (json) {
    StreamsByRegion = GroupBy(json, 'Region');
    console.log("Streams:", StreamsByRegion);
})
.error(function (response) {
    console.error(response);
});

// Hosts
$.post("../php/getJSON.php", { feed: URL_HOSTS })
.done(function (json) {
    HostsByRegion = GroupBy(json, 'Region');
    console.log("Hosts:", HostsByRegion);
})
.error(function (response) {
    console.error(response);
});

$.post("../php/getJSON.php", { feed: URL_CASTERS })
.done(function (json) {
    CastersByRegion = GroupBy(json, 'Region');
    console.log("Casters: ", CastersByRegion);
})
.error(function (response) {
    console.error(response);
});

$.post("../php/getJSON.php", { feed: URL_FOOTER })
.done(function (json) {
    console.log("Received footer stuff:", json);
    var tempArray = {};
    for (var i = 0; i < json.length; i++) {
        var item = json[i];
        $.each(item, function (k, v) {
            if (k == 'id') return true; // ignore auto generated property id
            
            if (!tempArray[k]) {
                tempArray[k] = [];
            }
            tempArray[k].push(v);
        });
    }
    var i = 0;
    $.each(tempArray, function (k, v) {
        FooterStuff.push({
            Title: k,
            Content: v
        });
    });
    console.log("FooterStuff:", FooterStuff);
})
.error(function (response) {
    console.error(response);
});

/****** Helper functions ******/

//var csv is the CSV file with headers
function csvToJSON(csv) {
    
    var lines = csv.split("\n");
    
    var result = [];
    
    var headers = lines[0].split(",");
    
    for (var i = 1; i < lines.length; i++) {
        
        var obj = {};
        var currentline = lines[i].split(",");
        
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        
        result.push(obj);
        
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

function GroupBy(array, property) {
    var groups = {};
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (!groups[item[property]]) {
            groups[item[property]] = [];
        }
        // create a new object without the grouped by property (e.g., region)
        var newItem = {};
        $.each(item, function (k, v) {
            if (k == property) return true;
            newItem[k] = v;
        });
        groups[item[property]].push(newItem);
    }
    return groups;
}
