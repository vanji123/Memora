pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'yourusername/sweetsocial'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/sweetsocial.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG -t $DOCKER_IMAGE:latest .'
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-pass', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    sh 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }
        stage('Kubernetes Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}