pipeline {
    agent any

    // Requires a GitHub webhook pointed at http://YOUR_SERVER:8080/github-webhook/
    // (GitHub plugin -> repo Settings -> Webhooks -> Payload URL, content type application/json)
    triggers {
        githubPush()
    }

    environment {
        COMPOSE_PROJECT_NAME = "simple-demo"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    docker compose down
                    docker compose up -d --build
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10
                    curl -f http://localhost:8081/api/health || (docker compose logs backend && exit 1)
                    curl -f http://localhost:3000 || (docker compose logs frontend && exit 1)
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully — backend and frontend are up.'
        }
        failure {
            echo 'Pipeline failed — check the stage logs above.'
        }
    }
}
