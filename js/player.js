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
                                window.vueapp.app.ch_list = window.vueapp.app.ch_list_all.slice(0, 5);
                                setTimeout(function(){ window.vueapp.app.play(response.data[0].src, response.data[0].name); }, 2000);
                        });
                }
            }
        })
    }
}
