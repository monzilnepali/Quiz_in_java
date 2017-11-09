window.onload = function() {
    console.log("laoded");
    var player = JSON.parse(localStorage.getItem('player'));
    if (player == null) {
        window.location = "login system/index.html";
    } else {
        console.log(player.name);
        var element = document.getElementById("userinfo");
        var newdiv = document.createElement("div");
        var newdiv01=document.createElement("button");
         newdiv01.setAttribute('id','profileReset');
        newdiv.innerHTML = player.name;
        newdiv.className = "playerName";
        element.appendChild(newdiv);
        newdiv01.innerHTML="Logout";
        element.appendChild(newdiv01);
       
        document.getElementById("questionbox").style.display = "none";
        document.getElementById("resultboxContainer").style.display = "none";
        document.getElementById("mainbodybox").style.display = "block";

document.getElementById("profileReset").addEventListener("click",function(){

    window.location="login system/index.html";
});

 }
}

        //global variable declaretion

        var currentUserAnswerSelected;
        var timerVariable;
        var i = 0;
        //variable for question
        var categoriesQuestion = ["science", "computer", "programming"];
        var question = ["Which of the following is a non metal that remains liquid at room temperature",
            "What is the name of the network of computers from which the Internet has emerged", "In what year was Google launched on the web", "Which header file should be included to use functions like malloc() and calloc()?"
        ];
        var categories = ["0", "1", "1", "2"];
        var answer = ["0", "5", "10", "13"];
        var answerOption = ["Phosphorous", "Bromine", "Chlorine", "Helium", "1992", "1990", "1926", "1999", "2000", "2001", "2002", "2003", "h", "memory.h", "stdlib.h", "string.h", "dos.h"];
        var currentQuestionIndex = -1;
        var usersScore = 0;
        var usercateselection = [];
        var randomQuestion = [];
        var QuestionTracker = [];
        var categoriesFrequency = [];
        var useranswertracker = [];
        var userTimerTracker = [];


        //end of global variable declartion



        //code for quiz timer
        var coutDownTimeOut, x;

        function startTimer(answerTime) {
            coutDownTimeOut = answerTime;
            x = setInterval(function() {
                var timer = document.getElementById("quizTimer");
                console.log(timer);
                timer.innerText = coutDownTimeOut;

                if (coutDownTimeOut == 6) {
                    // document.getElementById("timerBox").style.backgroundColor="#c0392b";
                    //timer.getElementsByTagName("div")[0].style.backgroundColor = "#e74c3c";
                    document.getElementsByClassName("mainheading")[0].className +=" timeOut";
                    console.log(document.getElementsByClassName("mainheading"));
                }
                if (coutDownTimeOut == 0) {
                    clearInterval(x);
                    // timer.getElementsByTagName("p")[0].innerText = "0";
                    // console.log("timer finished");
                    questionDisplay();
                    return;
                    //automatically starting new questrion
                }
                coutDownTimeOut--;
            }, 1000);

        } //end of timer
        var answerselectedflag = 0;

        function answerselect(optionselected) {

            if (answerselectedflag == 0) {
                if (optionselected.getAttributeNode("for").value == 0) {
                    console.log("function called");
                    answerselectedflag = 1;
                    clearInterval(x);
                    coutDownTimeOut++;
                    currentUserAnswerSelected = optionselected.innerText;
                    optionselected.getAttributeNode("for").value = "1";
                    console.log(optionselected.parentNode)
                    var element = document.getElementById("optionbox");
                    var btnListed = element.getElementsByClassName("btn");
                    console.log(btnListed);
                    // document.getElementById("nextoption").style.display = "block";
                    var selectIcon = document.createElement("i");
                    selectIcon.className = "fa fa-check-circle answerSelectIcon";
                    selectIcon.style.float = "right";
                    optionselected.appendChild(selectIcon);
                    optionselected.style.transition = "background-color 0.5s";
                    // optionselected.style.transitionTimingFunction="ease-in";
                    optionselected.className += " answerSelectedBox";
                    userAnswerSelected = optionselected.innerHTML;
                    for (var i = 0; i < 4; i++) {
                        var selectionCheck = btnListed[i].getAttributeNode("for").value;
                        if (selectionCheck == 0) {
                            btnListed[i].className += " disabled";
                        }

                    }
                } //end of if statement
            } //end of if statement
            else {
                return;
            }
        } //end of function


        // code for correctanswer display in result tab    


        // function answerExpand(correctAnswerElement) {
        //     var rootNode = correctAnswerElement.parentNode; //questioncontainer
        //     console.log(rootNode);
        //     var rootNodeDiv = rootNode.getElementsByTagName("div");


        //     if (correctAnswerElement.getAttributeNode("for").value == 0) {
        //         console.log("if part called");

        //         rootNodeDiv[0].style.marginBottom = '0';
        //         rootNodeDiv[1].style.display = 'block';
        //         rootNodeDiv[1].className = "animated  fadeIn";
        //         correctAnswerElement.getAttributeNode("for").value = "1";
        //         console.log("value" + correctAnswerElement.getAttributeNode("for").value);

        //     } else {
        //         console.log("else called");

        //         rootNodeDiv[0].style.marginBottom = '0';
        //         rootNodeDiv[1].className = "animated fadeOut";
        //         rootNodeDiv[1].style.display = 'none';
        //         correctAnswerElement.getAttributeNode("for").value = "0";
        //     }



        // }


        // code for user answer checking
        function userAnswerSubmission() {
            //if user hasnot select option then this will alert user for selecting option tab
            if (currentUserAnswerSelected == null) {
                if (window.innerWidth < 760) {
                    document.getElementById("loginError").style.display = "inline-block";

                } else {
                    alert("select option");
                }

            } else {

                // now checking the value of currentUserAnswerSelected to array answer for verfication
                console.log("the value of timer at click time is" + coutDownTimeOut);
                userTimerTracker.push(12 - coutDownTimeOut);
                var userAnswer = currentUserAnswerSelected;
                console.log("user answer is " + userAnswer);
                var correctanswerIndex = answer[QuestionTracker[currentQuestionIndex]];
                console.log("correct answer index :" + correctanswerIndex);
                var correctAnswer = answerOption[correctanswerIndex];
                console.log("correct answer is" + correctAnswer);
                if (userAnswer.slice(2) == correctAnswer) {
                    //alert("correct answer");
                    console.log("the question categories is " + categoriesQuestion[currentQuestionIndex]);
                    var userCurrentScore = sessionStorage.getItem("userscore");
                    console.log("usercurrentscrore" + userCurrentScore);
                    useranswertracker.push("1");
                    var questionreward = Number(userCurrentScore) + 10;
                    sessionStorage.setItem("userscore", questionreward);
                    console.log(sessionStorage.getItem("userscore"));
                } else {
                    console.log("the user submitted answer is incorrect");
                    useranswertracker.push("0");

                }

                console.log("calling the QuestionDisplay function");
                document.getElementById("optionbox").className = "row";
                console.log(document.getElementById("optionbox"));
                questionDisplay();

            }

        }


        //end of code for user answer checkingfunction



        // code for user categories selection

        function cateselect(element) {
            //for =0 notify that it isnot selected
            // console.log("the function called");
            document.getElementById("CateError").style.display = "none";
            var new01 = element.getElementsByClassName("fa");
            var btnselectflag = element.getAttributeNode("for").value;
            //console.log("btn flag "+ btnselectflag);

            if (Number(btnselectflag) == 0) {
                element.className += " colorBackground";
                //  element.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
                new01[0].style.display = 'block';
                usercateselection.push(element.value);
                console.log("categories" + usercateselection);
                element.getAttributeNode("for").value = "1";
            } else {
                element.className = "btn btn-default";
                element.style.boxShadow = "inset 0 0 1px #000000";
                new01[0].style.display = 'none';
                var catevalue = element.value;
                console.log("catevalue is" + catevalue);
                var indexnumber = indexvaluecate(catevalue);
                console.log(indexnumber);
                console.log(usercateselection);
                for (i = indexnumber; i < usercateselection.length - 1; i++) {
                    usercateselection[i] = usercateselection[i + 1];
                }
                --usercateselection.length;
                console.log("categories after removal" + usercateselection);
                element.getAttributeNode("for").value = "0";
            }



        }
        //end of code for categories selection
        //code for determining the index of categories in user categories selection
        function indexvaluecate(indexvalue) {
            var i;
            for (i = 0; i < usercateselection.length; i++) {
                console.log("comparing value " + indexvalue + "and" + usercateselection[i]);
                if (indexvalue == Number(usercateselection[i])) {
                    console.log("return" + i);
                    return i;
                    break;
                } else {
                    console.log("not found");
                }
            }
        }
        //end of code for categories selection

        //code for determining whether user had selected at least one categories otherwise it will display the error message
        function welcomeStart() {
            if (usercateselection.length == 0) {
                document.getElementById("CateError").style.display = "block";
            } else {
                console.log("let get started");

                categoriesSelection();
                generatingRandomNumber();
                generatingRandomQuestion();
                //code for displaying question screen
                x = 0;

                document.getElementById("mainbodybox").style.display = "none";
                document.getElementById("questionbox").style.display = "block";
                //document.getElementById("usercurrentScore").style.display="block";
                document.getElementById("userinfo").style.display = "none";
                document.getElementById("userscore").style.display = "block";
                questionDisplay();

            }
        }

        //end of code for determining whether user had selected atleast one categories

        //code for generating random question based upon user categories selection

        function categoriesSelection() {

            //this function is used to remove other categories which arenot selected by users
            var tempCategories = new Array;
            var tempQuestionTracker = new Array;
            var i, j, flag = 0;
            for (i = 0; i < usercateselection.length; i++) {
                for (j = 0; j < categories.length; j++) {
                    //console.log("checking the value compara"+usercateselection[i]+"and"+categories[i]);
                    if (Number(usercateselection[i]) === Number(categories[j])) {

                        // console.log("matched found in categories and categories selection");
                        tempCategories[flag] = categories[j];
                        tempQuestionTracker[flag] = j;
                        flag++;
                        continue;

                    }


                } //end of for loop j
                //console.log("temp categories"+tempCategories);
                // console.log("temp question tracker"+tempQuestionTracker);

            } //end of for loop i
            categories = tempCategories;
            QuestionTracker = tempQuestionTracker;
            console.log("categories after assigning" + categories)
            console.log("QuestionTracker after assigning" + QuestionTracker);
            console.log("the user categories selection is " + usercateselection);

        } //end of categories selection


        function generatingRandomNumber() {
            console.log("function called generatingRandomNumber");
            var i = 0,
                randomNumberTracker = 0;
            var randomNumber, save = NaN,
                temp = 0;
            var cateFrequencyResult = categoriesFrequencyFinder();
            var catefreq = cateFrequencyResult[0];
            var cateTemp = cateFrequencyResult[2];
            //console.log("categories length while generarting the random Question Number" + cateFrequencyResult[1]);
            do {
                //   console.info("the value of i in for loop"+i);
                randomNumber = Math.floor(Math.random() * usercateselection.length);
                //this is used to generate the random based upon length of usercategories selection
                console.log("random number generated is " + randomNumber);
                console.log("cate  random" + cateTemp[randomNumber])
                //   var randomNumberIndex=categoriesIndexFinder(randomNumber);
                //similar can be repeated if its frequency is greater than 0
                //for example if there is two question of same categories than that categories index number 
                //can be repeat twice
                if (catefreq[randomNumber] > 0) {

                    if (save !== randomNumber) { //this is used to generate random number no repeation of
                        //same number twice
                        console.log("randomQuestion first [" + i + "]=" + randomNumber);
                        randomQuestion[i] = cateTemp[randomNumber];
                        save = randomNumber;
                        catefreq[randomNumber]--;
                        cateFrequencyResult[1]--;
                        i++;
                        continue;
                    } else {
                        if (randomNumberTracker > 0) {
                            //so if the random number is same we just ignore that and check for another number 
                            console.log("multiple occurance");
                            randomNumberTracker = 0;
                            continue;
                        } else {

                            console.log("randomQuestion second [" + i + "]=" + randomNumber);
                            randomQuestion[i] = cateTemp[randomNumber];
                            save = randomNumber;
                            randomNumberTracker++;
                            catefreq[randomNumber]--;
                            cateFrequencyResult[1]--;
                            //  console.log(cateFrequencyResult[0]);
                            i++;
                            continue;

                        }
                    }
                }

            } while (cateFrequencyResult[1] !== 0) //end of for while loop i
            console.log("final frequency" + cateFrequencyResult[1]);
            console.log("random number generating=" + randomQuestion);

        } //end of generatingrandom number function


        //this functionn is used to find the frequency of element in array
        function categoriesFrequencyFinder() {
            console.log("categoriesFrequency Finder called");
            var a = [],
                b = [],
                prev, i;
            categories.sort();
            for (i = 0; i < categories.length; i++) {
                if (categories[i] !== prev) {
                    a.push(categories[i]);
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = categories[i];

            } //end of for loop i
            var tempCategoriesLength = categories.length;
            console.log("new categories" + a);
            console.log("frequency of categories" + b);
            return [b, tempCategoriesLength, a];

        } //end of categoriesFrequencyFinder;


        function generatingRandomQuestion() {
            console.log(categories);
            var tempCategories = new Array;
            var tempQuestionTracker = new Array;
            for (var i = 0; i < randomQuestion.length; i++) {
                for (var j = 0; j < categories.length; j++) {
                    console.log("comparing these two value" + randomQuestion[i] + "and " + categories[j]);
                    if (Number(randomQuestion[i]) === Number(categories[j])) {
                        console.log("found");
                        tempCategories.push(categories[j]);
                        tempQuestionTracker.push(QuestionTracker[j]);
                        categories[j] = NaN;
                        break;
                    } else {
                        console.log("not found");
                    }

                }
            }
            categories = tempCategories;
            QuestionTracker = tempQuestionTracker;
            console.log("temp categoires" + categories);
            console.log("temp Question tracker" + QuestionTracker);


        } //end of generatingrandomQuestion function



        function questionDisplay() {
       document.getElementsByClassName("mainheading")[0].className ="mainheading";
            startTimer(12);
            //header part 

            answerselectedflag = 0;
            currentUserAnswerSelected = null;
            console.log("questionDisplay called");
            var flag = 0;
            var answerTracker = 0;
            currentQuestionIndex++;
            if (currentQuestionIndex > QuestionTracker.length - 1) {
                clearInterval(x);
                console.log(useranswertracker);
                resultDisplay();

                //alert("no more question available calling to result fucntion");
            } else {
                console.log("progress bar");
                var questionPart = Math.floor(100 / (categories.length));
                console.log("questionpart" + questionPart);
                console.log("question tracker" + currentQuestionIndex);
                var scoreBar = document.getElementById("scoreBoard");
                questionPart = questionPart + questionPart * currentQuestionIndex;
                scoreBar.getElementsByTagName("div")[0].style.width = questionPart + "%";
                //for resetting the color and fa icon in option box
                var element = document.getElementById("optionbox");
                var btnListed = element.getElementsByClassName("btn");
                console.log(btnListed);
                for (var i = 0; i < btnListed.length; i++) {
                    btnListed[i].className = "btn btn-default";
                    btnListed[i].getAttributeNode("for").value = "0";
                }
                console.log("questionNumber" + currentQuestionIndex);
                console.log("questiontracker" + categories[currentQuestionIndex]);
                console.log(document.getElementById("currentQuestion"));
                document.getElementById("questionCate").innerHTML = categoriesQuestion[categories[currentQuestionIndex]];
                document.getElementById("currentQuestion").innerHTML = "#" + (currentQuestionIndex + 1) + question[QuestionTracker[currentQuestionIndex]] + " ?";
                //   document.getElementById("questionNumberIndex").innerHTML = "#" + currentQuestionIndex + 1;

                var element = document.getElementById("optionbox");
                var answerOptionArray = element.getElementsByClassName("btn-default");
                for (i = 0; i < 4; i++) {
                    answerOptionArray[i].innerHTML = (i + 1) + "." + answerOption[i + QuestionTracker[currentQuestionIndex] * 4 + answerTracker];
                    // answerOptionArray[i].innerHTML =(i+1)+"."+answerOption[i + QuestionTracker[currentQuestionIndex] * 4 + answerTracker];
                    //console.log("value of i="+i);
                    //console.log("value of flag"+flag);
                    flag++;

                }
                answerTracker = answerTracker + flag;



            }
        } //end of else statement
        //end of QuestionDisplay function


        function resultDisplay() {
            document.getElementById("userinfo").style.display = "block";
            document.getElementById("userscore").style.display = "none";
            document.getElementById("resultboxContainer").style.display = "block";
            document.getElementById("questionbox").style.display = "none";
            var finalresult = 0;
            var finalTime = 0;
            console.log(userTimerTracker);
            for (var i = 0; i < useranswertracker.length; i++) {
                if (Number(useranswertracker[i]) == 1) {
                    finalresult++;
                }
                finalTime = (userTimerTracker[i] + finalTime);

            }

            //result in details

            var resultPer = (finalresult / useranswertracker.length) * 100;
            document.getElementById("innerCirclePart").innerHTML = Math.floor(resultPer) + "%";

            console.log(resultPer);
            //converting second into minute
            var minute = (finalTime) / 60;
            if (Math.floor(minute) == 0) {
                //no minute part 
                console.log("second" + finalTime);
                if (finalTime < 0) {
                    finalTime = 0;
                }
            } else {
                var second = minute - Math.floor(minute);
                var finalsecond = second * 1000;
                console.log(finalsecond.toFixed(2));

            }
            var element = document.getElementById("userResultDetail");
            console.log(element);
            var list = element.getElementsByTagName("p");
            console.log(list);
            list[1].innerHTML = categories.length; //total question
            list[3].innerHTML = finalresult; //correct anwswer
            list[5].innerHTML = finalTime + "s"; //total duration
            var usercate = [];

            for (var i = 0; i <= usercateselection.length - 1; i++) {

                usercate.push(categoriesQuestion[i]);

            }

            console.log(usercate);
            list[7].innerHTML = resultPer //score
            list[9].innerHTML = usercate;

            return;


        }

        document.getElementById("resultDetail_btn").addEventListener("click", function() {



            var element = document.getElementById("resultboxContainer");
            element.getElementsByClassName("resultDisplay")[0].style.display = "none";
            element.getElementsByClassName("resultDetail")[0].style.display = "block";


        });

        document.getElementById("fall_back").addEventListener("click", function() {
            var element = document.getElementById("resultboxContainer");
            element.getElementsByClassName("resultDisplay")[0].style.display = "block";
            element.getElementsByClassName("resultDetail")[0].style.display = "none";

        });

        document.getElementById("playAgain").addEventListener("click", function() {

            location.reload();

        });

   