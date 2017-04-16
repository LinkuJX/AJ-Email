from bs4 import BeautifulSoup
from operator import itemgetter
from itertools import izip_longest
from collections import Counter
import requests, pickle, json, re

NA_URL  = "http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/2017_Season/Spring_Season"
NA_PB   = "http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/2017_Season/Spring_Season/Picks_and_Bans"
NA_MD   = "http://lol.esportswikis.com/wiki/League_Championship_Series/North_America/2017_Season/Spring_Season/Match_Details"
EU_URL  = "http://lol.esportswikis.com/wiki/League_Championship_Series/Europe/2017_Season/Spring_Season"
EU_PB   = "http://lol.esportswikis.com/wiki/League_Championship_Series/Europe/2017_Season/Spring_Season/Picks_and_Bans"
EU_MD   = "http://lol.esportswikis.com/wiki/League_Championship_Series/Europe/2017_Season/Spring_Season/Match_Details"
LCK_URL = "http://lol.esportswikis.com/wiki/LCK/2017_Season/Spring_Season"
LCK_PB  = "http://lol.esportswikis.com/wiki/LCK/2017_Season/Spring_Season/Picks_and_Bans"
LCK_MD  = "http://lol.esportswikis.com/wiki/LCK/2017_Season/Spring_Season/Match_Details"
LPL_URL = "http://lol.esportswikis.com/wiki/LPL/2017_Season/Spring_Season"
LPL_PB  = "http://lol.esportswikis.com/wiki/LPL/2017_Season/Spring_Season/Picks_and_Bans"
LPL_MD  = "http://lol.esportswikis.com/wiki/LPL/2017_Season/Spring_Season/Match_Details"
LMS_URL = "http://lol.esportswikis.com/wiki/LMS/2017_Season/Spring_Season"
LMS_PB  = "http://lol.esportswikis.com/wiki/LMS/2017_Season/Spring_Season/Picks_and_Bans"
LMS_MD  = "http://lol.esportswikis.com/wiki/LMS/2017_Season/Spring_Season/Match_Details"

seasons = {
    "EU" : "EU LCS 2017 Spring",
    "CN" : "LPL 2017 Spring",
    "NA" : "NA LCS 2017 Spring",
    "KR" : "LCK 2017 Spring",
    "LMS" : "LMS 2017 Spring"
}

information = {
    "Team SoloMid"         : ["http://tsm.gg/", "http://lol.esportswikis.com/wiki/Team_SoloMid", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-solomid"],
    "Cloud9"               : ["http://cloud9.gg/", "http://lol.esportswikis.com/wiki/Cloud9", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/cloud9"],
    "Phoenix1"             : ["http://phoenix1.gg/", "http://lol.esportswikis.com/wiki/Phoenix1", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/phoenix1"],
    "FlyQuest"             : ["https://www.flyquest.gg/", "http://lol.esportswikis.com/wiki/FlyQuest", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/flyquest"],
    "Counter Logic Gaming" : ["http://clgaming.net/", "http://lol.esportswikis.com/wiki/Counter_Logic_Gaming", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/counter-logic-gaming"],
    "Immortals"            : ["https://immortals.gg/", "http://lol.esportswikis.com/wiki/Immortals", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/immortals"],
    "Team Dignitas"        : ["http://team-dignitas.net/", "http://lol.esportswikis.com/wiki/Team_Dignitas", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-dignitas"],
    "Echo Fox"             : ["http://live.echofox.gg/", "http://lol.esportswikis.com/wiki/Echo_Fox", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/echo-fox"],
    "Team Liquid"          : ["https://www.teamliquidpro.com/", "http://lol.esportswikis.com/wiki/Team_Liquid", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-liquid"],
    "Team EnVyUs"          : ["https://teamenvyus.com/", "http://lol.esportswikis.com/wiki/Team_EnVyUs", "http://www.lolesports.com/en_US/na-lcs/na_2017_spring/teams/team-envy"],
    "G2 Esports"           : ["http://www.g2esports.com/", "http://lol.esportswikis.com/wiki/G2_Esports", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/g2-esports"],
    "Misfits"              : ["http://teammisfits.gg/", "http://lol.esportswikis.com/wiki/Misfits_(European_Team\)", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/misfits"],
    "Fnatic"               : ["http://www.fnatic.com/players/LoL/", "http://lol.esportswikis.com/wiki/Fnatic", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/fnatic"],
    "Giants Gaming"        : ["http://giantsgaming.pro/", "http://lol.esportswikis.com/wiki/Giants_Gaming", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/giants-gaming"],
    "Team ROCCAT"          : ["https://www.facebook.com/TEAMROCCAT/", "http://lol.esportswikis.com/wiki/Team_ROCCAT", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/roccat"],
    "H2k-Gaming"           : ["http://www.h2k.gg/", "http://lol.esportswikis.com/wiki/H2k-Gaming", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/h2k"],
    "Unicorns Of Love"     : ["http://www.unicornsoflove.com/", "http://lol.esportswikis.com/wiki/Unicorns_Of_Love", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/unicorns-of-love"],
    "Splyce"               : ["https://splyce.gg/", "http://lol.esportswikis.com/wiki/Splyce", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/splyce"],
    "Team Vitality"        : ["http://www.team-vitality.fr/teams", "http://lol.esportswikis.com/wiki/Team_Vitality", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/vitality"],
    "Origen"               : ["https://origen.gg/", "http://lol.esportswikis.com/wiki/Origen", "http://www.lolesports.com/en_US/eu-lcs/eu_2017_spring/teams/origen"],
    "SK Telecom T1"        : ["http://www.sksports.net/T1/main.asp", "http://lol.esportswikis.com/wiki/SK_Telecom_T1", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/sktelecom-t1"],
    "KT Rolster"           : ["http://kt-sports.co.kr/", "http://lol.esportswikis.com/wiki/KT_Rolster", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/kt-rolster"],
    "Samsung Galaxy"       : ["http://www.facebook.com/ssgalaxyteam", "http://lol.esportswikis.com/wiki/Samsung_Galaxy", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/samsung-galaxy"],
    "MVP"                  : ["http://www.mvpzine.com/", "http://lol.esportswikis.com/wiki/MVP", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/mvp"],
    "Afreeca Freecs"       : ["https://www.facebook.com/AfreecaFreecs/", "http://lol.esportswikis.com/wiki/Afreeca_Freecs", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/afreeca-freecs"],
    "Longzhu Gaming"       : ["http://longzhugaming.com/", "http://lol.esportswikis.com/wiki/Longzhu_Gaming", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/longzhu-incredible-miracle"],
    "ROX Tigers"           : ["https://www.facebook.com/TigersLOL/", "http://lol.esportswikis.com/wiki/ROX_Tigers", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/koo-tigers"],
    "bbq Olivers"          : ["http://esportsconnected.com/", "http://lol.esportswikis.com/wiki/Bbq_Olivers", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/ever"],
    "Jin Air Green Wings"  : ["http://greenwings.jinair.com/", "http://lol.esportswikis.com/wiki/Jin_Air_Green_Wings", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/jin-air-green-wings"],
    "Kongdoo Monster"      : ["http://kongdoo.com/", "http://lol.esportswikis.com/wiki/Kongdoo_Monster", "http://www.lolesports.com/en_US/lck/lck_2017_spring/teams/najin-e-mfire"]
}

def match_history(team):
    return "http://lol.esportswikis.com/wiki/{}/Match_History".format(team)

def converter(x):
    if x == "background-color:#C6EFCE":
        return "W"
    else:
        return "L"

def get_streak(team, region):
    mh = match_history(team)
    r = requests.get(mh)
    s = BeautifulSoup(r.content, "lxml")
    trs = s.select("table.wikitable.sortable tr[style]")
    results = [converter((tr["style"])) for tr in trs if tr.find("a", 
        class_="mw-redirect").text == seasons[region]]
    last_5 = results[:5]
    streak = ([last_5[0] == n for n in results]+[False]).index(False)
    return "{}{}".format(streak, last_5[0]), "{}-{}".format(last_5.count("W"), 
        last_5.count("L"))

def double_standings(url):
    r = requests.get(url)
    s = BeautifulSoup(r.content, "lxml")

    tables = s.find_all("table", class_="wikitable")

    group_A = [tr for tr in tables[0] if tr != "\n"][1:]
    ranks_A = [item.find("th").text.strip() for item in group_A]
    info_A  = [[td.text.strip() for td in tr.find_all("td")] for tr in group_A]

    group_B = [tr for tr in tables[1] if tr != "\n"][1:]
    ranks_B = [item.find("th").text.strip() for item in group_B]
    info_B  = [[td.text.strip() for td in tr.find_all("td")] for tr in group_B]

    for idx, _ in enumerate(ranks_A):
        info_A[idx].insert(0, ranks_A[idx])
        info_B[idx].insert(0, ranks_B[idx])


    if len(info_A[0]) < 2:
        return info_A[1:], info_B[1:]
    else:
        return info_A, info_B

def single_standings(url):
    r = requests.get(url)
    s = BeautifulSoup(r.content, "lxml")

    tables = s.find_all("table", class_="wikitable")

    group_A = [tr for tr in tables[0] if tr != "\n"][1:]
    ranks_A = [item.find("th").text.strip() for item in group_A]
    info_A  = [[td.text.strip() for td in tr.find_all("td")] for tr in group_A]

    for idx, _ in enumerate(ranks_A):
        info_A[idx].insert(0, ranks_A[idx])

    if len(info_A[0]) < 2:
        return info_A[1:]
    else:
        return info_A[1:]

def get_results(s, week):
    """
    Week 1 = 2, Week 2 = 3...
    """
    tables = s.find_all("table", class_="wikitable")

    matches = [tr for tr in tables[week] if tr != "\n"][1:]
    results = [[td.text.strip() for td in tr.find_all("td")] for tr in matches]

def champion_filter(champions):
    seen = set()
    seen_add = seen.add
    return [x for x in champions if not (x in seen or seen_add(x))]

def win_loss(result, picks_A, picks_B):
    if result == "A":
        return picks_A, picks_B
    else:
        return picks_B, picks_A

def champion_statistics(week, pb_url):
    url = pb_url
    r   = requests.get(url)
    s   = BeautifulSoup(r.content, "lxml")

    weeks   = s.find_all("table", 
        style="padding:0; margin:0;background-color:transparent;")
    matches = weeks[week].find_all("table", class_="prettytable")
    games   = len(matches)

    results = [match.find_all("td", style=["width: 25px; text-align: center;", 
        "width: 25px; text-align: center;background-color:#cfc;"]) 
        for match in matches]
    results = ["A" if "#cfc" in str(result[0]) else "B" for result in results]

    champion_list = [[champion.get("title") 
        for champion in match.find_all("a")[3:]] for match in matches]
    champion_list = [champion_filter(champion) for champion in champion_list]

    champion_data = get_statistics(results, champion_list)
    top_10 = get_top_10(champion_data, games)

    return top_10

def get_statistics(results, champion_list):
    with open("champion_data.pickle", "rb") as handle:
        champion_data = pickle.load(handle)

    for result, champions in zip(results, champion_list):
        bans            = champions[:6] + champions[-8:-4]
        picks           = champions[6:12] + champions[-4:]
        wins, losses    = win_loss(result, picks[::2], picks[1::2])
        all_information = [bans, picks, wins, losses]
        keys            = ["banned", "picked", "wins", "losses"]

        for key, information in zip(keys, all_information):
            for champion in information:
                champion = champion.replace(" ", "")
                if "'" in champion:
                    champion = champion.replace("'", "").title()
                champion_data[champion][key] += 1

    return champion_data

def get_top_10(champion_data, games):
    result = []

    for champion in champion_data:
            if champion_data[champion]["wins"] == 0 or champion_data[champion]["picked"] == 0:
                win_ratio = 0
            else:
                win_ratio = round((float(champion_data[champion]["wins"]) / float(champion_data[champion]["picked"])) * 100, 1)

            if champion_data[champion]["picked"] + champion_data[champion]["banned"] == 0:
                pick_ban = 0
            else:
                pick_ban = round((float(champion_data[champion]["picked"]) + float(champion_data[champion]["banned"])) / games * 100, 1)
            result.append([
                champion,
                champion_data[champion]["banned"],
                champion_data[champion]["picked"],
                champion_data[champion]["wins"],
                champion_data[champion]["losses"],
                win_ratio,
                pick_ban])

    return sorted(result, key=itemgetter(-1))[::-1][:10]

def grouper(iterable, n, fillvalue=None):
    args = [iter(iterable)] * n
    return izip_longest(*args, fillvalue=fillvalue)

def get_mvp(url, week):
    r = requests.get(url)
    s = BeautifulSoup(r.content, "lxml")
    match_details = s.find_all("div", 
        style="display: inline-block;vertical-align:top;padding-right:1em;")[week]
    matches = match_details.find_all("tr")
    mvp_list = [mvp.find_all("td")[-1].find("a").text for mvp in matches[1:] if
        mvp.find_all("td")[-1].find("a").text != "Link"]
    return Counter(mvp_list).most_common(5)

def double_change(previous_week, current_week):
    for current in current_week[0]:
        team = current[1]
        for previous in previous_week[0]:
            if team in previous:
                change = int(previous[0]) - int(current[0])
                if change > 0:
                    change = "+{}".format(change)
                current.append(change)

    for current in current_week[1]:
        team = current[1]
        for previous in previous_week[1]:
            if team in previous:
                change = int(previous[0]) - int(current[0])
                if change > 0:
                    change = "+{}".format(change)
                current.append(change)

    return current_week

def single_change(previous_week, current_week):
    for current in current_week:
        for previous in previous_week:
            team = current[1]
            if team in previous:
                change = int(previous[0]) - int(current[0])
                if change > 0:
                    change = "+{}".format(change)
                current.append(change)

    return current_week

def print_double(current_week):
#     standings = u"""###Season standings\n|A|#|Team|Series|Games|Streak|Last 5|Information|B|#|Team|Series|Games|Streak|Last 5|Information|
# |:--:|:--:|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--:|\n"""
#     for group_A, group_B in zip(current_week[0], current_week[1]):
#         streak_A, last_5_A = get_streak(group_A[1], "EU")
#         streak_B, last_5_B = get_streak(group_B[1], "EU")
#         standings += "||{}|[{}]({})|{}|{}|{}|{}|[EW]({}) \ [Riot]({})||{}|[{}]({})|{}|{}|{}|{}|[EW]({}) \ [Riot]({})|\n".format(
#             group_A[0], group_A[1], information[group_A[1]][0], group_A[2], group_A[4],
#             streak_A, last_5_A, information[group_A[1]][1], information[group_A[1]][2],
#             group_B[0], group_B[1], information[group_B[1]][0], group_B[2], group_B[4],
#             streak_B, last_5_B, information[group_B[1]][1], information[group_B[1]][2]
#             )

    standings = """|A|#|Team|Series|Games|Streak|Last 5|Information|
|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--:|\n"""
    for team in current_week[0]:
        streak, last_5 = get_streak(team[1], "EU")
        standings += "||{}|[{}]({})|{}|{}|{}|{}|[EsportsWikis]({}) \ [LoL Esports]({})|\n".format(team[0], team[1],
            information[team[1]][0], team[2], team[4], streak, last_5,
            information[team[1]][1], information[team[1]][2])


    standings += """\n\n|B|#|Team|Series|Games|Streak|Last 5|Information|
|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--:|\n"""
    for team in current_week[1]:
        streak, last_5 = get_streak(team[1], "EU")
        standings += "||{}|[{}]({})|{}|{}|{}|{}|[EsportsWikis]({}) \ [LoL Esports]({})|\n".format(team[0], team[1],
            information[team[1]][0], team[2], team[4], streak, last_5,
            information[team[1]][1], information[team[1]][2])

    print standings

def print_double_lpl(current_week):
    standings = u"""|A|#|Team|Series|Games|Streak|Last 5|B|#|Team|Series|Games|Streak|Last 5|
|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--|:--:|:--:|:--:|:--:|:--:|\n"""
    for group_A, group_B in zip(current_week[0], current_week[1]):
        streak_A, last_5_A = get_streak(group_A[1], "CN")
        streak_B, last_5_B = get_streak(group_B[1], "CN")
        standings += "||{}|{}|{}|{}|{}|{}||{}|{}|{}|{}|{}|{}|\n".format(
            group_A[0], group_A[1], group_A[2], group_A[4],
            streak_A, last_5_A,
            group_B[0], group_B[1], group_B[2], group_B[4],
            streak_B, last_5_B
            )

    print standings

def print_single(current_week):
    standings = u"""|#|Team|Series|Games|Streak|Last 5|Information|
|:--:|:--|:--:|:--:|:--:|:--:|:--:|\n"""
    for team in current_week:
        streak, last_5 = get_streak(team[1], "NA")
        standings += "|{}|[{}]({})|{}|{}|{}|{}|[EsportsWikis]({}) \ [LoL Esports]({})|\n".format(team[0], team[1],
            information[team[1]][0], team[2], team[4], streak, last_5,
            information[team[1]][1], information[team[1]][2])

    print standings

def print_single_lms(current_week):
    standings = u"""|#|Team|Series|Games|Streak|Last 5|
|:--:|:--|:--:|:--:|:--:|:--:|\n"""
    for team in current_week:
        streak, last_5 = get_streak(team[1], "LMS")
        standings += "|{}|{}|{}|{}|{}|{}|\n".format(team[0], team[1],
            team[2], team[4], streak, last_5)

    print standings

def print_single_lck(current_week):
    standings = u"""|#|Team|Series|Games|Streak|Last 5|Information|
|:--:|:--|:--:|:--:|:--:|:--:|:--:|\n"""
    for team in current_week:
        if team[1] == "Samsung Galaxy1": team[1] = "Samsung Galaxy"
        elif team[1] == "Longzhu Gaming2": team[1] = "Longzhu Gaming"
        elif team[1] == "Afreeca Freecs1": team[1] = "Afreeca Freecs"
        streak, last_5 = get_streak(team[1], "KR")
        standings += "|{}|[{}]({})|{}|{}|{}|{}|[EsportsWikis]({}) \ [LoL Esports]({})|\n".format(team[0], team[1],
            information[team[1]][0], team[2], team[4], streak, last_5,
            information[team[1]][1], information[team[1]][2])

    print standings

def print_mvp(mvps):
    mvp_table = "###MVPs of week {}\n|Player|MVP|\n|:--|:--:|\n".format(week + 1)
    for mvp in mvps:
        mvp_table += "|{}|{}|\n".format(mvp[0], mvp[1])
    print mvp_table

def print_champion_statistics(champions):
    champion_table = "###Champion statistics\n|Champion|B|G|W|L|W%|PB%|\n|:--|:--:|:--:|:--:|:--:|:--:|:--:|\n"
    for champion in champions:
        champion_table += "|[{}](#c-{}) {}|{}|{}|{}|{}|{}|{}|\n".format(
            champion[0], champion[0].lower(), champion[0], champion[1], 
            champion[2], champion[3], champion[4], champion[5], champion[6])

    print champion_table

if __name__ == '__main__':
    get_streak("Royal Never Give Up", "CN")