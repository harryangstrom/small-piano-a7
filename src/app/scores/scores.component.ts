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
//Variables de componente para rendering de pentagrama
renderer;
context;
stave;
text;
tickContext;
x = 0;
//group;
notes = [];
voices = [];
//context;
noteGroup = [];
// n: number = 1;
@ViewChild('score') score: ElementRef;
  constructor() {
  }

  ngAfterViewInit() {
    this.renderer = new this.VF.Renderer(this.score.nativeElement, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(1500,400);
    this.context = this.renderer.getContext();
    this.tickContext = new this.VF.TickContext();
    this.stave = new this.VF.Stave(150, 100, 1000);
    this.stave
      .setContext(this.context)
//      .addClef("treble", "default", "8vb")
      .addClef("treble", "default")
      .addTimeSignature("4/4")
//      .setText("Estas son las notas que estás tocando", this.VF.Modifier.Position.ABOVE, 
//        {shift_x: -20, shift_y: -10})
      .draw();
  }
  
  ngOnInit() {
    console.log('iniciado');
    
  }

  drawNote(a) {

    if (this.x > 910 ) {

      this.x = 0;
      this.noteGroup.forEach( (a) => {
        this.context.svg.removeChild(a);
      });
      this.noteGroup.length = 0;
    }
    let acc = '';
    const letter = a[0];
    const octave = a[a.length -1].toString();
    if (a.length === 3) acc = a[1];

  //  console.log('pulsada tecla: ', `${letter}${acc}/${octave}`);
    let note = new this.VF.StaveNote({
      clef: 'treble',
      keys: [`${letter}${acc}/${octave}`],
      duration: '4'
    })
    .setContext(this.context)
    .setStave(this.stave);
    if(acc !== '') note.addAccidental(0, new this.VF.Accidental(acc));
    this.tickContext.addTickable(note);
    this.tickContext.preFormat().setX(this.x);
    this.x += 35;
    const group = this.context.openGroup();
    this.noteGroup.push(group);
    note.draw();
    this.context.closeGroup();

  }

/*   addNote() {
    this.context.svg.removeChild(this.noteGroup.pop());
    let x = new this.VF.StaveNote ({
      clef: "treble",
      keys: ["eb/5"],
      duration: "q"
    }).addAccidental(0, new this.VF.Accidental("b"))
    this.notes.splice(1,1);
    this.notes.push(x);
    this.voices = [
    new this.VF.Voice({num_beats:4, beat_value: 4}).addTickables(this.notes)];
    new this.VF.Formatter().joinVoices(this.voices).format(this.voices, 200);
    let group = this.context.openGroup();
    this.noteGroup.push(group);
    this.voices.forEach( (v) => {v.draw(this.context, this.stave);  })
    this.context.closeGroup();
    new this.VF.Formatter().joinVoices(this.voices).format(this.voices, 1000);
    group = this.context.openGroup();
    this.noteGroup.push(group);
    this.voices.forEach( (v) => {v.draw(this.context, this.stave);  })
    this.context.closeGroup();
    //this.n++;
  } */
}
