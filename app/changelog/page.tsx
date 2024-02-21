import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import {CustomComponents} from "./linksProps";

const ChangelogPage = () => {
  let changelogContent = '';

  try {
    // Adjust the file path to read CHANGELOG.md from the root directory
    const filePath = path.join(process.cwd(), 'CHANGELOG.md');
    changelogContent = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading CHANGELOG.md:', error);
  }

  return (
    <div className="p-2 m-2">
      <ReactMarkdown className="prose" components={CustomComponents}>
        {changelogContent}
      </ReactMarkdown>
    </div>
  );
};

export default ChangelogPage;
