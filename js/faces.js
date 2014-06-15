var	group = new Group();
var face = {};

face.draw = function(){
	/******
	*	I/O
	*****/
	var f_radius = new Size($('#xRadius').val()/20, $('#yRadius').val()/20) || Size.random();
	var f_eyeWidth = $('#eyeWidth').val()/50 || Math.random();
	var f_eyeHeight = $('#eyeHeight').val()/50 || Math.random();
	var f_noseWidth = $('#noseWidth').val()/100 || Math.random();
	var f_noseHeight = $('#noseHeight').val()/100 || Math.random();
	var f_mouthDir = $('#mouthDir').val()/100 || Math.random();
	var f_mouthWidth = $('#mouthWidth').val()/100 || Math.random();
	var f_mouthHeight = $('#mouthHeight').val()/100 || Math.random();
	// var f_fx = $('#fx').val()/100;

	group.remove();
	group = new Group();
	var colors = ['#E0E09F','#F0F0C0','#F0D8A8','#DAB28A','#131F1A',
				'#51504E','#F1A361','#DF5E52','#C33A45','#572B3B'];
	var center = view.center;
	var min = view.size/5;
	var max = view.size/4;
	var r = f_radius * (max-min) + min;
	var xunit = r.width/5;
	var yunit = r.height/3;

	/*******
	* 	HEAD
	*******/
	var head = new Path();
	var pi = Math.PI;
	var points = 6;
	var angle = (2*pi) / points;
	for(var i = pi/2; i < (2*pi)+(pi/2)-angle; i += angle){
		var x = center.x + Math.cos(i) * r.width;
		var y = center.y + Math.sin(i) * r.height;
		var point = new Point(x,y);
		head.add(point);
	}
	head.closed = true;
	head.rotate(180,center);

	//sommet du crane
	head.segments[0].handleIn = new Point(-xunit*3, 0);
	head.segments[0].handleOut = new Point(xunit*3, 0);
	// arcade gauche
	head.segments[1].handleIn = new Point(0, -20);
	head.segments[1].handleOut = new Point(5, 20);
	head.segments[1].point.y += yunit/2;
	//pommette gauche
	head.segments[2].handleIn = new Point(10, -20);
	head.segments[2].handleOut = new Point(-10, 20);
	head.segments[2].point.x -= xunit/2;
	// menton
	head.segments[3].handleIn = new Point(xunit*1.5, 0);
	head.segments[3].handleOut = new Point(-xunit*1.5, 0);
	// pommette droite
	head.segments[4].handleIn = new Point(10, 20);
	head.segments[4].handleOut = new Point(-10, -20);
	head.segments[4].point.x += xunit/2;
	// arcade droite
	head.segments[5].handleIn = new Point(-5, 20);
	head.segments[5].handleOut = new Point(0, -20);
	head.segments[5].point.y += yunit/2;

	var rdmIn = Math.random()+0.2;
	var rdmOut = Math.random()+0.2;
	for(var i=0;i<head.segments.length;i++){
		head.segments[i].handleIn *= rdmIn;
		head.segments[i].handleOut *= rdmOut;
	}

	head.strokeColor = '#111';
	// var headColor = Math.floor(Math.random()*(colors.length-1));
	// head.fillColor = colors[headColor];
	// colors.splice(headColor,1);
	group.addChild(head);

	/*******
	* 	EYES
	*******/
	var chooseeye = Math.random();
	var eyewidth = (f_eyeWidth * (xunit*1.5-xunit/5) + xunit/5) / 2;
	var eyeheight = (f_eyeHeight * (yunit*1.5-yunit/5) + yunit/5) / 2;
	var eyecenter = new Point(center.x-xunit*2, center.y-yunit/2);

	if(chooseeye < 0.33){
		var righteyelid = new Path({
			segments: [[eyecenter.x-eyewidth/3, eyecenter.y],
					[eyecenter.x, eyecenter.y+eyeheight/2],
					[eyecenter.x+eyewidth/3, eyecenter.y]],
			strokeColor: '#111'
		});
		righteyelid.smooth();
		var lefteyelid = righteyelid.clone();
		lefteyelid.position.x += xunit*4;

		group.addChild(righteyelid);
		group.addChild(lefteyelid);
		
		eyewidth /= 1.5;
		eyeheight /= 1.5;
	} else if(chooseeye > 0.66){
		eyewidth /= 10;
		eyeheight /= 10;
	}
	var rightpupil = new Path.Ellipse({
		center: eyecenter,
		size: [eyewidth, eyeheight],
		strokeColor: '#000',
		fillColor: '#fff'
	});
	var leftpupil = rightpupil.clone();
	leftpupil.position.x += xunit*4;

	group.addChild(rightpupil);
	group.addChild(leftpupil);

	/*******
	* 	NOSE
	*******/
	var choosenose = Math.random();
	var nosewidth = f_noseWidth * (xunit*2-xunit/5) + xunit/5;
	var noseheight = f_noseHeight * (yunit*2-yunit/5) + yunit/5;
	var noseColor = colors[Math.floor(Math.random()*colors.length)];

	if(choosenose < 0.5){
		var nose = new Path.RegularPolygon({
			center: [center.x, center.y+yunit/2],
			sides: 3,
			radius: nosewidth/2,
			fillColor: noseColor,
			strokeColor: noseColor
		});
		nose.segments[1].point.y -= yunit/2;
	} else if(choosenose < -0.5){
		var nosedir = Math.round((Math.random()-0.5)*10);
		var nose = new Path({
			segments: [[center.x, center.y+yunit/2],
					[center.x+nosewidth/nosedir, center.y+yunit/1.5],
					[center.x, center.y+yunit]],
			strokeColor: '#111'
		});
	} else if(choosenose < -0.75){
		var nose = new Path.Ellipse({
			center: [center.x-nosewidth/2, center.y+yunit],
			size: [nosewidth/10,noseheight/10],
			strokeColor: '#111'
		});
		var nose2 = nose.clone();
		nose2.position.x += nosewidth;
		nose2.strokeColor = '#111';
		group.addChild(nose2);
	} else {
		var nose = new Path.Ellipse({
			center: [center.x, center.y+yunit/3],
			size: [nosewidth,nosewidth],
			fillColor: noseColor,
			strokeColor: noseColor
		});
	}
	nose.smooth();

	group.addChild(nose);

	/*******
	* 	MOUTH
	*******/
	// var choosemouth = 0.8;
	var choosemouth = Math.random();
	var mouthdir = f_mouthDir - 0.5;
	var mouthwidth = f_mouthWidth * (r.width/2);
	var mouthheight = (f_mouthHeight+1) * Math.round(mouthdir*20);
	var mouthy = center.y + (yunit*1.5);
	var mouthColor = colors[Math.floor(Math.random()*colors.length)];

	if(choosemouth < 0.5){
		var mouth = new Path.Rectangle({
			from: [center.x-mouthwidth, mouthy],
			to: [center.x+mouthwidth, mouthy+mouthheight],
			radius: Math.random() * (yunit*2-yunit) + yunit
		});
	} else {
		var mouth = new Path({
			segments: [[center.x-mouthwidth, mouthy],
						[center.x+mouthwidth, mouthy+mouthheight]]
		});
	}
	mouth.strokeColor = '#111';
	if(choosemouth < 0.25 || choosemouth > 0.75){
		var lips = mouth.clone();
		// lips.position.x += mouthwidth/2;
		lips.segments[0].point.x += Math.random()*mouthwidth/2;
		lips.segments[1].point.x -= Math.random()*mouthwidth/2;
		lips.position.y -= Math.random()*mouthheight;
		group.addChild(lips);
	}
	mouth.fillColor = '#fff';
	group.addChild(mouth);

	/*******
	* 	EFFECT
	*******/
	for(var i = 0; i < group.children.length; i++){
		var child = group.children[i];
		var len = child.segments.length;
		var factor = len;
		for(var j = 0; j < child.segments.length; j++){
			child.segments[j].point += Point.random() * factor;
		}
		child.flatten(factor);
		for(var j = 0; j < child.segments.length; j++){
			child.segments[j].point = child.segments[j].point + Point.random() * factor/3;
		}
	}
}

$(document).ready(function(){
    face.draw();
    $('input').change(function(){
    	face.draw();
    });
});
