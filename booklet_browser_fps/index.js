(() => {
    main();

    function main() {
        const elemFPS = createElemFPS();
        measureJSFPS((fps) => elemFPS.innerText = fps.toFixed(1));
    }

    function createElemFPS() {
        // create, append
        const container = document.createElement('div');
        container.className = "jsfps-container"
        const div = document.createElement('div');
        div.className = "jsfps"
        document.body.appendChild(container);
        container.appendChild(div);
        // document.body.appendChild(div);

        // style
        div.style.zIndex = 1123456;
        div.style.position = "fixed";
        div.style.bottom = "0px";
        div.style.right = "0px";
        div.style.userSelect = "none";
        // div.draggable = "true";

        let dragging = false;
        // mousedown => dragging = true
        // mouseup => dragging = false
        // mousemove => x, y >=0
        div.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            dragging = true;
        });

        div.addEventListener('mouseup', (e) => {
            e.stopPropagation();
            dragging = false;
        });
        div.addEventListener('mousemove', (e) => {
            if (dragging) {
                e.stopPropagation();
                move(e.clientX, e.clientY);
                // console.log('move', e.clientX, e.clientY);
            }
        });
        div.addEventListener('mouseleave', (e) => {
            if (dragging) {
                e.stopPropagation();
                move(e.clientX, e.clientY);
                // console.log('leave', e.clientX, e.clientY);
            }
        });
        function move(x, y) {
            div.style.bottom = "";
            div.style.right = "";
            div.style.top = `${y}px`;
            div.style.left = `${x}px`;
            div.style.transform = `translate(-50%, -50%)`
        }


        /*
        // drag
        const events = 'drag dragend'.split(" ");
        for (const eventName of events) {
            div.addEventListener(eventName, (e) => {
                e.stopPropagation();
                // console.log("drag", e.clientX, e.clientY);
                div.style.bottom = "";
                div.style.right = "";
                div.style.top = `${e.clientY}px`;
                div.style.left = `${e.clientX}px`;
            });
        }
        */

        return div;
    }

    function measureJSFPS(update) {
        const prevTimes = [];
        function loop() {
            const now = Date.now();
            // 1000ms以上を1つだけ残す
            while (prevTimes.length > 1 && now - prevTimes[1] > 1000) {
                prevTimes.shift();
            }
            prevTimes.push(now);
            const fps = (prevTimes.length - 1) / (now - prevTimes[0]) * 1000;
            update(fps);
            setTimeout(loop, 1);
        }
        loop();
    }
})();