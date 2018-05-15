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
        document.getElementById('playlist').style.height="225px";    
        l.classList.add('active');
    }
}

function playChannel(el){
    alert(el.innerText);
}

class VueApp {
    constructor(id){
        this.element_id = id;
        //初始化vue
        this.app = new Vue({
            el: '#' + this.element_id,
            data: {
                cur_ch: '',
                ch_list: [
                    {name: "广东新闻广播", src: "http://ctt.rgd.com.cn/fm914?t=1526125301"},
                    {name: "channel2", src: ""},
                    {name: "channel3", src: ""},
                    {name: "channel4", src: ""},
                    {name: "channel5", src: ""}
                ]
            },
            methods: {
                play: function (src) {
                    alert(src);
                    window.radioapp.changeChannel(src);
                }
            }
        })
    }
}
