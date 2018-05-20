import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "radiocode.settings")

import django
django.setup()

import json
from radio.models import Channel, Place

def main():
    for p in Place.objects.all():
        fname = 'data/%s/%s.json' % (p.p_id[0], p.p_id)
        s = '['
        for c in Channel.objects.filter(p_id=p.id):
            s += '{"name": "%s", "src": "%s"},' % (c.name, c.src)
            pass
        s = s[0:-1] + ']'
        f = open(fname, 'a+')
        f.write(s)
        f.flush()
        f.close()

def places():
    ps = []
    for p in Place.objects.all():
        pl = {'name': p.p_id, 'geo': json.loads(p.geo)}
        ps.append(pl)

    with open('data/places.json', 'a+') as f:
        f.write(json.dumps(ps))


if __name__ == '__main__':
    places()
