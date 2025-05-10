import { EditorView } from '@codemirror/view';

export const customLightTheme = EditorView.theme({
  '&': {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'SFMono-Regular, Menlo, monospace',
  },
  '.cm-scroller': {
    fontSize: '14px',
    lineHeight: '1.5',
  },
  '.cm-gutters': {
    backgroundColor: '#f5f5f5',
    color: '#555',
    border: 'none',
  },
  '.cm-activeLine': {
    backgroundColor: '#f0f0f0',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: '#b3d4fc',
  },
  '.cm-cursor': {
    borderLeft: '1px solid black',
  }
}, { dark: false });
