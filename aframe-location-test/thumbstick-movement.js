/* global AFRAME, THREE */
AFRAME.registerComponent('thumbstick-movement', {
    schema: {
        speed: { type: 'number', default: 0.1 }
    },
    init: function () {
        this.direction = new THREE.Vector3();
    },
    tick: function () {
        const leftController = document.querySelector('#left-controller');
        const rig = document.querySelector('#rig');
        if (!leftController || !rig) return;

        const gamepad = leftController.components['tracked-controls']?.controller;
        if (!gamepad) return;

        const [x, y] = gamepad.axes;

        // Only move if there's significant input
        if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
        const camera = document.querySelector('[camera]');
        const direction = new THREE.Vector3();
        camera.object3D.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();
        direction.multiplyScalar(-y * this.data.speed);

        const right = new THREE.Vector3();
        right.crossVectors(camera.object3D.up, direction).normalize().multiplyScalar(x * this.data.speed);

        rig.object3D.position.add(direction).add(right);
        }
    }
});