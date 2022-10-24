// [ {elem, freq } ]
let objects = [];
let startTime = 0;
let ctx = null;

document.addEventListener('DOMContentLoaded', () => {
    main();
});

function main() {
    // freq (回/s)
    // const freq = 2;
    let freq = 2;
    window.freq = freq;
    startTime = Date.now();
    objects = [
        { elem: document.getElementById('obj1'), freq: 2 },
        { elem: document.getElementById('obj2'), freq: 3 }
    ]
    startLoop();
    const elemFPS = document.getElementById('js-fps');
    const elemDOMFPS = document.getElementById('dom-fps');
    measureJSFPS((fps) => elemFPS.innerText = fps.toFixed(1));
    measureDOMFPS((fps) => elemDOMFPS.innerText = fps.toFixed(1));
}

function startLoop() {
    const time = Date.now() - startTime;
    const freq = window.freq;
    for (const { elem, /*freq*/ } of objects) {
        const count = freq * time / 1000;
        const percent = Math.floor((count * 100) % 100);
        elem.style.left = `${percent}%`
        elem.style.backgroundColor = ["red", "blue"][Math.floor(count % 2)];
    }

    setTimeout(startLoop, 5);
}

function measureJSFPS(update) {
    // 1秒間記録する
    const prevTimes = [];
    function loop() {
        const now = Date.now();
        while (prevTimes.length > 0 && now - prevTimes[0] > 1000) {
            prevTimes.shift();
        }
        prevTimes.push(now);
        const fps = (prevTimes.length - 1) / (now - prevTimes[0]) * 1000;
        update(fps);
        setTimeout(loop, 1);
    }
    loop();
}

function measureDOMFPS(update) {
    const prevTimes = [];
    const elem = document.createElement('div');
    elem.style.display = "none";
    document.body.appendChild(elem);
    // let counter = 0;
    const elemChild = document.createElement('div');
    let flg = false;

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            // if (mutation.type === 'attributes') {
            if (mutation.type === 'childList') {
                loop();
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(elem, { attributes: false, childList: true, subtree: false });

    function loop() {
        const now = Date.now();
        while (prevTimes.length > 0 && now - prevTimes[0] > 1000) {
            prevTimes.shift();
        }
        prevTimes.push(now);
        const fps = (prevTimes.length - 1) / (now - prevTimes[0]) * 1000;
        update(fps);

        // 無限ループするので1秒開ける
        setTimeout(kick, 1);
    }
    function kick() {
        // elem.dataset.count = counter++;
        if (flg) {
            elemChild.remove();
        } else {
            elem.appendChild(elemChild);
        }
        flg = !flg;
    }

    kick();
}

