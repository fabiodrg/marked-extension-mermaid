import { marked } from 'marked';
import markedMermaid from '../src/index.js';

describe('this-extension', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('markdown with mermaid code blocks', () => {
    marked.use(markedMermaid());

    const md = '# H1\n'
      + 'Demo\n'
      + '```mermaid\nflowchart LR\n  p1 ---> p2 & p3\n```';

    const html = '<h1 id="h1">H1</h1>\n'
      + '<p>Demo</p>\n'
      + '<div class="mermaid">\nflowchart LR\n  p1 ---> p2 & p3\n</div>\n';

    expect(marked(md)).toBe(html);
  });

  test('markdown with other languages code blocks', () => {
    marked.use(markedMermaid());

    const md = '# H1\n'
      + 'Demo\n'
      + '```\nconsole.log("teste");\n```';

    const html = '<h1 id="h1">H1</h1>\n'
      + '<p>Demo</p>\n'
      + '<pre><code>console.log(&quot;teste&quot;);\n</code></pre>\n';

    expect(marked(md)).toBe(html);
  });
});
