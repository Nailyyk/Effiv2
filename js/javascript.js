// Burger
function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

//  Onglets
function openOnglet(evt,name){
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for(i = 0; i <tabcontent.length; i++){
    tabcontent[i].style.display = 'None';
  }
  


  tablinks = document.getElementsByClassName('tablinks');
  for(i = 0; i <tablinks.length; i++){
    tablinks.className = tablinks[i].className.replace("active", "");
  }

  var i, presentation;
  presentation = document.getElementsByClassName('presentation');
  for(i = 0; i < presentation.length; i++){
    presentation[i].style.display='active';
  } for(i = 0; i < presentation.length; i++){
    presentation[i].style.display='none';
  }
  
  document.getElementById(name).style.display="block";
  evt.currentTarget.className+="active";
}

 
//Casse brique


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;//La balle bouge dans l'axe y
var dy = -1;//La balle bouge dans l'axe y
var ballRadius = 10;//Pour vérifier que la balle est bien en contact avec les briques
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;//false si onkeydown pas pressé
var leftPressed = false;//false si onkeydown pas pressé
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 15;
var paused = false;


var bricks = [];//Tableau contenant les briques
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


//Pour jouer avec les flêches directionnelles
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }


    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft; // Position horizontale
            if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

    window.addEventListener('keydown', pauseGameKeyHandler, false);

    function pauseGameKeyHandler(e) {
        var keyCode = e.keyCode;
        switch(keyCode){
            case 80: //p
            togglePause();
            break;
        }

    }

    function togglePause() {
        paused = !paused;
        draw();
    }



    function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                if(score == brickRowCount*brickColumnCount) {
                    alert("Bravo vous avez gagné(e) !");
                    document.location.reload();
                    }
                }
            }
        }
    }
}

    //Score du jeu
    function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Score: "+score, 8, 20);
}

    //Gestion des vies et du style
    function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Vies: "+lives, canvas.width-65, 20);
}

    //Pour modifier la balle 
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    }

//  Pour modifier la barre 
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    //this creates the bricks
    function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//Remet a 0 
        drawBall();//Dessine la balle
        drawPaddle();//Dessine la barre
        collisionDetection();//Detecte la colision entre la balle et la barre
        drawBricks();//Dessine les briques
        drawScore();//Écris le score
        drawLives();//Écris les vies restantes

        //Inverse la direction quand la belle touche un mur dans l'axe x (gauche/droite mur)
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

       //Inverse la direction quand la belle touche un mur dans l'axe x (gauche/droite mur)
    if(y + dy < ballRadius) {
        dy = -dy;
    }   else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;//Pour faire rebondir la balle dans la direction opposée
    }
        else {
            lives--;
    if(!lives) {
       
        document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 1;
            dy = -1;
            paddleX = (canvas.width-paddleWidth)/2;
        }
    }
}

    if(rightPressed && paddleX < canvas.width-paddleWidth) {//Limite le movement de la barre dans le cadre
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

    x += dx;
    y += dy;
    if(!paused) {
        requestAnimationFrame(draw);
    }
}

draw();


// Possibilité de rajouter des boutons pour augmenter la vitesse de la balle ou de la réduire.


// function down() {
//   setInterval(draw,20);

// }

// function up() {
//   setInterval(draw, 30);
// }


// Pour essayer le clic simple et double.
function myFunction() {
  document.getElementById("demo").innerHTML = "Bonjour chère visiteur! </br> Félicitations, vous avez réussi à cliquer sur le bouton";
}

function Madeuz(){
  document.getElementById("test").innerHTML= "Bravo, vous avez double cliquer sur le bouton.";
}


