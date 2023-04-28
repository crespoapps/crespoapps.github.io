import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const load = () => {

    const SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight,

        r = 450

    let mouseY = 0,

        windowHalfY = window.innerHeight / 2,

        camera, scene, renderer

    const hexy = () => Number('0x'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
    const init = () => {
        camera = new THREE.PerspectiveCamera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000)
        camera.position.z = 1000

        scene = new THREE.Scene()
        const geometry = createGeometry()
        for (let s = 0.25; s < 5.6; s+=0.5) {
            const material = new THREE.LineBasicMaterial({ 
                color: hexy(), 
                opacity: 1 
            })
            const line = new THREE.LineSegments(geometry, material)
            line.scale.x = line.scale.y = line.scale.z = s//p[0]
            line.userData.originalScale = s//p[0]
            line.rotation.y = Math.random() * Math.PI
            line.updateMatrix()
            scene.add(line)
        }
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
        document.body.appendChild(renderer.domElement)
        document.body.style.touchAction = 'none'
        document.body.addEventListener('pointermove', onPointerMove)
        //
        window.addEventListener('resize', onWindowResize)
        // test geometry swapability
        setInterval(() => {
            const geometry = createGeometry()
            scene.traverse((object) => {
                if (object.isLine) {
                    object.geometry.dispose()
                    object.geometry = geometry
                }
            })
        }, 10000)
    }

    const createGeometry = () => {
        const geometry = new THREE.BufferGeometry()
        const vertices = []
        const vertex = new THREE.Vector3()
        for (let i = 0; i < 100; i++) {
            vertex.x = Math.random() * 2 - 1
            vertex.y = Math.random() * 2 - 1
            vertex.z = Math.random() * 2 - 1
            vertex.normalize()
            vertex.multiplyScalar(r)
            vertices.push(vertex.x, vertex.y, vertex.z)
            vertex.multiplyScalar(Math.random() * 0.09 + 1)
            vertices.push(vertex.x, vertex.y, vertex.z)
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        return geometry
    }

    const onWindowResize = () => {
        windowHalfY = window.innerHeight / 2
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const onPointerMove = (event) => {
        if (event.isPrimary === false) return
        mouseY = event.clientY - windowHalfY
    }

    const animate = () => {
        requestAnimationFrame(animate)
        render()
    }

    const render = () => {
        camera.position.y += (- mouseY + 200 - camera.position.y) * .05
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        const time = Date.now() * 0.00001
        for (let i = 0; i < scene.children.length; i++) {
            const object = scene.children[i]
            if (object.isLine) {
                object.rotation.y = time * (i < 4 ? (i + 1) : - (i + 1))
                if (i < 5) {
                    const scale = object.userData.originalScale * (i / 5 + 1) * (1 + 0.5 * Math.sin(7 * time))
                    object.scale.x = object.scale.y = object.scale.z = scale
                }
            }
        }
    }
    init()
    animate()
}

const Home = () => {
    const mountRef = useRef(null)
    useEffect(load, [])
    return <div ref={mountRef}></div>
}

export default Home