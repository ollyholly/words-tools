// Load wink-nlp package  & helpers.
const winkNLP = require( 'wink-nlp' );
// Load "its" helper to extract item properties.
const its = require( 'wink-nlp/src/its.js' );
// Load "as" reducer helper to reduce a collection.
const as = require( 'wink-nlp/src/as.js' );
// Load english language model — light version.
const model = require( 'wink-eng-lite-model' );
// Instantiate winkNLP.
const nlp = winkNLP( model );

const fs = require('fs');
const afinn01 = fs.readFileSync('./data/AFINN-96.txt', 'utf8');

const formText = afinn01.split('\n').map(i=> {
  const s = i.replace(/(?=\s).*$/,"")
  return s
}).join(' ')

const doc1 = nlp.readDoc(formText);


// NLP Code.
// const text = 'Hello beautiful  World 🌎! How are you doing, buddy? Sing with my amzing crocodile!';
// const doc = nlp.readDoc( text );

// console.log( doc.out() );
// // -> Hello   World🌎! How are you?

// console.log( doc.sentences().out() );
// // -> [ 'Hello   World🌎!', 'How are you?' ]

// console.log( doc.entities().out( its.detail ) );
// // -> [ { value: '🌎', type: 'EMOJI' } ]

// console.log( doc.tokens().out() );
// // -> [ 'Hello', 'World', '🌎', '!', 'How', 'are', 'you', '?' ]

// console.log( doc.tokens().out( its.type, as.freqTable ) );
// -> [ [ 'word', 5 ], [ 'punctuation', 2 ], [ 'emoji', 1 ] ]

console.log( doc1.tokens().out( its.type, as.freqTable ) );
console.log( doc1.entities().out( its.detail ) );
