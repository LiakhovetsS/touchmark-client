import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

/**
 * Інтерфейс для параметрів генерації підпису
 */
interface SignatureParams {
    /** HTTP метод (GET, POST, PUT, DELETE, тощо) */
    method: string;
    /** URL адреса запиту */
    url: string;
    /** Секретний ключ для підпису (за замовчуванням береться з process.env.VUE_APP_SIGNATURE) */
    appSignature?: string;
}

/**
 * 🔐 Генерує цифровий підпис для HTTP запиту
 *
 * Ця функція створює безпечний підпис для аутентифікації запитів,
 * використовуючи HMAC-SHA256 алгоритм з timestamp та user agent.
 *
 * @param params - Параметри для генерації підпису
 *
 * @example
 * ```typescript
 * const fingerprint = generateSignature({
 *   method: 'POST',
 *   url: '/api/users',
 *   appSignature: 'your-secret-key'
 * });
 *
 * fetch('/api/users', {
 *   method: 'POST',
 *   headers:{
 *   'Content-Type': 'application/json'
 *   'x-signature': fingerprint
 *   },
 *   body: JSON.stringify({ name: 'John' })
 * });
 * ```
 */
export function generateSignature({
                                              method,
                                              url,
                                              appSignature
                                          }: SignatureParams): string {
    if (!appSignature) {
        throw new Error('🚨 Secret key is required to generate the signature');
    }

    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Node.js';

    const timestamp = Math.floor(Date.now() / 1000);

    // Створюємо повідомлення для підпису
    const message = `${method.toLowerCase()}:${url}:${timestamp}:${userAgent.replace(/\s+/g, '')}`;

    // Генеруємо HMAC-SHA256 підпис
    const hmac = hmacSHA256(message, appSignature).toString(Hex);

    // Додаємо підпис до заголовків
    return Buffer.from(`${timestamp}_${hmac}`).toString('base64');
}

