### OpenAPI Specification 使用

Open API Specification 是由社区驱动的一套开放标准
定义了一套面向 Rest API 的不和编程语言绑定的接口规范

我们可以通过 Open API 定义的规范来生成对应的文档, Mock Server, Test, Server/Client 代码模版

方便的快速开发和分享, 可以直接给客户看到对应的文档来解决问题.

### OpenAPI 开发工具

**Swagger Editor**

可以编辑 OpenAPI 文档

### OpenAPI 基本介绍

文档格式为 yaml 的 OpenAPI

```yaml
# API版本
openapi: 3.0.0
# APP信息
info:
  # App 版本
  version: 1.0.0
  title: gsmlg-web
  description: GSMLG Web API
  # A URL to the Terms of Service for the API
  termsOfService: https://www.gsmiot.com/termOfService
  # contact info
  contact:
    name: Jonathan
    url: https://www.gsmlg.org
    email: me@gsmlg.org
  # License
  license:
    name: 'GPL 3.0'
    url: 'https://www.gnu.org/licenses/GPL-3.0.html'
# Added by API Auto Mocking Plugin
servers:
  - description: SwaggerHub API Auto Mocking
    url: https://virtserver.swaggerhub.com/gsmlg/gsmlg-web/1.0.0
  - description: Production API
    url: https://www.gsmiot.com/apis/gsmlg.com/v1
  - url: https://{username}.gsmlg.org:{port}/{basePath}
    description: aboard
    variables:
      username:
        default: Josh
        description: value for username
      port:
        enum:
          - '443'
          - '8443'
        default: '8443'
      basePath:
        default: v2
# 标签, 分类使用
tags:
  - name: blog
    description: blog
    externalDocs:
      url: https://blog.gsmlg.org/docs
      description: Blog Description
# 服务路径, 揭示API
paths:
  '/blogs':
    get:
      tags:
        - blog
      summary: blogs list
      operationId: listBlogs
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  date:
                    type: array
                    items:
                      $ref: '#/components/schemas/Blog'

    post:
      tags:
        - blog
      summary: Create Blog
      description: create blog
      operationId: createBlog
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Blog'
      responses:
        201:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Blog'

  '/blogs/{blogId}':
    get:
      tags:
        - blog
      summary: Get a Blog content
      operationId: getBlogById
      parameters:
        - name: blogId
          in: path
          required: true
          description: id of blog
          schema:
            type: string
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Blog'
    put:
      tags:
        - blog
      summary: Update a Blog
      operationId: updateBlog
      parameters:
        - name: blogId
          in: path
          required: true
          description: id of blog
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Blog'
      responses:
        201:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Blog'
# 组建, 共享资源时, 引用定义在这里
components:
  schemas:
    Blog:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        title:
          type: string
        date:
          type: string
        author:
          type: string
        content:
          type: string
  securitySchemes:
    auth:
      type: http
      description: auth api key
      scheme: bearer
      bearerFormat: JWT
security:
  - auth:
      - write:blog
externalDocs:
  url: https://docs.gsmlg.org
  description: API Documents
```

### 其它工具资源

- [AWESOME OpenAPI3](https://apis.guru/awesome-openapi3/)

- [Swagger Editor](https://editor.swagger.io)

- [OpenAPI Tools](https://openapi.tools)
