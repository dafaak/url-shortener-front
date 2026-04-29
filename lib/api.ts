import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // --- LÓGICA DE MENSAJES DE ÉXITO ---
    const { method } = response.config;
    const { status } = response;

    // Solo disparamos toasts de éxito para peticiones que modifican datos
    if (status >= 200 && status < 300 && ['post', 'put', 'delete', 'patch'].includes(method || '')) {
      
      // Personalizamos el mensaje según el método HTTP
      let successMsg = 'Operación realizada con éxito';
      if (method === 'post') successMsg = '¡Creado correctamente!';
      if (method === 'put' || method === 'patch') successMsg = 'Actualizado con éxito';
      if (method === 'delete') successMsg = 'Eliminado correctamente';

      // Si el backend envía un campo "message", usamos ese en su lugar
      const serverMsg = response.data?.message;

      toast.success(successMsg, {
        description: serverMsg || null,
      });
    }
    
    return response;
  },
  (error) => {
    // --- LÓGICA DE ERRORES (Como la teníamos antes) ---
    if (!error.response) {
      toast.error('Error de red', { description: 'Revisa tu conexión a internet.' });
    } else {
      const message = error.response.data?.error || 'Ocurrió un error inesperado';
      toast.error('Error', { description: message });

      // Auto-logout si el token no es válido (401)
      if (error.response.status === 401) {
        Cookies.remove('auth_token');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;