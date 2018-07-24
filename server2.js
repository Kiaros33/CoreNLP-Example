import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

const connector = new ConnectorServer({ dsn: 'http://localhost:9000' });
const props = new Properties();
props.setProperty('annotators', 'tokenize, ssplit, pos, lemma, ner, parse');
const pipeline = new Pipeline(props, 'English', connector);

const sent = new CoreNLP.simple.Sentence('My name is Fred, I’m an artist from London.');
pipeline
  .annotate(sent)
  .then(data => {
    global.console.log('parse', data.parse());
    const tree = CoreNLP.util.Tree.fromSentence(data);
    global.console.log(tree.dump());
  })
  .catch(err => {
    global.console.log('err', err);
  });
