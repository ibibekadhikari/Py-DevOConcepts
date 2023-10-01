#A simple tool in order to test and see the deployment process.
""" Made on purpose to learn & not for official use """
<h2>Simple WiKI Search Api V2.0-<h2>


<h3>USE:</h3>
1. Clone the repository.

<h4>#Inside the Wiki-fastapi Directory:</h4>
  
    S1. docker build -t server-fastapi .
    S2. docker run -d -p 8000:8000 server-fastapi (-d is optional if you are willing to run it in the backgrouund mode)
    S3: docker ps (Inorder to check your running images)

<h4>#Inside the Wiki-react Directory.</h4>

       S1. docker build -t client-react .
       S2. docker run -d -p 3000:3000 client-connect (-d is optional if you are willing to run it in the backgrouund mode)
       S3: docker ps (Inorder to check your running images)
