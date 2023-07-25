import {execa} from 'execa';
import replaceInFile from 'replace-in-file';

const generate = async () => {
  await execa('git', ['config', '--global', 'user.name', 'FreePhoenix888'], {stdio: 'inherit'});
  await execa('git', ['config', '--global', 'user.email', 'freephoenix888@gmail.com'], {stdio: 'inherit'});

  const { stdout: tableOfContents } = await execa('markdown-toc', ['README.md'], {stdio: 'inherit'});

  const options = {
    files: 'README.md',
    from: /(<!-- TABLE_OF_CONTENTS_START -->)[\S\s]*(<!-- TABLE_OF_CONTENTS_END -->)/g,
    to: `<!-- TABLE_OF_CONTENTS_START -->\n${tableOfContents}\n<!-- TABLE_OF_CONTENTS_END -->`,
  };

  try {
    await replaceInFile.replaceInFile(options);
    console.log('Replacement completed...');
  }
  catch (error) {
    console.error('Error occurred:', error);
  }

  await execa('git', ['add', 'README.md'], {stdio: 'inherit'});

  const { exitCode } = await execa('git', ['diff', '--staged', '--quiet'], { reject: false, stdio: 'inherit' });

  if (exitCode === 0) {
    console.log("No changes to commit");
  } else {
    await execa('git', ['commit', '-m', 'docs: update README.md'], {stdio: 'inherit'});
    await execa('git', ['push', 'origin', 'main'], {stdio: 'inherit'});
  }

  await execa('npm', ['run', 'library:documentation:generate'], {stdio: 'inherit'});
};

generate();
