const { StatusCode } = require("./../../utils/status.code");

function validateTitle(title) {
  if (!title || title === '') {
    return {
      validationError: {
        message: 'Title cannot be empty',
        status: StatusCode.NO_CONTENT,
      },
    }
  };

  if (typeof title !== 'string') {
    return {
      validationError: {
        message: 'Title must be a string',
        status: StatusCode.BAD_REQUEST,
      },
    }
  };

  if (title.length > 50 || title.length < 1) {
    return {
      validationError: {
        message: 'Title must be less than 50 characters',
        status: StatusCode.BAD_REQUEST,
      },
    };
  };

  return false;
}

function validateContent(content) {
  if (!content) {
    return {
      validationError: {
        message: 'Content cannot be empty',
        status: StatusCode.NO_CONTENT,
      },
    }
  };

  if (typeof content !== 'string') {
    return {
      validationError: {
        message: 'Content must be a string',
        status: StatusCode.BAD_REQUEST,
      },
    }
  };

  if (content.length > 500 || content.length < 1) {
    return {
      validationError: {
        message: 'Content must be less than 500 characters',
        status: StatusCode.BAD_REQUEST,
      },
    };
  };

  return false;
}

function invalidPostId(id) {
  return {
    validationError: {
      message: `Post with id ${id} does not exist`,
      status: StatusCode.NOT_FOUND,
    },
  };
};

function validatePost(post) {
  const titleError = validateTitle(post.title);
  const contentError = validateContent(post.content);
  if (titleError) return titleError;
  if (contentError) return contentError;

  return false;
};

function promisePostError(error) {
  return {
    promiseError: {
      message: error,
      status: StatusCode.INTERNAL_SERVER_ERROR,
    },
  };
}

module.exports = { validatePost, invalidPostId, promisePostError };