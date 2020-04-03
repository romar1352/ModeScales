/*
Aim of the program
  From user input consisting of a KEY name and scale degree, the
  notes of the major scale will be displayed along with the 3 note
  and 4 note chords in that scale.
  The scale degree will be used to display the notes in the mode
  of that degree as well as the chords that can be built in that
  mode.
*/
var v_goButton = document.getElementsByClassName('genScales');
var v_clearButton = document.getElementsByClassName('clearScreen');

var a_flatNotes  = ["A","Bb","Cb","C","Db","D","Eb","E","F","Gb","G","Ab",];
var a_sharpNotes = ["A","A#","B", "C","C#","D","D#","E","F","F#","G","G#"];
var a_allNotes = new Array(2);    // this table will hold the list of notes with sharps
                                  // in position 0 and the list of notes with flats in position 1
var a_scaleNotes = new Array(7);  // this table will hold the notes of a chosen scale
var a_baseIntervals = ["2","2","1","2","2","2","1"]; // seeds the mode interval array
var a_modeIntervals = new Array(7);  // The note interval arrays for all the modes (7x7);
var a_modeNames = ["Ionian","Dorian","Phrygian","Lydian","Mixolydian","Aeolian","Locrian"];
var a_scaleChords = new Array(7);  // this will hold the array of notes that
                                   // make up the 4 note chord for each note
                                   // in the scale (major or mode)
var a_scaleChordTypes = new Array(7); // Indicates Major, minor, half dim etc..
/*
var a_threeNoteChords = ["X","X","X","X","X","X","X"];
var a_fourNoteChords = ["X","X","X","X","X","X","X"];
*/

v_goButton[0].addEventListener('click', createScale);
v_clearButton[0].addEventListener('click', clearInput);
console.log("20");

// initialise the array of chords for the notes in a scale...
for (var i = 0; i < a_scaleChords.length; i++) {
  a_scaleChords[i] = new Array(4);
}

// initialise the array of intervals for each mode...
for (var i = 0; i < a_baseIntervals.length; i++) {
  a_modeIntervals[i] = new Array(7);
}

//  Set the interval sequences for all modes.
setModeIntervals();
console.log("30 - mode intervals have been set");

// initialise the array of notes from which scales are built
a_allNotes[0] = a_sharpNotes;
a_allNotes[1] = a_flatNotes;
console.log("40 [" + a_allNotes[0].toString() + "] [" + a_allNotes[1].toString() + "]");

/* * * * *
  Fills the table 'a_scaleNotes' with the notes of the scale of the
  requested key for the selected mode.
  The modulus operation requires the variables to be converted to number format
  by multiplying them by 1 :-/
*/
function getScaleNotes(p_noteIndex, p_modeIndex, p_enhrIndex) {
  var v_ctr;
  var v_idx;

  v_idx = p_noteIndex;
  console.log("310 [" + v_idx + "] [" + p_modeIndex + "] [" +
                        a_modeIntervals[p_modeIndex].toString() + "]");
  for (v_ctr=0; v_ctr<7; v_ctr++) {
//    console.log("315 [" + v_idx + "]");
    a_scaleNotes[v_ctr] = a_allNotes[p_enhrIndex][v_idx % 12]
    v_idx = (1 * v_idx) + (1 * a_modeIntervals[p_modeIndex][v_ctr]);
//    console.log("320 [" + v_ctr + "] [" + v_idx + "] [" + a_scaleNotes[v_ctr] + "]");
  };
}

/* * * * *
  Checks that the scale doesn't repeat notes (e.g. Bb B)
*/
function checkRepeats() {
  var v_ctr;
  for (v_ctr=0; v_ctr<7; v_ctr++) {
/*    console.log("340 [" + v_ctr + "] [" +
                          a_scaleNotes[v_ctr].substr(0,1) + "] [" +
                          a_scaleNotes[(v_ctr + 1) % 7].substr(0,1) + "]");
*/
    if (a_scaleNotes[v_ctr].substr(0,1) == a_scaleNotes[(v_ctr + 1) % 7].substr(0,1))
    return true;
  }
  return false;
}

/* * * * *
  Fills the table 'a_modeIntervals' with the intervals of the chosen mode
*/
function setModeIntervals() {
  var v_mctr;
  var v_ictr;

  console.log("350");
  for (v_mctr=0; v_mctr<7; v_mctr++) {
//    console.log("355 [" + v_mctr + "]");
    for (v_ictr=0; v_ictr<7; v_ictr++) {
//      console.log("356 [" + v_ictr + "]");
      a_modeIntervals[v_mctr][v_ictr] = a_baseIntervals[(v_mctr + v_ictr) % 7];
//      console.log("360 [" + a_modeIntervals[v_mctr][v_ictr] + "]");
    }
    console.log("355 [" + a_modeIntervals[v_mctr].toString() + "]");
  };
}

/* * * * *
  Obtains the notes for a 4 note chord in the major scale or chosen mode for
  the given note at the given position of the scale.
*/
function getChordNotes(p_noteIndex){
  var a_chordNotes = new Array(4);  // the notes of a chord
  var v_ctr;
  var v_idx =0;

  console.log("460 [" + a_scaleNotes[p_noteIndex] + "]");
  for (v_ctr=0; v_ctr<4; v_ctr++) {
    a_chordNotes[v_ctr] = a_scaleNotes[(p_noteIndex + v_idx) % 7];
    v_idx = v_idx + 2;
  }

  console.log("470 [" + a_chordNotes.toString() + "]");
  return a_chordNotes;
}

/* * * * *
  Obtains the type of chords for a note in the major scale or chosen mode.
  The chord type definition is that of a 4 note chord...
*/
function getChordType(p_noteIndex, p_modeIndex){
  var v_chordType;    // from: m, Maj7, 7, ø, m7b5
  var v_interval;

  console.log("480 [" + a_scaleNotes[p_noteIndex] + "] [" + p_modeIndex + "]");

  v_chordType = "m7";
  v_interval = 1 * a_modeIntervals[p_modeIndex][p_noteIndex];
  v_interval += 1 * a_modeIntervals[p_modeIndex][(p_noteIndex + 1) % 7];
  console.log("484 [" + v_interval + "]");
  if (v_interval == 4) {
    v_chordType = "Maj7";
  }
  v_interval += 1 * a_modeIntervals[p_modeIndex][(p_noteIndex + 2) % 7];
  v_interval += 1 * a_modeIntervals[p_modeIndex][(p_noteIndex + 3) % 7];
  console.log("488 [" + v_interval + "]");
  if (v_interval == 6) {
    v_chordType = "m7b5";
  }
  console.log("490 [" + a_modeIntervals[p_modeIndex][(p_noteIndex + 6) % 7] + "]");
  if ((a_modeIntervals[p_modeIndex][(p_noteIndex + 6) % 7] == 2) && (v_chordType == "Maj7")) {
    v_chordType = "7";
  }

  console.log("499 [" + v_chordType + "]");
  return v_chordType;
}

/* * * * *
  Obtains the type of chords for a note in the major scale or chosen mode.
  The chord type passed is that of a 4 note chord...
*/
function get3NoteChordType(p_scaleChords, p_chordType){
  var v_chordName;

  console.log("510 [" + p_chordType + "] [" + p_scaleChords.toString() + "]");
  if (p_chordType == "m7") {
    v_chordName = p_scaleChords[0] + "m";
  }
  else if (p_chordType == "m7b5") {
    v_chordName = p_scaleChords[0] + "ø";
  }
  else {
    v_chordName = p_scaleChords[0];
  }
  return v_chordName;
}

/*
  The function creates the table with either the information built up for the
  major scale notes and chords or for the mode related notes and chords.
*/
function genScaleTable(p_modeIndex) {
  var v_scaleTable = document.querySelector('table'); // the table used to display the data
  var v_init;            // indicates the start of the table row to use
  var v_row_ctr;
  var v_col_ctr;
  var v_rowtype;         // The types of rows are: 0-5, 1-6, 2-7, 3-8, 4-9
  var v_subhead;         // Major or Mode related
  var v_tabrow;
  var v_tabcell;

  if (p_modeIndex == 0) {
    v_init = 0;
    v_subhead = "Major Scale";
  }
  else {
    v_init = 5;
    v_subhead = a_modeNames[p_modeIndex] + " Mode";
  }

  console.log("610 [" + v_subhead + "] [" + v_init + "]");
  for(v_row_ctr = v_init; v_row_ctr < (v_init + 5); v_row_ctr++) {
    v_rowtype = v_row_ctr % 5;
    v_tabrow = document.createElement('tr');
    v_scaleTable.appendChild(v_tabrow);
    console.log("615 [" + v_subhead + "] [" + v_row_ctr + "] [" + v_rowtype + "]");
    for(v_col_ctr = 0; v_col_ctr < 9; v_col_ctr++) {
      console.log("620 [" + v_subhead + "] [" + v_col_ctr + "]");
      if (v_col_ctr == 0) {
        // special processing for column 1 depending on the row number
        if (v_rowtype == 0) {            // processing rows 0 and 5
          v_tabcell = document.createElement("td");
//          v_tabcell.classList.add('majorScaleHead');
          v_tabcell.colSpan="2";
          v_tabcell.textContent = v_subhead;
          v_tabrow.appendChild(v_tabcell);
        }
        else if (v_rowtype == 1 || v_rowtype == 3) { // processing rows 1,3,6,8
          v_tabcell = document.createElement("td");
//          v_tabcell.classList.add("scaleTabText1");
//          v_tabcell.style.background = "#D66";
          v_tabcell.rowSpan="2";
          if (v_rowtype == 1) {                      // processing rows 1,3
            v_tabcell.textContent = "Basic Chords";
//            v_tabcell.style.background = "#D66";
          }
          else {                                     // processing rows 6,8
            v_tabcell.textContent = "Extended Chords";
//            v_tabcell.style.background = "#CC3";
          }
          v_tabrow.appendChild(v_tabcell);
        }
      }
      // special processing for second column depending on the row number
      else if (v_col_ctr == 1) {
        if (v_rowtype == 1 || v_rowtype == 3) {       // processing rows 1,3,6,8
          v_tabcell = document.createElement("td");
          v_tabcell.classList.add("scaleTabText2");
//          v_tabcell.style.background = "#48E";
          v_tabcell.textContent = "Name";
          v_tabrow.appendChild(v_tabcell);
        }
        else if (v_rowtype == 2 || v_rowtype == 4) {  // processing rows 2,4,7,9
          v_tabcell = document.createElement("td");
          v_tabcell.classList.add("scaleTabText2");
          v_tabcell.textContent = "Notes";
          v_tabrow.appendChild(v_tabcell);
        }
      }
      // processing dynamic data for column indexes 2 to 8 depending on the row
      else {
        v_tabcell = document.createElement("td");
        v_tabcell.classList.add("scaleCell");
        switch (v_rowtype) {
          case 0:       // the notes of the scale
            v_tabcell.classList.add("majorScaleHead");
            v_tabcell.textContent = a_scaleNotes[v_col_ctr - 2];
            break;
          case 1:       // the three note chord names from the scale
            v_tabcell.classList.add("chordName");
            v_tabcell.textContent = get3NoteChordType(a_scaleChords[v_col_ctr - 2]
                                                     ,a_scaleChordTypes[v_col_ctr - 2]);
            break;
          case 2:        // the notes of the 3 note chords from the scale
            v_tabcell.classList.add("chordNotes");
            v_tabcell.textContent = a_scaleChords[v_col_ctr - 2][0] + " "
                                  + a_scaleChords[v_col_ctr - 2][1] + " "
                                  + a_scaleChords[v_col_ctr - 2][2];
            break;
          case 3:        // the four note chord names from the scale
            v_tabcell.classList.add("chordName");
//            v_tabcell.textContent = getChordType(v_col_ctr - 2, p_modeIndex);
            v_tabcell.textContent = a_scaleNotes[v_col_ctr - 2] + a_scaleChordTypes[v_col_ctr - 2];
            break;
          case 4:        // the notes of the 4 note chords from the scale
            v_tabcell.classList.add("chordNotes");
            v_tabcell.textContent = a_scaleChords[v_col_ctr - 2][0] + " "
                                  + a_scaleChords[v_col_ctr - 2][1] + " "
                                  + a_scaleChords[v_col_ctr - 2][2] + " "
                                  + a_scaleChords[v_col_ctr - 2][3];
            break;
          default:
            console.log("doh");
        }
        v_tabrow.appendChild(v_tabcell);
      }     // end of processing dynamic data for columns 2 to 8
    }       //end of column processing
    v_scaleTable.appendChild(v_tabrow);
  }         //end of row processing
  console.log("That was tough!");
} // end of genScaleTable

/*
  This function applies formatting to the scale and mode table
*/
function formatScaleTable() {
  var v_scaleTable = document.querySelector('table'); // the table used to display the data
  var v_row_ctr;
  var v_col_ctr;
  var v_tabrow;
  var v_tabcell;

  for (v_row_ctr = 0; v_row_ctr < v_scaleTable.rows.length; v_row_ctr++) {
    v_tabrow = v_scaleTable.rows[v_row_ctr];
    for (v_col_ctr = 0; v_col_ctr < v_tabrow.cells.length; v_col_ctr++) {
      v_tabcell = v_tabrow.cells[v_col_ctr];
      console.log("710 [" + v_row_ctr + "] [" + v_col_ctr + "] [" + v_tabcell.textContent + "]");
      switch (v_row_ctr) {
        case 0:
          v_tabcell.classList.add("majorScaleHead");
          break;
        case 1:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#C55";
          }
          else if (v_col_ctr == 1) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#D66";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#E77";
          }
          break;
        case 2:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#D66";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#E77";
          }
          break;
        case 3:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#CC5";
          }
          else if (v_col_ctr == 1) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#DD6";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#EE7";
          }
          break;
        case 4:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#DD6";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#EE7";
          }
          break;
        case 5:
          v_tabcell.classList.add("majorScaleHead");
          break;
        case 6:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#5B5";
          }
          else if (v_col_ctr == 1) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#6C6";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#7D7";
          }
          break;
        case 7:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#6C6";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#7D7";
          }
          break;
        case 8:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#C95";
          }
          else if (v_col_ctr == 1) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#DA6";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#EB7";
          }
          break;
        case 9:
          if (v_col_ctr == 0) {
            v_tabcell.classList.add("scaleTabText2");
            v_tabcell.style.background = "#DA6";
          }
          else {
            v_tabcell.classList.add("scaleTabText1");
            v_tabcell.style.background = "#EB7";
          }
          break;
        default:
            console.log("doh");
      }
    }
  }
}
/*
  This function is called to create the scale in the selected mode and
  to display the chords.
*/
function createScale() {
  var v_printLine;
  var v_ctr;
//  var v_scaleTable   = document.getElementsByClassName("scaleTable").value;
  var v_scaleTable   = document.querySelector('table'); // the table used to display the data
  var v_scaleDegree  = document.getElementById("degreeChoice").value;
  var v_keyChoice    = document.getElementById("keyChoice").value;
  var v_outputBox    = document.getElementById("outputData");
  var v_rootNote;    // holds the root note chosen after formatting
  var v_rootIndex;   // index of the chosen scale root in the list of notes
  var v_modeIndex;   // index of the chosen mode in the array of mode scale intervals
  var v_enhrIndex;   // index of the lists of notes from which scales can be built (0 or 1)

  console.log("101 [" + v_keyChoice + "] [" + v_keyChoice.length + "] [" + v_scaleDegree + "]");

  if (v_scaleTable.rows.length > 0) {
    clearInput();
  }
/*
  Tweak the choice of root note to take enharmonic values into consideration.
*/
  console.log("104 [" + v_keyChoice.length + "] [" + v_keyChoice.substr(0,1)
                      + "] [" + v_keyChoice.substr(3,2) + "]");
  if (v_keyChoice.length > 1) {
    v_rootNote = v_keyChoice.substr(3,2);
    v_enhrIndex = 1;
    }
  else {
    v_rootNote = v_keyChoice.substr(0,1);
    v_enhrIndex = 0;
    }
  console.log("105 [" + v_rootNote + "] [" + v_enhrIndex + "]");
/*
  Obtain the notes of the major scale of the requested key.
*/
  v_rootIndex = a_allNotes[v_enhrIndex].indexOf(v_rootNote);
  console.log("110 [" + v_rootIndex + "] Set the notes of the major scale");
  if (v_rootIndex > -1) {
    getScaleNotes(v_rootIndex, 0, v_enhrIndex);
    console.log("115 [" + a_scaleNotes.toString() + "] is the major scale");
    if (checkRepeats()) {
      v_enhrIndex = ((1 * v_enhrIndex) + 1) % 2;
//      console.log("120 [" + a_allNotes.toString() + "]");
      getScaleNotes(v_rootIndex, 0, v_enhrIndex, v_enhrIndex);
      console.log("125 [" + a_scaleNotes.toString() + "] is the corrected major scale");
    }
//    v_prMajorScale.textContent = "major scale : " + a_scaleNotes.toString();
/*
Build the chords from the generated major scale for each note in the scale.
*/
    for (v_ctr=0; v_ctr<7; v_ctr++) {
      a_scaleChords[v_ctr] = getChordNotes(v_ctr);
      a_scaleChordTypes[v_ctr] = getChordType(v_ctr, 0);
      console.log("130 [" + a_scaleChords[v_ctr].toString() + "] ["
                          + a_scaleChordTypes[v_ctr].toString() + "]");
    }
    console.log("135");
/*
  Call the function to create and display the table for the major scale notes and chords
*/
    genScaleTable(0);
/*
  Obtain the notes of the required mode of the requested key after resetting.
  the list of notes from which to obtain the scale
*/
    if (v_rootNote.length > 1) {
      v_enhrIndex = 1;
      }
    else {
      v_enhrIndex = 0;
      }
    v_modeIndex = v_scaleDegree - 1;
    console.log("140 [" + v_rootIndex + "] Set the notes of the ["
                        + v_modeIndex + "] mode");
    getScaleNotes(v_rootIndex, v_modeIndex, v_enhrIndex);
//    console.log("145 [" + a_scaleNotes.toString() + "] is the chosen mode");
    if (checkRepeats()) {
      v_enhrIndex = ((1 * v_enhrIndex) + 1) % 2;
//      console.log("150 [" + a_allNotes.toString() + "]");
      getScaleNotes(v_rootIndex, v_modeIndex, v_enhrIndex);
      console.log("165 [" + a_scaleNotes.toString() + "] is the corrected mode scale");
    }
//    v_prModeScale.textContent  = "Mode Scale : " + a_scaleNotes.toString();
  }
/*
Build the chords from the generated mode for each note in the scale.
*/
  for (v_ctr=0; v_ctr<7; v_ctr++) {
    a_scaleChords[v_ctr] = getChordNotes(v_ctr);
    a_scaleChordTypes[v_ctr] = getChordType(v_ctr, v_modeIndex);
    console.log("170 [" + a_scaleChords[v_ctr].toString() + "] ["
                        + a_scaleChordTypes[v_ctr].toString() + "]");
  }
  console.log("175");
/*
  Call the function to create and display the table for the modal scale notes and chords
*/
  genScaleTable(v_modeIndex);
  console.log("195");

  formatScaleTable();
  console.log("199");
}

function clearInput() {
  var v_scaleTable = document.querySelector('table'); // the table used to display the data

  console.log("910 [" + v_scaleTable.rows.length + "]");

  if (v_scaleTable.rows.length == 0) {
    document.getElementById('degreeChoice').value = "";
    document.getElementById('keyChoice').value = "";
  }

  while(v_scaleTable.rows.length > 0) {
    v_scaleTable.deleteRow(0);
  }
  console.log("915 [" + v_scaleTable.rows.length + "]");

  console.log("920 cleared?");
}
