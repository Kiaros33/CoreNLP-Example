import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

module.exports = function commonProcess(body) {
  const annot = body.annotators || [];
  const lang = body.lang || 'English';
  const dsn = body.dsn || { dsn: 'http://localhost:9000' };
  const connector = new ConnectorServer(dsn);
  const props = new Properties({ annotators: 'tokenize' });
  let annotators = 'tokenize,parse,ssplit,pos';
  for (let i = 0; i < annot.length; i += 1) {
    annotators += ',';
    annotators += annot[i];
  }
  props.setProperty('annotators', annotators);

  const pipeline = new Pipeline(props, lang, connector);
  const sent = new CoreNLP.simple.Sentence(body.text);
  return { pipeline, sent };
};
