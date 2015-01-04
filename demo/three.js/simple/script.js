function simpleDemo() {
    var scene, camera, renderer, circle, cylinder;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;

        material = new THREE.MeshBasicMaterial({
            color: 0x0000ff, wireframe: true
        });

        var radius = 200;
        var segments = 32;

        var circleGeometry = new THREE.CircleGeometry(radius, segments);
        circle = new THREE.Mesh(circleGeometry, material);
        circle.position.y = 500;
        scene.add(circle);

        geometry = new THREE.CylinderGeometry(100, 100, 300, 16);
        material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.y = -500;
        scene.add(cylinder);


        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);

        document.body.appendChild(renderer.domElement);

    }

    function animate() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        circle.rotation.y += 0.01;
        circle.rotation.z += 0.01;
        cylinder.rotation.z += 0.01;
        cylinder.rotation.x += 0.01;
        renderer.render(scene, camera);

    }
};
simpleDemo();