from league_constants import *

def eu_lcs():
    url          = EU_URL
    pick_ban_url = EU_PB

    print_double(double_standings(url))

if __name__ == '__main__':
    eu_lcs()