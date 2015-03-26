fpp.img_width = 410;
fpp.img_height = 410;

$('#cvs')[0].width = fpp.img_width;
$('#cvs')[0].height = fpp.img_height;

var fppw = fpp.img_width;
var fpph = fpp.img_height;

// background
var bg = Shape.Circle(makePoint(fpp.nose_tip), 150);
bg.fillColor = '#DF5E52';

// chin
var leftChin = new Path();
var rightChin = new Path();
var chin = makePath(fpp.contour_chin);

// left eye
var leftEye = new Path();
var leftEyebrow = new Path();

// right eye
var rightEye = new Path();
var rightEyebrow = new Path();

// nose
var noseLeft = makePath(fpp.nose_contour_right3);
var noseTip = makePath(fpp.nose_tip);
var noseRight = makePath(fpp.nose_contour_left3);
var noseBottom = makePath(fpp.nose_contour_lower_middle);

// mouth
var mouth = new Path();
var mouthShadow = new Path();

// Debug points
var debugGroup = new Group();

_.forEach(fpp, function (value, key){
  // debug
  var c = Shape.Circle(makePoint(value), 1);
  debugGroup.addChild(c);
  // c.fillColor = '#F13';
  c.onMouseEnter = function(event){
    console.log(key);
  }

  if(key.match(/^contour_left/gi)){
    addToPath(leftChin, value);
  }
  if(key.match(/^contour_right/gi)){
    addToPath(rightChin, value);
  }

  if(key.match(/^left_eyebrow_lower/gi)){
    addToPath(leftEyebrow, value);
  }

  if(key.match(/^right_eyebrow_lower/gi)){
    addToPath(rightEyebrow, value);
  }
});

/****
  Join and tweak pathes
****/

// Face contour
var headTop = new Point(
    chin.lastSegment.point.x,
    (chin.lastSegment.point.y - (leftChin.lastSegment.point.y / 1.3))
  );
headTopHandleIn = new Point(headTop.x - 275, headTop.y - 50);
headTopHandleOut = new Point(headTop.x - 150, headTop.y - 50);
var headTopSeg = new Segment(headTop, headTopHandleIn, headTopHandleOut);
var headTopPath = new Path([
    leftChin.firstSegment,
    headTopSeg,
    rightChin.firstSegment
  ]);
headTopPath.strokeColor = '#111';

leftChin.join(chin);
rightChin.join(chin);
rightChin.join(headTopPath);
rightChin.join(leftChin);
rightChin.fillColor = '#F0D8A8';

// left eye
addToPath(leftEye, fpp.left_eye_bottom);
addToPath(leftEye, fpp.left_eye_lower_left_quarter);
addToPath(leftEye, fpp.left_eye_left_corner);
addToPath(leftEye, fpp.left_eye_upper_left_quarter);
addToPath(leftEye, fpp.left_eye_top);
addToPath(leftEye, fpp.left_eye_upper_right_quarter);
addToPath(leftEye, fpp.left_eye_right_corner);
addToPath(leftEye, fpp.left_eye_lower_right_quarter);
leftEye.fillColor = '#FFF';

var leftPupil = Shape.Circle(makePoint(fpp.left_eye_pupil), 5);
leftPupil.fillColor = '#222';

leftEyebrow.strokeColor = '#222';
leftEyebrow.strokeWidth = 2;
leftEyebrow.strokeCap = 'round';
leftEyebrow.simplify();

// right eye
addToPath(rightEye, fpp.right_eye_bottom);
addToPath(rightEye, fpp.right_eye_lower_left_quarter);
addToPath(rightEye, fpp.right_eye_left_corner);
addToPath(rightEye, fpp.right_eye_upper_left_quarter);
addToPath(rightEye, fpp.right_eye_top);
addToPath(rightEye, fpp.right_eye_upper_right_quarter);
addToPath(rightEye, fpp.right_eye_right_corner);
addToPath(rightEye, fpp.right_eye_lower_right_quarter);
rightEye.fillColor = '#FFF';

var rightPupil = Shape.Circle(makePoint(fpp.right_eye_pupil), 5);
rightPupil.fillColor = '#222';

rightEyebrow.strokeColor = '#222';
rightEyebrow.strokeWidth = 2;
rightEyebrow.strokeCap = 'round';
rightEyebrow.simplify();

// Nose
noseLeft.join(noseBottom);
noseLeft.reverse();
noseLeft.join(noseTip);
noseRight.join(noseBottom);
noseRight.reverse();
noseRight.join(noseTip);
noseRight.join(noseLeft);

noseLeft.fillColor = '#DAB28A';
noseRight.fillColor = '#DAB28A';

// Mouth
addToPath(mouth, fpp.mouth_right_corner);
addToPath(mouth, fpp.mouth_upper_lip_bottom);
addToPath(mouth, fpp.mouth_left_corner);
addToPath(mouth, fpp.mouth_lower_lip_top);
mouth.closed = true;
mouth.strokeColor = '#DAB28A';
mouth.fillColor = '#DAB28A';

addToPath(mouthShadow, fpp.mouth_lower_lip_left_contour3);
addToPath(mouthShadow, fpp.mouth_lower_lip_right_contour3);
addToPath(mouthShadow, fpp.mouth_lower_lip_bottom);
mouthShadow.fillColor = '#DAB28A';

/***
  Helpers
***/
function addToPath(path, pos){
  var x = fppw * (pos.x / 100);
  var y = fpph * (pos.y / 100);
  var point = new Point(x, y);
  path.add(point);
}

function makePoint(pos){
  var x = fppw * (pos.x / 100);
  var y = fpph * (pos.y / 100);
  var point = new Point(x, y);
  return point;
}

function makePath(pos){
  var x = fppw * (pos.x / 100);
  var y = fpph * (pos.y / 100);
  var point = new Point(x, y);
  var path = new Path();
  path.add(point);
  return path;
}