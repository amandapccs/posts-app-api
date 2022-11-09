const { describe, it, expect } = global;
const { validateTitle, validateContent, validatePost } = require('./post.validation');

describe('Post Validation Test', () => {
  describe('validateTitle', () => {
    it('should return false if the title is valid', () => {
      const title = 'This is a valid title';
      const result = validateTitle(title);
      expect(result).toBe(false);
    });
    it('should return an object if the title is not a string', () => {
      const title = 123;
      const result = validateTitle(title);
      expect(result).toHaveProperty('validationError');
    });
    it('should return an object if the title is empty', () => {
      const title = '';
      const result = validateTitle(title);
      expect(result).toHaveProperty('validationError');
    });
    it('should return an object if the title is longer than 50 characters', () => {
      const title = 'This is a very long title that is longer than 50 characters';
      const result = validateTitle(title);
      expect(result).toHaveProperty('validationError');
    });
  });

  describe('validateContent', () => {
    it('should return false if the content is valid', () => {
      const content = 'This is a valid content';
      const result = validateContent(content);
      expect(result).toBe(false);
    });
    it('should return an object if the content is not a string', () => {
      const content = 123;
      const result = validateContent(content);
      expect(result).toHaveProperty('validationError');
    });
    it('should return an object if the content is empty', () => {
      const content = '';
      const result = validateContent(content);
      expect(result).toHaveProperty('validationError');
    });
    it('should return an object if the content is longer than 500 characters', () => {
      const content = 'This is a very long content that is longer than 500 characters, and it goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on';
      const result = validateContent(content);
      expect(result).toHaveProperty('validationError');
    });
  });

  describe('validatePost', () => {
    it('should return false if the post is valid', () => {
      const post = {
        title: 'This is a valid title',
        content: 'This is a valid content',
      };
      const result = validatePost(post);
      expect(result).toBe(false);
    });
    it('should return an object if the post is not valid', () => {
      const post = {
        title: 1,
        content: 123,
      };
      const result = validatePost(post);
      expect(result).toHaveProperty('validationError');
    });
  });
});