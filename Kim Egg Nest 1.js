(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Kim Egg Nest 1_atlas_1", frames: [[1202,1410,420,578],[446,1410,754,337],[1624,1410,414,572],[1259,0,646,826],[0,663,444,580],[446,663,444,580],[892,828,444,580],[1338,828,444,580],[0,1245,444,580],[0,0,1257,661]]},
		{name:"Kim Egg Nest 1_atlas_2", frames: [[1998,50,26,2],[673,677,186,183],[1698,426,222,281],[1285,444,411,266],[1943,0,53,89],[1641,218,314,206],[1943,91,92,48],[1998,0,26,48],[860,0,441,346],[0,0,412,570],[414,0,444,472],[860,348,423,327],[1641,0,300,216],[1303,0,336,442],[2026,0,19,19],[0,572,671,143]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_25 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["Kim Egg Nest 1_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(img.CachedBmp_27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2892,2679);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3991,2228);


(lib.CachedBmp_26 = function() {
	this.initialize(img.CachedBmp_26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6125,4428);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6132,6244);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol86 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(5102.2,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_26();
	this.instance_1.setTransform(-2.6,2268.2,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_25();
	this.instance_2.setTransform(1103.4,1474.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.6,0,6550.8,4482.2);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(22.25,65.95,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_28();
	this.instance_1.setTransform(-2,-2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(-2,-2,229.8,289), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,336,442), null);


(lib.Scene_1_musk_woter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// musk_woter
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(1574.9,717.3,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(817).to({_off:false},0).wait(68));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_musk = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// musk
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(1278.4,697,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(885));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// background
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(-74,-31,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(886));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Wings = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Wings, new cjs.Rectangle(-0.5,-0.5,93,91.5), null);


(lib.lips2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(0,0,0.2115,0.2115);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lips2, new cjs.Rectangle(0,0,47,59.5), null);


(lib.leegs = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.leegs, new cjs.Rectangle(0,0,377,168.5), null);


(lib.eye1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-0.45,-0.45,0.4865,0.4865);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye1, new cjs.Rectangle(-0.4,-0.4,25.799999999999997,43.3), null);


(lib.body2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.body2, new cjs.Rectangle(-0.5,-0.5,323,413), null);


(lib.nest = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nest, new cjs.Rectangle(0,0,628.5,330.5), null);


(lib.eggbrok = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(14.4,115.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eggbrok, new cjs.Rectangle(14.4,115.7,12.999999999999998,23.999999999999986), null);


(lib.down = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.down, new cjs.Rectangle(0,0,220.5,173), null);


(lib._12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._12, new cjs.Rectangle(0,0,211.5,163.5), null);


(lib.dinoz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dinoz, new cjs.Rectangle(0,0,3066,3122), null);


(lib.tree = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tree, new cjs.Rectangle(0,0,150,108), null);


(lib.___Camera___ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-961,-541,1922,1082);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.dinoz();
	this.instance.setTransform(2848.65,1622.4,0.0164,0.0164,0,0.2136,-179.7864,1545.4,1599.9);

	this.instance_1 = new lib.Symbol86("synched",0);
	this.instance_1.setTransform(6545.6,4482.2,1,1,0,0,0,6545.6,4482.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-2.6,0,6550.8,4482.2), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.start = new lib.Symbol3();
	this.start.name = "start";
	this.start.setTransform(167.85,220.85,1.5125,1.5844,0,0,0,165.6,220.8);

	this.timeline.addTween(cjs.Tween.get(this.start).wait(1).to({regX:168,regY:221,rotation:-1.9974,x:171.55,y:221.05},0).wait(1).to({rotation:-3.9947,y:220.9},0).wait(1).to({rotation:-5.9921,x:171.5,y:220.85},0).wait(1).to({rotation:-7.9895,y:220.7},0).wait(1).to({rotation:-9.9868,y:220.55},0).wait(1).to({rotation:-11.9842,y:220.4},0).wait(1).to({rotation:-13.9815,x:171.45,y:220.3},0).wait(1).to({rotation:-15.9789,x:171.5,y:220.15},0).wait(1).to({rotation:-17.9763,x:171.4,y:220.05},0).wait(1).to({rotation:-19.9736,x:171.35,y:219.95},0).wait(1).to({rotation:-21.971,y:219.8},0).wait(1).to({rotation:-23.9684,y:219.65},0).wait(1).to({rotation:-25.9657,x:171.25,y:219.5},0).wait(1).to({rotation:-27.9631,y:219.35},0).wait(1).to({rotation:-26.0822,y:219.55},0).wait(1).to({rotation:-24.2013,x:171.3,y:219.65},0).wait(1).to({rotation:-22.3205,x:171.35,y:219.75},0).wait(1).to({rotation:-20.4396,x:171.4,y:219.85},0).wait(1).to({rotation:-18.5587,x:171.45,y:220.05},0).wait(1).to({rotation:-16.6778,y:220.15},0).wait(1).to({rotation:-14.797,x:171.4,y:220.25},0).wait(1).to({rotation:-12.9161,x:171.45,y:220.35},0).wait(1).to({rotation:-11.0352,x:171.5,y:220.5},0).wait(1).to({rotation:-9.1543,y:220.65},0).wait(1).to({rotation:-7.2735,x:171.55,y:220.75},0).wait(1).to({rotation:-5.3926,x:171.5,y:220.8},0).wait(1).to({rotation:-3.5117,y:220.95},0).wait(1).to({rotation:-1.6308,y:221.05},0).wait(1).to({rotation:0.25,y:221.2},0).wait(1).to({rotation:2.2498,y:221.3},0).wait(1).to({rotation:4.2496,y:221.5},0).wait(1).to({rotation:6.2494,y:221.55},0).wait(1).to({rotation:8.2492,x:171.4,y:221.7},0).wait(1).to({rotation:10.2491,x:171.45,y:221.8},0).wait(1).to({rotation:12.2489,x:171.35,y:221.95},0).wait(1).to({rotation:14.2487,x:171.3,y:222.1},0).wait(1).to({rotation:16.2485,y:222.15},0).wait(1).to({rotation:18.2483,x:171.2,y:222.3},0).wait(1).to({rotation:20.2481,x:171.15,y:222.4},0).wait(1).to({rotation:22.2479,y:222.55},0).wait(1).to({rotation:24.2477,x:171.05,y:222.65},0).wait(1).to({rotation:26.2475,x:171,y:222.8},0).wait(1).to({rotation:28.2473,x:170.95,y:222.85},0).wait(1).to({rotation:30.2471,x:170.85,y:223},0).wait(1).to({rotation:28.1042,x:170.95,y:222.85},0).wait(1).to({rotation:25.9613,x:171,y:222.75},0).wait(1).to({rotation:23.8184,x:171.05,y:222.65},0).wait(1).to({rotation:21.6755,x:171.15,y:222.5},0).wait(1).to({rotation:19.5326,x:171.2,y:222.35},0).wait(1).to({rotation:17.3897,x:171.25,y:222.25},0).wait(1).to({rotation:15.2468,y:222.1},0).wait(1).to({rotation:13.1039,x:171.35,y:222},0).wait(1).to({rotation:10.961,x:171.4,y:221.85},0).wait(1).to({rotation:8.8181,x:171.45,y:221.7},0).wait(1).to({rotation:6.6752,x:171.5,y:221.65},0).wait(1).to({rotation:4.5323,y:221.5},0).wait(1).to({rotation:2.3894,x:171.55,y:221.35},0).wait(1).to({rotation:0.2465,y:221.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-224.9,-208.9,791.6999999999999,862.5);


(lib.startOver = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol5();
	this.instance.setTransform(103.1,142.6,1,1,0,0,0,103.1,142.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:112.9,regY:142.5,rotation:-1.9625,x:112.95,y:142.15},0).wait(1).to({rotation:-3.925,x:112.9,y:141.75},0).wait(1).to({rotation:-5.8876,x:112.85,y:141.45},0).wait(1).to({rotation:-7.8501,x:112.8,y:141.15},0).wait(1).to({rotation:-9.8126,y:140.8},0).wait(1).to({rotation:-11.7751,x:112.7,y:140.45},0).wait(1).to({rotation:-13.7376,x:112.6,y:140.15},0).wait(1).to({rotation:-15.7002,x:112.55,y:139.85},0).wait(1).to({rotation:-17.6627,x:112.45,y:139.55},0).wait(1).to({rotation:-19.6252,x:112.3,y:139.2},0).wait(1).to({rotation:-21.5877,x:112.25,y:138.85},0).wait(1).to({rotation:-23.5503,x:112.1,y:138.6},0).wait(1).to({rotation:-25.5128,x:111.95,y:138.25},0).wait(1).to({rotation:-27.4753,x:111.75,y:138},0).wait(1).to({rotation:-25.796,x:111.9,y:138.2},0).wait(1).to({rotation:-24.1167,x:112,y:138.45},0).wait(1).to({rotation:-22.4374,x:112.15,y:138.7},0).wait(1).to({rotation:-20.7581,x:112.25,y:139},0).wait(1).to({rotation:-19.0788,x:112.4,y:139.25},0).wait(1).to({rotation:-17.3995,x:112.45,y:139.6},0).wait(1).to({rotation:-15.7202,x:112.55,y:139.8},0).wait(1).to({rotation:-14.0409,x:112.6,y:140.1},0).wait(1).to({rotation:-12.3616,x:112.7,y:140.4},0).wait(1).to({rotation:-10.6823,x:112.75,y:140.65},0).wait(1).to({rotation:-9.003,x:112.8,y:140.95},0).wait(1).to({rotation:-7.3237,x:112.85,y:141.25},0).wait(1).to({rotation:-5.6445,y:141.5},0).wait(1).to({rotation:-3.9652,x:112.9,y:141.8},0).wait(1).to({rotation:-2.2859,y:142.1},0).wait(1).to({rotation:0.1115,x:112.85,y:142.5},0).wait(1).to({rotation:2.5089,y:142.95},0).wait(1).to({rotation:4.9062,y:143.4},0).wait(1).to({rotation:7.3036,y:143.8},0).wait(1).to({rotation:9.7009,x:112.8,y:144.15},0).wait(1).to({rotation:12.0983,x:112.7,y:144.6},0).wait(1).to({rotation:14.4956,x:112.6,y:144.95},0).wait(1).to({rotation:16.893,x:112.5,y:145.35},0).wait(1).to({rotation:19.2904,x:112.3,y:145.75},0).wait(1).to({rotation:21.6877,x:112.2,y:146.1},0).wait(1).to({rotation:24.0851,x:112.05,y:146.5},0).wait(1).to({rotation:26.4824,x:111.9,y:146.9},0).wait(1).to({rotation:28.8798,x:111.7,y:147.3},0).wait(1).to({rotation:31.2771,x:111.5,y:147.6},0).wait(1).to({rotation:33.6745,x:111.3,y:148},0).wait(1).to({rotation:30.7914,x:111.55,y:147.55},0).wait(1).to({rotation:27.9084,x:111.75,y:147.1},0).wait(1).to({rotation:25.0253,x:112,y:146.65},0).wait(1).to({rotation:22.1423,x:112.2,y:146.25},0).wait(1).to({rotation:19.2592,x:112.4,y:145.75},0).wait(1).to({rotation:16.3761,x:112.45,y:145.3},0).wait(1).to({rotation:13.4931,x:112.65,y:144.8},0).wait(1).to({rotation:10.61,x:112.7,y:144.35},0).wait(1).to({rotation:7.7269,x:112.8,y:143.85},0).wait(1).to({rotation:4.8439,x:112.85,y:143.4},0).wait(1).to({rotation:1.9608,x:112.9,y:142.85},0).wait(1).to({rotation:-0.9222,x:112.95,y:142.35},0).wait(1).to({rotation:-3.8053,x:112.9,y:141.85},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.4,-35.9,335,356.9);


(lib.Scene_1_moov = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// moov
	this.instance = new lib.down();
	this.instance.setTransform(1416.55,327.5,0.1681,0.1681,-14.975,0,0,110.8,90);

	this.instance_1 = new lib.tree();
	this.instance_1.setTransform(1409.6,375.25,0.8007,0.9065,20.9351,0,0,75,54.3);

	this.instance_2 = new lib.nest();
	this.instance_2.setTransform(1409.6,349.75,0.1549,0.1549,0,0,0,314.1,165.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},735).wait(150));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_legg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// legg
	this.instance = new lib.leegs();
	this.instance.setTransform(1423.7,350.95,0.0496,0.111,0,-29.6101,-29.2962,231.5,143.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(576).to({_off:false},0).wait(12).to({regX:232.2,regY:144.6,scaleX:0.0232,scaleY:0.0519,skewX:-29.6008,skewY:-29.2673,x:1419.15,y:345.55},0).wait(2).to({regX:235.6,regY:152.4,scaleX:0.0469,scaleY:0.0887,skewX:-22.0358,skewY:-21.6285,x:1421.4,y:350.4},0).wait(1).to({regX:188.7,regY:85.3,scaleX:0.0273,scaleY:0.0525,rotation:-30.0011,skewX:0,skewY:0,x:1418.15,y:343.8},0).wait(1).to({regX:231.3,regY:105.4,scaleX:0.027,scaleY:0.0522,rotation:0,x:1415.75,y:344.75},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Layer_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Symbol4();
	this.instance.setTransform(1988.85,1335.75,1,1,0,0,0,3275.2,2241);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(817).to({_off:false},0).wait(1).to({regX:3272.8,regY:2241.1,x:1984.35,y:1332.9},0).wait(1).to({x:1982.25,y:1329.95},0).wait(1).to({x:1980.15,y:1327},0).wait(1).to({x:1978.05,y:1324},0).wait(1).to({x:1975.95,y:1321.05},0).wait(1).to({x:1973.85,y:1318.1},0).wait(1).to({x:1971.75,y:1315.15},0).wait(1).to({x:1969.65,y:1312.15},0).wait(1).to({x:1967.55,y:1309.2},0).wait(1).to({x:1965.45,y:1306.25},0).wait(1).to({x:1963.35,y:1303.3},0).wait(1).to({x:1961.2,y:1300.3},0).wait(1).to({x:1956.7,y:1301.15},0).wait(1).to({x:1952.15,y:1302},0).wait(1).to({x:1947.65,y:1302.8},0).wait(1).to({x:1943.1,y:1303.65},0).wait(1).to({x:1938.6,y:1304.45},0).wait(1).to({x:1934.05,y:1305.3},0).wait(1).to({x:1929.55,y:1306.1},0).wait(1).to({x:1925,y:1306.95},0).wait(1).to({x:1920.45,y:1307.75},0).wait(1).to({x:1918.7,y:1308.6},0).wait(1).to({x:1916.95,y:1309.45},0).wait(1).to({x:1915.2,y:1310.25},0).wait(1).to({x:1913.45,y:1311.1},0).wait(1).to({x:1911.7,y:1311.95},0).wait(1).to({x:1909.95,y:1312.75},0).wait(1).to({x:1908.2,y:1313.6},0).wait(1).to({x:1906.45,y:1314.4},0).wait(1).to({x:1902.3,y:1313.9},0).wait(1).to({x:1898.15,y:1313.4},0).wait(1).to({x:1893.95,y:1312.9},0).wait(1).to({x:1889.8,y:1312.4},0).wait(1).to({x:1885.65,y:1311.9},0).wait(1).to({x:1881.45,y:1311.4},0).wait(1).to({x:1877.3,y:1310.9},0).wait(1).to({x:1873.15,y:1310.4},0).wait(1).to({x:1868.95,y:1309.85},0).wait(1).to({x:1865.2,y:1310.95},0).wait(1).to({x:1861.4,y:1312},0).wait(1).to({x:1857.6,y:1313.05},0).wait(1).to({x:1853.85,y:1314.1},0).wait(1).to({x:1850.05,y:1315.15},0).wait(1).to({x:1846.25,y:1316.2},0).wait(1).to({x:1842.5,y:1317.25},0).wait(1).to({x:1838.7,y:1318.3},0).wait(1).to({x:1834.9,y:1319.35},0).wait(1).to({x:1830.8,y:1320.75},0).wait(1).to({x:1826.7,y:1322.1},0).wait(1).to({x:1822.6,y:1323.5},0).wait(1).to({x:1818.5,y:1324.85},0).wait(1).to({x:1814.4,y:1326.25},0).wait(1).to({x:1810.3,y:1327.6},0).wait(1).to({x:1806.15,y:1328.95},0).wait(1).to({x:1785.8,y:1328},0).wait(1).to({x:1765.4,y:1327},0).wait(1).to({x:1745.05,y:1326},0).wait(1).to({x:1724.65,y:1325.05},0).wait(1).to({x:1704.3,y:1324.05},0).wait(1).to({x:1683.9,y:1323.05},0).wait(1).to({x:1663.5,y:1322.05},0).wait(1).to({y:1319.25},0).wait(1).to({y:1316.4},0).wait(1).to({x:1659.9,y:1320.8},0).wait(1).to({x:1656.25,y:1325.2},0).wait(1).to({x:1651.85,y:1322.4},0).wait(1).to({x:1647.4,y:1319.55},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_egg_dwon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// egg_dwon
	this.instance = new lib.down();
	this.instance.setTransform(1396.35,341.25,0.1418,0.1418,0,0,0,110.4,86.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(489).to({_off:false},0).wait(396));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// background
	this.start = new lib.Symbol2();
	this.start.name = "start";
	this.start.setTransform(994.95,500.8,1,1,0,0,0,168,221);

	this.replay = new lib.startOver();
	this.replay.name = "replay";
	this.replay.setTransform(1278.15,629.55,0.8302,0.8303,-5.4913,0,0,103.2,143.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},2).to({state:[{t:this.replay}]},883).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.eye = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eye1();
	this.instance.setTransform(27.95,-449.8);

	this.instance_1 = new lib.eye1();
	this.instance_1.setTransform(-46.15,-429.55,1,1,0,0,0,12.5,21.2);

	this.instance_2 = new lib.CachedBmp_20();
	this.instance_2.setTransform(-76.45,-506.95,0.4865,0.4865);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye, new cjs.Rectangle(-76.4,-506.9,152.7,100.19999999999999), null);


(lib.all = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eye();
	this.instance.setTransform(304.05,-70.75,1.0277,1,0,0,-13.3248,0,-456.9);

	this.instance_1 = new lib.Wings();
	this.instance_1.setTransform(127.35,16.15,1,1,90,0,0,46,45.3);

	this.instance_2 = new lib.lips2();
	this.instance_2.setTransform(323.8,64.15,2.3634,1.266,0,0,0,23.6,29.8);

	this.instance_3 = new lib.body2();
	this.instance_3.setTransform(305.05,42.15,1,1,0,0,0,161,206);

	this.instance_4 = new lib.Wings();
	this.instance_4.setTransform(495.05,35.15,1,1,0,0,0,46,45.2);

	this.instance_5 = new lib.leegs();
	this.instance_5.setTransform(298,269.2,0.5599,0.7625,0,0,0,188.5,84.2);

	this.instance_6 = new lib.CachedBmp_18();
	this.instance_6.setTransform(107.6,30.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.all, new cjs.Rectangle(81.7,-164.3,459.90000000000003,497.8), null);


(lib.egg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.eggbrok();
	this.instance_1.setTransform(100.35,165.3,1,1,0,0,0,105.8,165.3);

	this.instance_2 = new lib.CachedBmp_16();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.egg1, new cjs.Rectangle(-0.5,-0.5,207,286), null);


(lib.eggpink = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.egg1();
	this.instance.setTransform(103.1,142.6,1,1,0,0,0,103.1,142.6);
	this.instance.filters = [new cjs.ColorFilter(0.64, 0.64, 0.64, 1, 91.8, 91.8, 91.8, 0)];
	this.instance.cache(-2,-2,211,290);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eggpink, new cjs.Rectangle(-0.5,-0.5,207,286), null);


(lib.egg2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.egg1();
	this.instance.setTransform(103.1,142.6,1,1,0,0,0,103.1,142.6);
	this.instance.filters = [new cjs.ColorFilter(0.64, 0.64, 0.64, 1, 91.8, 91.8, 91.8, 0)];
	this.instance.cache(-2,-2,211,290);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.egg2, new cjs.Rectangle(-0.5,-0.5,207,286), null);


(lib.bigholeegg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_9();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_10();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_11();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.down();
	this.instance_5.setTransform(-0.05,122.7);

	this.instance_6 = new lib.CachedBmp_12();
	this.instance_6.setTransform(-0.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},41).to({state:[{t:this.instance_2}]},30).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_4}]},9).to({state:[{t:this.instance_6},{t:this.instance_5}]},5).wait(146));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,222,295.7);


(lib.appegg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._12();
	this.instance.setTransform(105.8,81.7,1,1,0,0,0,105.8,81.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.appegg, new cjs.Rectangle(0,0,211.5,163.5), null);


(lib.Scene_1_fledgling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// fledgling
	this.instance = new lib.lips2();
	this.instance.setTransform(1392.25,333.05,0.1322,0.0942,0,0,0,23.4,29.8);

	this.instance_1 = new lib.all();
	this.instance_1.setTransform(1392.3,332.15,0.0356,0.0356,0,0,0,240.3,250.1);

	this.instance_2 = new lib.all();
	this.instance_2.setTransform(1381.1,330.6,0.0799,0.0966,0,0,0,240.8,252.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1,p:{x:1392.3,y:332.15,regX:240.3,regY:250.1,scaleX:0.0356,scaleY:0.0356,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:23.4,regY:29.8,scaleX:0.1322,rotation:0,x:1392.25,y:333.05,scaleY:0.0942,skewX:0,skewY:0}}]},449).to({state:[{t:this.instance_1,p:{x:1391.65,y:334.35,regX:240.3,regY:250.1,scaleX:0.0356,scaleY:0.0356,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:24.1,regY:29.9,scaleX:0.1257,rotation:15.0002,x:1392.7,y:332.1,scaleY:0.0942,skewX:0,skewY:0}}]},13).to({state:[{t:this.instance_1,p:{x:1395.35,y:344.7,regX:242,regY:251.7,scaleX:0.0558,scaleY:0.0665,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:24.2,regY:31.6,scaleX:0.1532,rotation:-14.9972,x:1397,y:330.45,scaleY:0.1002,skewX:0,skewY:0}}]},9).to({state:[{t:this.instance_1,p:{x:1395.05,y:342.05,regX:241,regY:250.8,scaleX:0.0596,scaleY:0.0712,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:24.9,regY:32.5,scaleX:0.1903,rotation:0,x:1398.35,y:327.25,scaleY:0.2321,skewX:0,skewY:0}}]},15).to({state:[{t:this.instance_1,p:{x:1393.55,y:339.05,regX:241,regY:250.8,scaleX:0.0596,scaleY:0.0712,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:24.9,regY:32.5,scaleX:0.1903,rotation:0,x:1398.35,y:327.25,scaleY:0.2321,skewX:0,skewY:0}}]},1).to({state:[{t:this.instance_1,p:{x:1392.5,y:342,regX:241.3,regY:250.8,scaleX:0.0744,scaleY:0.0889,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.1,regY:32.6,scaleX:0.2377,rotation:0,x:1398.5,y:327.25,scaleY:0.29,skewX:0,skewY:0}}]},8).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:241.2,regY:252.2,scaleX:0.0709,scaleY:0.0856,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2934,rotation:0,x:1394.9,y:320.2,scaleY:0.2085,skewX:0,skewY:0}}]},3).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2934,rotation:0,x:1397.1,y:317.45,scaleY:0.2085,skewX:0,skewY:0}}]},3).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.1928,rotation:0,x:1396.15,y:317.45,scaleY:0.2085,skewX:0,skewY:0}}]},1).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2949,rotation:0,x:1395.55,y:317.45,scaleY:0.2085,skewX:0,skewY:0}}]},1).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.3,scaleX:0.2949,rotation:0,x:1395.55,y:317.5,scaleY:0.2764,skewX:0,skewY:0}}]},1).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2949,rotation:0,x:1395.55,y:317.45,scaleY:0.2085,skewX:0,skewY:0}}]},1).to({state:[{t:this.instance_1,p:{x:1381.1,y:330.6,regX:240.8,regY:252.6,scaleX:0.0799,scaleY:0.0966,rotation:0,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085,skewX:0,skewY:0}}]},7).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,y:330.6,x:1381.1,scaleY:0.0966,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1419.8,y:334,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},4).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,y:330.6,x:1381.1,scaleY:0.0966,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1419.8,y:338.55,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},10).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,y:330.6,x:1381.1,scaleY:0.0966,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},2).to({state:[{t:this.instance_2,p:{regX:241.3,regY:252.8,rotation:-14.9891,y:330.5,x:1381.1,scaleY:0.0966,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9814,x:1384.65,y:311.15,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},3).to({state:[{t:this.instance_2,p:{regX:241.7,regY:252.8,rotation:4.4772,y:329.05,x:1375.35,scaleY:0.0966,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.2,scaleX:0.2948,rotation:4.4853,x:1385.1,y:311.95,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},3).to({state:[{t:this.instance_2,p:{regX:242.1,regY:252.8,rotation:-4.5147,y:329.85,x:1377.85,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:26,regY:34.5,scaleX:0.2947,rotation:-4.511,x:1384.8,y:311.5,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},5).to({state:[{t:this.instance_2,p:{regX:307.8,regY:306.9,rotation:0,y:329.85,x:1377.8,scaleY:0.095,scaleX:0.0783,skewX:-3.7032,skewY:-3.529}},{t:this.instance,p:{regX:41.2,regY:59.1,scaleX:0.2932,rotation:0,x:1384.8,y:311.5,scaleY:0.2068,skewX:-4.1422,skewY:-4.2535}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},7).to({state:[{t:this.instance_2,p:{regX:337.7,regY:330.5,rotation:0,y:331.85,x:1388.6,scaleY:0.0943,scaleX:0.0777,skewX:-3.3398,skewY:-3.0862}},{t:this.instance,p:{regX:48,regY:70.1,scaleX:0.2925,rotation:0,x:1395.6,y:313.5,scaleY:0.2061,skewX:-3.9774,skewY:-4.1376}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0,skewX:0,skewY:0}}]},7).to({state:[{t:this.instance_2,p:{regX:241.2,regY:253.4,rotation:-14.9915,y:330.5,x:1381.05,scaleY:0.0966,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.6,scaleX:0.2948,rotation:-14.9884,x:1385.4,y:312.65,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1407.35,y:338.75,regX:241.5,regY:253.8,scaleX:0.0799,scaleY:0.0966,rotation:0,skewX:0,skewY:0}}]},22).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,y:327.7,x:1380.9,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1406.65,y:341.8,regX:267.3,regY:272.9,scaleX:0.0793,scaleY:0.096,rotation:-1.4396,skewX:0,skewY:0}}]},20).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,y:327.7,x:1380.9,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1406.5,y:334.3,regX:267.4,regY:273.4,scaleX:0.0793,scaleY:0.0959,rotation:-1.4307,skewX:0,skewY:0}}]},2).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,y:327.7,x:1380.9,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1406.45,y:331.3,regX:267.4,regY:273.9,scaleX:0.0793,scaleY:0.0959,rotation:-1.4218,skewX:0,skewY:0}}]},1).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,y:327.7,x:1380.9,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1406.5,y:326.4,regX:267.8,regY:274.9,scaleX:0.0792,scaleY:0.0959,rotation:7.2946,skewX:0,skewY:0}}]},4).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,y:327.7,x:1380.9,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1398,y:322.55,regX:267.9,regY:275.5,scaleX:0.0792,scaleY:0.0959,rotation:7.2867,skewX:0,skewY:0}}]},7).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,y:327.8,x:1374.25,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1398,y:322.45,regX:268.3,regY:275.7,scaleX:0.0792,scaleY:0.0959,rotation:-7.7019,skewX:0,skewY:0}}]},5).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,y:327.8,x:1374.25,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1397.9,y:322.4,regX:268.8,regY:276,scaleX:0.0792,scaleY:0.0959,rotation:7.2891,skewX:0,skewY:0}}]},7).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,y:327.8,x:1374.25,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1397.8,y:322.3,regX:268.9,regY:276.9,scaleX:0.0792,scaleY:0.0958,rotation:-7.7044,skewX:0,skewY:0}}]},10).to({state:[{t:this.instance_2,p:{regX:241.5,regY:256.1,rotation:-20.9985,y:330.85,x:1377.2,scaleY:0.0964,scaleX:0.0798,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.8,regY:34.3,scaleX:0.2947,rotation:-29.9807,x:1379.3,y:311.85,scaleY:0.2083,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1404.2,y:322.25,regX:283.9,regY:291.2,scaleX:0.0787,scaleY:0.0954,rotation:0,skewX:-7.5159,skewY:-7.4596}}]},7).to({state:[{t:this.instance_2,p:{regX:241.6,regY:255.3,rotation:1.7129,y:327.05,x:1371.9,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:26,regY:34.2,scaleX:0.2948,rotation:-7.2567,x:1381.2,y:310.35,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1409.85,y:322.25,regX:283.9,regY:291.8,scaleX:0.0787,scaleY:0.0954,rotation:0,skewX:-7.5081,skewY:-7.4501}}]},10).to({state:[{t:this.instance_2,p:{regX:242.2,regY:255,rotation:-15.4649,y:328.2,x:1377,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.3,scaleX:0.2948,rotation:-24.4443,x:1380.9,y:309.5,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1409.8,y:322.2,regX:284.5,regY:292,scaleX:0.0787,scaleY:0.0954,rotation:0,skewX:0.7057,skewY:0.7664}}]},13).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,y:327.8,x:1374.25,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1407.25,y:318,regX:284.6,regY:292.6,scaleX:0.0787,scaleY:0.0954,rotation:0,skewX:0.6967,skewY:0.7555}}]},13).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,y:327.8,x:1374.25,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1407.1,y:320.6,regX:285.2,regY:293.4,scaleX:0.0787,scaleY:0.0953,rotation:0,skewX:-4.2679,skewY:-4.2052}}]},20).to({state:[{t:this.instance_2,p:{regX:241.4,regY:254.8,rotation:-14.4428,y:328.1,x:1376.65,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.2,scaleX:0.2948,rotation:-23.4151,x:1380.95,y:309.5,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1407.05,y:320.5,regX:285.6,regY:293.8,scaleX:0.0786,scaleY:0.0953,rotation:0,skewX:-19.2615,skewY:-19.2014}}]},18).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,y:327.8,x:1374.25,scaleY:0.0965,scaleX:0.0799,skewX:0,skewY:0}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1406.9,y:320.45,regX:285.2,regY:293.9,scaleX:0.0786,scaleY:0.0953,rotation:0,skewX:-4.2594,skewY:-4.1957}}]},18).to({state:[{t:this.instance_2,p:{regX:251.9,regY:264.8,rotation:-5.8715,y:327.8,x:1378.9,scaleY:0.0962,scaleX:0.0796,skewX:0,skewY:0}},{t:this.instance,p:{regX:27.8,regY:39.1,scaleX:0.2945,rotation:-14.932,x:1385.85,y:310,scaleY:0.2081,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1410.1,y:320.65,regX:285.3,regY:295.2,scaleX:0.0786,scaleY:0.0953,rotation:0,skewX:-0.2569,skewY:-0.1891}}]},12).to({state:[{t:this.instance_2,p:{regX:251.9,regY:264.8,rotation:-5.8715,y:327.8,x:1378.9,scaleY:0.0962,scaleX:0.0796,skewX:0,skewY:0}},{t:this.instance,p:{regX:27.8,regY:39.1,scaleX:0.2945,rotation:-14.932,x:1385.85,y:310,scaleY:0.2081,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1410.05,y:320.55,regX:285.2,regY:295.9,scaleX:0.0786,scaleY:0.0953,rotation:0,skewX:3.7005,skewY:3.763}}]},15).to({state:[{t:this.instance_2,p:{regX:251.8,regY:265.7,rotation:-12.0979,y:326.55,x:1381.4,scaleY:0.0962,scaleX:0.0796,skewX:0,skewY:0}},{t:this.instance,p:{regX:27.8,regY:39.5,scaleX:0.2944,rotation:-21.1694,x:1386.4,y:308.1,scaleY:0.2081,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1411.75,y:315.25,regX:285.3,regY:296.9,scaleX:0.0785,scaleY:0.0952,rotation:0,skewX:-11.0111,skewY:-10.941}}]},15).to({state:[{t:this.instance_2,p:{regX:251.8,regY:267.9,rotation:-24.2904,y:328.1,x:1389.25,scaleY:0.0961,scaleX:0.0795,skewX:0,skewY:0}},{t:this.instance,p:{regX:27.8,regY:40.4,scaleX:0.2943,rotation:-33.3718,x:1390.25,y:309,scaleY:0.208,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1416.25,y:313.85,regX:285.9,regY:298.2,scaleX:0.0785,scaleY:0.0952,rotation:0,skewX:-8.985,skewY:-8.9147}}]},11).to({state:[{t:this.instance_2,p:{regX:252,regY:267.6,rotation:-18.2998,y:327.05,x:1386.9,scaleY:0.0961,scaleX:0.0795,skewX:0,skewY:0}},{t:this.instance,p:{regX:27.8,regY:40.1,scaleX:0.2944,rotation:-27.3828,x:1389.85,y:308.2,scaleY:0.208,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1415.2,y:315.75,regX:285.4,regY:298.2,scaleX:0.0785,scaleY:0.0952,rotation:0,skewX:-2.9959,skewY:-2.9308}}]},48).to({state:[{t:this.instance_2,p:{regX:252,regY:267.6,rotation:-18.2998,y:327.05,x:1386.9,scaleY:0.0961,scaleX:0.0795,skewX:0,skewY:0}},{t:this.instance,p:{regX:27.8,regY:40.1,scaleX:0.2944,rotation:-27.3828,x:1389.85,y:308.2,scaleY:0.208,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1414.9,y:311.45,regX:285.4,regY:298.8,scaleX:0.0785,scaleY:0.0952,rotation:0,skewX:-2.9872,skewY:-2.9203}}]},12).to({state:[{t:this.instance_2,p:{regX:252.2,regY:268.2,rotation:-3.2949,y:326.8,x:1382.1,scaleY:0.0961,scaleX:0.0795,skewX:0,skewY:0}},{t:this.instance,p:{regX:28,regY:40.5,scaleX:0.2943,rotation:-12.3843,x:1389.85,y:309.35,scaleY:0.208,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1414.9,y:311.45,regX:285.4,regY:298.8,scaleX:0.0785,scaleY:0.0952,rotation:0,skewX:-2.9872,skewY:-2.9203}}]},10).to({state:[{t:this.instance_2,p:{regX:252.6,regY:268.4,rotation:-18.2882,y:327.05,x:1386.8,scaleY:0.0961,scaleX:0.0795,skewX:0,skewY:0}},{t:this.instance,p:{regX:28.2,regY:40.7,scaleX:0.2943,rotation:-27.383,x:1389.8,y:308.15,scaleY:0.2079,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1414.3,y:315.4,regX:285.6,regY:299.8,scaleX:0.0784,scaleY:0.0951,rotation:0,skewX:-2.9698,skewY:-2.8991}}]},5).to({state:[{t:this.instance_2,p:{regX:257,regY:274.6,rotation:-18.2361,y:324.8,x:1386.8,scaleY:0.0959,scaleX:0.0793,skewX:0,skewY:0}},{t:this.instance,p:{regX:28.9,regY:43.6,scaleX:0.2941,rotation:-27.3668,x:1389.8,y:305.9,scaleY:0.2078,skewX:0,skewY:0}},{t:this.instance_1,p:{x:1414.3,y:313.15,regX:292.1,regY:304.9,scaleX:0.0783,scaleY:0.095,rotation:0,skewX:-2.8914,skewY:-2.8039}}]},10).wait(17));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eggs = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// eggs
	this.instance = new lib.tree();
	this.instance.setTransform(1401.75,348.75,1,1,0,0,0,75,54.1);

	this.instance_1 = new lib.nest();
	this.instance_1.setTransform(1409.6,349.75,0.1549,0.1549,0,0,0,314.1,165.3);

	this.instance_2 = new lib.egg1();
	this.instance_2.setTransform(1389.85,336.55,0.1633,0.1633,0,0,0,57.9,142.7);

	this.instance_3 = new lib.egg2();
	this.instance_3.setTransform(1428.4,334.35,0.1393,0.1393,0,0,0,103,142.6);

	this.instance_4 = new lib.egg1();
	this.instance_4.setTransform(1414,321.35,0.1633,0.1633,0,0,0,57.9,142.7);

	this.instance_5 = new lib.bigholeegg();
	this.instance_5.setTransform(1391.9,329.6,0.1631,0.1631,-6.5095,0,0,58.6,143.3);

	this.instance_6 = new lib.down();
	this.instance_6.setTransform(1398.45,341.25,0.1418,0.1418,0,0,0,110.4,86.4);

	this.instance_7 = new lib.appegg();
	this.instance_7.setTransform(1398.95,323.8,0.1534,0.1534,0,0,0,105.7,82.2);

	this.instance_8 = new lib.eggpink();
	this.instance_8.setTransform(1428.25,334.25,0.1392,0.1392,22.4942,0,0,103.4,142.7);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance,p:{regY:54.1,scaleX:1,scaleY:1,rotation:0,x:1401.75,y:348.75,regX:75}}]},1).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:20.9355,x:1400.7,y:339.2,regX:75}}]},120).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:20.9355,x:1400.7,y:339.2,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:5.9349,x:1400.7,y:339.15,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:20.9341,x:1400.75,y:339.15,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9065,rotation:35.9332,x:1400.7,y:339.15,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9065,rotation:35.9332,x:1409.45,y:349.75,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9065,rotation:5.9332,x:1409.5,y:349.65,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9321,x:1409.6,y:349.8,regX:75.2}}]},7).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:349.8,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:355.75,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1418.9,y:355.75,regX:75.2}}]},7).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:355.75,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:358.3,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:360,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:362.55,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:365.1,regX:75.2}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:368.5,regX:75.2}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1412.1,y:371.05,regX:75.2}}]},6).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1412.1,y:372.75,regX:75.2}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.2,regY:142.9,rotation:14.9959,x:1389.9,y:336.6,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},22).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.5,regY:143.8,rotation:-14.9959,x:1389.95,y:336.65,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},43).to({state:[{t:this.instance_4,p:{regX:57.8,regY:142.9,rotation:-14.9959,y:321.3}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.5,regY:143.8,rotation:-14.9959,x:1389.95,y:336.65,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},15).to({state:[{t:this.instance_4,p:{regX:57.9,regY:143,rotation:0,y:321.3}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.5,regY:143.8,rotation:-14.9959,x:1389.95,y:336.65,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},21).to({state:[{t:this.instance_4,p:{regX:58,regY:143,rotation:14.9959,y:321.3}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.8,regY:144,rotation:0,x:1389.95,y:336.65,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_4,p:{regX:58,regY:143,rotation:14.9959,y:321.3}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:59,regY:144.3,rotation:14.9987,x:1389.95,y:336.7,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:58,regY:143,rotation:14.9959,y:321.3}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:59,regY:144.3,rotation:14.9987,x:1389.95,y:332.45,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},18).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.5,scaleX:0.8006,scaleY:0.9064,rotation:20.9332,x:1409.85,y:377.95,regX:75.4}}]},23).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:57.9,regY:142.8,rotation:-7.2213,x:1389.85,y:336.5,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},18).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.2,regY:143.1,rotation:8.4998,x:1389.65,y:336.4,scaleX:0.1632,scaleY:0.1632}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},13).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.5,regY:143,rotation:23.4919,x:1389.65,y:336.35,scaleX:0.1632,scaleY:0.1632}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_2,p:{regX:58.5,regY:143.3,rotation:-21.5088,x:1389.5,y:336.3,scaleX:0.1631,scaleY:0.1631}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1414,y:321.35,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_5},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},5).to({state:[{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1414,y:321.35,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_7,p:{x:1398.95,y:323.8,regX:105.7,regY:82.2,scaleX:0.1534,scaleY:0.1534,rotation:0}},{t:this.instance_6,p:{regX:110.4,regY:86.4,scaleX:0.1418,scaleY:0.1418,rotation:0,x:1398.45,y:341.25}}]},3).to({state:[{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1414,y:321.35,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_7,p:{x:1399,y:320.45,regX:105.7,regY:82.2,scaleX:0.1534,scaleY:0.1534,rotation:0}},{t:this.instance_6,p:{regX:110.4,regY:86.4,scaleX:0.1418,scaleY:0.1418,rotation:0,x:1398.45,y:341.25}}]},1).to({state:[{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1414,y:321.35,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.4,regY:86.4,scaleX:0.1418,scaleY:0.1418,rotation:0,x:1398.45,y:341.25}},{t:this.instance_7,p:{x:1396.55,y:314.5,regX:105.8,regY:82.7,scaleX:0.1533,scaleY:0.1533,rotation:-14.9946}}]},1).to({state:[{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1414,y:321.35,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},1).to({state:[{t:this.instance_2,p:{regX:57.9,regY:142.7,rotation:0,x:1414,y:321.35,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},27).to({state:[{t:this.instance_2,p:{regX:57.8,regY:142.9,rotation:-14.9907,x:1413.95,y:321.25,scaleX:0.1633,scaleY:0.1633}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},6).to({state:[{t:this.instance_2,p:{regX:57.6,regY:143.1,rotation:18.9786,x:1413.85,y:321.2,scaleX:0.1632,scaleY:0.1632}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},5).to({state:[{t:this.instance_2,p:{regX:57.9,regY:143.6,rotation:-11.0126,x:1413.8,y:321.2,scaleX:0.1632,scaleY:0.1632}},{t:this.instance_3,p:{regX:103,regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_2,p:{regX:57.9,regY:143.9,rotation:-11.0084,x:1410.65,y:320.95,scaleX:0.1632,scaleY:0.1632}},{t:this.instance_3,p:{regX:103.4,regY:142.7,scaleX:0.1392,scaleY:0.1392,rotation:22.4942,x:1428.25,y:334.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_2,p:{regX:58,regY:144.1,rotation:3.9791,x:1413.7,y:321.15,scaleX:0.1632,scaleY:0.1632}},{t:this.instance_3,p:{regX:103,regY:142.8,scaleX:0.1392,scaleY:0.1392,rotation:-14.9897,x:1428.35,y:334.3}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},15).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},20).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},50).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},4).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},11).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},25).to({state:[{t:this.instance_3,p:{regX:104.4,regY:143.6,scaleX:0.139,scaleY:0.139,rotation:-7.5041,x:1427.35,y:330.75}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},6).to({state:[{t:this.instance_3,p:{regX:104.5,regY:144.3,scaleX:0.139,scaleY:0.139,rotation:2.2084,x:1427.2,y:325.05}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},21).to({state:[{t:this.instance_3,p:{regX:104.6,regY:144.7,scaleX:0.139,scaleY:0.139,rotation:2.2024,x:1433.7,y:321.85}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},15).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},19).to({state:[{t:this.instance_8},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},5).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(576).to({_off:false},0).wait(50).to({regX:103.6,regY:142.9,rotation:7.4975,y:334.2},0).wait(4).to({regX:103.9,scaleX:0.1391,scaleY:0.1391,rotation:22.4898,x:1428.2,y:334.1},0).wait(11).to({regX:104.4,regY:143.2,rotation:37.4758,x:1427.5,y:330.8},0).wait(25).to({rotation:22.482,x:1427.45,y:330.7},0).to({_off:true},6).wait(55).to({_off:false,regX:104.9,regY:145.3,scaleX:0.1872,scaleY:0.1872,rotation:9.1821,x:1433.55,y:321.9},0).wait(5).to({regX:105,rotation:-20.8162,x:1429.15,y:322.45},0).wait(3).to({regX:99.2,regY:136,rotation:-20.8135,x:1429.2,y:322.5},0).wait(1).to({regX:103,regY:142.5,rotation:-5.816,x:1431.05,y:322.35},0).wait(1).to({rotation:9.1842,x:1431.8,y:321.3},0).wait(1).to({rotation:11.3271,x:1432.75,y:320},0).wait(1).to({rotation:13.4699,x:1433.8,y:318.75},0).wait(1).to({rotation:15.6127,x:1434.7,y:317.5},0).wait(1).to({rotation:17.7556,x:1435.7,y:316.25},0).wait(1).to({rotation:19.8984,x:1436.75,y:315},0).wait(1).to({rotation:22.0413,x:1437.7,y:313.75},0).wait(1).to({rotation:24.1841,x:1438.7,y:312.5},0).wait(1).to({rotation:26.327,x:1444,y:309.35},0).wait(1).to({rotation:28.4698,x:1449.35,y:306.25},0).wait(1).to({rotation:30.6126,x:1454.6,y:303.1},0).wait(1).to({rotation:32.7555,x:1459.9,y:300},0).wait(1).to({rotation:34.8983,x:1469.4,y:311},0).wait(1).to({rotation:37.0412,x:1478.85,y:321.95},0).wait(1).to({rotation:39.184,x:1488.3,y:333},0).wait(1).to({rotation:41.3268,x:1497.8,y:344},0).wait(1).to({rotation:43.4697,x:1507.25,y:354.9},0).wait(1).to({rotation:45.6125,x:1516.7,y:365.95},0).wait(1).to({rotation:47.7554,x:1526.15,y:376.9},0).wait(1).to({rotation:49.8982,x:1535.6,y:387.9},0).wait(1).to({rotation:52.0411,x:1545.05,y:398.85},0).wait(1).to({rotation:54.1839,x:1554.55,y:409.85},0).wait(1).to({x:1554.8,y:416.15},0).wait(1).to({x:1555.05,y:422.4},0).wait(1).to({x:1555.25,y:428.65},0).wait(1).to({x:1555.5,y:434.95},0).wait(1).to({x:1555.75,y:441.2},0).wait(1).to({x:1555.95,y:447.45},0).wait(1).to({x:1556.2,y:453.75},0).wait(1).to({x:1556.45,y:460},0).wait(1).to({x:1556.7,y:466.25},0).wait(1).to({x:1556.9,y:472.55},0).wait(1).to({x:1557.15,y:478.8},0).wait(1).to({x:1557.4,y:485.05},0).wait(1).to({x:1557.6,y:491.35},0).wait(1).to({x:1557.85,y:497.6},0).wait(1).to({x:1558.1,y:503.85},0).wait(1).to({x:1558.35,y:510.15},0).wait(1).to({x:1558.55,y:516.4},0).wait(1).to({x:1558.8,y:522.65},0).wait(1).to({x:1559.05,y:528.95},0).wait(1).to({x:1559.3,y:535.2},0).wait(1).to({x:1559.5,y:541.45},0).wait(1).to({x:1559.75,y:547.75},0).wait(1).to({x:1560,y:554},0).wait(1).to({x:1560.2,y:560.25},0).wait(1).to({x:1560.45,y:566.55},0).wait(1).to({x:1560.7,y:572.8},0).wait(1).to({x:1560.95,y:579.05},0).wait(1).to({x:1561.15,y:585.35},0).wait(1).to({x:1561.4,y:591.6},0).wait(1).to({x:1561.65,y:597.85},0).wait(1).to({x:1561.85,y:604.15},0).wait(1).to({x:1562.1,y:610.4},0).wait(1).to({x:1562.35,y:616.7},0).wait(1).to({x:1562.6,y:622.95},0).wait(1).to({x:1562.8,y:629.2},0).wait(1).to({x:1563.05,y:635.5},0).wait(1).to({x:1563.3,y:641.75},0).wait(1).to({x:1563.5,y:648},0).wait(1).to({x:1563.75,y:654.3},0).wait(1).to({x:1564,y:660.55},0).wait(1).to({x:1564.25,y:666.8},0).wait(1).to({x:1564.45,y:673.1},0).wait(1).to({x:1564.7,y:679.35},0).wait(1).to({x:1564.95,y:685.6},0).wait(1).to({x:1565.2,y:691.9},0).wait(1).to({x:1565.4,y:698.15},0).wait(1).to({x:1565.65,y:704.4},0).wait(1).to({x:1565.9,y:710.7},0).wait(1).to({x:1566.1,y:716.95},0).wait(1).to({x:1566.35,y:723.2},0).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_egg__up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// egg__up
	this.instance = new lib.appegg();
	this.instance.setTransform(1396.6,314.5,0.1533,0.1533,-14.9906,0,0,94.7,67.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(489).to({_off:false},0).wait(1).to({regX:105.8,regY:81.8,rotation:-16.6609,x:1396.95,y:314.15},0).wait(1).to({rotation:-18.3269,x:1395.15,y:312.2},0).wait(1).to({rotation:-19.993,x:1393.35,y:310.25},0).wait(1).to({rotation:-21.6591,x:1391.6,y:308.25},0).wait(1).to({rotation:-23.3251,x:1389.75,y:306.3},0).wait(1).to({rotation:-24.9912,x:1386.4,y:306.2},0).wait(1).to({rotation:-26.6573,x:1383.05,y:306.1},0).wait(1).to({rotation:-28.3233,x:1379.65,y:306.05},0).wait(1).to({rotation:-29.9894,x:1376.2,y:305.95},0).wait(1).to({rotation:-37.9797,x:1371.85,y:309.55},0).wait(1).to({rotation:-45.9701,x:1367.4,y:313.1},0).wait(1).to({rotation:-53.9604,x:1363,y:316.7},0).wait(1).to({rotation:-59.9616,x:1360.25,y:321},0).wait(1).to({rotation:-65.9628,x:1357.55,y:325.25},0).wait(1).to({rotation:-71.964,x:1354.8,y:329.55},0).wait(1).to({rotation:-77.9652,x:1352,y:333.9},0).wait(1).to({rotation:-83.9664,x:1349.15,y:338.15},0).wait(1).to({rotation:-98.9673,x:1347.15,y:343.95},0).wait(1).to({rotation:-113.9681,x:1345.05,y:349.8},0).wait(1).to({rotation:-128.969,x:1342.85,y:355.75},0).wait(1).to({rotation:-131.4688,x:1335.6,y:383.2},0).wait(1).to({rotation:-133.9687,x:1328.4,y:410.55},0).wait(1).to({rotation:-136.4685,x:1321.15,y:438},0).wait(1).to({rotation:-138.9683,x:1313.9,y:465.4},0).wait(1).to({rotation:-141.4682,x:1306.65,y:492.85},0).wait(1).to({rotation:-143.968,x:1299.45,y:520.25},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_egg__2_br = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// egg__2_br
	this.instance = new lib.appegg();
	this.instance.setTransform(1436.9,303.5,0.1664,0.1664,70.4087,0,0,122,106);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(576).to({_off:false},0).wait(1).to({regX:105.8,regY:81.8,rotation:74.4087,x:1443.15,y:304.6},0).wait(1).to({rotation:78.4086,x:1446.45,y:309.7},0).wait(1).to({rotation:82.4084,x:1449.8,y:314.75},0).wait(1).to({rotation:86.4083,x:1453.1,y:319.8},0).wait(1).to({rotation:90.4082,x:1456.45,y:324.95},0).wait(1).to({rotation:94.4081,x:1459.75,y:330.05},0).wait(1).to({rotation:98.408,x:1463,y:335.15},0).wait(1).to({rotation:102.4078,x:1466.2,y:340.35},0).wait(1).to({rotation:106.4077,x:1469.45,y:345.5},0).wait(1).to({rotation:110.4076,x:1472.6,y:350.65},0).wait(1).to({rotation:114.4075,x:1475.75,y:355.8},0).wait(1).to({rotation:118.4074,x:1478.95,y:360.95},0).wait(1).to({rotation:122.4072,x:1482.05,y:366.1},0).wait(1).to({rotation:126.4071,x:1485.15,y:371.25},0).wait(1).to({rotation:130.407,x:1488.25,y:376.5},0).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.KimEggNest1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,2,885,886];
	this.streamSoundSymbolsList[1] = [{id:"Sequence01",startFrame:1,endFrame:885,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.background.start;
		var self = this;
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying() 
		{
			self.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("Sequence01",0);
		this.InsertIntoSoundStreamData(soundInstance,1,885,1);
	}
	this.frame_2 = function() {
		this.start = undefined;
	}
	this.frame_885 = function() {
		this.replay = this.background.replay;
		var self = this;
		self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain(){
			self.gotoAndPlay(1);
		}
	}
	this.frame_886 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(883).call(this.frame_885).wait(1).call(this.frame_886).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(960,540);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({scaleX:0.9974,scaleY:0.9974,x:961.6944,y:539.4115},0).wait(1).to({scaleX:0.9947,scaleY:0.9947,x:963.3889,y:538.823},0).wait(1).to({scaleX:0.9921,scaleY:0.9921,x:965.0833,y:538.2345},0).wait(1).to({scaleX:0.9894,scaleY:0.9894,x:966.7778,y:537.646},0).wait(1).to({scaleX:0.9868,scaleY:0.9868,x:968.4722,y:537.0575},0).wait(1).to({scaleX:0.9842,scaleY:0.9842,x:970.1667,y:536.469},0).wait(1).to({scaleX:0.9815,scaleY:0.9815,x:971.8611,y:535.8805},0).wait(1).to({scaleX:0.9789,scaleY:0.9789,x:973.5556,y:535.292},0).wait(1).to({scaleX:0.9762,scaleY:0.9762,x:975.25,y:534.7035},0).wait(1).to({scaleX:0.9736,scaleY:0.9736,x:976.9444,y:534.1149},0).wait(1).to({scaleX:0.971,scaleY:0.971,x:978.6389,y:533.5264},0).wait(1).to({scaleX:0.9683,scaleY:0.9683,x:980.3333,y:532.9379},0).wait(1).to({scaleX:0.9657,scaleY:0.9657,x:982.0278,y:532.3494},0).wait(1).to({scaleX:0.963,scaleY:0.963,x:983.7222,y:531.7609},0).wait(1).to({scaleX:0.9604,scaleY:0.9604,x:985.4167,y:531.1724},0).wait(1).to({scaleX:0.9578,scaleY:0.9578,x:987.1111,y:530.5839},0).wait(1).to({scaleX:0.9551,scaleY:0.9551,x:988.8056,y:529.9954},0).wait(1).to({scaleX:0.9525,scaleY:0.9525,x:990.5,y:529.4069},0).wait(1).to({scaleX:0.9498,scaleY:0.9498,x:992.1944,y:528.8184},0).wait(1).to({scaleX:0.9472,scaleY:0.9472,x:993.8889,y:528.2299},0).wait(1).to({scaleX:0.9446,scaleY:0.9446,x:995.5833,y:527.6414},0).wait(1).to({scaleX:0.9419,scaleY:0.9419,x:997.2778,y:527.0529},0).wait(1).to({scaleX:0.9393,scaleY:0.9393,x:998.9722,y:526.4644},0).wait(1).to({scaleX:0.9367,scaleY:0.9367,x:1000.6667,y:525.8759},0).wait(1).to({scaleX:0.934,scaleY:0.934,x:1002.3611,y:525.2874},0).wait(1).to({scaleX:0.9314,scaleY:0.9314,x:1004.0556,y:524.6989},0).wait(1).to({scaleX:0.9287,scaleY:0.9287,x:1005.75,y:524.1103},0).wait(1).to({scaleX:0.9261,scaleY:0.9261,x:1007.4444,y:523.5218},0).wait(1).to({scaleX:0.9235,scaleY:0.9235,x:1009.1389,y:522.9333},0).wait(1).to({scaleX:0.9208,scaleY:0.9208,x:1010.8333,y:522.3448},0).wait(1).to({scaleX:0.9182,scaleY:0.9182,x:1012.5278,y:521.7563},0).wait(1).to({scaleX:0.9155,scaleY:0.9155,x:1014.2222,y:521.1678},0).wait(1).to({scaleX:0.9129,scaleY:0.9129,x:1015.9167,y:520.5793},0).wait(1).to({scaleX:0.9103,scaleY:0.9103,x:1017.6111,y:519.9908},0).wait(1).to({scaleX:0.9076,scaleY:0.9076,x:1019.3056,y:519.4023},0).wait(1).to({scaleX:0.905,scaleY:0.905,x:1021,y:518.8138},0).wait(1).to({scaleX:0.9023,scaleY:0.9023,x:1022.6944,y:518.2253},0).wait(1).to({scaleX:0.8997,scaleY:0.8997,x:1024.3889,y:517.6368},0).wait(1).to({scaleX:0.8971,scaleY:0.8971,x:1026.0833,y:517.0483},0).wait(1).to({scaleX:0.8944,scaleY:0.8944,x:1027.7778,y:516.4598},0).wait(1).to({scaleX:0.8918,scaleY:0.8918,x:1029.4722,y:515.8713},0).wait(1).to({scaleX:0.8891,scaleY:0.8891,x:1031.1667,y:515.2828},0).wait(1).to({scaleX:0.8865,scaleY:0.8865,x:1032.8611,y:514.6943},0).wait(1).to({scaleX:0.8839,scaleY:0.8839,x:1034.5556,y:514.1057},0).wait(1).to({scaleX:0.8812,scaleY:0.8812,x:1036.25,y:513.5172},0).wait(1).to({scaleX:0.8786,scaleY:0.8786,x:1037.9444,y:512.9287},0).wait(1).to({scaleX:0.8759,scaleY:0.8759,x:1039.6389,y:512.3402},0).wait(1).to({scaleX:0.8733,scaleY:0.8733,x:1041.3333,y:511.7517},0).wait(1).to({scaleX:0.8707,scaleY:0.8707,x:1043.0278,y:511.1632},0).wait(1).to({scaleX:0.868,scaleY:0.868,x:1044.7222,y:510.5747},0).wait(1).to({scaleX:0.8654,scaleY:0.8654,x:1046.4167,y:509.9862},0).wait(1).to({scaleX:0.8627,scaleY:0.8627,x:1048.1111,y:509.3977},0).wait(1).to({scaleX:0.8601,scaleY:0.8601,x:1049.8056,y:508.8092},0).wait(1).to({scaleX:0.8575,scaleY:0.8575,x:1051.5,y:508.2207},0).wait(1).to({scaleX:0.8548,scaleY:0.8548,x:1053.1944,y:507.6322},0).wait(1).to({scaleX:0.8522,scaleY:0.8522,x:1054.8889,y:507.0437},0).wait(1).to({scaleX:0.8495,scaleY:0.8495,x:1056.5833,y:506.4552},0).wait(1).to({scaleX:0.8469,scaleY:0.8469,x:1058.2778,y:505.8667},0).wait(1).to({scaleX:0.8443,scaleY:0.8443,x:1059.9722,y:505.2782},0).wait(1).to({scaleX:0.8416,scaleY:0.8416,x:1061.6667,y:504.6897},0).wait(1).to({scaleX:0.839,scaleY:0.839,x:1063.3611,y:504.1012},0).wait(1).to({scaleX:0.8363,scaleY:0.8363,x:1065.0556,y:503.5126},0).wait(1).to({scaleX:0.8337,scaleY:0.8337,x:1066.75,y:502.9241},0).wait(1).to({scaleX:0.8311,scaleY:0.8311,x:1068.4444,y:502.3356},0).wait(1).to({scaleX:0.8284,scaleY:0.8284,x:1070.1389,y:501.7471},0).wait(1).to({scaleX:0.8258,scaleY:0.8258,x:1071.8333,y:501.1586},0).wait(1).to({scaleX:0.8232,scaleY:0.8232,x:1073.5278,y:500.5701},0).wait(1).to({scaleX:0.8205,scaleY:0.8205,x:1075.2222,y:499.9816},0).wait(1).to({scaleX:0.8179,scaleY:0.8179,x:1076.9167,y:499.3931},0).wait(1).to({scaleX:0.8152,scaleY:0.8152,x:1078.6111,y:498.8046},0).wait(1).to({scaleX:0.8126,scaleY:0.8126,x:1080.3056,y:498.2161},0).wait(1).to({scaleX:0.81,scaleY:0.81,x:1082,y:497.6276},0).wait(1).to({scaleX:0.8073,scaleY:0.8073,x:1083.6944,y:497.0391},0).wait(1).to({scaleX:0.8047,scaleY:0.8047,x:1085.3889,y:496.4506},0).wait(1).to({scaleX:0.802,scaleY:0.802,x:1087.0833,y:495.8621},0).wait(1).to({scaleX:0.7994,scaleY:0.7994,x:1088.7778,y:495.2736},0).wait(1).to({scaleX:0.7968,scaleY:0.7968,x:1090.4722,y:494.6851},0).wait(1).to({scaleX:0.7941,scaleY:0.7941,x:1092.1667,y:494.0966},0).wait(1).to({scaleX:0.7915,scaleY:0.7915,x:1093.8611,y:493.5081},0).wait(1).to({scaleX:0.7888,scaleY:0.7888,x:1095.5556,y:492.9195},0).wait(1).to({scaleX:0.7862,scaleY:0.7862,x:1097.25,y:492.331},0).wait(1).to({scaleX:0.7836,scaleY:0.7836,x:1098.9444,y:491.7425},0).wait(1).to({scaleX:0.7809,scaleY:0.7809,x:1100.6389,y:491.154},0).wait(1).to({scaleX:0.7783,scaleY:0.7783,x:1102.3333,y:490.5655},0).wait(1).to({scaleX:0.7756,scaleY:0.7756,x:1104.0278,y:489.977},0).wait(1).to({scaleX:0.773,scaleY:0.773,x:1105.7222,y:489.3885},0).wait(1).to({scaleX:0.7704,scaleY:0.7704,x:1107.4167,y:488.8},0).wait(1).to({scaleX:0.7677,scaleY:0.7677,x:1109.1111,y:488.2115},0).wait(1).to({scaleX:0.7651,scaleY:0.7651,x:1110.8056,y:487.623},0).wait(1).to({scaleX:0.7624,scaleY:0.7624,x:1112.5,y:487.0345},0).wait(1).to({scaleX:0.7598,scaleY:0.7598,x:1114.1944,y:486.446},0).wait(1).to({scaleX:0.7572,scaleY:0.7572,x:1115.8889,y:485.8575},0).wait(1).to({scaleX:0.7545,scaleY:0.7545,x:1117.5833,y:485.269},0).wait(1).to({scaleX:0.7519,scaleY:0.7519,x:1119.2778,y:484.6805},0).wait(1).to({scaleX:0.7492,scaleY:0.7492,x:1120.9722,y:484.092},0).wait(1).to({scaleX:0.7466,scaleY:0.7466,x:1122.6667,y:483.5035},0).wait(1).to({scaleX:0.744,scaleY:0.744,x:1124.3611,y:482.9149},0).wait(1).to({scaleX:0.7413,scaleY:0.7413,x:1126.0556,y:482.3264},0).wait(1).to({scaleX:0.7387,scaleY:0.7387,x:1127.75,y:481.7379},0).wait(1).to({scaleX:0.736,scaleY:0.736,x:1129.4444,y:481.1494},0).wait(1).to({scaleX:0.7334,scaleY:0.7334,x:1131.1389,y:480.5609},0).wait(1).to({scaleX:0.7308,scaleY:0.7308,x:1132.8333,y:479.9724},0).wait(1).to({scaleX:0.7281,scaleY:0.7281,x:1134.5278,y:479.3839},0).wait(1).to({scaleX:0.7255,scaleY:0.7255,x:1136.2222,y:478.7954},0).wait(1).to({scaleX:0.7228,scaleY:0.7228,x:1137.9167,y:478.2069},0).wait(1).to({scaleX:0.7202,scaleY:0.7202,x:1139.6111,y:477.6184},0).wait(1).to({scaleX:0.7176,scaleY:0.7176,x:1141.3056,y:477.0299},0).wait(1).to({scaleX:0.7149,scaleY:0.7149,x:1143,y:476.4414},0).wait(1).to({scaleX:0.7123,scaleY:0.7123,x:1144.6944,y:475.8529},0).wait(1).to({scaleX:0.7097,scaleY:0.7097,x:1146.3889,y:475.2644},0).wait(1).to({scaleX:0.707,scaleY:0.707,x:1148.0833,y:474.6759},0).wait(1).to({scaleX:0.7044,scaleY:0.7044,x:1149.7778,y:474.0874},0).wait(1).to({scaleX:0.7017,scaleY:0.7017,x:1151.4722,y:473.4989},0).wait(1).to({scaleX:0.6991,scaleY:0.6991,x:1153.1667,y:472.9103},0).wait(1).to({scaleX:0.6965,scaleY:0.6965,x:1154.8611,y:472.3218},0).wait(1).to({scaleX:0.6938,scaleY:0.6938,x:1156.5556,y:471.7333},0).wait(1).to({scaleX:0.6912,scaleY:0.6912,x:1158.25,y:471.1448},0).wait(1).to({scaleX:0.6885,scaleY:0.6885,x:1159.9444,y:470.5563},0).wait(1).to({scaleX:0.6859,scaleY:0.6859,x:1161.6389,y:469.9678},0).wait(1).to({scaleX:0.6833,scaleY:0.6833,x:1163.3333,y:469.3793},0).wait(1).to({scaleX:0.6806,scaleY:0.6806,x:1165.0278,y:468.7908},0).wait(1).to({scaleX:0.678,scaleY:0.678,x:1166.7222,y:468.2023},0).wait(1).to({scaleX:0.6753,scaleY:0.6753,x:1168.4167,y:467.6138},0).wait(1).to({scaleX:0.6727,scaleY:0.6727,x:1170.1111,y:467.0253},0).wait(1).to({scaleX:0.6701,scaleY:0.6701,x:1171.8056,y:466.4368},0).wait(1).to({scaleX:0.6674,scaleY:0.6674,x:1173.5,y:465.8483},0).wait(1).to({scaleX:0.6648,scaleY:0.6648,x:1175.1944,y:465.2598},0).wait(1).to({scaleX:0.6621,scaleY:0.6621,x:1176.8889,y:464.6713},0).wait(1).to({scaleX:0.6595,scaleY:0.6595,x:1178.5833,y:464.0828},0).wait(1).to({scaleX:0.6569,scaleY:0.6569,x:1180.2778,y:463.4943},0).wait(1).to({scaleX:0.6542,scaleY:0.6542,x:1181.9722,y:462.9058},0).wait(1).to({scaleX:0.6516,scaleY:0.6516,x:1183.6667,y:462.3172},0).wait(1).to({scaleX:0.6489,scaleY:0.6489,x:1185.3611,y:461.7287},0).wait(1).to({scaleX:0.6463,scaleY:0.6463,x:1187.0556,y:461.1402},0).wait(1).to({scaleX:0.6437,scaleY:0.6437,x:1188.75,y:460.5517},0).wait(1).to({scaleX:0.641,scaleY:0.641,x:1190.4444,y:459.9632},0).wait(1).to({scaleX:0.6384,scaleY:0.6384,x:1192.1389,y:459.3747},0).wait(1).to({scaleX:0.6357,scaleY:0.6357,x:1193.8333,y:458.7862},0).wait(1).to({scaleX:0.6331,scaleY:0.6331,x:1195.5278,y:458.1977},0).wait(1).to({scaleX:0.6305,scaleY:0.6305,x:1197.2222,y:457.6092},0).wait(1).to({scaleX:0.6278,scaleY:0.6278,x:1198.9167,y:457.0207},0).wait(1).to({scaleX:0.6252,scaleY:0.6252,x:1200.6111,y:456.4322},0).wait(1).to({scaleX:0.6225,scaleY:0.6225,x:1202.3056,y:455.8437},0).wait(1).to({scaleX:0.6199,scaleY:0.6199,x:1204,y:455.2552},0).wait(1).to({scaleX:0.6173,scaleY:0.6173,x:1205.6944,y:454.6667},0).wait(1).to({scaleX:0.6146,scaleY:0.6146,x:1207.3889,y:454.0782},0).wait(1).to({scaleX:0.612,scaleY:0.612,x:1209.0833,y:453.4897},0).wait(1).to({scaleX:0.6093,scaleY:0.6093,x:1210.7778,y:452.9012},0).wait(1).to({scaleX:0.6067,scaleY:0.6067,x:1212.4722,y:452.3126},0).wait(1).to({scaleX:0.6041,scaleY:0.6041,x:1214.1667,y:451.7241},0).wait(1).to({scaleX:0.6014,scaleY:0.6014,x:1215.8611,y:451.1356},0).wait(1).to({scaleX:0.5988,scaleY:0.5988,x:1217.5556,y:450.5471},0).wait(1).to({scaleX:0.5962,scaleY:0.5962,x:1219.25,y:449.9586},0).wait(1).to({scaleX:0.5935,scaleY:0.5935,x:1220.9444,y:449.3701},0).wait(1).to({scaleX:0.5909,scaleY:0.5909,x:1222.6389,y:448.7816},0).wait(1).to({scaleX:0.5882,scaleY:0.5882,x:1224.3333,y:448.1931},0).wait(1).to({scaleX:0.5856,scaleY:0.5856,x:1226.0278,y:447.6046},0).wait(1).to({scaleX:0.583,scaleY:0.583,x:1227.7222,y:447.0161},0).wait(1).to({scaleX:0.5803,scaleY:0.5803,x:1229.4167,y:446.4276},0).wait(1).to({scaleX:0.5777,scaleY:0.5777,x:1231.1111,y:445.8391},0).wait(1).to({scaleX:0.575,scaleY:0.575,x:1232.8056,y:445.2506},0).wait(1).to({scaleX:0.5724,scaleY:0.5724,x:1234.5,y:444.6621},0).wait(1).to({scaleX:0.5698,scaleY:0.5698,x:1236.1944,y:444.0736},0).wait(1).to({scaleX:0.5671,scaleY:0.5671,x:1237.8889,y:443.4851},0).wait(1).to({scaleX:0.5645,scaleY:0.5645,x:1239.5833,y:442.8966},0).wait(1).to({scaleX:0.5618,scaleY:0.5618,x:1241.2778,y:442.3081},0).wait(1).to({scaleX:0.5592,scaleY:0.5592,x:1242.9722,y:441.7195},0).wait(1).to({scaleX:0.5566,scaleY:0.5566,x:1244.6667,y:441.131},0).wait(1).to({scaleX:0.5539,scaleY:0.5539,x:1246.3611,y:440.5425},0).wait(1).to({scaleX:0.5513,scaleY:0.5513,x:1248.0556,y:439.954},0).wait(1).to({scaleX:0.5486,scaleY:0.5486,x:1249.75,y:439.3655},0).wait(1).to({scaleX:0.546,scaleY:0.546,x:1251.4444,y:438.777},0).wait(1).to({scaleX:0.5434,scaleY:0.5434,x:1253.1389,y:438.1885},0).wait(1).to({scaleX:0.5407,scaleY:0.5407,x:1254.8333,y:437.6},0).wait(1).to({scaleX:0.5381,scaleY:0.5381,x:1256.5278,y:437.0115},0).wait(1).to({scaleX:0.5354,scaleY:0.5354,x:1258.2222,y:436.423},0).wait(1).to({scaleX:0.5328,scaleY:0.5328,x:1259.9167,y:435.8345},0).wait(1).to({scaleX:0.5302,scaleY:0.5302,x:1261.6111,y:435.246},0).wait(1).to({scaleX:0.5275,scaleY:0.5275,x:1263.3056,y:434.6575},0).wait(1).to({scaleX:0.5249,scaleY:0.5249,x:1265,y:434.069},0).wait(1).to({scaleX:0.5222,scaleY:0.5222,x:1266.6944,y:433.4805},0).wait(1).to({scaleX:0.5196,scaleY:0.5196,x:1268.3889,y:432.892},0).wait(1).to({scaleX:0.517,scaleY:0.517,x:1270.0833,y:432.3035},0).wait(1).to({scaleX:0.5143,scaleY:0.5143,x:1271.7778,y:431.7149},0).wait(1).to({scaleX:0.5117,scaleY:0.5117,x:1273.4722,y:431.1264},0).wait(1).to({scaleX:0.509,scaleY:0.509,x:1275.1667,y:430.5379},0).wait(1).to({scaleX:0.5064,scaleY:0.5064,x:1276.8611,y:429.9494},0).wait(1).to({scaleX:0.5038,scaleY:0.5038,x:1278.5556,y:429.3609},0).wait(1).to({scaleX:0.5011,scaleY:0.5011,x:1280.25,y:428.7724},0).wait(1).to({scaleX:0.4985,scaleY:0.4985,x:1281.9444,y:428.1839},0).wait(1).to({scaleX:0.4958,scaleY:0.4958,x:1283.6389,y:427.5954},0).wait(1).to({scaleX:0.4932,scaleY:0.4932,x:1285.3333,y:427.0069},0).wait(1).to({scaleX:0.4906,scaleY:0.4906,x:1287.0278,y:426.4184},0).wait(1).to({scaleX:0.4879,scaleY:0.4879,x:1288.7222,y:425.8299},0).wait(1).to({scaleX:0.4853,scaleY:0.4853,x:1290.4167,y:425.2414},0).wait(1).to({scaleX:0.4827,scaleY:0.4827,x:1292.1111,y:424.6529},0).wait(1).to({scaleX:0.48,scaleY:0.48,x:1293.8056,y:424.0644},0).wait(1).to({scaleX:0.4774,scaleY:0.4774,x:1295.5,y:423.4759},0).wait(1).to({scaleX:0.4747,scaleY:0.4747,x:1297.1944,y:422.8874},0).wait(1).to({scaleX:0.4721,scaleY:0.4721,x:1298.8889,y:422.2989},0).wait(1).to({scaleX:0.4695,scaleY:0.4695,x:1300.5833,y:421.7103},0).wait(1).to({scaleX:0.4668,scaleY:0.4668,x:1302.2778,y:421.1218},0).wait(1).to({scaleX:0.4642,scaleY:0.4642,x:1303.9722,y:420.5333},0).wait(1).to({scaleX:0.4615,scaleY:0.4615,x:1305.6667,y:419.9448},0).wait(1).to({scaleX:0.4589,scaleY:0.4589,x:1307.3611,y:419.3563},0).wait(1).to({scaleX:0.4563,scaleY:0.4563,x:1309.0556,y:418.7678},0).wait(1).to({scaleX:0.4536,scaleY:0.4536,x:1310.75,y:418.1793},0).wait(1).to({scaleX:0.451,scaleY:0.451,x:1312.4444,y:417.5908},0).wait(1).to({scaleX:0.4483,scaleY:0.4483,x:1314.1389,y:417.0023},0).wait(1).to({scaleX:0.4457,scaleY:0.4457,x:1315.8333,y:416.4138},0).wait(1).to({scaleX:0.4431,scaleY:0.4431,x:1317.5278,y:415.8253},0).wait(1).to({scaleX:0.4404,scaleY:0.4404,x:1319.2222,y:415.2368},0).wait(1).to({scaleX:0.4378,scaleY:0.4378,x:1320.9167,y:414.6483},0).wait(1).to({scaleX:0.4351,scaleY:0.4351,x:1322.6111,y:414.0598},0).wait(1).to({scaleX:0.4325,scaleY:0.4325,x:1324.3056,y:413.4713},0).wait(1).to({scaleX:0.4299,scaleY:0.4299,x:1326,y:412.8828},0).wait(1).to({scaleX:0.4272,scaleY:0.4272,x:1327.6944,y:412.2943},0).wait(1).to({scaleX:0.4246,scaleY:0.4246,x:1329.3889,y:411.7058},0).wait(1).to({scaleX:0.4219,scaleY:0.4219,x:1331.0833,y:411.1172},0).wait(1).to({scaleX:0.4193,scaleY:0.4193,x:1332.7778,y:410.5287},0).wait(1).to({scaleX:0.4167,scaleY:0.4167,x:1334.4722,y:409.9402},0).wait(1).to({scaleX:0.414,scaleY:0.414,x:1336.1667,y:409.3517},0).wait(1).to({scaleX:0.4114,scaleY:0.4114,x:1337.8611,y:408.7632},0).wait(1).to({scaleX:0.4087,scaleY:0.4087,x:1339.5556,y:408.1747},0).wait(1).to({scaleX:0.4061,scaleY:0.4061,x:1341.25,y:407.5862},0).wait(1).to({scaleX:0.4035,scaleY:0.4035,x:1342.9444,y:406.9977},0).wait(1).to({scaleX:0.4008,scaleY:0.4008,x:1344.6389,y:406.4092},0).wait(1).to({scaleX:0.3982,scaleY:0.3982,x:1346.3333,y:405.8207},0).wait(1).to({scaleX:0.3955,scaleY:0.3955,x:1348.0278,y:405.2322},0).wait(1).to({scaleX:0.3929,scaleY:0.3929,x:1349.7222,y:404.6437},0).wait(1).to({scaleX:0.3903,scaleY:0.3903,x:1351.4167,y:404.0552},0).wait(1).to({scaleX:0.3876,scaleY:0.3876,x:1353.1111,y:403.4667},0).wait(1).to({scaleX:0.385,scaleY:0.385,x:1354.8056,y:402.8782},0).wait(1).to({scaleX:0.3823,scaleY:0.3823,x:1356.5,y:402.2897},0).wait(1).to({scaleX:0.3797,scaleY:0.3797,x:1358.1944,y:401.7012},0).wait(1).to({scaleX:0.3771,scaleY:0.3771,x:1359.8889,y:401.1126},0).wait(1).to({scaleX:0.3744,scaleY:0.3744,x:1361.5833,y:400.5241},0).wait(1).to({scaleX:0.3718,scaleY:0.3718,x:1363.2778,y:399.9356},0).wait(1).to({scaleX:0.3692,scaleY:0.3692,x:1364.9722,y:399.3471},0).wait(1).to({scaleX:0.3665,scaleY:0.3665,x:1366.6667,y:398.7586},0).wait(1).to({scaleX:0.3639,scaleY:0.3639,x:1368.3611,y:398.1701},0).wait(1).to({scaleX:0.3612,scaleY:0.3612,x:1370.0556,y:397.5816},0).wait(1).to({scaleX:0.3586,scaleY:0.3586,x:1371.75,y:396.9931},0).wait(1).to({scaleX:0.356,scaleY:0.356,x:1373.4444,y:396.4046},0).wait(1).to({scaleX:0.3533,scaleY:0.3533,x:1375.1389,y:395.8161},0).wait(1).to({scaleX:0.3507,scaleY:0.3507,x:1376.8333,y:395.2276},0).wait(1).to({scaleX:0.348,scaleY:0.348,x:1378.5278,y:394.6391},0).wait(1).to({scaleX:0.3454,scaleY:0.3454,x:1380.2222,y:394.0506},0).wait(1).to({scaleX:0.3428,scaleY:0.3428,x:1381.9167,y:393.4621},0).wait(1).to({scaleX:0.3401,scaleY:0.3401,x:1383.6111,y:392.8736},0).wait(1).to({scaleX:0.3375,scaleY:0.3375,x:1385.3056,y:392.2851},0).wait(1).to({scaleX:0.3348,scaleY:0.3348,x:1387,y:391.6966},0).wait(1).to({scaleX:0.3322,scaleY:0.3322,x:1388.6944,y:391.1081},0).wait(1).to({scaleX:0.3296,scaleY:0.3296,x:1390.3889,y:390.5195},0).wait(1).to({scaleX:0.3269,scaleY:0.3269,x:1392.0833,y:389.931},0).wait(1).to({scaleX:0.3243,scaleY:0.3243,x:1393.7778,y:389.3425},0).wait(1).to({scaleX:0.3216,scaleY:0.3216,x:1395.4722,y:388.754},0).wait(1).to({scaleX:0.319,scaleY:0.319,x:1397.1667,y:388.1655},0).wait(1).to({scaleX:0.3164,scaleY:0.3164,x:1398.8611,y:387.577},0).wait(1).to({scaleX:0.3137,scaleY:0.3137,x:1400.5556,y:386.9885},0).wait(1).to({scaleX:0.3111,scaleY:0.3111,x:1402.25,y:386.4},0).wait(1).to({scaleX:0.3102,scaleY:0.3102,x:1402.1602,y:386.146},0).wait(1).to({scaleX:0.3093,scaleY:0.3093,x:1402.0705,y:385.8921},0).wait(1).to({scaleX:0.3084,scaleY:0.3084,x:1401.9807,y:385.6381},0).wait(1).to({scaleX:0.3075,scaleY:0.3075,x:1401.8909,y:385.3841},0).wait(1).to({scaleX:0.3067,scaleY:0.3067,x:1401.8011,y:385.1301},0).wait(1).to({scaleX:0.3058,scaleY:0.3058,x:1401.7114,y:384.8761},0).wait(1).to({scaleX:0.3049,scaleY:0.3049,x:1401.6216,y:384.6222},0).wait(1).to({scaleX:0.304,scaleY:0.304,x:1401.5318,y:384.3682},0).wait(1).to({scaleX:0.3031,scaleY:0.3031,x:1401.442,y:384.1142},0).wait(1).to({scaleX:0.3022,scaleY:0.3022,x:1401.3523,y:383.8602},0).wait(1).to({scaleX:0.3014,scaleY:0.3014,x:1401.2625,y:383.6063},0).wait(1).to({scaleX:0.3005,scaleY:0.3005,x:1401.1727,y:383.3523},0).wait(1).to({scaleX:0.2996,scaleY:0.2996,x:1401.083,y:383.0983},0).wait(1).to({scaleX:0.2987,scaleY:0.2987,x:1400.9932,y:382.8443},0).wait(1).to({scaleX:0.2978,scaleY:0.2978,x:1400.9034,y:382.5903},0).wait(1).to({scaleX:0.2969,scaleY:0.2969,x:1400.8136,y:382.3364},0).wait(1).to({scaleX:0.2961,scaleY:0.2961,x:1400.7239,y:382.0824},0).wait(1).to({scaleX:0.2952,scaleY:0.2952,x:1400.6341,y:381.8284},0).wait(1).to({scaleX:0.2943,scaleY:0.2943,x:1400.5443,y:381.5744},0).wait(1).to({scaleX:0.2934,scaleY:0.2934,x:1400.4545,y:381.3205},0).wait(1).to({scaleX:0.2925,scaleY:0.2925,x:1400.3648,y:381.0665},0).wait(1).to({scaleX:0.2916,scaleY:0.2916,x:1400.275,y:380.8125},0).wait(1).to({scaleX:0.2907,scaleY:0.2907,x:1400.1852,y:380.5585},0).wait(1).to({scaleX:0.2899,scaleY:0.2899,x:1400.0955,y:380.3046},0).wait(1).to({scaleX:0.289,scaleY:0.289,x:1400.0057,y:380.0506},0).wait(1).to({scaleX:0.2881,scaleY:0.2881,x:1399.9159,y:379.7966},0).wait(1).to({scaleX:0.2872,scaleY:0.2872,x:1399.8261,y:379.5426},0).wait(1).to({scaleX:0.2863,scaleY:0.2863,x:1399.7364,y:379.2886},0).wait(1).to({scaleX:0.2854,scaleY:0.2854,x:1399.6466,y:379.0347},0).wait(1).to({scaleX:0.2846,scaleY:0.2846,x:1399.5568,y:378.7807},0).wait(1).to({scaleX:0.2837,scaleY:0.2837,x:1399.467,y:378.5267},0).wait(1).to({scaleX:0.2828,scaleY:0.2828,x:1399.3773,y:378.2727},0).wait(1).to({scaleX:0.2819,scaleY:0.2819,x:1399.2875,y:378.0188},0).wait(1).to({scaleX:0.281,scaleY:0.281,x:1399.1977,y:377.7648},0).wait(1).to({scaleX:0.2801,scaleY:0.2801,x:1399.108,y:377.5108},0).wait(1).to({scaleX:0.2793,scaleY:0.2793,x:1399.0182,y:377.2568},0).wait(1).to({scaleX:0.2784,scaleY:0.2784,x:1398.9284,y:377.0028},0).wait(1).to({scaleX:0.2775,scaleY:0.2775,x:1398.8386,y:376.7489},0).wait(1).to({scaleX:0.2766,scaleY:0.2766,x:1398.7489,y:376.4949},0).wait(1).to({scaleX:0.2757,scaleY:0.2757,x:1398.6591,y:376.2409},0).wait(1).to({scaleX:0.2748,scaleY:0.2748,x:1398.5693,y:375.9869},0).wait(1).to({scaleX:0.274,scaleY:0.274,x:1398.4795,y:375.733},0).wait(1).to({scaleX:0.2731,scaleY:0.2731,x:1398.3898,y:375.479},0).wait(1).to({scaleX:0.2722,scaleY:0.2722,x:1398.3,y:375.225},0).wait(1).to({scaleX:0.2713,scaleY:0.2713,x:1398.2102,y:374.971},0).wait(1).to({scaleX:0.2704,scaleY:0.2704,x:1398.1205,y:374.717},0).wait(1).to({scaleX:0.2695,scaleY:0.2695,x:1398.0307,y:374.4631},0).wait(1).to({scaleX:0.2687,scaleY:0.2687,x:1397.9409,y:374.2091},0).wait(1).to({scaleX:0.2678,scaleY:0.2678,x:1397.8511,y:373.9551},0).wait(1).to({scaleX:0.2669,scaleY:0.2669,x:1397.7614,y:373.7011},0).wait(1).to({scaleX:0.266,scaleY:0.266,x:1397.6716,y:373.4472},0).wait(1).to({scaleX:0.2651,scaleY:0.2651,x:1397.5818,y:373.1932},0).wait(1).to({scaleX:0.2642,scaleY:0.2642,x:1397.492,y:372.9392},0).wait(1).to({scaleX:0.2633,scaleY:0.2633,x:1397.4023,y:372.6852},0).wait(1).to({scaleX:0.2625,scaleY:0.2625,x:1397.3125,y:372.4313},0).wait(1).to({scaleX:0.2616,scaleY:0.2616,x:1397.2227,y:372.1773},0).wait(1).to({scaleX:0.2607,scaleY:0.2607,x:1397.133,y:371.9233},0).wait(1).to({scaleX:0.2598,scaleY:0.2598,x:1397.0432,y:371.6693},0).wait(1).to({scaleX:0.2589,scaleY:0.2589,x:1396.9534,y:371.4153},0).wait(1).to({scaleX:0.258,scaleY:0.258,x:1396.8636,y:371.1614},0).wait(1).to({scaleX:0.2572,scaleY:0.2572,x:1396.7739,y:370.9074},0).wait(1).to({scaleX:0.2563,scaleY:0.2563,x:1396.6841,y:370.6534},0).wait(1).to({scaleX:0.2554,scaleY:0.2554,x:1396.5943,y:370.3994},0).wait(1).to({scaleX:0.2545,scaleY:0.2545,x:1396.5045,y:370.1455},0).wait(1).to({scaleX:0.2536,scaleY:0.2536,x:1396.4148,y:369.8915},0).wait(1).to({scaleX:0.2527,scaleY:0.2527,x:1396.325,y:369.6375},0).wait(1).to({scaleX:0.2519,scaleY:0.2519,x:1396.2352,y:369.3835},0).wait(1).to({scaleX:0.251,scaleY:0.251,x:1396.1455,y:369.1296},0).wait(1).to({scaleX:0.2501,scaleY:0.2501,x:1396.0557,y:368.8756},0).wait(1).to({scaleX:0.2492,scaleY:0.2492,x:1395.9659,y:368.6216},0).wait(1).to({scaleX:0.2483,scaleY:0.2483,x:1395.8761,y:368.3676},0).wait(1).to({scaleX:0.2474,scaleY:0.2474,x:1395.7864,y:368.1136},0).wait(1).to({scaleX:0.2466,scaleY:0.2466,x:1395.6966,y:367.8597},0).wait(1).to({scaleX:0.2457,scaleY:0.2457,x:1395.6068,y:367.6057},0).wait(1).to({scaleX:0.2448,scaleY:0.2448,x:1395.517,y:367.3517},0).wait(1).to({scaleX:0.2439,scaleY:0.2439,x:1395.4273,y:367.0977},0).wait(1).to({scaleX:0.243,scaleY:0.243,x:1395.3375,y:366.8438},0).wait(1).to({scaleX:0.2421,scaleY:0.2421,x:1395.2477,y:366.5898},0).wait(1).to({scaleX:0.2412,scaleY:0.2412,x:1395.158,y:366.3358},0).wait(1).to({scaleX:0.2404,scaleY:0.2404,x:1395.0682,y:366.0818},0).wait(1).to({scaleX:0.2395,scaleY:0.2395,x:1394.9784,y:365.8278},0).wait(1).to({scaleX:0.2386,scaleY:0.2386,x:1394.8886,y:365.5739},0).wait(1).to({scaleX:0.2377,scaleY:0.2377,x:1394.7989,y:365.3199},0).wait(1).to({scaleX:0.2368,scaleY:0.2368,x:1394.7091,y:365.0659},0).wait(1).to({scaleX:0.2359,scaleY:0.2359,x:1394.6193,y:364.8119},0).wait(1).to({scaleX:0.2351,scaleY:0.2351,x:1394.5295,y:364.558},0).wait(1).to({scaleX:0.2342,scaleY:0.2342,x:1394.4398,y:364.304},0).wait(1).to({scaleX:0.2333,scaleY:0.2333,x:1394.35,y:364.05},0).wait(1).to({scaleX:0.2324,scaleY:0.2324,x:1394.2602,y:363.796},0).wait(1).to({scaleX:0.2315,scaleY:0.2315,x:1394.1705,y:363.5421},0).wait(1).to({scaleX:0.2306,scaleY:0.2306,x:1394.0807,y:363.2881},0).wait(1).to({scaleX:0.2298,scaleY:0.2298,x:1393.9909,y:363.0341},0).wait(1).to({scaleX:0.2289,scaleY:0.2289,x:1393.9011,y:362.7801},0).wait(1).to({scaleX:0.228,scaleY:0.228,x:1393.8114,y:362.5261},0).wait(1).to({scaleX:0.2271,scaleY:0.2271,x:1393.7216,y:362.2722},0).wait(1).to({scaleX:0.2262,scaleY:0.2262,x:1393.6318,y:362.0182},0).wait(1).to({scaleX:0.2253,scaleY:0.2253,x:1393.542,y:361.7642},0).wait(1).to({scaleX:0.2245,scaleY:0.2245,x:1393.4523,y:361.5102},0).wait(1).to({scaleX:0.2236,scaleY:0.2236,x:1393.3625,y:361.2563},0).wait(1).to({scaleX:0.2227,scaleY:0.2227,x:1393.2727,y:361.0023},0).wait(1).to({scaleX:0.2218,scaleY:0.2218,x:1393.183,y:360.7483},0).wait(1).to({scaleX:0.2209,scaleY:0.2209,x:1393.0932,y:360.4943},0).wait(1).to({scaleX:0.22,scaleY:0.22,x:1393.0034,y:360.2403},0).wait(1).to({scaleX:0.2191,scaleY:0.2191,x:1392.9136,y:359.9864},0).wait(1).to({scaleX:0.2183,scaleY:0.2183,x:1392.8239,y:359.7324},0).wait(1).to({scaleX:0.2174,scaleY:0.2174,x:1392.7341,y:359.4784},0).wait(1).to({scaleX:0.2165,scaleY:0.2165,x:1392.6443,y:359.2244},0).wait(1).to({scaleX:0.2156,scaleY:0.2156,x:1392.5545,y:358.9705},0).wait(1).to({scaleX:0.2147,scaleY:0.2147,x:1392.4648,y:358.7165},0).wait(1).to({scaleX:0.2138,scaleY:0.2138,x:1392.375,y:358.4625},0).wait(1).to({scaleX:0.213,scaleY:0.213,x:1392.2852,y:358.2085},0).wait(1).to({scaleX:0.2121,scaleY:0.2121,x:1392.1955,y:357.9546},0).wait(1).to({scaleX:0.2112,scaleY:0.2112,x:1392.1057,y:357.7006},0).wait(1).to({scaleX:0.2103,scaleY:0.2103,x:1392.0159,y:357.4466},0).wait(1).to({scaleX:0.2094,scaleY:0.2094,x:1391.9261,y:357.1926},0).wait(1).to({scaleX:0.2085,scaleY:0.2085,x:1391.8364,y:356.9386},0).wait(1).to({scaleX:0.2077,scaleY:0.2077,x:1391.7466,y:356.6847},0).wait(1).to({scaleX:0.2068,scaleY:0.2068,x:1391.6568,y:356.4307},0).wait(1).to({scaleX:0.2059,scaleY:0.2059,x:1391.567,y:356.1767},0).wait(1).to({scaleX:0.205,scaleY:0.205,x:1391.4773,y:355.9227},0).wait(1).to({scaleX:0.2041,scaleY:0.2041,x:1391.3875,y:355.6688},0).wait(1).to({scaleX:0.2032,scaleY:0.2032,x:1391.2977,y:355.4148},0).wait(1).to({scaleX:0.2024,scaleY:0.2024,x:1391.208,y:355.1608},0).wait(1).to({scaleX:0.2015,scaleY:0.2015,x:1391.1182,y:354.9068},0).wait(1).to({scaleX:0.2006,scaleY:0.2006,x:1391.0284,y:354.6528},0).wait(1).to({scaleX:0.1997,scaleY:0.1997,x:1390.9386,y:354.3989},0).wait(1).to({scaleX:0.1988,scaleY:0.1988,x:1390.8489,y:354.1449},0).wait(1).to({scaleX:0.1979,scaleY:0.1979,x:1390.7591,y:353.8909},0).wait(1).to({scaleX:0.197,scaleY:0.197,x:1390.6693,y:353.6369},0).wait(1).to({scaleX:0.1962,scaleY:0.1962,x:1390.5795,y:353.383},0).wait(1).to({scaleX:0.1953,scaleY:0.1953,x:1390.4898,y:353.129},0).wait(1).to({scaleX:0.1944,scaleY:0.1944,x:1390.4,y:352.875},0).wait(1).to({scaleX:0.1935,scaleY:0.1935,x:1390.3102,y:352.621},0).wait(1).to({scaleX:0.1926,scaleY:0.1926,x:1390.2205,y:352.3671},0).wait(1).to({scaleX:0.1917,scaleY:0.1917,x:1390.1307,y:352.1131},0).wait(1).to({scaleX:0.1909,scaleY:0.1909,x:1390.0409,y:351.8591},0).wait(1).to({scaleX:0.19,scaleY:0.19,x:1389.9511,y:351.6051},0).wait(1).to({scaleX:0.1891,scaleY:0.1891,x:1389.8614,y:351.3511},0).wait(1).to({scaleX:0.1882,scaleY:0.1882,x:1389.7716,y:351.0972},0).wait(1).to({scaleX:0.1873,scaleY:0.1873,x:1389.6818,y:350.8432},0).wait(1).to({scaleX:0.1864,scaleY:0.1864,x:1389.592,y:350.5892},0).wait(1).to({scaleX:0.1856,scaleY:0.1856,x:1389.5023,y:350.3352},0).wait(1).to({scaleX:0.1847,scaleY:0.1847,x:1389.4125,y:350.0813},0).wait(1).to({scaleX:0.1838,scaleY:0.1838,x:1389.3227,y:349.8273},0).wait(1).to({scaleX:0.1829,scaleY:0.1829,x:1389.233,y:349.5733},0).wait(1).to({scaleX:0.182,scaleY:0.182,x:1389.1432,y:349.3193},0).wait(1).to({scaleX:0.1811,scaleY:0.1811,x:1389.0534,y:349.0653},0).wait(1).to({scaleX:0.1803,scaleY:0.1803,x:1388.9636,y:348.8114},0).wait(1).to({scaleX:0.1794,scaleY:0.1794,x:1388.8739,y:348.5574},0).wait(1).to({scaleX:0.1785,scaleY:0.1785,x:1388.7841,y:348.3034},0).wait(1).to({scaleX:0.1776,scaleY:0.1776,x:1388.6943,y:348.0494},0).wait(1).to({scaleX:0.1767,scaleY:0.1767,x:1388.6045,y:347.7955},0).wait(1).to({scaleX:0.1758,scaleY:0.1758,x:1388.5148,y:347.5415},0).wait(1).to({scaleX:0.1749,scaleY:0.1749,x:1388.425,y:347.2875},0).wait(1).to({scaleX:0.1741,scaleY:0.1741,x:1388.3352,y:347.0335},0).wait(1).to({scaleX:0.1732,scaleY:0.1732,x:1388.2455,y:346.7795},0).wait(1).to({scaleX:0.1723,scaleY:0.1723,x:1388.1557,y:346.5256},0).wait(1).to({scaleX:0.1714,scaleY:0.1714,x:1388.0659,y:346.2716},0).wait(1).to({scaleX:0.1705,scaleY:0.1705,x:1387.9761,y:346.0176},0).wait(1).to({scaleX:0.1696,scaleY:0.1696,x:1387.8864,y:345.7636},0).wait(1).to({scaleX:0.1688,scaleY:0.1688,x:1387.7966,y:345.5097},0).wait(1).to({scaleX:0.1679,scaleY:0.1679,x:1387.7068,y:345.2557},0).wait(1).to({scaleX:0.167,scaleY:0.167,x:1387.617,y:345.0017},0).wait(1).to({scaleX:0.1661,scaleY:0.1661,x:1387.5273,y:344.7477},0).wait(1).to({scaleX:0.1652,scaleY:0.1652,x:1387.4375,y:344.4938},0).wait(1).to({scaleX:0.1643,scaleY:0.1643,x:1387.3477,y:344.2398},0).wait(1).to({scaleX:0.1635,scaleY:0.1635,x:1387.258,y:343.9858},0).wait(1).to({scaleX:0.1626,scaleY:0.1626,x:1387.1682,y:343.7318},0).wait(1).to({scaleX:0.1617,scaleY:0.1617,x:1387.0784,y:343.4778},0).wait(1).to({scaleX:0.1608,scaleY:0.1608,x:1386.9886,y:343.2239},0).wait(1).to({scaleX:0.1599,scaleY:0.1599,x:1386.8989,y:342.9699},0).wait(1).to({scaleX:0.159,scaleY:0.159,x:1386.8091,y:342.7159},0).wait(1).to({scaleX:0.1582,scaleY:0.1582,x:1386.7193,y:342.4619},0).wait(1).to({scaleX:0.1573,scaleY:0.1573,x:1386.6295,y:342.208},0).wait(1).to({scaleX:0.1564,scaleY:0.1564,x:1386.5398,y:341.954},0).wait(1).to({scaleX:0.1555,scaleY:0.1555,x:1386.45,y:341.7},0).wait(1).to({scaleX:0.1552,scaleY:0.1552,x:1386.4858,y:341.5763},0).wait(1).to({scaleX:0.1549,scaleY:0.1549,x:1386.5216,y:341.4527},0).wait(1).to({scaleX:0.1546,scaleY:0.1546,x:1386.5574,y:341.329},0).wait(1).to({scaleX:0.1543,scaleY:0.1543,x:1386.5932,y:341.2053},0).wait(1).to({scaleX:0.154,scaleY:0.154,x:1386.629,y:341.0816},0).wait(1).to({scaleX:0.1537,scaleY:0.1537,x:1386.6648,y:340.958},0).wait(1).to({scaleX:0.1534,scaleY:0.1534,x:1386.7006,y:340.8343},0).wait(1).to({scaleX:0.1531,scaleY:0.1531,x:1386.7364,y:340.7106},0).wait(1).to({scaleX:0.1529,scaleY:0.1529,x:1386.7722,y:340.5869},0).wait(1).to({scaleX:0.1526,scaleY:0.1526,x:1386.808,y:340.4633},0).wait(1).to({scaleX:0.1523,scaleY:0.1523,x:1386.8438,y:340.3396},0).wait(1).to({scaleX:0.152,scaleY:0.152,x:1386.8795,y:340.2159},0).wait(1).to({scaleX:0.1517,scaleY:0.1517,x:1386.9153,y:340.0922},0).wait(1).to({scaleX:0.1514,scaleY:0.1514,x:1386.9511,y:339.9686},0).wait(1).to({scaleX:0.1511,scaleY:0.1511,x:1386.9869,y:339.8449},0).wait(1).to({scaleX:0.1508,scaleY:0.1508,x:1387.0227,y:339.7212},0).wait(1).to({scaleX:0.1505,scaleY:0.1505,x:1387.0585,y:339.5975},0).wait(1).to({scaleX:0.1502,scaleY:0.1502,x:1387.0943,y:339.4739},0).wait(1).to({scaleX:0.1499,scaleY:0.1499,x:1387.1301,y:339.3502},0).wait(1).to({scaleX:0.1496,scaleY:0.1496,x:1387.1659,y:339.2265},0).wait(1).to({scaleX:0.1493,scaleY:0.1493,x:1387.2017,y:339.1028},0).wait(1).to({scaleX:0.149,scaleY:0.149,x:1387.2375,y:338.9792},0).wait(1).to({scaleX:0.1487,scaleY:0.1487,x:1387.2733,y:338.8555},0).wait(1).to({scaleX:0.1484,scaleY:0.1484,x:1387.3091,y:338.7318},0).wait(1).to({scaleX:0.1481,scaleY:0.1481,x:1387.3449,y:338.6081},0).wait(1).to({scaleX:0.1478,scaleY:0.1478,x:1387.3807,y:338.4845},0).wait(1).to({scaleX:0.1475,scaleY:0.1475,x:1387.4165,y:338.3608},0).wait(1).to({scaleX:0.1473,scaleY:0.1473,x:1387.4523,y:338.2371},0).wait(1).to({scaleX:0.147,scaleY:0.147,x:1387.4881,y:338.1135},0).wait(1).to({scaleX:0.1467,scaleY:0.1467,x:1387.5239,y:337.9898},0).wait(1).to({scaleX:0.1464,scaleY:0.1464,x:1387.5597,y:337.8661},0).wait(1).to({scaleX:0.1461,scaleY:0.1461,x:1387.5955,y:337.7424},0).wait(1).to({scaleX:0.1458,scaleY:0.1458,x:1387.6312,y:337.6188},0).wait(1).to({scaleX:0.1455,scaleY:0.1455,x:1387.667,y:337.4951},0).wait(1).to({scaleX:0.1452,scaleY:0.1452,x:1387.7028,y:337.3714},0).wait(1).to({scaleX:0.1449,scaleY:0.1449,x:1387.7386,y:337.2477},0).wait(1).to({scaleX:0.1446,scaleY:0.1446,x:1387.7744,y:337.1241},0).wait(1).to({scaleX:0.1443,scaleY:0.1443,x:1387.8102,y:337.0004},0).wait(1).to({scaleX:0.144,scaleY:0.144,x:1387.846,y:336.8767},0).wait(1).to({scaleX:0.1437,scaleY:0.1437,x:1387.8818,y:336.753},0).wait(1).to({scaleX:0.1434,scaleY:0.1434,x:1387.9176,y:336.6294},0).wait(1).to({scaleX:0.1431,scaleY:0.1431,x:1387.9534,y:336.5057},0).wait(1).to({scaleX:0.1428,scaleY:0.1428,x:1387.9892,y:336.382},0).wait(1).to({scaleX:0.1425,scaleY:0.1425,x:1388.025,y:336.2583},0).wait(1).to({scaleX:0.1422,scaleY:0.1422,x:1388.0608,y:336.1347},0).wait(1).to({scaleX:0.142,scaleY:0.142,x:1388.0966,y:336.011},0).wait(1).to({scaleX:0.1417,scaleY:0.1417,x:1388.1324,y:335.8873},0).wait(1).to({scaleX:0.1414,scaleY:0.1414,x:1388.1682,y:335.7636},0).wait(1).to({scaleX:0.1411,scaleY:0.1411,x:1388.204,y:335.64},0).wait(1).to({scaleX:0.1408,scaleY:0.1408,x:1388.2398,y:335.5163},0).wait(1).to({scaleX:0.1405,scaleY:0.1405,x:1388.2756,y:335.3926},0).wait(1).to({scaleX:0.1402,scaleY:0.1402,x:1388.3114,y:335.2689},0).wait(1).to({scaleX:0.1399,scaleY:0.1399,x:1388.3472,y:335.1453},0).wait(1).to({scaleX:0.1396,scaleY:0.1396,x:1388.383,y:335.0216},0).wait(1).to({scaleX:0.1393,scaleY:0.1393,x:1388.4187,y:334.8979},0).wait(1).to({scaleX:0.139,scaleY:0.139,x:1388.4545,y:334.7742},0).wait(1).to({scaleX:0.1387,scaleY:0.1387,x:1388.4903,y:334.6506},0).wait(1).to({scaleX:0.1384,scaleY:0.1384,x:1388.5261,y:334.5269},0).wait(1).to({scaleX:0.1381,scaleY:0.1381,x:1388.5619,y:334.4032},0).wait(1).to({scaleX:0.1378,scaleY:0.1378,x:1388.5977,y:334.2795},0).wait(1).to({scaleX:0.1375,scaleY:0.1375,x:1388.6335,y:334.1559},0).wait(1).to({scaleX:0.1372,scaleY:0.1372,x:1388.6693,y:334.0322},0).wait(1).to({scaleX:0.1369,scaleY:0.1369,x:1388.7051,y:333.9085},0).wait(1).to({scaleX:0.1366,scaleY:0.1366,x:1388.7409,y:333.7849},0).wait(1).to({scaleX:0.1364,scaleY:0.1364,x:1388.7767,y:333.6612},0).wait(1).to({scaleX:0.1361,scaleY:0.1361,x:1388.8125,y:333.5375},0).wait(1).to({scaleX:0.1358,scaleY:0.1358,x:1388.8483,y:333.4138},0).wait(1).to({scaleX:0.1355,scaleY:0.1355,x:1388.8841,y:333.2902},0).wait(1).to({scaleX:0.1352,scaleY:0.1352,x:1388.9199,y:333.1665},0).wait(1).to({scaleX:0.1349,scaleY:0.1349,x:1388.9557,y:333.0428},0).wait(1).to({scaleX:0.1346,scaleY:0.1346,x:1388.9915,y:332.9191},0).wait(1).to({scaleX:0.1343,scaleY:0.1343,x:1389.0273,y:332.7955},0).wait(1).to({scaleX:0.134,scaleY:0.134,x:1389.0631,y:332.6718},0).wait(1).to({scaleX:0.1337,scaleY:0.1337,x:1389.0989,y:332.5481},0).wait(1).to({scaleX:0.1334,scaleY:0.1334,x:1389.1347,y:332.4244},0).wait(1).to({scaleX:0.1331,scaleY:0.1331,x:1389.1705,y:332.3008},0).wait(1).to({scaleX:0.1328,scaleY:0.1328,x:1389.2062,y:332.1771},0).wait(1).to({scaleX:0.1325,scaleY:0.1325,x:1389.242,y:332.0534},0).wait(1).to({scaleX:0.1322,scaleY:0.1322,x:1389.2778,y:331.9297},0).wait(1).to({scaleX:0.1319,scaleY:0.1319,x:1389.3136,y:331.8061},0).wait(1).to({scaleX:0.1316,scaleY:0.1316,x:1389.3494,y:331.6824},0).wait(1).to({scaleX:0.1313,scaleY:0.1313,x:1389.3852,y:331.5587},0).wait(1).to({scaleX:0.1311,scaleY:0.1311,x:1389.421,y:331.435},0).wait(1).to({scaleX:0.1308,scaleY:0.1308,x:1389.4568,y:331.3114},0).wait(1).to({scaleX:0.1305,scaleY:0.1305,x:1389.4926,y:331.1877},0).wait(1).to({scaleX:0.1302,scaleY:0.1302,x:1389.5284,y:331.064},0).wait(1).to({scaleX:0.1299,scaleY:0.1299,x:1389.5642,y:330.9403},0).wait(1).to({scaleX:0.1296,scaleY:0.1296,x:1389.6,y:330.8167},0).wait(1).to({scaleX:0.1293,scaleY:0.1293,x:1389.6358,y:330.693},0).wait(1).to({scaleX:0.129,scaleY:0.129,x:1389.6716,y:330.5693},0).wait(1).to({scaleX:0.1287,scaleY:0.1287,x:1389.7074,y:330.4456},0).wait(1).to({scaleX:0.1284,scaleY:0.1284,x:1389.7432,y:330.322},0).wait(1).to({scaleX:0.1281,scaleY:0.1281,x:1389.779,y:330.1983},0).wait(1).to({scaleX:0.1278,scaleY:0.1278,x:1389.8148,y:330.0746},0).wait(1).to({scaleX:0.1275,scaleY:0.1275,x:1389.8506,y:329.951},0).wait(1).to({scaleX:0.1272,scaleY:0.1272,x:1389.8864,y:329.8273},0).wait(1).to({scaleX:0.1269,scaleY:0.1269,x:1389.9222,y:329.7036},0).wait(1).to({scaleX:0.1266,scaleY:0.1266,x:1389.958,y:329.5799},0).wait(1).to({scaleX:0.1263,scaleY:0.1263,x:1389.9937,y:329.4563},0).wait(1).to({scaleX:0.126,scaleY:0.126,x:1390.0295,y:329.3326},0).wait(1).to({scaleX:0.1257,scaleY:0.1257,x:1390.0653,y:329.2089},0).wait(1).to({scaleX:0.1255,scaleY:0.1255,x:1390.1011,y:329.0852},0).wait(1).to({scaleX:0.1252,scaleY:0.1252,x:1390.1369,y:328.9616},0).wait(1).to({scaleX:0.1249,scaleY:0.1249,x:1390.1727,y:328.8379},0).wait(1).to({scaleX:0.1246,scaleY:0.1246,x:1390.2085,y:328.7142},0).wait(1).to({scaleX:0.1243,scaleY:0.1243,x:1390.2443,y:328.5905},0).wait(1).to({scaleX:0.124,scaleY:0.124,x:1390.2801,y:328.4669},0).wait(1).to({scaleX:0.1237,scaleY:0.1237,x:1390.3159,y:328.3432},0).wait(1).to({scaleX:0.1234,scaleY:0.1234,x:1390.3517,y:328.2195},0).wait(1).to({scaleX:0.1231,scaleY:0.1231,x:1390.3875,y:328.0958},0).wait(1).to({scaleX:0.1228,scaleY:0.1228,x:1390.4233,y:327.9722},0).wait(1).to({scaleX:0.1225,scaleY:0.1225,x:1390.4591,y:327.8485},0).wait(1).to({scaleX:0.1222,scaleY:0.1222,x:1390.4949,y:327.7248},0).wait(1).to({scaleX:0.1219,scaleY:0.1219,x:1390.5307,y:327.6011},0).wait(1).to({scaleX:0.1216,scaleY:0.1216,x:1390.5665,y:327.4775},0).wait(1).to({scaleX:0.1213,scaleY:0.1213,x:1390.6023,y:327.3538},0).wait(1).to({scaleX:0.121,scaleY:0.121,x:1390.6381,y:327.2301},0).wait(1).to({scaleX:0.1207,scaleY:0.1207,x:1390.6739,y:327.1064},0).wait(1).to({scaleX:0.1204,scaleY:0.1204,x:1390.7097,y:326.9828},0).wait(1).to({scaleX:0.1202,scaleY:0.1202,x:1390.7455,y:326.8591},0).wait(1).to({scaleX:0.1199,scaleY:0.1199,x:1390.7812,y:326.7354},0).wait(1).to({scaleX:0.1196,scaleY:0.1196,x:1390.817,y:326.6117},0).wait(1).to({scaleX:0.1193,scaleY:0.1193,x:1390.8528,y:326.4881},0).wait(1).to({scaleX:0.119,scaleY:0.119,x:1390.8886,y:326.3644},0).wait(1).to({scaleX:0.1187,scaleY:0.1187,x:1390.9244,y:326.2407},0).wait(1).to({scaleX:0.1184,scaleY:0.1184,x:1390.9602,y:326.1171},0).wait(1).to({scaleX:0.1181,scaleY:0.1181,x:1390.996,y:325.9934},0).wait(1).to({scaleX:0.1178,scaleY:0.1178,x:1391.0318,y:325.8697},0).wait(1).to({scaleX:0.1175,scaleY:0.1175,x:1391.0676,y:325.746},0).wait(1).to({scaleX:0.1172,scaleY:0.1172,x:1391.1034,y:325.6224},0).wait(1).to({scaleX:0.1169,scaleY:0.1169,x:1391.1392,y:325.4987},0).wait(1).to({scaleX:0.1166,scaleY:0.1166,x:1391.175,y:325.375},0).wait(1).to({scaleX:0.1163,scaleY:0.1163,x:1391.2108,y:325.2513},0).wait(1).to({scaleX:0.116,scaleY:0.116,x:1391.2466,y:325.1277},0).wait(1).to({scaleX:0.1157,scaleY:0.1157,x:1391.2824,y:325.004},0).wait(1).to({scaleX:0.1154,scaleY:0.1154,x:1391.3182,y:324.8803},0).wait(1).to({scaleX:0.1151,scaleY:0.1151,x:1391.354,y:324.7566},0).wait(1).to({scaleX:0.1148,scaleY:0.1148,x:1391.3898,y:324.633},0).wait(1).to({scaleX:0.1146,scaleY:0.1146,x:1391.4256,y:324.5093},0).wait(1).to({scaleX:0.1143,scaleY:0.1143,x:1391.4614,y:324.3856},0).wait(1).to({scaleX:0.114,scaleY:0.114,x:1391.4972,y:324.2619},0).wait(1).to({scaleX:0.1137,scaleY:0.1137,x:1391.533,y:324.1383},0).wait(1).to({scaleX:0.1134,scaleY:0.1134,x:1391.5688,y:324.0146},0).wait(1).to({scaleX:0.1131,scaleY:0.1131,x:1391.6045,y:323.8909},0).wait(1).to({scaleX:0.1128,scaleY:0.1128,x:1391.6403,y:323.7672},0).wait(1).to({scaleX:0.1125,scaleY:0.1125,x:1391.6761,y:323.6436},0).wait(1).to({scaleX:0.1122,scaleY:0.1122,x:1391.7119,y:323.5199},0).wait(1).to({scaleX:0.1119,scaleY:0.1119,x:1391.7477,y:323.3962},0).wait(1).to({scaleX:0.1116,scaleY:0.1116,x:1391.7835,y:323.2725},0).wait(1).to({scaleX:0.1113,scaleY:0.1113,x:1391.8193,y:323.1489},0).wait(1).to({scaleX:0.111,scaleY:0.111,x:1391.8551,y:323.0252},0).wait(1).to({scaleX:0.1107,scaleY:0.1107,x:1391.8909,y:322.9015},0).wait(1).to({scaleX:0.1104,scaleY:0.1104,x:1391.9267,y:322.7778},0).wait(1).to({scaleX:0.1101,scaleY:0.1101,x:1391.9625,y:322.6542},0).wait(1).to({scaleX:0.1098,scaleY:0.1098,x:1391.9983,y:322.5305},0).wait(1).to({scaleX:0.1095,scaleY:0.1095,x:1392.0341,y:322.4068},0).wait(1).to({scaleX:0.1093,scaleY:0.1093,x:1392.0699,y:322.2831},0).wait(1).to({scaleX:0.109,scaleY:0.109,x:1392.1057,y:322.1595},0).wait(1).to({scaleX:0.1087,scaleY:0.1087,x:1392.1415,y:322.0358},0).wait(1).to({scaleX:0.1084,scaleY:0.1084,x:1392.1773,y:321.9121},0).wait(1).to({scaleX:0.1081,scaleY:0.1081,x:1392.2131,y:321.7885},0).wait(1).to({scaleX:0.1078,scaleY:0.1078,x:1392.2489,y:321.6648},0).wait(1).to({scaleX:0.1075,scaleY:0.1075,x:1392.2847,y:321.5411},0).wait(1).to({scaleX:0.1072,scaleY:0.1072,x:1392.3205,y:321.4174},0).wait(1).to({scaleX:0.1069,scaleY:0.1069,x:1392.3563,y:321.2938},0).wait(1).to({scaleX:0.1066,scaleY:0.1066,x:1392.392,y:321.1701},0).wait(1).to({scaleX:0.1063,scaleY:0.1063,x:1392.4278,y:321.0464},0).wait(1).to({scaleX:0.106,scaleY:0.106,x:1392.4636,y:320.9227},0).wait(1).to({scaleX:0.1057,scaleY:0.1057,x:1392.4994,y:320.7991},0).wait(1).to({scaleX:0.1054,scaleY:0.1054,x:1392.5352,y:320.6754},0).wait(1).to({scaleX:0.1051,scaleY:0.1051,x:1392.571,y:320.5517},0).wait(1).to({scaleX:0.1048,scaleY:0.1048,x:1392.6068,y:320.428},0).wait(1).to({scaleX:0.1045,scaleY:0.1045,x:1392.6426,y:320.3044},0).wait(1).to({scaleX:0.1042,scaleY:0.1042,x:1392.6784,y:320.1807},0).wait(1).to({scaleX:0.1039,scaleY:0.1039,x:1392.7142,y:320.057},0).wait(1).to({scaleX:0.1037,scaleY:0.1037,x:1392.75,y:319.9333},0).wait(1).to({scaleX:0.1034,scaleY:0.1034,x:1392.7858,y:319.8097},0).wait(1).to({scaleX:0.1031,scaleY:0.1031,x:1392.8216,y:319.686},0).wait(1).to({scaleX:0.1028,scaleY:0.1028,x:1392.8574,y:319.5623},0).wait(1).to({scaleX:0.1025,scaleY:0.1025,x:1392.8932,y:319.4386},0).wait(1).to({scaleX:0.1022,scaleY:0.1022,x:1392.929,y:319.315},0).wait(1).to({scaleX:0.1019,scaleY:0.1019,x:1392.9648,y:319.1913},0).wait(1).to({scaleX:0.1016,scaleY:0.1016,x:1393.0006,y:319.0676},0).wait(1).to({scaleX:0.1013,scaleY:0.1013,x:1393.0364,y:318.9439},0).wait(1).to({scaleX:0.101,scaleY:0.101,x:1393.0722,y:318.8203},0).wait(1).to({scaleX:0.1007,scaleY:0.1007,x:1393.108,y:318.6966},0).wait(1).to({scaleX:0.1004,scaleY:0.1004,x:1393.1437,y:318.5729},0).wait(1).to({scaleX:0.1001,scaleY:0.1001,x:1393.1795,y:318.4492},0).wait(1).to({scaleX:0.0998,scaleY:0.0998,x:1393.2153,y:318.3256},0).wait(1).to({scaleX:0.0995,scaleY:0.0995,x:1393.2511,y:318.2019},0).wait(1).to({scaleX:0.0992,scaleY:0.0992,x:1393.2869,y:318.0782},0).wait(1).to({scaleX:0.0989,scaleY:0.0989,x:1393.3227,y:317.9546},0).wait(1).to({scaleX:0.0986,scaleY:0.0986,x:1393.3585,y:317.8309},0).wait(1).to({scaleX:0.0984,scaleY:0.0984,x:1393.3943,y:317.7072},0).wait(1).to({scaleX:0.0981,scaleY:0.0981,x:1393.4301,y:317.5835},0).wait(1).to({scaleX:0.0978,scaleY:0.0978,x:1393.4659,y:317.4599},0).wait(1).to({scaleX:0.0975,scaleY:0.0975,x:1393.5017,y:317.3362},0).wait(1).to({scaleX:0.0972,scaleY:0.0972,x:1393.5375,y:317.2125},0).wait(1).to({scaleX:0.0969,scaleY:0.0969,x:1393.5733,y:317.0888},0).wait(1).to({scaleX:0.0966,scaleY:0.0966,x:1393.6091,y:316.9652},0).wait(1).to({scaleX:0.0963,scaleY:0.0963,x:1393.6449,y:316.8415},0).wait(1).to({scaleX:0.096,scaleY:0.096,x:1393.6807,y:316.7178},0).wait(1).to({scaleX:0.0957,scaleY:0.0957,x:1393.7165,y:316.5941},0).wait(1).to({scaleX:0.0954,scaleY:0.0954,x:1393.7523,y:316.4705},0).wait(1).to({scaleX:0.0951,scaleY:0.0951,x:1393.7881,y:316.3468},0).wait(1).to({scaleX:0.0948,scaleY:0.0948,x:1393.8239,y:316.2231},0).wait(1).to({scaleX:0.0945,scaleY:0.0945,x:1393.8597,y:316.0994},0).wait(1).to({scaleX:0.0942,scaleY:0.0942,x:1393.8955,y:315.9758},0).wait(1).to({scaleX:0.0939,scaleY:0.0939,x:1393.9312,y:315.8521},0).wait(1).to({scaleX:0.0936,scaleY:0.0936,x:1393.967,y:315.7284},0).wait(1).to({scaleX:0.0933,scaleY:0.0933,x:1394.0028,y:315.6047},0).wait(1).to({scaleX:0.093,scaleY:0.093,x:1394.0386,y:315.4811},0).wait(1).to({scaleX:0.0928,scaleY:0.0928,x:1394.0744,y:315.3574},0).wait(1).to({scaleX:0.0925,scaleY:0.0925,x:1394.1102,y:315.2337},0).wait(1).to({scaleX:0.0922,scaleY:0.0922,x:1394.146,y:315.11},0).wait(1).to({scaleX:0.0919,scaleY:0.0919,x:1394.1818,y:314.9864},0).wait(1).to({scaleX:0.0916,scaleY:0.0916,x:1394.2176,y:314.8627},0).wait(1).to({scaleX:0.0913,scaleY:0.0913,x:1394.2534,y:314.739},0).wait(1).to({scaleX:0.091,scaleY:0.091,x:1394.2892,y:314.6153},0).wait(1).to({scaleX:0.0907,scaleY:0.0907,x:1394.325,y:314.4917},0).wait(1).to({scaleX:0.0904,scaleY:0.0904,x:1394.3608,y:314.368},0).wait(1).to({scaleX:0.0901,scaleY:0.0901,x:1394.3966,y:314.2443},0).wait(1).to({scaleX:0.0898,scaleY:0.0898,x:1394.4324,y:314.1206},0).wait(1).to({scaleX:0.0895,scaleY:0.0895,x:1394.4682,y:313.997},0).wait(1).to({scaleX:0.0892,scaleY:0.0892,x:1394.504,y:313.8733},0).wait(1).to({scaleX:0.0889,scaleY:0.0889,x:1394.5398,y:313.7496},0).wait(1).to({scaleX:0.0886,scaleY:0.0886,x:1394.5756,y:313.626},0).wait(1).to({scaleX:0.0883,scaleY:0.0883,x:1394.6114,y:313.5023},0).wait(1).to({scaleX:0.088,scaleY:0.088,x:1394.6472,y:313.3786},0).wait(1).to({scaleX:0.0877,scaleY:0.0877,x:1394.683,y:313.2549},0).wait(1).to({scaleX:0.0875,scaleY:0.0875,x:1394.7187,y:313.1313},0).wait(1).to({scaleX:0.0872,scaleY:0.0872,x:1394.7545,y:313.0076},0).wait(1).to({scaleX:0.0869,scaleY:0.0869,x:1394.7903,y:312.8839},0).wait(1).to({scaleX:0.0866,scaleY:0.0866,x:1394.8261,y:312.7602},0).wait(1).to({scaleX:0.0863,scaleY:0.0863,x:1394.8619,y:312.6366},0).wait(1).to({scaleX:0.086,scaleY:0.086,x:1394.8977,y:312.5129},0).wait(1).to({scaleX:0.0857,scaleY:0.0857,x:1394.9335,y:312.3892},0).wait(1).to({scaleX:0.0854,scaleY:0.0854,x:1394.9693,y:312.2655},0).wait(1).to({scaleX:0.0851,scaleY:0.0851,x:1395.0051,y:312.1419},0).wait(1).to({scaleX:0.0848,scaleY:0.0848,x:1395.0409,y:312.0182},0).wait(1).to({scaleX:0.0845,scaleY:0.0845,x:1395.0767,y:311.8945},0).wait(1).to({scaleX:0.0842,scaleY:0.0842,x:1395.1125,y:311.7708},0).wait(1).to({scaleX:0.0839,scaleY:0.0839,x:1395.1483,y:311.6472},0).wait(1).to({scaleX:0.0836,scaleY:0.0836,x:1395.1841,y:311.5235},0).wait(1).to({scaleX:0.0833,scaleY:0.0833,x:1395.2199,y:311.3998},0).wait(1).to({scaleX:0.083,scaleY:0.083,x:1395.2557,y:311.2761},0).wait(1).to({scaleX:0.0827,scaleY:0.0827,x:1395.2915,y:311.1525},0).wait(1).to({scaleX:0.0824,scaleY:0.0824,x:1395.3273,y:311.0288},0).wait(1).to({scaleX:0.0821,scaleY:0.0821,x:1395.3631,y:310.9051},0).wait(1).to({scaleX:0.0819,scaleY:0.0819,x:1395.3989,y:310.7814},0).wait(1).to({scaleX:0.0816,scaleY:0.0816,x:1395.4347,y:310.6578},0).wait(1).to({scaleX:0.0813,scaleY:0.0813,x:1395.4705,y:310.5341},0).wait(1).to({scaleX:0.081,scaleY:0.081,x:1395.5063,y:310.4104},0).wait(1).to({scaleX:0.0807,scaleY:0.0807,x:1395.542,y:310.2867},0).wait(1).to({scaleX:0.0804,scaleY:0.0804,x:1395.5778,y:310.1631},0).wait(1).to({scaleX:0.0801,scaleY:0.0801,x:1395.6136,y:310.0394},0).wait(1).to({scaleX:0.0798,scaleY:0.0798,x:1395.6494,y:309.9157},0).wait(1).to({scaleX:0.0795,scaleY:0.0795,x:1395.6852,y:309.7921},0).wait(1).to({scaleX:0.0792,scaleY:0.0792,x:1395.721,y:309.6684},0).wait(1).to({scaleX:0.0789,scaleY:0.0789,x:1395.7568,y:309.5447},0).wait(1).to({scaleX:0.0786,scaleY:0.0786,x:1395.7926,y:309.421},0).wait(1).to({scaleX:0.0783,scaleY:0.0783,x:1395.8284,y:309.2974},0).wait(1).to({scaleX:0.078,scaleY:0.078,x:1395.8642,y:309.1737},0).wait(1).to({scaleX:0.0777,scaleY:0.0777,x:1395.9,y:309.05},0).wait(1).to({scaleX:0.0781,scaleY:0.0781,x:1396.6987,y:309.1829},0).wait(1).to({scaleX:0.0785,scaleY:0.0785,x:1397.4974,y:309.3158},0).wait(1).to({scaleX:0.0788,scaleY:0.0788,x:1398.2961,y:309.4487},0).wait(1).to({scaleX:0.0792,scaleY:0.0792,x:1399.0947,y:309.5816},0).wait(1).to({scaleX:0.0796,scaleY:0.0796,x:1399.8934,y:309.7145},0).wait(1).to({scaleX:0.0799,scaleY:0.0799,x:1400.6921,y:309.8474},0).wait(1).to({scaleX:0.0803,scaleY:0.0803,x:1401.4908,y:309.9803},0).wait(1).to({scaleX:0.0807,scaleY:0.0807,x:1402.2895,y:310.1132},0).wait(1).to({scaleX:0.081,scaleY:0.081,x:1403.0882,y:310.2461},0).wait(1).to({scaleX:0.0814,scaleY:0.0814,x:1403.8868,y:310.3789},0).wait(1).to({scaleX:0.0818,scaleY:0.0818,x:1404.6855,y:310.5118},0).wait(1).to({scaleX:0.0821,scaleY:0.0821,x:1405.4842,y:310.6447},0).wait(1).to({scaleX:0.0825,scaleY:0.0825,x:1406.2829,y:310.7776},0).wait(1).to({scaleX:0.0829,scaleY:0.0829,x:1407.0816,y:310.9105},0).wait(1).to({scaleX:0.0832,scaleY:0.0832,x:1407.8803,y:311.0434},0).wait(1).to({scaleX:0.0836,scaleY:0.0836,x:1408.6789,y:311.1763},0).wait(1).to({scaleX:0.084,scaleY:0.084,x:1409.4776,y:311.3092},0).wait(1).to({scaleX:0.0844,scaleY:0.0844,x:1410.2763,y:311.4421},0).wait(1).to({scaleX:0.0847,scaleY:0.0847,x:1411.075,y:311.575},0).wait(1).to({scaleX:0.0851,scaleY:0.0851,x:1411.8737,y:311.7079},0).wait(1).to({scaleX:0.0855,scaleY:0.0855,x:1412.6724,y:311.8408},0).wait(1).to({scaleX:0.0858,scaleY:0.0858,x:1413.4711,y:311.9737},0).wait(1).to({scaleX:0.0862,scaleY:0.0862,x:1414.2697,y:312.1066},0).wait(1).to({scaleX:0.0866,scaleY:0.0866,x:1415.0684,y:312.2395},0).wait(1).to({scaleX:0.0869,scaleY:0.0869,x:1415.8671,y:312.3724},0).wait(1).to({scaleX:0.0873,scaleY:0.0873,x:1416.6658,y:312.5053},0).wait(1).to({scaleX:0.0877,scaleY:0.0877,x:1417.4645,y:312.6382},0).wait(1).to({scaleX:0.088,scaleY:0.088,x:1418.2632,y:312.7711},0).wait(1).to({scaleX:0.0884,scaleY:0.0884,x:1419.0618,y:312.904},0).wait(1).to({scaleX:0.0888,scaleY:0.0888,x:1419.8605,y:313.0368},0).wait(1).to({scaleX:0.0891,scaleY:0.0891,x:1420.6592,y:313.1697},0).wait(1).to({scaleX:0.0895,scaleY:0.0895,x:1421.4579,y:313.3026},0).wait(1).to({scaleX:0.0899,scaleY:0.0899,x:1422.2566,y:313.4355},0).wait(1).to({scaleX:0.0902,scaleY:0.0902,x:1423.0553,y:313.5684},0).wait(1).to({scaleX:0.0906,scaleY:0.0906,x:1423.8539,y:313.7013},0).wait(1).to({scaleX:0.091,scaleY:0.091,x:1424.6526,y:313.8342},0).wait(1).to({scaleX:0.0913,scaleY:0.0913,x:1425.4513,y:313.9671},0).wait(1).to({scaleX:0.0917,scaleY:0.0917,x:1426.25,y:314.1},0).wait(1).to({scaleX:0.0921,scaleY:0.0921,x:1430.5176,y:316.7177},0).wait(1).to({scaleX:0.0924,scaleY:0.0924,x:1434.7853,y:319.3353},0).wait(1).to({scaleX:0.0928,scaleY:0.0928,x:1439.0529,y:321.9529},0).wait(1).to({scaleX:0.0932,scaleY:0.0932,x:1443.3206,y:324.5706},0).wait(1).to({scaleX:0.0935,scaleY:0.0935,x:1447.5882,y:327.1882},0).wait(1).to({scaleX:0.0939,scaleY:0.0939,x:1451.8559,y:329.8059},0).wait(1).to({scaleX:0.0943,scaleY:0.0943,x:1456.1235,y:332.4235},0).wait(1).to({scaleX:0.0947,scaleY:0.0947,x:1460.3912,y:335.0412},0).wait(1).to({scaleX:0.095,scaleY:0.095,x:1464.6588,y:337.6588},0).wait(1).to({scaleX:0.0954,scaleY:0.0954,x:1468.9265,y:340.2765},0).wait(1).to({scaleX:0.0958,scaleY:0.0958,x:1473.1941,y:342.8941},0).wait(1).to({scaleX:0.0961,scaleY:0.0961,x:1477.4618,y:345.5118},0).wait(1).to({scaleX:0.0965,scaleY:0.0965,x:1481.7294,y:348.1294},0).wait(1).to({scaleX:0.0969,scaleY:0.0969,x:1485.9971,y:350.7471},0).wait(1).to({scaleX:0.0972,scaleY:0.0972,x:1490.2647,y:353.3647},0).wait(1).to({scaleX:0.0976,scaleY:0.0976,x:1494.5324,y:355.9824},0).wait(1).to({scaleX:0.098,scaleY:0.098,x:1498.8,y:358.6},0).wait(1).to({scaleX:0.1008,scaleY:0.1008,x:1498.3032,y:365.0636},0).wait(1).to({scaleX:0.1037,scaleY:0.1037,x:1497.8065,y:371.5272},0).wait(1).to({scaleX:0.1065,scaleY:0.1065,x:1497.3097,y:377.9908},0).wait(1).to({scaleX:0.1093,scaleY:0.1093,x:1496.8129,y:384.4544},0).wait(1).to({scaleX:0.1122,scaleY:0.1122,x:1496.3161,y:390.918},0).wait(1).to({scaleX:0.115,scaleY:0.115,x:1495.8194,y:397.3816},0).wait(1).to({scaleX:0.1179,scaleY:0.1179,x:1495.3226,y:403.8451},0).wait(1).to({scaleX:0.1207,scaleY:0.1207,x:1494.8258,y:410.3087},0).wait(1).to({scaleX:0.1236,scaleY:0.1236,x:1494.329,y:416.7723},0).wait(1).to({scaleX:0.1264,scaleY:0.1264,x:1493.8323,y:423.2359},0).wait(1).to({scaleX:0.1293,scaleY:0.1293,x:1493.3355,y:429.6995},0).wait(1).to({scaleX:0.1321,scaleY:0.1321,x:1492.8387,y:436.1631},0).wait(1).to({scaleX:0.135,scaleY:0.135,x:1492.342,y:442.6267},0).wait(1).to({scaleX:0.1378,scaleY:0.1378,x:1491.8452,y:449.0903},0).wait(1).to({scaleX:0.1407,scaleY:0.1407,x:1491.3484,y:455.5539},0).wait(1).to({scaleX:0.1435,scaleY:0.1435,x:1490.8516,y:462.0175},0).wait(1).to({scaleX:0.1464,scaleY:0.1464,x:1490.3549,y:468.4811},0).wait(1).to({scaleX:0.1492,scaleY:0.1492,x:1489.8581,y:474.9446},0).wait(1).to({scaleX:0.152,scaleY:0.152,x:1489.3613,y:481.4082},0).wait(1).to({scaleX:0.1549,scaleY:0.1549,x:1488.8645,y:487.8718},0).wait(1).to({scaleX:0.1577,scaleY:0.1577,x:1488.3678,y:494.3354},0).wait(1).to({scaleX:0.1606,scaleY:0.1606,x:1487.871,y:500.799},0).wait(1).to({scaleX:0.1634,scaleY:0.1634,x:1487.3742,y:507.2626},0).wait(1).to({scaleX:0.1663,scaleY:0.1663,x:1486.8775,y:513.7262},0).wait(1).to({scaleX:0.1691,scaleY:0.1691,x:1486.3807,y:520.1898},0).wait(1).to({scaleX:0.172,scaleY:0.172,x:1485.8839,y:526.6534},0).wait(1).to({scaleX:0.1748,scaleY:0.1748,x:1485.3871,y:533.117},0).wait(1).to({scaleX:0.1777,scaleY:0.1777,x:1484.8904,y:539.5806},0).wait(1).to({scaleX:0.1805,scaleY:0.1805,x:1484.3936,y:546.0441},0).wait(1).to({scaleX:0.1834,scaleY:0.1834,x:1483.8968,y:552.5077},0).wait(1).to({scaleX:0.1862,scaleY:0.1862,x:1483.4,y:558.9713},0).wait(1).to({scaleX:0.1891,scaleY:0.1891,x:1482.9033,y:565.4349},0).wait(1).to({scaleX:0.1919,scaleY:0.1919,x:1482.4065,y:571.8985},0).wait(1).to({scaleX:0.1948,scaleY:0.1948,x:1481.9097,y:578.3621},0).wait(1).to({scaleX:0.1976,scaleY:0.1976,x:1481.413,y:584.8257},0).wait(1).to({scaleX:0.2004,scaleY:0.2004,x:1480.9162,y:591.2893},0).wait(1).to({scaleX:0.2033,scaleY:0.2033,x:1480.4194,y:597.7529},0).wait(1).to({scaleX:0.2061,scaleY:0.2061,x:1479.9226,y:604.2165},0).wait(1).to({scaleX:0.209,scaleY:0.209,x:1479.4259,y:610.6801},0).wait(1).to({scaleX:0.2118,scaleY:0.2118,x:1478.9291,y:617.1436},0).wait(1).to({scaleX:0.2147,scaleY:0.2147,x:1478.4323,y:623.6072},0).wait(1).to({scaleX:0.2175,scaleY:0.2175,x:1477.9355,y:630.0708},0).wait(1).to({scaleX:0.2204,scaleY:0.2204,x:1477.4388,y:636.5344},0).wait(1).to({scaleX:0.2232,scaleY:0.2232,x:1476.942,y:642.998},0).wait(1).to({scaleX:0.2261,scaleY:0.2261,x:1473.7758,y:642.3731},0).wait(1).to({scaleX:0.2289,scaleY:0.2289,x:1470.6096,y:641.7482},0).wait(1).to({scaleX:0.2318,scaleY:0.2318,x:1467.4433,y:641.1233},0).wait(1).to({scaleX:0.2346,scaleY:0.2346,x:1464.2771,y:640.4984},0).wait(1).to({scaleX:0.2375,scaleY:0.2375,x:1461.1109,y:639.8736},0).wait(1).to({scaleX:0.2403,scaleY:0.2403,x:1457.9447,y:639.2487},0).wait(1).to({scaleX:0.2431,scaleY:0.2431,x:1454.7784,y:638.6238},0).wait(1).to({scaleX:0.246,scaleY:0.246,x:1451.6122,y:637.9989},0).wait(1).to({scaleX:0.2488,scaleY:0.2488,x:1448.446,y:637.374},0).wait(1).to({scaleX:0.2517,scaleY:0.2517,x:1445.2798,y:636.7491},0).wait(1).to({scaleX:0.2545,scaleY:0.2545,x:1442.1136,y:636.1242},0).wait(1).to({scaleX:0.2574,scaleY:0.2574,x:1438.9473,y:635.4993},0).wait(1).to({scaleX:0.2602,scaleY:0.2602,x:1435.7811,y:634.8744},0).wait(1).to({scaleX:0.2631,scaleY:0.2631,x:1432.6149,y:634.2496},0).wait(1).to({scaleX:0.2659,scaleY:0.2659,x:1429.4487,y:633.6247},0).wait(1).to({scaleX:0.2688,scaleY:0.2688,x:1426.2824,y:632.9998},0).wait(1).to({scaleX:0.2716,scaleY:0.2716,x:1423.1162,y:632.3749},0).wait(1).to({scaleX:0.2745,scaleY:0.2745,x:1419.95,y:631.75},0).wait(67).to({_off:true},1).wait(1));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.setTransform(998.5,500.9,1,1,0,0,0,998.5,500.9);
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 0
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(2).to({regX:1001.6,regY:500.1,scaleX:1.0053,scaleY:1.0053,x:998.45,y:501},0).wait(883).to({regX:1430.5,regY:621.1,scaleX:3.6435,scaleY:3.6435,x:998.3,y:501.15},0).wait(2));

	// musk_obj_
	this.musk = new lib.Scene_1_musk();
	this.musk.name = "musk";
	this.musk.setTransform(1446.2,732.8,1,1,0,0,0,1446.2,732.8);
	this.musk.depth = 0;
	this.musk.isAttachedToCamera = 0
	this.musk.isAttachedToMask = 0
	this.musk.layerDepth = 0
	this.musk.layerIndex = 1
	this.musk.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.musk).to({_off:true},885).wait(2));

	// legg_obj_
	this.legg = new lib.Scene_1_legg();
	this.legg.name = "legg";
	this.legg.depth = 0;
	this.legg.isAttachedToCamera = 0
	this.legg.isAttachedToMask = 0
	this.legg.layerDepth = 0
	this.legg.layerIndex = 2
	this.legg.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.legg).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(575).to({regX:1281.5,regY:262.7,scaleX:8.73,scaleY:8.73,x:0.45},0).wait(12).to({regX:1285.3,regY:263.1,scaleX:9.0084,scaleY:9.0084,x:0,y:-0.45},0).wait(2).to({regX:1285.9,regY:263.2,scaleX:9.0557,scaleY:9.0557,y:0},0).wait(1).to({regX:1286.2,scaleX:9.0808,scaleY:9.0808,x:-0.45,y:-0.45},0).wait(1).to({regX:1286.5,scaleX:9.1048,scaleY:9.1048},0).to({_off:true},1).wait(294));

	// eggs_obj_
	this.eggs = new lib.Scene_1_eggs();
	this.eggs.name = "eggs";
	this.eggs.depth = 0;
	this.eggs.isAttachedToCamera = 0
	this.eggs.isAttachedToMask = 0
	this.eggs.layerDepth = 0
	this.eggs.layerIndex = 3
	this.eggs.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eggs).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(120).to({regX:511.7,regY:101.2,scaleX:1.4693,scaleY:1.4693,x:0.1,y:-0.1},0).wait(9).to({regX:549.7,regY:108.9,scaleX:1.5224,scaleY:1.5224,x:0,y:0.1},0).wait(8).to({regX:583.5,regY:115.5,scaleX:1.573,scaleY:1.573,y:0},0).wait(9).to({regX:621.6,regY:123,scaleX:1.634,scaleY:1.634,x:0.1,y:-0.05},0).wait(8).to({regX:655.4,regY:129.7,scaleX:1.6924,scaleY:1.6924,x:0},0).wait(8).to({regX:689.2,regY:136.4,scaleX:1.7552,scaleY:1.7552},0).wait(8).to({regX:723.1,regY:143.2,scaleX:1.8227,scaleY:1.8227,y:0.1},0).wait(7).to({regX:752.7,regY:149,scaleX:1.8862,scaleY:1.8862,x:0.05,y:0},0).wait(8).to({regX:786.5,regY:155.7,scaleX:1.9645,scaleY:1.9645},0).wait(8).to({regX:820.4,regY:162.4,scaleX:2.0495,scaleY:2.0495,x:0.15,y:0.05},0).wait(7).to({regX:849.9,regY:168.2,scaleX:2.1301,scaleY:2.1301,x:0,y:-0.05},0).wait(8).to({regX:883.7,regY:175,scaleX:2.2305,scaleY:2.2305,y:0.15},0).wait(8).to({regX:917.6,regY:181.7,scaleX:2.3407,scaleY:2.3407,x:0.15},0).wait(8).to({regX:951.4,regY:188.3,scaleX:2.4624,scaleY:2.4624,x:0,y:-0.1},0).wait(8).to({regX:985.2,regY:195.1,scaleX:2.5975,scaleY:2.5975,x:-0.1,y:0.15},0).wait(9).to({regX:1023.3,regY:202.6,scaleX:2.7684,scaleY:2.7684,x:0},0).wait(9).to({regX:1061.3,regY:210.1,scaleX:2.9633,scaleY:2.9633,x:-0.15,y:0.05},0).wait(6).to({regX:1086.7,regY:215.2,scaleX:3.1092,scaleY:3.1092,x:0,y:0.2},0).wait(9).to({regX:1107.5,regY:219.6,scaleX:3.261,scaleY:3.261,x:0.2,y:0},0).wait(7).to({regX:1112.8,regY:221.2,scaleX:3.3282,scaleY:3.3282,x:0.15},0).wait(22).to({regX:1129.4,regY:226.1,scaleX:3.5584,scaleY:3.5584,x:0,y:0.2},0).wait(43).to({regX:1162,regY:235.7,scaleX:4.115,scaleY:4.115,x:-0.2},0).wait(15).to({regX:1173.4,regY:239,scaleX:4.3525,scaleY:4.3525,x:0,y:0},0).wait(21).to({regX:1189.4,regY:243.8,scaleX:4.7353,scaleY:4.7353,y:0.25},0).wait(7).to({regX:1194.7,regY:245.2,scaleX:4.878,scaleY:4.878,x:0.2,y:-0.2},0).wait(9).to({regX:1201.5,regY:247.3,scaleX:5.0752,scaleY:5.0752,x:0.05,y:0.05},0).wait(18).to({regX:1215.2,regY:251.3,scaleX:5.5207,scaleY:5.5207},0).wait(23).to({regX:1232.6,regY:256.4,scaleX:6.219,scaleY:6.219,x:0,y:-0.3},0).wait(18).to({regX:1241,regY:258.2,scaleX:6.5806,scaleY:6.5806,y:0},0).wait(13).to({regX:1245.1,regY:258.7,scaleX:6.7507,scaleY:6.7507},0).wait(9).to({regX:1248,regY:258.9,scaleX:6.8739,scaleY:6.8739,y:-0.35},0).wait(7).to({regX:1250.2,regY:259.2,scaleX:6.9727,scaleY:6.9727,x:-0.35},0).wait(5).to({regX:1251.8,regY:259.4,scaleX:7.0454,scaleY:7.0454,x:0.05},0).wait(3).to({regX:1252.8,regY:259.5,scaleX:7.0896,scaleY:7.0896,x:0,y:0.05},0).wait(1).to({regX:1253.1,regY:259.6,scaleX:7.1042,scaleY:7.1042,y:0.4},0).wait(1).to({regX:1253.4,scaleX:7.1188,scaleY:7.1188,x:0.05},0).wait(1).to({regX:1253.8,scaleX:7.1335,scaleY:7.1335,x:0.35,y:-0.35},0).wait(27).to({regX:1262.4,regY:260.6,scaleX:7.5633,scaleY:7.5633,x:0.4,y:0.05},0).wait(6).to({regX:1264.2,regY:260.8,scaleX:7.6659,scaleY:7.6659,x:-0.35,y:0},0).wait(5).to({regX:1265.9,regY:260.9,scaleX:7.753,scaleY:7.753,x:0.35,y:-0.35},0).wait(7).to({regX:1268.1,regY:261.2,scaleX:7.8788,scaleY:7.8788,x:0},0).wait(7).to({regX:1270.3,regY:261.4,scaleX:8.0088,scaleY:8.0088,y:-0.4},0).wait(15).to({regX:1275.1,regY:262,scaleX:8.303,scaleY:8.303,y:0},0).wait(20).to({regX:1281.5,regY:262.7,scaleX:8.73,scaleY:8.73,x:0.45},0).wait(50).to({regX:1297.4,regY:264.4,scaleX:10.0177,scaleY:10.0177,x:0,y:-0.45},0).wait(4).to({regX:1298.7,regY:264.6,scaleX:10.1386,scaleY:10.1386,y:0.05},0).wait(11).to({regX:1302.2,regY:265,scaleX:10.4824,scaleY:10.4824},0).wait(25).to({regX:1310.1,regY:265.9,scaleX:11.36,scaleY:11.36},0).wait(6).to({regX:1312,regY:266.1,scaleX:11.5931,scaleY:11.5931,x:-0.55},0).wait(21).to({regX:1318.8,regY:266.9,scaleX:12.4878,scaleY:12.4878,x:0.65,y:0.65},0).wait(15).to({regX:1324.4,regY:266.6,scaleX:12.4546,scaleY:12.4546,x:0,y:-0.6},0).wait(19).to({regX:1332.9,regY:265.4,scaleX:11.4573,scaleY:11.4573,x:0.05,y:-0.55},0).wait(5).to({regX:1335.1,regY:265.1,scaleX:11.22,scaleY:11.22,x:0,y:0},0).wait(3).to({regX:1336.5,regY:264.9,scaleX:11.0834,scaleY:11.0834,x:0.55,y:0.05},0).wait(1).to({regX:1461.5,regY:509.4,scaleX:1,scaleY:1,x:125.1,y:244.55},0).wait(80).to({_off:true},1).wait(70));

	// moov_obj_
	this.moov = new lib.Scene_1_moov();
	this.moov.name = "moov";
	this.moov.depth = 0;
	this.moov.isAttachedToCamera = 0
	this.moov.isAttachedToMask = 0
	this.moov.layerDepth = 0
	this.moov.layerIndex = 4
	this.moov.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.moov).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(734).to({regX:1336.5,regY:264.9,scaleX:11.0834,scaleY:11.0834,x:0.55,y:0.05},0).to({_off:true},150).wait(2));

	// egg__2_br_obj_
	this.egg__2_br = new lib.Scene_1_egg__2_br();
	this.egg__2_br.name = "egg__2_br";
	this.egg__2_br.depth = 0;
	this.egg__2_br.isAttachedToCamera = 0
	this.egg__2_br.isAttachedToMask = 0
	this.egg__2_br.layerDepth = 0
	this.egg__2_br.layerIndex = 5
	this.egg__2_br.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.egg__2_br).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(575).to({regX:1281.5,regY:262.7,scaleX:8.73,scaleY:8.73,x:0.45},0).wait(1).to({regX:1465.6,regY:338.6,scaleX:1,scaleY:1,x:184.2,y:75.95},0).wait(18).to({_off:true},1).wait(291));

	// egg__up_obj_
	this.egg__up = new lib.Scene_1_egg__up();
	this.egg__up.name = "egg__up";
	this.egg__up.depth = 0;
	this.egg__up.isAttachedToCamera = 0
	this.egg__up.isAttachedToMask = 0
	this.egg__up.layerDepth = 0
	this.egg__up.layerIndex = 6
	this.egg__up.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.egg__up).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(488).to({regX:1253.8,regY:259.6,scaleX:7.1335,scaleY:7.1335,x:0.35,y:-0.35},0).wait(1).to({regX:1348.3,regY:413.5,scaleX:1,scaleY:1,x:94.6,y:153.9},0).wait(25).to({_off:true},1).wait(371));

	// egg_dwon_obj_
	this.egg_dwon = new lib.Scene_1_egg_dwon();
	this.egg_dwon.name = "egg_dwon";
	this.egg_dwon.depth = 0;
	this.egg_dwon.isAttachedToCamera = 0
	this.egg_dwon.isAttachedToMask = 0
	this.egg_dwon.layerDepth = 0
	this.egg_dwon.layerIndex = 7
	this.egg_dwon.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.egg_dwon).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(488).to({regX:1253.8,regY:259.6,scaleX:7.1335,scaleY:7.1335,x:0.35,y:-0.35},0).wait(27).to({regX:1262.4,regY:260.6,scaleX:7.5633,scaleY:7.5633,x:0.4,y:0.05},0).to({_off:true},369).wait(2));

	// fledgling_obj_
	this.fledgling = new lib.Scene_1_fledgling();
	this.fledgling.name = "fledgling";
	this.fledgling.depth = 0;
	this.fledgling.isAttachedToCamera = 0
	this.fledgling.isAttachedToMask = 0
	this.fledgling.layerDepth = 0
	this.fledgling.layerIndex = 8
	this.fledgling.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fledgling).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(184).to({regX:782.2,regY:154.8,scaleX:1.9544,scaleY:1.9544,x:-0.1,y:-0.05},0).wait(264).to({regX:1241,regY:258.2,scaleX:6.5806,scaleY:6.5806,x:0,y:0},0).wait(13).to({regX:1245.1,regY:258.7,scaleX:6.7507,scaleY:6.7507},0).wait(9).to({regX:1248,regY:258.9,scaleX:6.8739,scaleY:6.8739,y:-0.35},0).wait(15).to({regX:1252.8,regY:259.5,scaleX:7.0896,scaleY:7.0896,y:0.05},0).wait(1).to({regX:1253.1,regY:259.6,scaleX:7.1042,scaleY:7.1042,y:0.4},0).wait(8).to({regX:1255.7,regY:259.9,scaleX:7.2248,scaleY:7.2248,x:0.4,y:0.35},0).wait(3).to({regX:1256.6,scaleX:7.2713,scaleY:7.2713,x:0,y:-0.35},0).wait(3).to({regX:1257.5,regY:260.1,scaleX:7.3184,scaleY:7.3184,x:-0.35,y:0.4},0).wait(1).to({regX:1257.9,scaleX:7.3339,scaleY:7.3339,x:0,y:0},0).wait(1).to({regX:1258.2,scaleX:7.3504,scaleY:7.3504,x:-0.05,y:0.05},0).wait(1).to({regX:1258.5,scaleX:7.3661,scaleY:7.3661,x:0,y:-0.35},0).wait(1).to({regX:1258.9,scaleX:7.3818,scaleY:7.3818,x:0.4},0).wait(7).to({regX:1261,regY:260.4,scaleX:7.4967,scaleY:7.4967,x:-0.35},0).wait(4).to({regX:1262.4,regY:260.6,scaleX:7.5633,scaleY:7.5633,x:0.4,y:0.05},0).wait(10).to({regX:1265.5,regY:260.9,scaleX:7.7356,scaleY:7.7356,x:0,y:0},0).wait(2).to({regX:1266.2,regY:261,scaleX:7.7704,scaleY:7.7704,x:0.05,y:0.05},0).wait(3).to({regX:1267.2,regY:261.1,scaleX:7.8242,scaleY:7.8242,x:0.4,y:0},0).wait(3).to({regX:1268.1,regY:261.2,scaleX:7.8788,scaleY:7.8788,x:0,y:-0.35},0).wait(5).to({regX:1269.7,regY:261.4,scaleX:7.9718,scaleY:7.9718,y:0},0).wait(7).to({regX:1272,regY:261.6,scaleX:8.1049,scaleY:8.1049,x:0.45,y:-0.35},0).wait(7).to({regX:1274.2,regY:261.9,scaleX:8.2425,scaleY:8.2425,x:0.4,y:0},0).wait(22).to({regX:1281.2,regY:262.6,scaleX:8.7079,scaleY:8.7079,x:0.45,y:-0.4},0).wait(20).to({regX:1287.5,regY:263.4,scaleX:9.1787,scaleY:9.1787,x:-0.45,y:0},0).wait(2).to({regX:1288.2,scaleX:9.2291,scaleY:9.2291,x:0.5,y:-0.45},0).wait(1).to({regX:1288.5,scaleX:9.2539,scaleY:9.2539,x:0},0).wait(4).to({regX:1289.8,regY:263.6,scaleX:9.3556,scaleY:9.3556,x:0.45,y:0.05},0).wait(7).to({regX:1292,regY:263.9,scaleX:9.5394,scaleY:9.5394,x:0,y:0.5},0).wait(5).to({regX:1293.5,regY:264.1,scaleX:9.6761,scaleY:9.6761,x:-0.45},0).wait(7).to({regX:1295.8,regY:264.3,scaleX:9.8728,scaleY:9.8728,x:0,y:0.05},0).wait(10).to({regX:1299,regY:264.6,scaleX:10.1685,scaleY:10.1685,x:0.55,y:-0.45},0).wait(7).to({regX:1301.2,regY:264.9,scaleX:10.386,scaleY:10.386,x:0,y:0},0).wait(10).to({regX:1304.4,regY:265.2,scaleX:10.7137,scaleY:10.7137,y:-0.5},0).wait(13).to({regX:1308.5,regY:265.7,scaleX:11.1722,scaleY:11.1722,x:-0.55,y:0.05},0).wait(13).to({regX:1312.7,regY:266.1,scaleX:11.6716,scaleY:11.6716,x:0.55,y:-0.55},0).wait(20).to({regX:1319,regY:266.9,scaleX:12.5332,scaleY:12.5332,x:-0.6,y:0},0).wait(18).to({regX:1326.2,regY:266.4,scaleX:12.2291,scaleY:12.2291,x:0.65,y:0.05},0).wait(18).to({regX:1334.2,regY:265.2,scaleX:11.313,scaleY:11.313,x:0,y:-0.55},0).wait(12).to({regX:1350,regY:271.9,scaleX:10.7754,scaleY:10.7754,y:0},0).wait(15).to({regX:1401.5,regY:310.7,scaleX:9.9207,scaleY:9.9207,x:-0.5},0).wait(15).to({regX:1353.1,regY:384.6,scaleX:6.9682,scaleY:6.9682,x:0},0).wait(11).to({regX:1317.5,regY:438.8,scaleX:5.7202,scaleY:5.7202,x:-0.3,y:0.3},0).wait(48).to({regX:1156.5,regY:483.6,scaleX:3.6435,scaleY:3.6435,x:0,y:0.2},0).wait(37).to({_off:true},17).wait(2));

	// Layer_2_obj_
	this.Layer_2 = new lib.Scene_1_Layer_2();
	this.Layer_2.name = "Layer_2";
	this.Layer_2.depth = 0;
	this.Layer_2.isAttachedToCamera = 0
	this.Layer_2.isAttachedToMask = 0
	this.Layer_2.layerDepth = 0
	this.Layer_2.layerIndex = 9
	this.Layer_2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_2).wait(817).to({regX:1162.4,regY:485.7,scaleX:3.6818,scaleY:3.6818,y:0.05},0).wait(1).to({regX:1816.9,regY:1318.1,scaleX:1,scaleY:1,x:654.55,y:832.45},0).wait(66).to({_off:true},1).wait(2));

	// musk_woter_obj_
	this.musk_woter = new lib.Scene_1_musk_woter();
	this.musk_woter.name = "musk_woter";
	this.musk_woter.depth = 0;
	this.musk_woter.isAttachedToCamera = 0
	this.musk_woter.isAttachedToMask = 0
	this.musk_woter.layerDepth = 0
	this.musk_woter.layerIndex = 10
	this.musk_woter.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.musk_woter).wait(1).to({regX:4.2,regY:0.9,scaleX:1.0026,scaleY:1.0026},0).wait(816).to({regX:1162.4,regY:485.7,scaleX:3.6818,scaleY:3.6818,y:0.05},0).to({_off:true},68).wait(2));

	// background_obj_
	this.background_1 = new lib.Scene_1_background_1();
	this.background_1.name = "background_1";
	this.background_1.setTransform(923.8,526,1,1,0,0,0,923.8,526);
	this.background_1.depth = 0;
	this.background_1.isAttachedToCamera = 0
	this.background_1.isAttachedToMask = 0
	this.background_1.layerDepth = 0
	this.background_1.layerIndex = 11
	this.background_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background_1).to({_off:true},886).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-667.9,-400.7,5929.799999999999,3977.7);
// library properties:
lib.properties = {
	id: 'C0D88D9191966D408E74C57B809C2569',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_27.png?1619030538821", id:"CachedBmp_27"},
		{src:"images/CachedBmp_3.png?1619030538821", id:"CachedBmp_3"},
		{src:"images/CachedBmp_26.png?1619030538822", id:"CachedBmp_26"},
		{src:"images/CachedBmp_5.png?1619030538822", id:"CachedBmp_5"},
		{src:"images/Kim Egg Nest 1_atlas_1.png?1619030538629", id:"Kim Egg Nest 1_atlas_1"},
		{src:"images/Kim Egg Nest 1_atlas_2.png?1619030538629", id:"Kim Egg Nest 1_atlas_2"},
		{src:"sounds/Sequence01.mp3?1619030538822", id:"Sequence01"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C0D88D9191966D408E74C57B809C2569'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;