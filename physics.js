////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
    propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: angle});
    World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle += angleSpeed;
    
    fill(128);
    drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
    fill(255,0,0);
    
    for(var i = 0; i<birds.length; i++){
        if(isOffScreen(birds[i]) == false) {
             drawVertices(birds[i].vertices); 
        }
        
            else {
                removeFromWorld(birds[i]);
                birds.splice(i,1);
            i--; }
               
            }

  pop();
    
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
//    var box = Bodies.rectangle(width, height, 80, 80);
    for(var i = 0; i<=6; i++) {
        for(var j = 0; j<=3; j++) {
          var box = Bodies.rectangle(width - 150 - (j*80), height -(i*80), 80, 80);
            World.add(engine.world, [box]);
            boxes.push(box);
            colors.push(random(1,256));
        }
    }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
    for(var i = 0; i<boxes.length; i++) {
        if(isOffScreen(boxes[i])) {
            removeFromWorld(boxes[i]);
            boxes.splice(i,1);
            i--;
        }
        else{
        fill(0, colors[i], 0);
        drawVertices(boxes[i].vertices);
        }
    }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
    slingshotBird = Bodies.circle(150,120,20, {friction: 0, restitution: 0.95});
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
    
     slingshotConstraint = Constraint.create({
        pointA: {x: 150, y: 100},
        bodyB: slingshotBird,
        pointB: {x:0, y:0},
        stiffness: 0.01,
        damping: 0.0001
    });
    
    World.add(engine.world, [slingshotBird, slingshotConstraint]); 
    
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
    fill(200,100,60);
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
