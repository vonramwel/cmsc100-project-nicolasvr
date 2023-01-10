export const schemas = {
  BlogObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      id: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      editedDate: {
        type: 'number'
      },
      comments: {
        type: 'object',
        properties: {}
      }
    }
  },
  BlogWithComments: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      id: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      editedDate: {
        type: 'number'
      },
      comments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            data: {
              type: 'string'
            },
            username: {
              type: 'string'
            },
            createdDate: {
              type: 'number'
            },
            editedDate: {
              type: 'number'
            }
          }
        }
      }
    }
  },
  BlogRequestRequiredObject: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    },
    required: [
      'title',
      'description'
    ]
  },

  CommentObject: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      data: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      editedDate: {
        type: 'number'
      }
    }
  },

  CommentRequestRequiredObject: {
    type: 'object',
    properties: {
      data: {
        type: 'string'
      }
    },
    required: [
      'data'
    ]
  },

  CommentRequestObject: {
    type: 'object',
    properties: {
      data: {
        type: 'string'
      }
    }
  },

  BlogRequestObject: {
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    }
  },
  NewUserObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      }
    }
  },
  UserObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      createdDate: {
        type: 'number'
      },
      updatedDate: {
        type: 'number'
      }
    }
  },
  UserRequestRequiredObject: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      }
    }
  },
  LoginObject: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  },
  SuccessfulObject: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean'
      }
    }
  }
};
