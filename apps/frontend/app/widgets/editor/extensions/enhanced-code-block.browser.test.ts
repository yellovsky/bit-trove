import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { describe, expect, it } from 'vitest';

import { EnhancedCodeBlock } from './enhanced-code-block';

describe('EnhancedCodeBlock Extension', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = new Editor({
      content: '<p>Test content</p>',
      extensions: [
        StarterKit.configure({ codeBlock: false }),
        EnhancedCodeBlock.configure({
          defaultTheme: 'github-dark',
          HTMLAttributes: { class: 'codeBlock' },
        }),
      ],
    });
  });

  afterEach(() => {
    editor.destroy();
  });

  describe('Attributes', () => {
    it('should have fileName attribute with default null', () => {
      const node = editor.schema.nodes.codeBlock;
      expect(node.spec.attrs?.fileName?.default).toBe(null);
    });

    it('should parse fileName from HTML data attribute', () => {
      const html = '<pre data-file-name="test.ts"><code>console.log("test");</code></pre>';
      editor.commands.setContent(html);
      const attrs = editor.getAttributes('codeBlock');
      expect(attrs.fileName).toBe('test.ts');
    });

    it('should render fileName as data attribute', () => {
      editor.commands.setCodeBlock();
      (editor.commands as any).setCodeBlockFileName('test.ts');
      const html = editor.getHTML();
      expect(html).toContain('data-file-name="test.ts"');
    });

    it('should not render data-file-name when fileName is null', () => {
      editor.commands.setCodeBlock();
      const html = editor.getHTML();
      expect(html).not.toContain('data-file-name');
    });
  });

  describe('Commands', () => {
    beforeEach(() => {
      editor.commands.setCodeBlock();
    });

    describe('setCodeBlockAttributes', () => {
      it('should set both language and fileName', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: 'src/test.ts',
          language: 'typescript',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('typescript');
        expect(editor.getAttributes('codeBlock').fileName).toBe('src/test.ts');
      });

      it('should set only language', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          language: 'javascript',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('javascript');
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set only fileName', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: 'package.json',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe(null);
        expect(editor.getAttributes('codeBlock').fileName).toBe('package.json');
      });

      it('should validate and sanitize fileName', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: 'test<>:"\\|?*.ts',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe('test.ts');
      });

      it('should set fileName to undefined for empty string', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: '',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set fileName to undefined for whitespace only', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: '   ',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });
    });

    describe('setCodeBlockFileName', () => {
      it('should set valid fileName', () => {
        const result = (editor.commands as any).setCodeBlockFileName('src/components/Button.tsx');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe('src/components/Button.tsx');
      });

      it('should sanitize fileName with dangerous characters', () => {
        const result = (editor.commands as any).setCodeBlockFileName('file<>:"\\|?*.ts');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe('file.ts');
      });

      it('should set fileName to undefined for empty string', () => {
        const result = (editor.commands as any).setCodeBlockFileName('');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set fileName to undefined for whitespace only', () => {
        const result = (editor.commands as any).setCodeBlockFileName('   ');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set fileName to undefined for null', () => {
        const result = (editor.commands as any).setCodeBlockFileName(null);

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });
    });

    describe('setCodeBlockLanguage', () => {
      it('should set language', () => {
        const result = (editor.commands as any).setCodeBlockLanguage('typescript');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('typescript');
      });

      it('should set empty language', () => {
        const result = (editor.commands as any).setCodeBlockLanguage('');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('');
      });
    });

    describe('clearCodeBlockFileName', () => {
      it('should clear fileName', () => {
        // First set a fileName
        (editor.commands as any).setCodeBlockFileName('test.ts');
        expect(editor.getAttributes('codeBlock').fileName).toBe('test.ts');

        // Then clear it
        const result = (editor.commands as any).clearCodeBlockFileName();

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });
    });

    describe('getCodeBlockAttributes', () => {
      it('should return true and store attributes when in code block', () => {
        (editor.commands as any).setCodeBlockAttributes({
          fileName: 'test.ts',
          language: 'typescript',
        });

        const result = (editor.commands as any).getCodeBlockAttributes();

        expect(result).toBe(true);
        expect(editor.storage.enhancedCodeBlock).toEqual({
          fileName: 'test.ts',
          language: 'typescript',
        });
      });

      it('should return false when not in code block', () => {
        // Move cursor outside code block
        editor.commands.setParagraph();

        const result = (editor.commands as any).getCodeBlockAttributes();

        expect(result).toBe(false);
      });

      it('should handle empty attributes', () => {
        const result = (editor.commands as any).getCodeBlockAttributes();

        expect(result).toBe(true);
        expect(editor.storage.enhancedCodeBlock).toEqual({
          fileName: '',
          language: '',
        });
      });
    });
  });

  describe('HTML Parsing and Rendering', () => {
    it('should parse existing code block with fileName', () => {
      const html = `
        <pre data-file-name="src/test.ts" class="codeBlock">
          <code>console.log("test");</code>
        </pre>
      `;

      editor.commands.setContent(html);

      expect(editor.getAttributes('codeBlock').fileName).toBe('src/test.ts');
    });

    it('should render code block with fileName', () => {
      editor.commands.setCodeBlock();
      (editor.commands as any).setCodeBlockAttributes({
        fileName: 'src/test.ts',
        language: 'typescript',
      });

      const html = editor.getHTML();

      expect(html).toContain('data-file-name="src/test.ts"');
      expect(html).toContain('class="codeBlock"');
    });

    it('should handle backward compatibility with existing code blocks', () => {
      const html = `
        <pre class="codeBlock">
          <code>console.log("test");</code>
        </pre>
      `;

      editor.commands.setContent(html);

      expect(editor.getAttributes('codeBlock').fileName).toBe(null);
    });
  });

  describe('Global Attributes', () => {
    it('should add data-enhanced attribute', () => {
      editor.commands.setCodeBlock();

      const html = editor.getHTML();
      expect(html).toContain('data-enhanced="true"');
    });
  });
});

describe('EnhancedCodeBlock Extension', () => {
  let editor: Editor;

  beforeEach(() => {
    editor = new Editor({
      content: '<p>Test content</p>',
      extensions: [
        StarterKit.configure({ codeBlock: false }),
        EnhancedCodeBlock.configure({
          defaultTheme: 'github-dark',
          HTMLAttributes: { class: 'codeBlock' },
        }),
      ],
    });
  });

  afterEach(() => {
    editor.destroy();
  });

  describe('Attributes', () => {
    it('should have fileName attribute with default null', () => {
      const node = editor.schema.nodes.codeBlock;
      expect(node.spec.attrs?.fileName?.default).toBe(null);
    });

    it('should parse fileName from HTML data attribute', () => {
      const html = '<pre data-file-name="test.ts"><code>console.log("test");</code></pre>';
      editor.commands.setContent(html);
      const attrs = editor.getAttributes('codeBlock');
      expect(attrs.fileName).toBe('test.ts');
    });

    it('should render fileName as data attribute', () => {
      editor.commands.setCodeBlock();
      (editor.commands as any).setCodeBlockFileName('test.ts');
      const html = editor.getHTML();
      expect(html).toContain('data-file-name="test.ts"');
    });

    it('should not render data-file-name when fileName is null', () => {
      editor.commands.setCodeBlock();
      const html = editor.getHTML();
      expect(html).not.toContain('data-file-name');
    });
  });

  describe('Commands', () => {
    beforeEach(() => {
      editor.commands.setCodeBlock();
    });

    describe('setCodeBlockAttributes', () => {
      it('should set both language and fileName', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: 'src/test.ts',
          language: 'typescript',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('typescript');
        expect(editor.getAttributes('codeBlock').fileName).toBe('src/test.ts');
      });

      it('should set only language', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          language: 'javascript',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('javascript');
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set only fileName', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: 'package.json',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe(null);
        expect(editor.getAttributes('codeBlock').fileName).toBe('package.json');
      });

      it('should validate and sanitize fileName', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: 'test<>:"\\|?*.ts',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe('test.ts');
      });

      it('should set fileName to undefined for empty string', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: '',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set fileName to undefined for whitespace only', () => {
        const result = (editor.commands as any).setCodeBlockAttributes({
          fileName: '   ',
        });

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });
    });

    describe('setCodeBlockFileName', () => {
      it('should set valid fileName', () => {
        const result = (editor.commands as any).setCodeBlockFileName('src/components/Button.tsx');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe('src/components/Button.tsx');
      });

      it('should sanitize fileName with dangerous characters', () => {
        const result = (editor.commands as any).setCodeBlockFileName('file<>:"\\|?*.ts');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe('file.ts');
      });

      it('should set fileName to undefined for empty string', () => {
        const result = (editor.commands as any).setCodeBlockFileName('');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set fileName to undefined for whitespace only', () => {
        const result = (editor.commands as any).setCodeBlockFileName('   ');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });

      it('should set fileName to undefined for null', () => {
        const result = (editor.commands as any).setCodeBlockFileName(null);

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });
    });

    describe('setCodeBlockLanguage', () => {
      it('should set language', () => {
        const result = (editor.commands as any).setCodeBlockLanguage('typescript');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('typescript');
      });

      it('should set empty language', () => {
        const result = (editor.commands as any).setCodeBlockLanguage('');

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').language).toBe('');
      });
    });

    describe('clearCodeBlockFileName', () => {
      it('should clear fileName', () => {
        // First set a fileName
        (editor.commands as any).setCodeBlockFileName('test.ts');
        expect(editor.getAttributes('codeBlock').fileName).toBe('test.ts');

        // Then clear it
        const result = (editor.commands as any).clearCodeBlockFileName();

        expect(result).toBe(true);
        expect(editor.getAttributes('codeBlock').fileName).toBe(null);
      });
    });

    describe('getCodeBlockAttributes', () => {
      it('should return true and store attributes when in code block', () => {
        (editor.commands as any).setCodeBlockAttributes({
          fileName: 'test.ts',
          language: 'typescript',
        });

        const result = (editor.commands as any).getCodeBlockAttributes();

        expect(result).toBe(true);
        expect(editor.storage.enhancedCodeBlock).toEqual({
          fileName: 'test.ts',
          language: 'typescript',
        });
      });

      it('should return false when not in code block', () => {
        // Move cursor outside code block
        editor.commands.setParagraph();

        const result = (editor.commands as any).getCodeBlockAttributes();

        expect(result).toBe(false);
      });

      it('should handle empty attributes', () => {
        const result = (editor.commands as any).getCodeBlockAttributes();

        expect(result).toBe(true);
        expect(editor.storage.enhancedCodeBlock).toEqual({
          fileName: '',
          language: '',
        });
      });
    });
  });

  describe('HTML Parsing and Rendering', () => {
    it('should parse existing code block with fileName', () => {
      const html = `
        <pre data-file-name="src/test.ts" class="codeBlock">
          <code>console.log("test");</code>
        </pre>
      `;

      editor.commands.setContent(html);

      expect(editor.getAttributes('codeBlock').fileName).toBe('src/test.ts');
    });

    it('should render code block with fileName', () => {
      editor.commands.setCodeBlock();
      (editor.commands as any).setCodeBlockAttributes({
        fileName: 'src/test.ts',
        language: 'typescript',
      });

      const html = editor.getHTML();

      expect(html).toContain('data-file-name="src/test.ts"');
      expect(html).toContain('class="codeBlock"');
    });

    it('should handle backward compatibility with existing code blocks', () => {
      const html = `
        <pre class="codeBlock">
          <code>console.log("test");</code>
        </pre>
      `;

      editor.commands.setContent(html);

      expect(editor.getAttributes('codeBlock').fileName).toBe(null);
    });
  });

  describe('Global Attributes', () => {
    it('should add data-enhanced attribute', () => {
      editor.commands.setCodeBlock();

      const html = editor.getHTML();
      expect(html).toContain('data-enhanced="true"');
    });
  });
});
