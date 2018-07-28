import CoreNLP from 'corenlp';
import commonProcess from './general';

module.exports = function f(app) {
  app.post('/api/pipeline', (req, res) => {
    const settings = commonProcess(req.body);
    settings.pipeline
      .annotate(settings.sent)
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
    const settings = commonProcess(req.body);
    settings.pipeline
      .annotate(settings.sent)
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
