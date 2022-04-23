const winkNLP = require('wink-nlp');
const its = require( 'wink-nlp/src/its.js' );
const as = require( 'wink-nlp/src/as.js' );
const model = require('wink-eng-lite-model');
const nlp = winkNLP(model);
const fs = require('fs');


const input = fs.readFileSync('./data/moby10b.txt', 'utf8');


  var doc = nlp.readDoc(input);

  // Entities
  // var entities = doc.entities().out(its.detail);

  // Counts
  var sentences = doc.sentences().length();
  var tokens = doc.tokens().length();
  var words = doc.tokens().filter( (token) => {
    return token.out(its.type) === 'word'
  } ).length();


  // Tagged text
  var seenEntities = new Set();
  doc.tokens().each( (token) => {
    let item = {
      word: token.out(its.lemma),
      pos: token.out(its.pos)
    }
    if (token.out(its.type) === 'word') {
      seenEntities.add(item);
    }
  } )

  // Word frequency
  // var wordFreq = doc.tokens().filter((token) => {
  //   return token.out(its.type) === 'word' && !token.out(its.stopWordFlag);
  // }).out(its.normal, as.freqTable);
  // wordFreq = wordFreq.slice(0, 5)

  // Sentiment
  var sentiments = [];
  doc.sentences().each((s) => {
    sentiments.push({
      sentence: s.out(),
      sentiment: s.out(its.sentiment)
    })
  })

  const wordArray = Array.from(seenEntities)

  const nouns = wordArray.filter(i => i['pos'] == 'NOUN').map(i => i['word'])
  const nounsSet = new Set(nouns)
  const arrayAgain = Array.from(nounsSet).join(', ')
  var newdoc = nlp.readDoc(arrayAgain);
  
  var seenAgain= new Set();
  newdoc.tokens().each( (token) => {
    let item = {
      word: token.out(its.lemma),
      pos: token.out(its.pos)
    }
    if (token.out(its.type) === 'word') {
      seenAgain.add(item);
    }
  } )
  const newnouns = Array.from(seenAgain).filter(i => i['pos'] == 'NOUN').map(i => i['word']).join(',')
  // const verbs = wordArray.filter(i => i['pos'] == 'VERB').map(i => i['word']).join(',')
  // const adj = wordArray.filter(i => i['pos'] == 'ADJ').map(i => i['word']).join(',')

  const result = {
    // sentence: input,
    // entities,
    // sentiments,
    documentInfo: {
      sentences,
      tokens,
      words
    },
    // wordFreq,
    // taggedText: doc.out(its.markedUpText).replace(/\n/g, '<br>')
    // toks: seenEntities,
    nouns: newnouns,
    // adj,
    // verbs
  }

 console.log(result)
