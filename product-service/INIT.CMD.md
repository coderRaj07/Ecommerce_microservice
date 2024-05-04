
aws configure

aws configure list

sudo npm i -g aws-cdk 

cdk --version

cdk init app --language=typescript (in empty product-service folder)

// lib ==> infrastructure as a code

// src ==> application logic 

// node_modules and package-lock.json removed to install yarn package

 
yarn add @types/aws-lambda --dev

yarn add typescript ts-node --dev

yarn add aws-lambda --dev 


// demo 

cdk bootstrap (right before deployment, docker-desktop needed)

cdk synth  // ==> creates CDKToolkit

cdk deploy --verbose --trace

https://dwvemtwz98.execute-api.ap-south-1.amazonaws.com/prod/product

cdk destroy --verbose

