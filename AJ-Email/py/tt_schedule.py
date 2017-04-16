#!/usr/bin/python

"""
Amos is a god
"""

import requests, json, math
from bs4 import BeautifulSoup
import datetime

ALL_API = "http://api.lolesports.com/api/v1/scheduleItems?leagueId="
EU_API  = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=56fcc0fc-3311-4e04-aa05-9cb386e64bc0&matchId"
NA_API  = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=ce8e57ab-9804-496d-941a-9d04558f7bb4&matchId"
KR_API  = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=1474e30e-3598-4667-91f3-8969949c605f&matchId"
CN_API  = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=5ca2f3d5-3682-4635-bac2-87f5a7f41696&matchId"
LMS_API = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=2513bd71-7017-4078-b20c-c13d5a8dd133&matchId"

def API(region):
    if region == "EU":
        return EU_API
    elif region == "NA":
        return NA_API
    elif region == "KR":
        return KR_API
    elif region == "CN":
        return CN_API
    elif region == "LMS":
        return LMS_API

def get_match_ids(rjson, dates):
    """
    Function that gets all match IDs for the given dates. This
    can be used in combination with Riot's API to get the schedule.
    """
    match_ids = []
    for item in rjson.json()["scheduleItems"]:
        date = item["scheduledTime"][:10]
        if date in dates:
            try:
                match_ids.append(item["match"])
            except KeyError:
                pass
    return match_ids

def add_0(time):
    if len(str(time)) == 1:
        return "0{}".format(time)
    else:
        return time

def timezones(GMT):
    """
    Get all the times for the different timezones used in the live thread.
    """
    return "{}:00|{}:00|{}:00|{}:00|{}:30|{}:00|{}:00".format(
        add_0((GMT - 8) % 24) , add_0((GMT - 5) % 24) , GMT + 1, add_0((GMT + 2) % 24), 
        add_0((GMT + 5) % 24), add_0((GMT + 9) % 24), add_0((GMT + 11) % 24))

def set_timezones(match_information):
    """
    Append the timezones to the matches for use in creating the schedule.
    """
    for match in match_information:
        match.append(timezones(match[2]))

def na_schedule(match_information):
    """
    Because NA LCS is on different days for EU it needs its own function
    """
    output = "|**Day 1**|Game|PST|EST|GMT|CET|IST|KST|AEDT|Result|Discussion|\n"
    output += "|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--|:--:|:--:|:--:|\n"
    output += "|Stream 1|{} vs. {}|{}|0-0||\n".format(match_information[0][0],
        match_information[0][1], match_information[0][-1])
    output += "|Stream 1|{} vs. {}|{}|0-0||\n".format(match_information[1][0],
        match_information[1][1], match_information[1][-1])
    output += "|**Day 2**||\n"
    output += "|Stream 1|{} vs. {}|{}|0-0||\n".format(match_information[2][0],
        match_information[2][1], match_information[2][-1])
    output += "|Stream 2|{} vs. {}|{}|0-0||\n".format(match_information[3][0],
        match_information[3][1], match_information[3][-1])
    output += "|Stream 1|{} vs. {}|{}|0-0||\n".format(match_information[4][0],
        match_information[4][1], match_information[4][-1])
    output += "|Stream 2|{} vs. {}|{}|0-0||\n".format(match_information[5][0],
        match_information[5][1], match_information[5][-1])
    output += "|**Day 3**||\n"
    output += "|Stream 1|{} vs. {}|{}|0-0||\n".format(match_information[6][0],
        match_information[6][1], match_information[6][-1])
    output += "|Stream 2|{} vs. {}|{}|0-0||\n".format(match_information[7][0],
        match_information[7][1], match_information[7][-1])
    output += "|Stream 1|{} vs. {}|{}|0-0||\n".format(match_information[8][0],
        match_information[8][1], match_information[8][-1])
    output += "|Stream 2|{} vs. {}|{}|0-0||\n".format(match_information[9][0],
        match_information[9][1], match_information[9][-1])

    with open("/home/1/l/lightbinding/www/LUaDTC/py/na_schedule.txt", "w") as f:
        f.write(output)

def save_schedule(match_information, region):
    """
    Function for multiple regions that saves the schedule to 
    <region>_schedule.txt
    """
    output = "|**Day 1**|Game|PST|EST|GMT|CET|IST|KST|AEDT|Result|Discussion|\n"
    output += "|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--|:--:|:--:|:--:|\n"
    previous_day, day = match_information[0][3], 2
    for match in match_information:
        current_day = match[3]
        if previous_day != current_day:
            output += "|**Day {}**||\n".format(day)
            day += 1
        output += "||{} vs. {}|{}|0-0||\n".format(match[0], match[1], match[-1])
        previous_day = current_day
    
    savefile = "{}_schedule.txt".format(region.lower())
    with open("{}".format(savefile), "w") as f:
        f.write(output)


def team_schedule(region):
    match_information = []

    today = datetime.date.today()
    today -= datetime.timedelta(days=today.weekday())
    dates = [str(today + datetime.timedelta((i - today.weekday()) % 7)) for i in range(7)]

    if region == "EU":
        r = requests.get("{}3".format(ALL_API))
    elif region == "NA":
        r = requests.get("{}2".format(ALL_API))
    elif region == "KR":
        r = requests.get("{}6".format(ALL_API))
    elif region == "CN":
        r = requests.get("{}7".format(ALL_API))
    elif region == "LMS":
        r = requests.get("{}8".format(ALL_API))

    match_ids = get_match_ids(r, dates)

    for match_id in match_ids:
        url = "{}={}".format(API(region), match_id)
        r = requests.get(url)

        m_i = [r.json()["teams"][0]["acronym"], r.json()["teams"][1]["acronym"], 
               int(r.json()["scheduleItems"][0]["scheduledTime"][11:13]), 
               r.json()["scheduleItems"][0]["scheduledTime"][:10]]
        match_information.append(m_i)

    match_information = sorted(match_information, key = lambda x: (x[3], x[2]))
    set_timezones(match_information)

    return match_information

if __name__ == '__main__':
    save_schedule(team_schedule("NA"), "NA")
    save_schedule(team_schedule("EU"), "EU")
    save_schedule(team_schedule("KR"), "KR")
    save_schedule(team_schedule("CN"), "CN")
    save_schedule(team_schedule("LMS"), "LMS")