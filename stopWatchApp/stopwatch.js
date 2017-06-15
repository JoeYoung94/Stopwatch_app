$(function(){
    // variables
        //app mode
    var mode = 0;
    
        //time counter
    var timeCounter = 0;
    
        //lap counter
    var lapCounter = 0;
    
        //variable for setInterval
    var action;
    
        //number of laps
    var lapNumber = 0;
    
        //minutes, seconds, centiminutes for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On app load show start and lap buttons
        //firstly, it should show the start button and lap button when there is no operation
    hideshowButtons("#startButton", "#lapButton");
    
    //when clicking on the start button:
    $("#startButton").click(function(){
       //the mode changes to "on" 
        mode = 1;
        
        //show the stop and lap button
        hideshowButtons("#stopButton", "#lapButton");
        
        //start counter
        startAction();
    });
    
    //when clicking on the stop button
    $("#stopButton").click(function(){
        //show resume and reset button
        hideshowButtons("#resumeButton", "#resetButton");
        
        //stop counter
        clearInterval(action);
    });
        
    //when clicking on the resume button
    $("#resumeButton").click(function(){
       //show stop and lap button
        hideshowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });
    
    //when click on the reset button
        //reload the page
    $("#resetButton").click(function(){
        location.reload();
    });
    
    //when clicking on the lap button
    $("#lapButton").click(function(){
        //if mode is on (the stop watch is running)
        if(mode == 1)
            {
               //stop action
                clearInterval(action);
                
                //reset lap and print lap details
                lapCounter = 0;
                addLap();
                
                //start action 
                startAction();
            }
        else
            location.reload();
            
    });
        
    
    //functions
        //hide or show buttons
    function hideshowButtons(x,y)
    {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
        //start the counter
    function startAction()
    {
        //the counter increase 1 every 10 mini-seconds
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100)
                timeCounter = 0;
            lapCounter++;
            if(lapCounter == 100*60*100)
                lapCounter = 0;
            
            //then convert the format of time to minute:second:centisecond
            updateTime();
        }, 10);
    }
    
        //updateTime function: convert counters to minutes: seconds: centiseconds
    function updateTime()
    {
        //for the time division
        // 1 min == 60 * 100 centiseconds == 6000 centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        
        //1 sec = 100 centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        
        timeCentiseconds = (timeCounter%6000)%100;
        
        //access the ids of specific spans
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        //for the lap division
        // 1 min == 60 * 100 centiseconds == 6000 centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        
        //1 sec = 100 centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        
        lapCentiseconds = (lapCounter%6000)%100;
        
        //access the ids of specific spans
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    
        //format the numbers
    function format(number)
    {
        if(number < 10)
            {
                return '0' + number;
            }
        else
            {
                return number;
            }
    }
    
    //function of adding a lap
    // print the lap details inside the lap box
    function addLap()
    {
        //increase lap number by 1
        lapNumber++;
        
        var myLapDetails = 
            '<div class="lap">' + 
                '<div class="laptimetitle">' + 
                    'Lap' + lapNumber +
                '</div>' +
                '<div class="laptime">' + 
                    '<span>' + format(lapMinutes) + '</span>' + 
                    ':<span>' + format(lapSeconds) + '</span>' +
                    ':<span>' + format(lapCentiseconds) + '</span>' +
                '</div>' +
            '</div>';
        $(myLapDetails).appendTo("#laps");
    }
    
});