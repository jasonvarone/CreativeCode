     var container, stats;
            var texture, allGroups = [];
            var camera, scene, renderer, particles, geometry, materials = [], parameters, parameters2, i, h, color, sprite, size;
            init();
            setup();
            animate();
            function init() {
                container = document.createElement('div');
                document.body.appendChild(container);
                // scene
                scene = new THREE.Scene();
                // scene.fog = new THREE.FogExp2( 0x000000, 0.0000 ); // not using but save for later
                // camera
                camera = new THREE.PerspectiveCamera(1015, window.innerWidth / window.innerHeight, 1, 2000);
                camera.position.x = 10;
                controls = new THREE.OrbitControls(camera); //Toggle on to control camera angle, but toggle off when final decisions are made
                geometry = new THREE.Geometry();
            }

            function setup() {
                // My animated animals
                texture = new THREE.TextureLoader().load("assets/sheep/sheep-gif1-500px.png");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1 / 11, 1); //zoom in eleven times

                texture2 = new THREE.TextureLoader().load("assets/sheep/sheep-gif2-500px.png");
                texture2.wrapS = THREE.RepeatWrapping;
                texture2.wrapT = THREE.RepeatWrapping;
                texture2.repeat.set(1 / 4, 1);

                for (i = 0; i < 10000; i++) {
                    var vertex = new THREE.Sphere();
                    vertex.x = (Math.random() - .5) * 2000;
                    vertex.y = (Math.random() - .5) * 2000;
                    vertex.z = (Math.random() - .5) * 2000;
                    geometry.vertices.push(vertex);
                }

                parameters = [
                    [[2.0, 0.2, 500], texture, 55],
                    [[5.9, 10, 1], texture2, 25],
                    // [ [0.90, 0.05, 1], sprite1, 10 ],
                    // [ [0.85, 0, 1], sprite5, 8 ],
                    // [ [0.80, 0, 1], sprite4, 5 ]
                ];

                 

                for (i = 0; i < parameters.length; i++) {
                    // color = 0;
                    sprite = parameters[i][1];
                    size = parameters[i][2];
                    materials[i] = new THREE.PointsMaterial({size: size, map: sprite, depthTest: false, transparent: true});
                    particles = new THREE.Points(geometry, materials[i]);
                    particles.rotation.x = (Math.random() - .5)
                    particles.rotation.y = i / (Math.random() - .5)
                
                    scene.add(particles);
                    allGroups.push(particles);
                }


                 

                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.appendChild(renderer.domElement);
                // stats = new Stats();
                // container.appendChild( stats.dom );
                //
                window.addEventListener('resize', onWindowResize, false);
                setInterval(updateSpriteSheets, 1000 / 5) //frames per second
                animateGroup()
                // animateCam()

            }

            function animateGroup() {
                TweenMax.delayedCall(.1, animateGroup)
                var ease = Back.easeIn;
                for (var i = 0; i < allGroups.length; i++) {
                    TweenMax.to(allGroups[i].position, 1, {
                        delay:i/10,
                        x: Math.random,
                        y: 100,
                        z: (Math.random() - .5) * 20,
                        // x: (Math.random() - .5) * 25,
                        // y: (Math.random() - .5) * 15,
                        // z: (Math.random() - .5) * 20,
                        ease: ease
                    });
                }


            }

            function updateSpriteSheets() {
                texture.offset.x += 1 / 11 //move right one eleventh of the texture
                texture2.offset.x += 1 / 4 //move right one forth of the texture
            }

            function onWindowResize() {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function animate() {
                // requestAnimationFrame(animate);
                render();
            }

            function animateCam(dir,pos) {
                    if(dir == 'x'){
                TweenMax.delayedCall(1, animateGroup)
                var ease = Back.easeInOut;
                TweenMax.to(camera.position, 10, {x: pos, repeat:-1, yoyo:true});
                    }else if(dir == 'y'){
                TweenMax.delayedCall(10, animateGroup)
                var ease = Back.easeInOut;
                TweenMax.to(camera.position, 10, {y: pos});
                    }else if(dir == 'z'){
                TweenMax.delayedCall(10, animateGroup)
                var ease = Back.easeInOut;
                TweenMax.to(camera.position, 10, {z: pos});
 
                    }
            }

            // function cameraMove(dir,pos)
            //     {
            //     }

            function render() {
                // var time = Date.now() * 0.00005;
                /*for (var i=0;i<allGroups.length;i++){
                 allGroups[i].position.x+=i-.5
                 }*/
                requestAnimationFrame(animate);
                camera.lookAt(scene.position);
                renderer.render(scene, camera);
                // Maptastic(renderer.domElement);

            }

