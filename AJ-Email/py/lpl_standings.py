from league_constants import *

def lpl():
    url          = LPL_URL
    pick_ban_url = LPL_PB

    print_double_lpl(double_standings(url))

if __name__ == '__main__':
    lpl()