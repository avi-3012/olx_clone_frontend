# OLX-CLONE

This is a **Frontend Repository** for the functional OLX clone.
For Backend Repository ```https://github.com/avi-3012/olx_clone_backend```

## Features:

- User can Login or register themselves.
- User can see all the listed products(**Unsold**) without login.
- User can also see all the listed products(Unsold, ***excluding products listed by the user itself***) on homepage after **Login**.
    ### After Login
    
- User can access different pages through the **Menu** provided in **Navbar**.
- User can list their own product through **Sell Page**.
- User can see their own listed products( **with Sold and Unsold status** ) in **My Products** section through **Account page**.
- User can see their all ordered product in **My Orders** section through **Account Page**.
- User will be remained logged in for all future visits to this domain until user Logs out through the **Log Out** button in **Menu**

## INSTALLATION 


- Open Terminal and clone the Repository.

    ```git clone https://github.com/avi-3012/olx_clone_frontend.git```

- Then, Change directory to the backend folder.

    ```cd olx_clone_frontend/```

- Now, Create a ```.env``` file and place it in root directory of frontend folder with below content.

    ```REACT_APP_URL=http://192.168.1.101:8080```

- Install all node_modules.

    ```npm install```
    
- Now, go to package.json file in the frontend directory. Search for "scripts" and remove the "PORT=80" from the "start" script.

- Run the frontend server.

    ```npm start```

    Now open your preferred browser and go to ```http://localhost:3000/``` If the window loads with OLX Logo and title, then **Congrats!!** you have successfully deployed the OLX-CLONE **frontend** on your local network. Be sure to deploy backend of this app for the website to work correctly.


## Accounts

- **Email:** test@test.com **Pass:** test
- **Email:** test2@test.com **Pass:** test
- **Email:** test3@test.com **Pass:** test
