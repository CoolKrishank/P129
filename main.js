song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(380,200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded()
{
    console.log("PoseNet is Initialized");
}
function gotPoses(results)
{
   if(results.length > 0)
   {
      console.log(results);
      
      scoreLeftWrist = results[0].pose.keypoints[9].score;

      scoreRightWrist = results[0].pose.keypoints[10].score;

      console.log("Score Right Wrist = " + scoreRightWrist + "Score Left Wrist = " + scoreLeftWrist);

      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY)
   }
}
function draw()
{
    image(video , 0 , 0 , 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristY , rightWristX , 20);
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed of the song = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed of the song = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed of the song = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed of the song = 2x";
            song.rate(2); 
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed of the song = 2.5x";
            song.rate(2.5);
        }
    }
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX , leftWristY , 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}