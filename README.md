# 🗣️ Real-Time Translator App (React Native + Expo)

A minimal real-time translator app built with **React Native** and **Expo**, featuring basic **authentication (login, register, and profile)** functionality using **Axios** and **JWT tokens**.

---

## 🚀 Features

- ✅ User Registration  
- ✅ User Login  
- ✅ Persistent JWT token storage using AsyncStorage  
- ✅ "Me" API to fetch authenticated user profile  
- ✅ Axios setup with token interceptor  
- ✅ Clean MVC-based API consumption  
- ✅ React Navigation (recommended to be added)  

---

## 📁 Folder Structure

```plaintext
project-root/
├── App.js
├── lib/
│   ├── api.js          # Axios instance
│   └── auth.js         # Login, register, me functions
├── screens/
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── ProfileScreen.js
├── assets/
└── ...
