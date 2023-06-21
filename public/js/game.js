const audioStart = new Audio('../assets/cyber.mp3');
window.onload = function () {
  
  audioStart.play();
  var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  var categories; // Array of topics
  var chosenCategory; // Selected catagory
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Geuss
  var geusses = []; // Stored geusses
  var lives; // Lives
  var counter; // Count correct geusses
  var space; // Number of spaces in word '-'
  var flips = 0;
  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");
  const audioHit = new Audio("../assets/hit.mp3");
  const audioDead = new Audio("../assets/dead.mp3")
  const audioAlive = new Audio("../assets/alive.mp3")
  

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML =
        "The Chosen Category Is Premier League Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    }
  };

  // Create geusses ul
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives and game end
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "You killed your teacher";
      audioDead.play();
      fetch('/api/games/', {
        method: 'POST',
         body: JSON.stringify({word:word,won:false }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
     
      if (counter + space === geusses.length) {
        showLives.innerHTML = "He survived get him!!";
       if(flips === word.split("-").join("").length){
        audioAlive.play();
          fetch('/api/games/', {
           method: 'POST',
            body: JSON.stringify({word:word,won:true }),
           headers: { 'Content-Type': 'application/json' },
         });
       }
      
    }
  };

  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  };

  // Hangman
  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
  };
  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    
   
    var image = new Image();
    image.src = 'assets/nate_720.png';
    image.onload = function() {
     context.drawImage(image, 12, 15, 60, 60); 
    };
    
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    
    context.stroke();
  };



  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function () {
    draw(0, 150, 150, 150);
  };

  frame2 = function () {
    draw(10, 0, 10, 600);
  };

  frame3 = function () {
    draw(0, 5, 70, 5);
  };

  frame4 = function () {
    draw(40, 5, 40, 15);
  };

  torso = function () {
    draw(40, 75, 40, 135);
  };
  
  rightArm = function () {
    draw(40, 85, 80, 90);
  };
  
  leftArm = function () {
    draw(40, 85, 0, 90);
  };
  
  rightLeg = function () {
    draw(40, 135, 80, 165);
  };
  
  leftLeg = function () {
    draw(40, 135, 0, 165);
  };

  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1
  ];
  

  // OnClick Function
  check = function () {
    
    list.onclick = function () {
      audioStart.pause();
      var geuss = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          flips++
          counter += 1;
          
        }
      }
      var j = word.indexOf(geuss);
      audioHit.play();
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
        
      } else {
        comments();
      }
    };
  };

  // Play
  play = function () {
    categories = [
      [
        "everton",
        "liverpool",
        "swansea",
        "chelsea",
        "hull",
        "manchester-city",
        "newcastle-united"
      ],
      ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
      ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();
    flips = 0;
    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  play();

  // Hint

  hint.onclick = function () {
    hints = [
      [
        "Based in Mersyside",
        "Based in Mersyside",
        "First Welsh team to reach the Premier Leauge",
        "Owned by A russian Billionaire",
        "Once managed by Phil Brown",
        "2013 FA Cup runners up",
        "Gazza's first club"
      ],
      [
        "Science-Fiction horror film",
        "1971 American action film",
        "Historical drama",
        "Anamated Fish",
        "Giant great white shark"
      ],
      [
        "Northern city in the UK",
        "Home of AC and Inter",
        "Spanish capital",
        "Netherlands capital",
        "Czech Republic capital"
      ]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
  };

  // Reset

  document.getElementById("reset").onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
    audioStart.play();
  };
};
