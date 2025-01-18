# FlexMeet
FlexMeet simplifies scheduling by allowing participants to easily share their availability. With an intuitive interface and interactive features, it helps you quickly find the best times to meet, making coordination effortless.

## Prerequisites
Ensure that the following software is installed on your system:
- [Docker](https://www.docker.com/): For containerizing and deploying the application.

## Frontend Deployment
### Steps:
1. Clone this repository:
```bash
git clone git@github.com:FlexMeet/flexmeet.git
cd flexmeet
```

2. Create the docker image
```bash
docker build . -t <YOUR_DOCKER_HUB_USERNAME>/flexmeet
```

3. Run the docker image
```bash
docker run -p 3000:3000 -d <YOUR_DOCKER_HUB_USERNAME>/flexmeet
```

4. Access the webpage through [localhost:3000](http://localhost:3000)

