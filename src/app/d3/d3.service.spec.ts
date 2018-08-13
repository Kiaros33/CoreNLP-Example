import { TestBed } from '@angular/core/testing';
import { D3Service } from './d3.service';

describe('D3Service', () => {
  let service: D3Service;
  let tree: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3Service],
    });

    service = TestBed.get(D3Service);

    tree = {
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
    };
  });

  it('should create a tree', () => {
    service.fetchData(tree);
    expect(service.nodes.length).toBe(8);
    expect(service.nodes[4].data.word).toBe('Jack');
    expect(service.nodes[7].data.pos).toBe('PRP');
  });
});
