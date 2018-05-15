import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "radiocode.settings")

import django
django.setup()


from radio.models import Channel, Place
import requests
import datetime
import time
import random

def main():
    for ch in Channel.objects.filter(id__lte=16000, id__gte=15001):
        p = Place.objects.get(id=ch.p_id)
        url = "http://stream.radio.garden/streams/" + p.p_id[0] + "/" + p.p_id + "/" + ch.c_id  + ".php?" + str(int(datetime.datetime.now().timestamp() * 1000) + 3600 * 8)

        headers = {
            "Connection": "keep-alive",
            "Accept-Encoding": "identity;q=1, *;q=0",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36",
            "Accept": "*/*",
            "Referer": "http://radio.garden/live/%s/%s/" % (p.p_id, ch.c_id),
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
            # "Cookie": "__cfduid=d9575abcbdb3606268172ff9cbad212941525360544; _ga=GA1.2.2066545182.1525360571; _gid=GA1.2.1579257317.1526125304",
            "Range": "bytes=0-"
        }

        r = requests.get(url, allow_redirects=False, headers=headers)
        new_url  = r.headers.get('Location', '')
        if new_url:
            ch.src = new_url
            ch.save()
        time.sleep(random.randint(1,2))


if __name__ == "__main__":
    main()