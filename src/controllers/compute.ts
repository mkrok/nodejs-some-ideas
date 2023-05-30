import fs from 'fs';

const doHeavyComputationTask = () => {
  const file = fs.createWriteStream('./HugeFile.txt');
  console.time('Forked process');
  for (let i = 0; i < 1e6; i++) {
    file.write('Blah Blah Blah Blah!\n');
  }

  file.end();
  console.timeEnd('Forked process');
};

process.on('message', msg => {
  console.log('Child process received message: ', msg);
  doHeavyComputationTask();
  process.send('Forked process did the job!\n\n');
});
