class RadioCodeApp {
    constructor(id) {
        this.element_id = id;
        this.controls = [
            'play',
            'progress',
            'mute',
            'volume',
        ];
        this.player = new Plyr('#' + this.element_id, { controls: this.controls });
    }

    changeChannel(ch_src) {
        this.player.source = {
            type: 'audio',
            sources: [{src: ch_src}],
        };
    }
}

function toggleFold(){
    l = document.getElementById('playlist');
    if (l.classList.contains('active')) {
        document.getElementById('playlist').style.height="50px";
        l.classList.remove('active');
    } else {
        document.getElementById('playlist').style.height="264px";    
        l.classList.add('active');
    }
}

function playChannel(el){
    alert(el.innerText);
}

class VueApp {
    constructor(id){
        // this.element_id = id;
        //初始化vue
        this.app = new Vue({
            el: '#' + id,
            data: {
                cur_ch: '',
                ch_list: [],
                ch_list_all: [],
                cur_page: 1,
                total_page: 2,
            },
            methods: {
                play: function (src, name) {
                    this.cur_ch = name;
                    window.radioapp.changeChannel(src);
                },
                pageDown: function (){  // 向后翻页
                    if (this.cur_page >= this.total_page) {
                        return
                    }
                    var s = this.cur_page * 5;
                    var e = (this.cur_page + 1) * 5;
                    this.cur_page += 1;
                    this.ch_list = this.ch_list_all.slice(s, e);
                }, 
                pageUp: function (){  // 向前翻页
                    if (this.cur_page <= 1) {
                        return
                    }
                    this.cur_page -= 1;
                    var s = (this.cur_page - 1) * 5;
                    var e = this.cur_page * 5;
                    this.ch_list = this.ch_list_all.slice(s, e);
                },
                initc: function (){
                    axios.get('/data/default.json')
                        .then(
                            function(response){
                                window.vueapp.app.ch_list_all = response.data;
                                window.vueapp.app.total_page = Math.ceil(window.vueapp.app.ch_list_all.length/5)
                                window.vueapp.app.ch_list = window.vueapp.app.ch_list_all.slice(0, 5);
                                setTimeout(function(){ window.vueapp.app.play(response.data[0].src, response.data[0].name); }, 2000);
                        });
                },
                initmap: function() {
                    axios.get('/data/places.json')
                        .then(
                            function(response){
                                var points = []
                                // var beijing = new BMap.Point(39.904211, 116.407395);
                                // points.push(beijing);
                                for (var p of response.data){
                                    points.push(new BMap.Point(p.geo[1], p.geo[0]));
                                    // var marker = new BMap.Marker(point, {title: p.name});
                                    // window.baidu_map.addOverlay(marker);
                                }
                                var options = {
                                    size: BMAP_POINT_SIZE_NORMAL,
                                    shape: BMAP_POINT_SHAPE_STAR,
                                    color: '#d340c3'
                                }
                                var pointCollection = new BMap.PointCollection(points, options);
                                window.baidu_map.addOverlay(pointCollection);
                        });
                }
            }
        })
    }
}
