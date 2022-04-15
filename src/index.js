function toHtml(code) {
  return '<div class="mermaid">\n' + code + '\n</div>\n';
}

export default function() {
  return {
    renderer: {
      code(code, infostring, escaped) {
        if (infostring === 'mermaid') {
          return toHtml(code);
        } else {
          return false;
        }
      }
    }
  };
}
