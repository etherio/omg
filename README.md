# omg

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

### Firestore [Indexes]

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

### Firestore [Rule]

```ts
service cloud.firestore {
  match /databases/{database}/documents {

    // check user is logged in
    function User() {
      return request.auth != null &&
      request.auth.uid != null &&
      request.auth.token.firebase.sign_in_provider != 'anonymous';
    }

    // check user has role
    function hasRole() {
      return request.auth.token != null &&
      request.auth.token.role != null;
    }

    // check user is admin
    function Admin() {
      return request.auth.token.role == 'admin';
    }

    // check user is moderator
    function Moderator() {
      return request.auth.token.role == 'moderator';
    }

    // [PRIVATE]
    match /private/{document} {
      match /users/{userId} {
        allow get: if User();
        allow list: if User() && hasRole() && Admin();
        allow write: if User() && hasRole() && Admin();
      }
    }

    // [PUBLIC]
    match /public/{document} {
      match /{collection}/{anyPath=**} {
        allow read: if hasRole();
        allow write: if hasRole() && Admin();
      }
    }
  }
}
```

### Database [Rule]

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

## Functions

**Using**

- [Netlify](https://netlify.com) Lambda Functions
