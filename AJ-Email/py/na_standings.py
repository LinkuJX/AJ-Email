from league_constants import *

def na_lcs():
    url          = NA_URL
    pick_ban_url = NA_PB

    print_single(single_standings(url))

if __name__ == '__main__':
    na_lcs()