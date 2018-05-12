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
        this.player.sources = {
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
        document.getElementById('playlist').style.height="220px";    
        l.classList.add('active');
    }
}

function playChannel(el){
    alert(el.innerText);
}
