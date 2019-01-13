import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';

import *  as Vex from 'vexflow';
import { notEqual } from 'assert';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  @Input() note: string;
  @Input() duration: string;
VF = Vex.Flow;
ubicacion;
renderer;
//context;
noteGroup = [];
@ViewChild('score') score: ElementRef;
  constructor() {
  }

  ngAfterViewInit() {
    this.renderer = new this.VF.Renderer(this.score.nativeElement, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(500,500);
    let context = this.renderer.getContext();
 
var stave = new this.VF.Stave(50, 100, 250);
stave.setContext(context)
  .addClef("treble", "default", "8vb")
  .addTimeSignature("2/8")
  //.setClef("treble", "default", "8vb")
  .draw();
  var stave2 = new this.VF.Stave(50, 200, 250);
  stave2.setContext(context)
    .addClef("treble", "default")
    .addTimeSignature("2/8")
    //.setClef("treble", "default", "8vb")
    .draw();  
console.log(context.svg);
var notes = [
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["eb/5"],
    duration: "q"
  }).addAccidental(0, new this.VF.Accidental("b")),
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["d/4"],
    duration: "q"
  }),  
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["b/4"],
    duration: "qr"
  }),
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["c/4", "e/4", "g#/4"],
    duration: "q"
  }).addAccidental(2, new this.VF.Accidental("#"))
];
var notes2 = [
  new this.VF.StaveNote({
    clef: "treble",
    keys: ["c/4"],
    duration: "16"
  }),
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["c/4"],
    duration: "16"
  }),
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["c/4"],
    duration: "q"
  }),
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["c/4"],
    duration: "h"
  }),
  new this.VF.StaveNote ({
    clef: "treble",
    keys: ["c/4"],
    duration: "8"
  })
];
var voice = new this.VF.Voice({num_beats:4, beat_value: 4})
  .addTickables(notes);
var voices = [
  new this.VF.Voice({num_beats:4, beat_value: 4}).addTickables(notes),
  new this.VF.Voice({num_beats:4, beat_value: 4}).addTickables(notes2)
];
new this.VF.Formatter().joinVoices([voice]).format([voice], 200);
new this.VF.Formatter().joinVoices(voices).format(voices, 200);
var group = context.openGroup();
this.noteGroup.push(group);
voice.draw(context, stave2);
context.closeGroup();
group = context.openGroup();
this.noteGroup.push(group);
voices.forEach(  function(v) {v.draw(context, stave);  })
context.closeGroup();
console.log(this.noteGroup);
console.log(this.noteGroup[0]);
this.noteGroup[0].style.opacity = "1";
this.noteGroup[0].style.fill = "red";
}
  
  ngOnInit() {
    console.log('iniciado');
    
  }

  testFunction() {
    console.log('pulsada tecla');
  }
}
