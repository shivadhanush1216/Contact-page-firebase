# CONTACT PAGE USING FIREBASE

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/shivadhanush1216/Contact-page-firebase.git
   cd your-repository-name
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Copy `src/config/firebase.sample.js` to `src/config/firebase.js`:

   ```sh
   cp src/config/firebase.sample.js src/config/firebase.js
   ```

4. Replace the placeholder values in `src/config/firebase.js` with your actual Firebase credentials:

   ```javascript
   // src/config/firebase.js
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY_HERE",
     authDomain: "YOUR_AUTH_DOMAIN_HERE",
     projectId: "YOUR_PROJECT_ID_HERE",
     storageBucket: "YOUR_STORAGE_BUCKET_HERE",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
     appId: "YOUR_APP_ID_HERE",
   };

   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

## Usage

Open your browser and navigate to `http://localhost:3000` to see the contact page in action.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
