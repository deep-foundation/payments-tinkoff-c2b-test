import { execa } from 'execa';

const generate = async () => {
  await execa('git', ['config', '--global', 'user.name', 'FreePhoenix888'], {stdio: 'inherit'});
  await execa('git', ['config', '--global', 'user.email', 'freephoenix888@gmail.com'], {stdio: 'inherit'});

  await execa('npm', ['run', 'library:build:generate-package-class'], {stdio: 'inherit'});

  await execa('git', ['add', './src/package.ts'], {stdio: 'inherit'});

  const { exitCode } = await execa('git', ['diff', '--staged', '--quiet'], { reject: false , stdio: 'inherit'});

  if (exitCode === 0) {
    console.log("No changes to commit");
  } else {
    await execa('git', ['commit', '-m', 'Generate new package class'], {stdio: 'inherit'});
    await execa('git', ['push', 'origin', 'main'], {stdio: 'inherit'});
  }
  
  await execa('tsc', {stdio: 'inherit'});
};

generate();
