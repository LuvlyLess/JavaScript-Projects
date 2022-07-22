// This variable keeps track of who's turn it is
let activePlayer = "X";
// This array stores an array of moves. we use this to determine win conditions.
let selectedSquares = [];

// This function is for placing an x or o in a square
function placeXOrO(squareNumber) {
        // checks if square has been selected already.
        //The .some() method is used to check each element of selected asquare array to 
        //see if it contains the aquare number clicked on
        if(!selectedSquares.some(element => element.includes(squareNumber))) {
            // This variable retrieves the html element id that is clicked.
            let select = document.getElementById(squareNumber);
            //This condition checks whos turn it is
            if (activePlayer === "X") {
                //if active player is equal to x the x.png is placed in html
                select.style.backgroundImage = "url('images/x.png')";
                //active player may only be x or o so if not x it must be o
            }
            else {
                //if active player is equal to O the o.ong is placed in the html
                select.style.backgroundImage = "url('images/o.png')";
            }
            //squareNumber and active player are concatenated together and added to array
                selectedSquares.push(squareNumber + activePlayer);
            // this calls a function to check for any win conditions
                checkWinConditions();
            //this condition is for changing the active player
            if(activePlayer === "X") {
                // if active player is X change it to O
                activePlayer = "O";
            }
            else {
                //change the activePlayer to X
                activePlayer ="X";
            }
            // this function plays placement sound
               audio("/media/place.mp3")
            // this condition checks to see if it is computers turn
            if(activePlayer === "O"); {
                // this function disables clicking for computer choice
                disableClick();
                //this function waits 1 second before placing the image and enabl click
                setTimeout(function () {computersTurn(); }, 1000 );
            }
            return true;
        }

        //this function results in a random square being selected
        function computersTurn() {
            let success = false;
            let pickASquare;
            while(!success) {
                pickASquare = String(Math.floor(Math.random() * 9));
                if (placeXOrO(pickASquare)) {
                    success = true;
                };
            }
        }

    }


    //this function parses the selected squares array to search for a win condition
        function checkWinConditions() {
                if (arrayIncludes("0X", "1X", "2X")) {drawWinLine(50, 100, 558, 100); }  
            else if (arrayIncludes("3X", "4X", "5X")) {drawWinLine(50, 304, 558, 304); }
            else if (arrayIncludes("6X", "7X", "8X")) {drawWinLine(50, 504, 558, 504); }
            else if (arrayIncludes("0X", "3X", "6X")) {drawWinLine(100, 50, 100, 558); }
            else if (arrayIncludes("1X", "4X", "7X")) {drawWinLine(304, 50, 304, 558); }
            else if (arrayIncludes("2X", "5X", "8X")) {drawWinLine(508, 50, 508, 558); }
            else if (arrayIncludes("6X", "4X", "2X")) {drawWinLine(100, 508, 510, 90); }
            else if (arrayIncludes("0X", "4X", "8X")) {drawWinLine(100, 100, 520, 520); }
            // O's start here
            else if  (arrayIncludes("0o", "1o", "2o")) {drawWinLine(50, 100, 558, 100); }
            else if (arrayIncludes("3o", "4o", "5o")) {drawWinLine(50, 304, 558, 304); }
            else if (arrayIncludes("6o", "7o", "8o")) {drawWinLine(50, 504, 558, 504); }
            else if (arrayIncludes("0o", "3o", "6o")) {drawWinLine(100, 50, 100, 558); }
            else if (arrayIncludes("1o", "4o", "7o")) {drawWinLine(304, 50, 304, 558); }
            else if (arrayIncludes("2o", "5o", "8o")) {drawWinLine(508, 50, 508, 558); }
            else if (arrayIncludes("6o", "4o", "2o")) {drawWinLine(100, 508, 510, 90); }
            else if (arrayIncludes("0o", "4o", "8o")) {drawWinLine(100, 100, 520, 520); }
            else if (selectedSquares.length >= 9) {
                Audio("/media/tie.mp3");
                setTimeout(function () {resetGame();}, 1000);
            }


    // this checks if an array includes 3 strings for win condition
        function arrayIncludes(squareA, squareB, squareC) {
            const a = selectedSquares.includes(squareA);
            const b = selectedSquares.includes(squareB);
            const c = selectedSquares.includes(squareC);
            if (a === true && b === true && c === true) {return true;}
            }
        }







// this makes the body elemt un clickable temporarily
function disableClick() {
    body.style.pointerEvents = "none";
    setTimeout(function() {body.style.pointerEvents = "auto";}, 1000);
}
// this function plays a media sound
function audio(audioURL) {
    let audio = new Audio("audioURL");
    audio.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
        const canvas = document.getElementById("win-lines");
        const c = canvas.getContext("2d");
        let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;

    function  animateLineDrawing() {
        const ainmationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);c.lineWidth = 10;
        c.strokeStyle = 'rgba(70, 255, 33, .8)';
        c.stroke();
        if (x1 <= x2 && y1 <= y2){
            if (x < x2) { x += 10;}
            if (y < y2) { y += 10;}
            if ( x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop); }
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if ( y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop); }
        }
    }

    // clear canvas after win loose draw
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animateLoop);
    }

    disableClick();
    audio('/media/winGame.mp3');
    animateLineDrawing();
    setTimeout(function () {clear(); resetGame(); }, 1000);
}


    //this function resets the game
    function resetGame() {
        for (let i = 0; i < 9; i++) {
            let square = document.getElementById(String(i));
            square.style.backgroundImage = '';
        }
        // resets array so its empty
        selectedSquares = [];
}

	







