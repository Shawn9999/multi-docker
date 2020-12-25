

### Syn Travis
* After pushed to Github -> Github -> user icon -> Settings -> Application ->  Travis CI -> Configure -> Add  repo -> Save
* go to travis-ci.com -> user icon -> Settings -> `Sync account`

### Pushing images to Docker Hub
* Add Docker hub username and password as environment variables in Travis CI
    * travis-ci.com -> find the project -> Settings -> Environment Variables -> DOCKER_ID, DOCKER_PASSWORD -> Add
    * Add docker login to .travis.yml