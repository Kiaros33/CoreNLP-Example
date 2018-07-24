# CoreNLP examples
Created to try node-corenlp and show some examples and functionality

## Installing
1. Download project;
2. Download corenlp package from here 'https://stanfordnlp.github.io/CoreNLP/#download' and put 'stanford-corenlp-full-***-**-**' in the root directory of the project;
3. JDK environment should be installed as well ('http://www.oracle.com/technetwork/java/javase/downloads/jdk10-downloads-4416644.html');

### Try it out
1. Type 'npm i' in terminal when in root directory of the project;
2. Move in to the downloaded 'stanford-corenlp-full-***-**-**' directory and type in terminal 'java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000';
3. There 2 examples in project, named server.js and server2.js. Type 'npm run server.js' or 'npm run server2.js' in terminal when in root directory of the project;