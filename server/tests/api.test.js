const request = require('supertest');
const expect = require('expect');
const mocha = require('mocha');

const { app } = require('../server');

// ********** REGISTER TEST ********** //

mocha.describe('POST/api/text', () => {
  mocha.it('should analyze as treebank and return correct result', done => {
    request(app)
      .post('/api/text')
      .send({
        text: 'Jack is me',
        annotators: ['lemma', 'ner'],
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(200);
        expect(res.body).toMatchObject({
          responseNodes: [['Jack', 'NNP', 'PERSON'], ['is', 'VBZ', 'O'], ['me', 'PRP', 'O']],
          responseTree: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          children: [],
                          pos: 'NNP',
                          posInfo: {
                            examples: [],
                            group: 'Proper noun, singular',
                            tag: 'Proper noun, singular',
                          },
                          token: {
                            after: ' ',
                            before: '',
                            characterOffsetBegin: 0,
                            characterOffsetEnd: 4,
                            index: 1,
                            lemma: 'Jack',
                            ner: 'PERSON',
                            originalText: 'Jack',
                            pos: 'NNP',
                            word: 'Jack',
                          },
                          word: 'Jack',
                        },
                      ],
                      pos: 'NP',
                      posInfo: { description: 'Noun Phrase. ', examples: [] },
                      word: '',
                    },
                    {
                      children: [
                        {
                          children: [],
                          pos: 'VBZ',
                          posInfo: {
                            examples: [],
                            group: 'Verb, 3rd person singular present',
                            tag: 'Verb, 3rd person singular present',
                          },
                          token: {
                            after: ' ',
                            before: ' ',
                            characterOffsetBegin: 5,
                            characterOffsetEnd: 7,
                            index: 2,
                            lemma: 'be',
                            ner: 'O',
                            originalText: 'is',
                            pos: 'VBZ',
                            word: 'is',
                          },
                          word: 'is',
                        },
                        {
                          children: [
                            {
                              children: [],
                              pos: 'PRP',
                              posInfo: {
                                examples: [],
                                group: 'Personal pronoun',
                                tag: 'Personal pronoun',
                              },
                              token: {
                                after: '',
                                before: ' ',
                                characterOffsetBegin: 8,
                                characterOffsetEnd: 10,
                                index: 3,
                                lemma: 'I',
                                ner: 'O',
                                originalText: 'me',
                                pos: 'PRP',
                                word: 'me',
                              },
                              word: 'me',
                            },
                          ],
                          pos: 'NP',
                          posInfo: { description: 'Noun Phrase. ', examples: [] },
                          word: '',
                        },
                      ],
                      pos: 'VP',
                      posInfo: { description: 'Vereb Phrase. ', examples: [] },
                      word: '',
                    },
                  ],
                  pos: 'S',
                  posInfo: {
                    description:
                      'simple declarative clause, i.e. one that is not introduced by a (possible empty) subordinating conjunction or a wh-word and that does not exhibit subject-verb inversion.',
                    examples: [],
                  },
                  word: '',
                },
              ],
              pos: 'ROOT',
              word: '',
            },
          ],
        });
        done();
      });
  });
});
