import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms'
import * as Tone from 'tone'; //npm install tone

//https://stackblitz.com/edit/angular-tone-x3smgp?file=app/app.component.ts



@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {
  @Output() notePulsed = new EventEmitter();
  name = 'Angular Tone.js';
  synth:any;
  notes:string[] = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  octives:number[] = [1,2,3,4,5,6];
  soundForm: FormGroup;
  value: number = 10;
  msdown:boolean = false;
  note:string;

  constructor() {
    
    //let synth = new Tone.Synth();//.toMaster();
    //a 4 voice Synth
    

    
    //Inicializa el grupo de formulario de tipo radio
    this.soundForm = new FormGroup({
      sound: new FormControl()
    });

    this.soundForm.setValue({sound: 'normal'}); //Pone el valor de sonido a normal, al iniciar la app.

    this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();  //Inicializa el sonido a normal.

    this.phaser = new Tone.Phaser({
      "frequency" : 2, 
      "octaves" : 2, 
      "baseFrequency" : 55
    }).toMaster();

    this.chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster();
    /*
      var phaser = new Tone.Phaser({
        "frequency" : 2, 
        "octaves" : 2, 
        "baseFrequency" : 55
      }).toMaster();
      this.synth.connect(phaser);
    */

    // play a chord
    // polySynth.triggerAttackRelease(["F3", "C3"], "2n");
    // this.polySynth.triggerAttackRelease(["F3", "C4"], "8n");
  }

  ngOnInit() {
  }

  chorus() {
    //var chorus = new Tone.Chorus(4, 2.5, 0.5);
    this.synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster().connect(this.chorus);
  }

  reverb(){
    var reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
    var delay = new Tone.FeedbackDelay(0.2); 
    this.synth = new Tone.DuoSynth().chain(delay, reverb);
  }

  phaser(){
 
/*     var phaser = new Tone.Phaser({
      "frequency" : 2, 
      "octaves" : 2, 
      "baseFrequency" : 55
    }).toMaster(); */

    this.synth.connect(this.phaser);
    
  }

  msover(note){
    if(this.msdown){
      this.play(note);
    }

  }

  play(note){
     //this.synth.triggerAttackRelease(["C3","E3","G3"], "8n");
     let duration: string = this.value.toString() + "n";
     this.synth.triggerAttackRelease(note,duration);
     console.log("Nota: ", note);
     this.note = note;
     this.notePulsed.emit(null);
      //this.synth.triggerAttackRelease([note], "2n");
  }

  checkSound() {
    console.log('Comprobando Sonido...', this.soundForm.get('sound').value);
  }

  setNormal() {
    console.log('Normal');
    this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
  }

  setChorus() {
    this.synth = new Tone.PolySynth(4, Tone.MonoSynth).toMaster().connect(this.chorus);
    console.log('Chorus');
  }

  setPhaser() {
    console.log('Phaser');
    this.synth.connect(this.phaser);
  }

  //play a middle 'C' for the duration of an 8th note
  //synth.triggerAttackRelease("C4", "8n");
}
