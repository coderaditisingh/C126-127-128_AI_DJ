song = "";

function preload()
{
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

LefttWristX = 0;
LefttWristY = 0;

function setup()
{
  canvas = createCanvas(600, 500);
  canvas.center();

  video.hide();
  video = createCapture(VIDEO);

  poseNet = ml5.poseNet(video,modelLoaded)
  poseNet.on('pose',gotPoses);

}

function modelLoaded()
{
    console.log('PosNet Is Initialized');
}

function gotPoses(reults)
{
    console.log(results);

if(reults.length > 0)
{
    scoreRightWrist = results[0].pose.keypoints[9].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = "+scoreRightWrist+" scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    righttWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX+" rightWristX = " + rightWristX);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX+" lefttWristX = " + leftWristX);
}
}

function draw()
{
    image(video,0,0,600,500);
    fill("FF0000");
    stroke("FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY > 0 && rightWristX <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x"
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristX <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 1x"
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristX <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x"
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristX <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2x"
            song.rate(2);
        }
        else if(rightWristY > 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x"
            song.rate(2.5);
        }
        
    }
   if(scoreLeftWrist > 0.2)
   {
       circle(leftWristX,leftWristY,20);
       leftWristY_divide_500 =floor(InNumberleftWristY/500);
       document.getElementById("volume").innerHTML = " Volume = " + leftWristY_divide_500;
       song.setVolume(leftWristY_divide_500);
   }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}




