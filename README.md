
## Deploy to Production
* docker-compose.yml is only used for dev local test
* .travis.yml and Dockerrun.aws.json are used for production deployment

### Syn Travis
* After pushed to Github -> Github -> user icon -> Settings -> Application ->  Travis CI -> Configure -> Add  repo -> Save
* go to travis-ci.com -> user icon -> Settings -> `Sync account`

### Travis Security
* Travis CI does not support AWS_SESSION_TOKEN.
* You have to create an IAM user with a role that have the permission to manage Elasticbeanstalk
* Make sure to destroy the IAM user, role, and AWS credential in Travis CI after experiment.

### Pushing images to Docker Hub
* Add Docker hub username and password as environment variables in Travis CI
    * travis-ci.com -> find the project -> Settings -> Environment Variables -> DOCKER_ID, DOCKER_PASSWORD -> Add
    * Add docker login to .travis.yml
* Tag the image before pushing to avoid access denied
    * https://stackoverflow.com/questions/41984399/denied-requested-access-to-the-resource-is-denied-docker
* .travis.yml is used to instruct travis-ci.com what to do 

### Deploy to AWS
* Dockerrun.aws.json are used to instruct ECS/EB which containers to deploy
* Redis and Postgre must be provisioned separately. They should not reside in containers
* ECS or EB must be provisioneed separately
* Security groups need to be created an apply to RDS, Elasticahe, and ESC

#### Amazon ECS task definitions
* https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
* https://docs.aws.amazon.com/AmazonECS/latest/userguide/example_task_definitions.html

#### Deploy to ECS
* travis-ci has the following AWS deployment provider https://docs.travis-ci.com/user/deployment/
    * codedeploy
    * s3
    * lambda
    * elasticbeanstalk
    * opsworks
* With the above provider, you do not need to use AWS CLI
* ECS is not included. Therefore to deploy to ECS service, you must use script provider. 
    * https://github.com/smalltide/github-travis-ecs
    * http://haoliangyu.github.io/blog/2018/03/19/AWS-ECS-auto-deployment-with-Travis-CI/
    * https://github.com/JicLotus/ecs-farate-scripts-to-deploy-and-build
    * https://github.com/motleyagency/travis-ecs-deploy
    * https://www.youtube.com/watch?v=zs3tyVgiBQQ&ab_channel=BeABetterDev
    * https://www.youtube.com/watch?v=AYAh6YDXuho&ab_channel=TechWorldwithNana
    

