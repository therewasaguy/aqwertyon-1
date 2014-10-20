
function clickMajor() {
	scale = major;
	console.log("Major");
	mapScales();
	isChords = false;   
}

function clickMinor() {
	this.scale = minor;
	console.log("Minor");
	mapScales();
	isChords = false;
}

function clickMajorPent() {
	scale = MjPent;
	console.log("MajorPent");
	mapScales();
	isChords = false;
}

function clickMinorPent() {
	scale = mnPent;
	console.log("MinorPent");
	mapScales();
	isChords = false;
}

function clickBlues() {
	scale = blues;
	console.log("Blues");
	mapScales();
	isChords = false;
}

function clickWholeTone() {
	scale = wholeTone;
	console.log("Whole Tone");
	mapScales();
	isChords = false;
}

function clickHarmMinor() {
	scale = harmMinor;
	console.log("Harmonic Minor");
	mapScales();
	isChords = false;
} 

function clickMajChords(){
	chords = major;
	assignChords(chords);
}  

function clickMinChords(){
	chords = minor;
	assignChords(chords); 
}

function clickHMinChords(){
	chords = harmMinor;
	assignChords(chords); 
}

function assignScale(scale, keys, offset) {
var offset = offset || 0;
	for (var i in keys) {
    var rootOffset = root;
    var whichNote = i % scale.length;
	
			if (i > scale.length - 1) {
 		rootOffset += 12;	
		}

	keys[i].note = scale[whichNote] + rootOffset + offset;
	}
}
  


function assignChords(scale){
	assignScale(scale, keyRows[0]);
      
      if (scale == major){
      thirds = major3rds;
      fifths = major5ths;
      }
      if (scale == minor){
	  thirds = minor3rds;
	  fifths = minor5ths;
      }
      
      
      if (scale == harmMinor){
	  thirds = hMinor3rds;
	  fifths = hMinor5ths;
      }
      
      
      console.log(thirds, fifths);
      assignScale(thirds, keyRows[1]);
      assignScale(fifths, keyRows[2]);
      assignScale(scale, keyRows[3], 12);
      isChords = true;   
}

function mapScales(){
	assignScale(scale, keyRows[3], 36);
	assignScale(scale, keyRows[2], 24);
	assignScale(scale, keyRows[1], 12);
	assignScale(scale, keyRows[0]);
}

function registerKeymap(km) {

    keyRows[0] = [km.z, km.x, km.c, km.v, km.b, km.n, km.m];
    keyRows[1] = [km.a, km.s, km.d, km.f, km.g, km.h, km.j, km.k, km.l];
    keyRows[2] = [km.q, km.w, km.e, km.r, km.t, km.y, km.u, km.i, km.o, km.p];
    keyRows[3] = [km['1'], km['2'], km['3'], km['4'], km['5'],
                  km['6'], km['7'], km['8'], km['9'], km['0']
                  ];
    myKeymap = km;


    assignScale(scale, keyRows[3], 36);
    assignScale(scale, keyRows[2], 24);
    assignScale(scale, keyRows[1], 12);
    assignScale(scale, keyRows[0]);
	      
    if (scale == major){
    thirds = major3rds;
    fifths = major5ths;
    }
    if (scale == minor){
    thirds = minor3rds;
    fifths = minor5ths;
    }


    if (scale == harmMinor){
    thirds = hMinor3rds;
    fifths = hMinor5ths;
    }


    console.log(thirds, fifths);
    assignScale(thirds, keyRows[1]);
    assignScale(fifths, keyRows[2]);
    assignScale(scale, keyRows[3], 12);
    isChords = true;
}
