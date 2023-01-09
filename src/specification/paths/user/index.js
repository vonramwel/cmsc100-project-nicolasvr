export const user = {
  '/register': {
    post: {
      summary: 'Register a new user',
      operationId: 'registerUser',
      requestBody: {
        $ref: '#/components/requestBodies/RequestNewUser'
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulUserResponse'
        }
      },
      security: [
        {}
      ]
    }
  },
  '/login': {
    post: {
      summary: 'Logs in a user',
      operationId: 'login',
      requestBody: {
        $ref: '#/components/requestBodies/LoginUser'
      },
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulResponse'
        }
      },
      security: [
        {}
      ]
    }
  },
  '/logout': {
    get: {
      summary: 'Logs out a user',
      operationId: 'logout',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  },
  '/auth-check': {
    get: {
      summary: 'Checks if user is logged in',
      operationId: 'authCheck',
      responses: {
        200: {
          $ref: '#/components/responses/SuccessfulResponse'
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }
  },
  '/user/:userId': {
   // '/change-password': {
    put: {
      summary: 'Change user password',
      operationId: 'changePassword',
      // parameters: [
      //   {
      //     $ref: '#/components/parameters/UserParameterId'
      //   }
      // ],
      requestBody: {
        description: 'THe request body for blog',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties:{
                password:{
                  type: 'string'
                }
              }
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Change user password',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success:{
                    type: 'boolean'
                  }
                }
              }
            }
          }
        }
      },
      security: [
        {
          cookieAuth: []
        }
      ]
    }

   // }
    
  }

   

};
