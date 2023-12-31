
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage  } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);



export const requestPermission = () => {
    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification User Permission Granted."); 

        
        // Subscribe the devices corresponding to the registration tokens to the
        // topic.
  
        return getToken(messaging, { vapidKey: `` })
          .then((currentToken) => {
            if (currentToken) {
              console.log('Client Token: ', currentToken);

              fetch('http://localhost:8080/api/fcm/subscribe', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ "token": currentToken })
              })
              .then(response => {
                if (response.headers.get("content-type")?.includes("application/json")) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
              .then(data => {
                  console.log('Success:', data);
              })
              .catch((error) => {
                  console.error('Error:', error);
              });
              
            } else {
              
              console.log('Failed to generate the app registration token.');
            }
          })
          .catch((err) => {
            console.log('An error occurred when requesting to receive the token.', err);
          });
      } else {
        console.log("User Permission Denied.");
      }
    });
  }

requestPermission();


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});