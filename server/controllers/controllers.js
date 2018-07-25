import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

module.exports = function f(app) {
  app.post('/api/pipeline', (req, res) => {
    const lang = req.body.lang ? req.body.lang : 'English';
    const dsn = req.body.dsn ? req.body.dsn : { dsn: 'http://localhost:9000' };
    const annotators = req.body.annotators
      ? req.body.annotators
      : { annotators: 'tokenize,ssplit,pos,lemma,ner,parse' };
    const connector = new ConnectorServer(dsn);
    const props = new Properties(annotators);
    const pipeline = new Pipeline(props, lang, connector);
    const sent = new CoreNLP.simple.Sentence(req.body.text);
    pipeline
      .annotate(sent)
      .then(data =>
        res.status(200).json({
          responseWords: data.words(),
          responseNerTags: data.nerTags(),
        })
      )
      .catch(err => {
        global.console.log('err', err);
      });
  });

  app.post('/api/treeBank', (req, res) => {
    const lang = req.body.lang ? req.body.lang : 'English';
    const dsn = req.body.dsn ? req.body.dsn : { dsn: 'http://localhost:9000' };
    const annotators = req.body.annotators
      ? req.body.annotators
      : { annotators: 'tokenize,ssplit,pos,lemma,ner,parse' };
    const connector = new ConnectorServer(dsn);
    const props = new Properties(annotators);
    const pipeline = new Pipeline(props, lang, connector);
    const sent = new CoreNLP.simple.Sentence(req.body.text);
    pipeline
      .annotate(sent)
      .then(data => {
        const dataParsed = data.parse();
        const tree = CoreNLP.util.Tree.fromSentence(data);
        const nodes = [];
        tree.visitLeaves(node => nodes.push([node.word(), node.pos(), node.token().ner()]));
        const dumpedTree = tree.dump();
        return res.status(200).json({
          responseParsed: dataParsed,
          responseNodes: nodes,
          responseTree: dumpedTree,
        });
      })
      .catch(err => {
        global.console.log('err', err);
      });
  });
};
