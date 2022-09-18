window.addEventListener('DOMContentLoaded', init);

function init() {
    // const wh1 = Math.min(window.innerHeight / 4, window.innerWidth / 4) - 10;
    const width = 600
    const height = 600

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1)

    const scene = new THREE.Scene();

    // camera
    const S = 10;
    const camera = new THREE.OrthographicCamera(-S * width / height, S * width / height, (S), (-S));
    // const camera = new THREE.PerspectiveCamera(30, width / height);
    camera.position.set(0, 0, 100);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 0, 100)
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
    scene.add(ambientLight);

    const mainContainer = new THREE.Group();
    scene.add(mainContainer);

    function createCubeMatrix(no) {
        // obj
        const mat = "ff0000,00ff00,0000ff,00ffff,ff00ff,ffff00".split(",").map(s => {
            return new THREE.MeshLambertMaterial({
                color: "#" + s
                    .replace(/ff/g, 'ff')
                    .replace(/00/g, 'aa')
            });
        });
        // const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
        // const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
        const group1 = new THREE.Group();
        const div = 4;
        const bsize = 1;
        function createCube(xi, yi) {
            const cube = new THREE.Mesh(new THREE.BoxGeometry(bsize, bsize, bsize), mat)
            const px = xi * 2 * bsize;
            const py = yi * 2 * bsize;
            cube.position.x = px;
            cube.position.y = py;

            const xrot = - yi * Math.PI / 2 / div;
            const yrot = xi * Math.PI / 2 / div;
            // 単位ベクトルを、z軸方向に90回転、このベクトルを軸にしてAngleだけ回転
            const ax = new THREE.Vector3(px, py, 0).normalize();
            ax.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

            if (no === 1) {
                cube.rotation.x = xrot;
                cube.rotation.y = yrot;
            } else if (no === 2) {
                cube.rotateX(xrot);
                cube.rotateY(yrot);
            } else if (no === 3) {
                cube.rotateY(yrot);
                cube.rotateX(xrot);
            } else if (no === 100) {
                const qAngle = Math.max(Math.abs(xi), Math.abs(yi)) * Math.PI / 2 / div;
                cube.rotateOnAxis(ax, qAngle);
            } else if (no === 101) {
                // L2
                const qAngle = Math.sqrt(xi * xi + yi * yi) * Math.PI / 2 / div;
                cube.rotateOnAxis(ax, qAngle);
            } else {
                // NOP
            }
            group1.add(cube);
        }

        // 15°刻みで-90~90まで
        for (let xi = -div; xi <= div; xi++) {
            for (let yi = -div; yi <= div; yi++) {
                createCube(xi, yi);
            }
        }
        return group1;
    }

    function render(no) {
        mainContainer.clear();
        mainContainer.add(createCubeMatrix(no));
        renderer.render(scene, camera);
        console.log(`render(${no}) done`);
    }
    render(1);
    window.render = render;
}
