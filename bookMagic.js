const winkNLP = require( 'wink-nlp' );
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );
const model = require( 'wink-eng-lite-model' );
const nlp = winkNLP( model );

const fs = require('fs');
const moby = fs.readFileSync('./data/Bible.txt', 'utf8');
// const moby = fs.readFileSync('./data/moby10b.txt', 'utf8');

const doc = nlp.readDoc(moby);

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sentNum = doc.sentences().out().length

const r = rand(0, sentNum)

console.log('SENTENCES: ', sentNum );
console.log('RANDOME SENTENCE:\n\n', doc.sentences().out()[r] );