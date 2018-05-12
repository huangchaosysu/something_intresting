import MySQLdb


class DBClient:
    def __init__(self):
        self.db = MySQLdb.connect(host='localhost', user='root', passwd='root', db='radiocode', charset='utf8')
        self.cur = self.db.cursor()

    def __del__(self):
        try:
            self.cur.close()
        except:
            pass
        try:
            self.db.close()
        except:
            pass

    def update_src(self, new_src):
        pass