# Prueba Técnica – Galería de Imágenes con Favoritos y Caché

## Descripción

Aplicación desarrollada con **React Native (Expo)** que muestra una galería de imágenes obtenidas desde la API pública [Picsum Photos](https://picsum.photos/).  
Permite a los usuarios explorar imágenes, marcarlas como favoritas y conservar esta información entre sesiones.  
Además, implementa un sistema propio de **caché local de imágenes** para mejorar el rendimiento y reducir el consumo de red.

---

## Funcionalidades

- **Galería de imágenes:** consumo de la API de Picsum con paginación/infinite scroll.  
- **Favoritos:** marcación de imágenes como favoritas con persistencia usando `AsyncStorage` + `Zustand`.  
- **Caché local:** descarga y almacenamiento de imágenes mediante `expo-file-system/legacy`.  
- **Layout adaptable:** ajuste automático del número de columnas según la cantidad de imágenes.  
- **Estados vacíos:** mensajes y visuales personalizados cuando no hay favoritos.  
- **Animaciones:** doble tap para mostrar un corazón animado al marcar como favorito.  

---

## Tecnologías utilizadas

- [Expo SDK 52](https://docs.expo.dev/)  
- React Native  
- Zustand → manejo de estado global  
- AsyncStorage → persistencia de favoritos  
- expo-file-system/legacy → caché de imágenes  
- React Native Animated API  

---

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DeveloperKes/ImagesGallery.git
   ```
2. Entra al proyecto:
   ```bash
   cd ImagesGallery
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
    ### o
   ```bash
    yarn install
   ```
4. Inicia la app:
   ```bash
    npx expo start
   ```
   Requiere tener instalado Expo Go
   en tu dispositivo móvil o usar un emulador Android/iOS.

# Comentarios y posibles mejoras

- Implementar un sistema de limpieza de caché por tiempo o tamaño máximo.
- Implementar un skeleton para evitar que la pantalla se vea vacía mientras se renderizan las imágenes.
- Incluir más soporte al tema de claro/oscuro, ya que implemente el manejo de tema pero no tuve tiempo de hacerlo más sólido.
- Primeramente tenía pensado hacer un inicio de sesión básico con Zustand por eso se ve el icono de cierre, pero realmente no alcance a abordarlo como quería así que deseche la idea.
- Implementar un buscador, que en este caso mediante los seed del api pueda recrear búsquedas.
- Para el scroll infinito se realizó una búsqueda con paginación aleatoria, esto con la intención de simular un contenido infinito ya que realmente en el api no se cuentan sino con 33 páginas de imágenes.
