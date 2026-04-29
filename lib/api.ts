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
    const { method, url } = response.config;
    const { status } = response;

  if (url?.includes('/login')) {
      toast.success('Bienvenido!');
      return response;
    }

    if (status >= 200 && status < 300 && ['post', 'put', 'delete', 'patch'].includes(method || '')) {
      
      let successMsg = 'Operación realizada con éxito';
      if (method === 'post') successMsg = '¡Creado correctamente!';
      if (method === 'put' || method === 'patch') successMsg = 'Actualizado con éxito';
      if (method === 'delete') successMsg = 'Eliminado correctamente';

      const serverMsg = response.data?.message;

      toast.success(successMsg, {
        description: serverMsg || null,
      });
    }
    
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error('Error de red', { description: 'Revisa tu conexión a internet.' });
    } else {
      const message = error.response.data?.error || 'Ocurrió un error inesperado';
      toast.error('Error', { description: message });

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