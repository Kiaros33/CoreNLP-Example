import CoreNLP from 'corenlp';
import Sentiment from 'sentiment';

const commonProcess = require('./general');

module.exports = function f(app) {
  app.post('/api/text', (req, res) => {
    const settings = commonProcess(req.body);
    const sentiment = new Sentiment();
    const sentimentResult = sentiment.analyze(req.body.text);
    const doc = new CoreNLP.simple.Document(req.body.text);
    settings.pipeline
      .annotate(doc)
      .then(data => {
        const nodes = [];
        const dumpedTree = [];
        const sentences = data.sentences();
        // const dataParsed = data.parse();
        sentences.forEach(sentence => {
          const tree = CoreNLP.util.Tree.fromSentence(sentence);
          tree.visitLeaves(node => nodes.push([node.word(), node.pos(), node.token().ner()]));
          dumpedTree.push(JSON.parse(tree.dump()));
        });

        return res.status(200).json({
          responseNodes: nodes,
          responseTree: dumpedTree,
          sentimentResult,
          // responseParsed: dataParsed,
        });
      })
      .catch(err => {
        global.console.log('err', err);
      });
  });
};
