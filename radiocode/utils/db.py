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

    def update_src(self, id, new_src):
        '''
        @:param id: channel id
        @:param new_src: 新的频道直播地址
        '''
        query = "update channels set src='%s' where id=%d" % (new_src, id)
        self.cur.execute(query)
        self.db.commit()

    def get_channels(self, s, e):
        '''
        @:param s: 频道id的起始值
        @:param e: 频道id的结束值
        @:param: s和e的值都包含在内
        '''
        query = "select "