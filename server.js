import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

const connector = new ConnectorServer({ dsn: 'http://localhost:9000' });
const props = new Properties();
props.setProperty('annotators', 'tokenize, ssplit, pos, lemma, ner, parse');
const pipeline = new Pipeline(props, 'English', connector);

const sent = new CoreNLP.simple.Sentence('Karma of humans is AI');
pipeline
  .annotate(sent)
  .then(data => {
    const tree = CoreNLP.util.Tree.fromSentence(data);
    tree.visitLeaves(node => global.console.log(node.word(), node.pos(), node.token().ner()));

    global.console.log(data.nerTags());
  })
  .catch(err => {
    global.console.log('err', err);
  });
