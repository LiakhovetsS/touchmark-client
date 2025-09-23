# 🔐 TouchMark Client

> Secure HTTP request signature generation library  
> Бібліотека для створення безпечних цифрових підписів HTTP запитів

[🇺🇸 English](#english) | [🇺🇦 Українська](#українська)

---

## English

### 🎯 What is this library for?

TouchMark Client is a lightweight yet powerful library that helps protect your API requests from tampering and unauthorized access. It creates a unique digital signature for each HTTP request that can be verified on the server side, providing an additional layer of security for your applications.

### 👥 Who is it for?

- **🧑‍💻 Frontend Developers** - working with Vue.js, React, Angular, or any other framework
- **⚙️ Backend Developers** - who want to add an extra security layer to their APIs
- **🔒 Security Engineers** - focused on web application security
- **🎓 Junior Developers** - who want to understand how request authentication works
- **🏢 Enterprise Teams** - building secure web applications

### 🚀 What does it do?

The library generates a digital signature for your HTTP requests using:

- 🕐 **Timestamp** - request creation time (protects against replay attacks)
- 🌐 **User Agent** - browser/client information
- 🔑 **HMAC-SHA256** - cryptographic algorithm for signature creation
- 📡 **HTTP method and URL** - request details

The result is a unique base64-encoded signature that you can add to your request headers.

## 📦 Installation

```bash
npm install touchmark-client
```

## 🛠️ Usage

### Basic Usage

```typescript
import generateSignature from 'touchmark-client';

// Generate signature
const signature = generateSignature({
  method: 'POST',
  url: '/api/users',
  appSignature: 'your-secret-key'
});

// Use in your HTTP request
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-signature': signature
  },
  body: JSON.stringify({ name: 'John' })
});
```

### With Axios

```typescript
import axios from 'axios';
import generateSignature from 'touchmark-client';

const signature = generateSignature({
  method: 'POST',
  url: '/api/users',
  appSignature: process.env.REACT_APP_SIGNATURE
});

const response = await axios.post('/api/users', 
  { name: 'John' }, 
  {
    headers: {
      'x-signature': signature
    }
  }
);
```

### With Environment Variables

```typescript
import generateSignature from 'touchmark-client';

// Set your secret in environment variables
// .env file: REACT_APP_SIGNATURE=your-secret-key

const signature = generateSignature({
  method: 'GET',
  url: '/api/profile',
  appSignature: process.env.REACT_APP_SIGNATURE
});

fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-token',
    'x-signature': signature
  }
});
```

### Multiple Requests Example

```typescript
import generateSignature from 'touchmark-client';

const API_SECRET = 'your-secret-key';

// Helper function
function createSecureRequest(method: string, url: string, data?: any) {
  const signature = generateSignature({
    method,
    url,
    appSignature: API_SECRET
  });

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-signature': signature
    },
    body: data ? JSON.stringify(data) : undefined
  });
}

// Usage
await createSecureRequest('GET', '/api/users');
await createSecureRequest('POST', '/api/users', { name: 'John' });
await createSecureRequest('PUT', '/api/users/1', { name: 'Jane' });
await createSecureRequest('DELETE', '/api/users/1');
```

## 🔧 API Reference

### `generateSignature(params)`

Generates a digital signature for HTTP requests.

**Parameters:**

- `params` - object with request parameters:
  - `method` (string) - HTTP method (GET, POST, PUT, DELETE, etc.)
  - `url` (string) - request URL
  - `appSignature` (string) - secret key for signature generation

**Returns:** `string` - Base64 encoded signature

**Throws:** Error if `appSignature` is not provided

## 🔒 Security

⚠️ **Important:**

- Never store the secret key in client-side code in production
- Use environment variables for secret management
- The secret key must be the same on client and server
- Consider implementing timestamp validation on the server side
- Signatures have a limited lifetime - validate timestamps on the server

## 🌍 Environment Support

- ✅ **Browser** - works with all modern browsers
- ✅ **Node.js** - supports server-side environment
- ✅ **React Native** - compatible with mobile applications
- ✅ **TypeScript** - full type support

## 🐛 Common Issues

### "Secret key is required"

```typescript
// ❌ Wrong
generateSignature({ method: 'GET', url: '/api' });

// ✅ Correct
generateSignature({ 
  method: 'GET', 
  url: '/api',
  appSignature: 'your-secret' 
});
```

## 📄 License

MIT

---

## Українська

### 🎯 Для чого ця бібліотека?

TouchMark Client - це невелика, але потужна бібліотека, яка допомагає захистити ваші API запити від підробки та несанкціонованого доступу. Вона створює унікальний цифровий підпис для кожного HTTP запиту, який можна перевірити на сервері, забезпечуючи додатковий рівень безпеки для ваших додатків.

### 👥 Для кого вона?

- **🧑‍💻 Frontend розробники** - які працюють з Vue.js, React, Angular або будь-яким іншим фреймворком
- **⚙️ Backend розробники** - які хочуть додати додатковий рівень безпеки до своїх API
- **🔒 Security engineers** - які займаються захистом веб-додатків
- **🎓 Джуніор розробники** - які хочуть зрозуміти, як працює аутентифікація запитів
- **🏢 Корпоративні команди** - які створюють безпечні веб-додатки

### 🚀 Що вона робить?

Бібліотека генерує цифровий підпис для ваших HTTP запитів, використовуючи:

- 🕐 **Timestamp** - час створення запиту (захищає від replay атак)
- 🌐 **User Agent** - інформація про браузер/клієнт
- 🔑 **HMAC-SHA256** - криптографічний алгоритм для створення підпису
- 📡 **HTTP метод та URL** - деталі самого запиту

Результат - унікальний base64-закодований підпис, який ви можете додати до заголовків запиту.

## 📦 Встановлення

```bash
npm install touchmark-client
```

## 🛠️ Використання

### Базове використання

```typescript
import generateSignature from 'touchmark-client';

// Генеруємо підпис
const signature = generateSignature({
  method: 'POST',
  url: '/api/users',
  appSignature: 'your-secret-key'
});

// Використовуємо в HTTP запиті
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-signature': signature
  },
  body: JSON.stringify({ name: 'John' })
});
```

### З Axios

```typescript
import axios from 'axios';
import generateSignature from 'touchmark-client';

const signature = generateSignature({
  method: 'POST',
  url: '/api/users',
  appSignature: process.env.REACT_APP_SIGNATURE
});

const response = await axios.post('/api/users', 
  { name: 'John' }, 
  {
    headers: {
      'x-signature': signature
    }
  }
);
```

### Зі змінними середовища

```typescript
import generateSignature from 'touchmark-client';

// Встановлюємо секрет у змінних середовища
// .env файл: REACT_APP_SIGNATURE=your-secret-key

const signature = generateSignature({
  method: 'GET',
  url: '/api/profile',
  appSignature: process.env.REACT_APP_SIGNATURE
});

fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-token',
    'x-signature': signature
  }
});
```

### Приклад з кількома запитами

```typescript
import generateSignature from 'touchmark-client';

const API_SECRET = 'your-secret-key';

// Допоміжна функція
function createSecureRequest(method: string, url: string, data?: any) {
  const signature = generateSignature({
    method,
    url,
    appSignature: API_SECRET
  });

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-signature': signature
    },
    body: data ? JSON.stringify(data) : undefined
  });
}

// Використання
await createSecureRequest('GET', '/api/users');
await createSecureRequest('POST', '/api/users', { name: 'John' });
await createSecureRequest('PUT', '/api/users/1', { name: 'Jane' });
await createSecureRequest('DELETE', '/api/users/1');
```

### Приклад для Vue.js додатку

```typescript
// api.ts
import generateSignature from 'touchmark-client';

export class ApiService {
  private readonly baseURL: string;
  private readonly appSignature: string;

  constructor(baseURL: string, appSignature: string) {
    this.baseURL = baseURL;
    this.appSignature = appSignature;
  }

  async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const signature = generateSignature({
      method,
      url: endpoint, // використовуємо відносний URL
      appSignature: this.appSignature
    });

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-signature': signature
      },
      body: data ? JSON.stringify(data) : undefined
    });

    return response.json();
  }

  getUsers() {
    return this.request('GET', '/api/users');
  }

  createUser(userData: any) {
    return this.request('POST', '/api/users', userData);
  }
}

// main.ts
const apiService = new ApiService(
  'https://api.example.com',
  process.env.VUE_APP_SIGNATURE!
);

// Використання в компоненті
const users = await apiService.getUsers();
await apiService.createUser({ name: 'Іван', email: 'ivan@example.com' });
```

## 🔧 API Довідка

### `generateSignature(params)`

Генерує цифровий підпис для HTTP запитів.

**Параметри:**

- `params` - об'єкт з параметрами запиту:
  - `method` (string) - HTTP метод (GET, POST, PUT, DELETE, тощо)
  - `url` (string) - URL запиту
  - `appSignature` (string) - секретний ключ для генерації підпису

**Повертає:** `string` - Base64 закодований підпис

**Викидає помилку:** якщо `appSignature` не надано

## 🔒 Безпека

⚠️ **Важливо:**

- Ніколи не зберігайте секретний ключ у клієнтському коді в продакшені
- Використовуйте змінні середовища для управління секретами
- Секретний ключ повинен бути однаковим на клієнті та сервері
- Розгляньте можливість валідації timestamp на сервері
- Підписи мають обмежений час життя - перевіряйте timestamps на сервері

## 🌍 Підтримка середовищ

- ✅ **Браузер** - працює з усіма сучасними браузерами
- ✅ **Node.js** - підтримує серверне середовище
- ✅ **React Native** - сумісний з мобільними додатками
- ✅ **TypeScript** - повна підтримка типів

## 🐛 Поширені проблеми

### "Secret key is required"

```typescript
// ❌ Неправильно
generateSignature({ method: 'GET', url: '/api' });

// ✅ Правильно
generateSignature({ 
  method: 'GET', 
  url: '/api',
  appSignature: 'your-secret' 
});
```

## 🤝 Внесок у розвиток

Будемо раді вашим пропозиціям та поліпшенням! Створюйте Issues та Pull Requests.

## 📄 Ліцензія

MIT

---

💡 *From developers who got tired of searching for simple tools.*
