# omg

[![Vue](https://github.com/etherio/omg/workflows/Vue/badge.svg)](https://github.com/etherio/omg/actions)

[![Netlify Status](https://api.netlify.com/api/v1/badges/4a1fea98-6608-4e58-a29b-ebf2f2d7910b/deploy-status)](https://app.netlify.com/sites/serene-galileo-f84e05/deploys)

## Static Page

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
# vue default is `npm run serve`
npm test
```

### Compiles and minifies for production

```sh
# vue default is `npm run build`
npm start
```

## Firebase Configuration

### Authentication

**Sign-In Methods**

- Email / Password
- Google
- Facebook

> **Multiple accounts per email address:** Allow users to create multiple accounts for authentication providers that use the same email address.

### Firestore (Indexes)

```json
{
  "indexes": [
    {
      "collectionGroup": "products",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "stock",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
}
```

### Firestore (Rule)

```js
service cloud.firestore {
  match /databases/{document}/documents {

    function isLogin() {
      return request.auth != null &&
      request.auth.uid != null;
    }

    function hasRole() {
      return request.auth.token != null &&
      request.auth.token.role != null;
    }

    function isAdmin() {
      return request.auth.token.role == 'admin';
    }

    function isModerator() {
      return request.auth.token.role == 'moderator';
    }

    match /public/{database} {
      match /{collection}/{anyPath=**} {
        allow read: if isLogin() && hasRole() && isModerator();
        allow write: if isLogin() && hasRole() && isAdmin();
      }
    }
  }
}
```

### Realtime Database (Rule)

```json
{
  "rules": {
    "$database": {
      "colors": {
        ".read": "auth.uid != null",
        ".write": "auth.uid != null"
      },
      "categories": {
        ".read": "auth.uid != null",
        ".write": "auth.uid != null"
      },
      "request_access": {
        ".read": "auth.token.role === 'admin'",
        ".write": "auth.uid != null"
      }
    }
  }
}
```

### Storage [Rule]

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{document=**} {
      allow read, write: if request.auth!=null;
    }
  }
}
```

## Functions

**Using**

- [Netlify](https://netlify.com) Lambda Functions
