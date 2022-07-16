pipeline {
    agent any

    environment {
        PATH = "$PATH:/usr/bin"
        GIT_COMMIT_MSG = sh (script: "git log -1 --pretty=%B ${GIT_COMMIT}", returnStdout: true).trim()
        NAME = "KwaDrop_frontend"
        NAME_DEV = "KwaDrop_frontend_dev"
    }

    stages {
        stage("Deploy Prod") {
            when {
                branch "master"
            }
            steps {
                    sh "pwd"
                    sh "whoami"
                    echo "${GIT_COMMIT_MSG}"
                    echo "Deploying and Building..."
                    sh "sendNotification \"Found new commit **${GIT_COMMIT_MSG}**\""
                    sh "sendNotification \"#${NAME} Building New Container #${BUILD_NUMBER}\""
                    sh "docker-compose build"
                    sh "sendNotification \"#${NAME} Upping New Container #${BUILD_NUMBER}\""
                    sh "docker-compose up -d"
                    echo "Deployed!"
                    sh "sendNotification \"START PROTOCOL KILL @froggy_kwa\""
            }
        }

        stage("Deploy Dev") {
            when {
                branch "dev"
            }
            steps {
                    sh "pwd"
                    echo "Deploying and Building..."
                    sh "sendNotification \"Found new commit **${GIT_COMMIT_MSG}**\""
                    sh "sendNotification \"#${NAME_DEV} Building New Container #${BUILD_NUMBER}\""
                    sh "docker-compose build"
                    sh "sendNotification \"#${NAME_DEV} Upping New Container #${BUILD_NUMBER}\""
                    sh "docker-compose up -d"
                    echo "Deployed!"
                    sh "sendNotification \"START PROTOCOL KILL @froggy_kwa\""
            }
        }
    }

    post {
        success {
            sh "sendNotification \"#${NAME} Deploy Succeed -> START PROTOCOL rm -rf /*\""
        }
        failure {
            sh "sendNotification \"#${NAME} Deploy Failed -> START PROTOCOL rm -rf /*\""
        }
    }
}
