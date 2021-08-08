pipeline {
    agent {
        docker {
            image 'docker:dind' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh "'/var/jenkins_home/workspace/CICD Jenkins/src' Project npm install" 
            }
        }
    }
}
