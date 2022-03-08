
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Flannel API"
    },
    "paths": {
      "/login": {
        "post": {
          "summary": "allows an existing user to login to our site",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "usernamme": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "description": "searches for user in db and returns JWT if they exist",
          "responses": {
            "200": {
              "description": "user exists and is now logged in"
            },
            "401": {
              "description": "unauthorized!"
            }
          }
        }
      },
      "/register": {
        "post": {
          "summary": "allows a new user to create a profile and login",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "password": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "major": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "Hometown": {
                      "type": "string"
                    },
                    "Pronouns": {
                      "type": "string"
                    },
                    "Bio": {
                      "type": "string"
                    },
                    "Classes": {
                      "type": "object"
                    },
                    "Interests": {
                      "type": "object"
                    },
                    "Affiliations": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "description": "creates a new entry correlated to request body in our database, and returns a JWT",
          "responses": {
            "201": {
              "description": "user profile created and JWT returned"
            },
            "401": {
              "description": "unauthorized!"
            }
          }
        }
      },
      "/label?username=String": {
        "get": {
          "summary": "get matching users from database based on labels param",
          "description": "searches for users with classes/interests/affiliations that match the labels param",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "labels",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          ],
          "responses": {
            "200": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "username": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "year": {
                          "type": "string"
                        },
                        "major": {
                          "type": "string"
                        },
                        "hometown": {
                          "type": "string"
                        },
                        "pronouns": {
                          "type": "string"
                        },
                        "bio": {
                          "type": "string"
                        },
                        "classes": {
                          "type": "List"
                        },
                        "interests": {
                          "type": "List"
                        },
                        "affiliations": {
                          "type": "List"
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            }
          }
        }
      },
      "/label/getLabels": {
        "get": {
          "summary": "get all labels from the database",
          "description": "returns all possible labels from database table",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "username": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "year": {
                          "type": "string"
                        },
                        "major": {
                          "type": "string"
                        },
                        "hometown": {
                          "type": "string"
                        },
                        "pronouns": {
                          "type": "string"
                        },
                        "bio": {
                          "type": "string"
                        },
                        "classes": {
                          "type": "List"
                        },
                        "interests": {
                          "type": "List"
                        },
                        "affiliations": {
                          "type": "List"
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/label/createLabel?username=String": {
        "get": {
          "summary": "create new label in database",
          "description": "creates new label with the name and type that are specified in request body, or simply returns 200 if label name already exists",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "interest": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string",
                      "enum": [
                        "classes",
                        "interests",
                        "affiliations"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "Interest created"
                  }
                }
              }
            },
            "400": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "interest parameter required"
                  }
                }
              }
            },
            "500": {
              "content": {
                "text/plain": {
                  "schema": {
                    "type": "string",
                    "example": "Error querying database"
                  }
                }
              }
            }
          }
        }
      },
      "/user/deleteUser?username=String": {
        "post": {
          "summary": "delete user from database",
          "description": "searches for username in database and deletes matching profile",
          "responses": {
            "200": {
              "description": "user profile deleted"
            }
          }
        }
      },
      "/user?username=String": {
        "get": {
          "summary": "return all users in the users collection",
          "description": "searches for username in database and deletes matching profile",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            }
          ]
        }
      },
      "/user/getMatchesList?username=String": {
        "get": {
          "summary": "return a users matches list",
          "description": "searches for user in database and returns json object of all their matches",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "usernamme": {
                        "type": "string"
                      },
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/user/addUserToMatchList?username=String": {
        "post": {
          "summary": "adds a user to match list",
          "description": "adds user specified by request body to request query user's match list",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "usernamme": {
                      "type": "string"
                    },
                    "id": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/user/updateUserInfo": {
        "post": {
          "summary": "updates a user's information",
          "description": "updates the user's info in the database to match the request body",
          "parameters": [
            {
              "in": "header",
              "name": "authorization",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "usernamme": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "year": {
                      "type": "string"
                    },
                    "major": {
                      "type": "string"
                    },
                    "hometown": {
                      "type": "string"
                    },
                    "pronouns": {
                      "type": "string"
                    },
                    "bio": {
                      "type": "string"
                    },
                    "classes": {
                      "type": "List"
                    },
                    "interests": {
                      "type": "List"
                    },
                    "affiliations": {
                      "type": "List"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {},
    "tags": []
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
