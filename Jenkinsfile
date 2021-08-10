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
                //sh "ls -altch '/var/jenkins_home/workspace/CICD Jenkins Project'"
                //sh "ls -altch '/var/jenkins_home/workspace/CICD Jenkins Project/src'"
                sh 'cd /var/jenkins_home/workspace/CICDJenkinsProject/src'
                sh 'ls -altch'
                sh 'pwd'
                sh '/var/jenkins_home/workspace/CICDJenkinsProject/src/ npm install'
                //sh "'/var/jenkins_home/workspace/CICD Jenkins Project/src' Project npm install"
            }
        }
    }
}
