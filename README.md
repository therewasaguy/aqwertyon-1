aqwertyon
=========

Fun with a computer keyboard plus sound/audio/music/video/bluetooth

NYU MusEDLab - http://musedlab.org
-----------

To Do:
Finish datalog json structure design and implementation:
  - Fix bugs to make sure we only create new Takes at the right time, and that multiple takes play back correctly
  - Generate hashed session
  
Completed Oct 20:
1. Debounce key input
2. Datalog Structure phase 1
  - timestamp, note (key), on/off(up/down)
  - sync to video start, stop and position
  - each play/stop pair generates a new "take"
  - data log everything in new session

Modes
------

1. 1-to-1 - notes & chords
2. Density - mapped to higher level dimensions
3. Strings - articulation plus note; articulation envelope mapped into video opacity envelope
4. Puzzle Cards - Virtual Chunking (section points; echonest?)
5. Wind Quintet
6. Multitrack - mute/solo, pan, zoom
7.

Idea Pieces
---------------
Ligeti Six Bagatelles 
 - harmonic series - timbre + duet
 - homophony - accent->volume?; octave displacement?

