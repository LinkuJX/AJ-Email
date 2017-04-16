from league_constants import *

def lms():
    url          = LMS_URL
    pick_ban_url = LMS_PB

    print_single_lms(single_standings(url))

if __name__ == '__main__':
    lms()