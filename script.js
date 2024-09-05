const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 500;

// Game variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 4;

const paddleWidth = 10;
const paddleHeight = 100;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 6;

let playerScore = 0;
let aiScore = 0;

const playerScoreElem = document.getElementById('playerScore');
const aiScoreElem = document.getElementById('aiScore');

// Draw the ball
function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#00bfff'; // Bluish color for the ball
    context.shadowBlur = 15;
    context.shadowColor = '#00bfff';
    context.fill();
    context.closePath();
}

// Draw the paddles
function drawPaddle(x, y) {
    context.fillStyle = '#00bfff'; // Bluish color for paddles
    context.fillRect(x, y, paddleWidth, paddleHeight);
    context.shadowBlur = 15;
    context.shadowColor = '#00bfff';
}

// Move the ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with player paddle
    if (
        ballX - ballRadius < paddleWidth &&
        ballY > playerPaddleY &&
        ballY < playerPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with AI paddle
    if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > aiPaddleY &&
        ballY < aiPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Score update and reset ball if it goes off screen
    if (ballX + ballRadius < 0) {
        aiScore++;
        aiScoreElem.textContent = aiScore;
        resetBall();
    } else if (ballX - ballRadius > canvas.width) {
        playerScore++;
        playerScoreElem.textContent = playerScore;
        resetBall();
    }
}

// Reset ball after scoring
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Move the AI paddle
function moveAIPaddle() {
    if (aiPaddleY + paddleHeight / 2 < ballY) {
        aiPaddleY += paddleSpeed;
    } else {
        aiPaddleY -= paddleSpeed;
    }
}

// Update the game
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(0, playerPaddleY); // Player paddle
    drawPaddle(canvas.width - paddleWidth, aiPaddleY); // AI paddle
    moveBall();
    moveAIPaddle();
}

// Control player paddle with mouse
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    playerPaddleY = e.clientY - rect.top - paddleHeight / 2;
});

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
