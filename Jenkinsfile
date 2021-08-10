pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'whoami'
                sh 'cat /etc/passwd'
                sh "'/var/jenkins_home/workspace/CICD Jenkins Project/src' Project npm install"
            }
        }
    }
}
