from league_constants import *

def lck():
    url          = LCK_URL
    pick_ban_url = LCK_PB

    print_single_lck(single_standings(url))

if __name__ == '__main__':
    lck()