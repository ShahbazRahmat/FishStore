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
                sh '${workspace}\src\ npm install' 
            }
        }
    }
}
