## POC of an application based on "microfrontends approach"

### Stack
 - ReactJS
 - (single-spa)[https://single-spa.js.org/]
 - (SystemJS)[https://github.com/systemjs/systemjs]
 - webpack, babel
 - TypeScript
 - eslint, prettier

### Development approach

Important notes regarding the **importmap** file.
 - **mf-config** contains `importmap.js` which describes import paths for all microservices
 - it is bundled into the `dist` folder for each build
 - it should point to the proper resource relative to the service name

1. Run locally all services:
 - `npm install` for each service
 - `npm start` for **mf-config** service (root service)
 - `importMapOverrides.enableUI()` in the dev-tools console to enable import maps override UI
 - open override UI and apply override for the service you want to run locally. E.g. for **mf-main**:
   - `npm start` for **mf-main**
   - copy IP address **mf-main** is running on, e.g. `http://10.66.162.59:8080`
   - put into the override address adding the service JS-bundle:
   ![image](https://user-images.githubusercontent.com/22472707/137458825-3ddde52b-88f1-4354-96c9-60de080aa31d.png)
   - click on apply and refrech the page

2. Deploy to an environment and run locally only chosen services:
 - single-spa team recommends deploying an application to some dev environment, and apply overrides for one service at a time there
 - in case of AWS (S3 solution):
   - create S3 buckets for each service
   - `npm run build` for each service
   - upload build assets to your buckets
   - make all uploaded files public
   - enable static website hosting for each bucket
   - follow instructions below to handle possible CORS issues
   - enable import maps override UI and apply override for any service of your choice (refer to p.1 above)

### Working with the CORS policies during local development on AWS
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
            "http://<your_local_ip_address>" // not 'localhost'
        ],
        "ExposeHeaders": []
    }
]
```
2. Since recently, browsers comply with the "Private Network Access" specification. To avoid that:
 - pls refer to [the official announcement](https://developer.chrome.com/blog/private-network-access-update/)
 - [this solution](https://stackoverflow.com/questions/66534759/chrome-cors-error-on-request-to-localhost-dev-server-from-remote-site) will work, but should be considered as insecure
