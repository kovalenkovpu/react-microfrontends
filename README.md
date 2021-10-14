# WIP status

## POC of an application based on "microfrontends approach"

### Stack
 - ReactJS
 - (single-spa)[https://single-spa.js.org/]
 - (SystemJS)[https://github.com/systemjs/systemjs]
 - webpack, babel
 - TypeScript

### Development approach
1. Run locally all services
2. Deploy to an environment and run locally only chosen services

### Working with the CORS policies during local development
1. Add proper CORS policies on the server side.
E.g. AWS S3 bucket working as a static website hosting:
- go to permissions
- scroll to "Cross-origin resource sharing (CORS)"
- apply your policy:
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "http://<your_local_ip_address>"
        ],
        "ExposeHeaders": []
    }
]
```
2. Since recently, browsers comply with the "Private Network Access" specification. To avoid that:
 - pls refer to [the official announcement](https://developer.chrome.com/blog/private-network-access-update/)
 - [this solution](https://stackoverflow.com/questions/66534759/chrome-cors-error-on-request-to-localhost-dev-server-from-remote-site) will work, but should be considered as insecure
