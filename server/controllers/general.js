import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

module.exports = function commonProcess(body) {
  const lang = body.lang || 'English';
  const dsn = body.dsn || { dsn: 'http://localhost:9000' };
  const annotators = body.annotators
    ? { annotators: body.annotators }
    : {
        annotators: 'tokenize,ssplit,pos,lemma,ner,parse',
      };
  const connector = new ConnectorServer(dsn);
  const props = new Properties(annotators);
  const pipeline = new Pipeline(props, lang, connector);
  const sent = new CoreNLP.simple.Sentence(body.text);
  return { pipeline, sent };
};
