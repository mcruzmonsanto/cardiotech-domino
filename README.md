# 🎲 An otador Cardiotech - Dominó

**Aplicación web para llevar el puntaje de partidas de dominó**

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://pages.github.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://www.javascript.com/)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6)](https://developer.mozilla.org/es/docs/Web/CSS)

---

## ✨ Características

- 📊 **Contador de Puntajes** - Marcador digital para dos equipos
- 🎯 **Meta Configurable** - Juega a 100, 200 o 500 puntos
- 🏆 **Premios Personalizables** - Configura el valor de capicúas, pases, etc.
- 📋 **Historial Completo** - Registro de todas las jugadas con opción de editar/eliminar
- ⚙️ **Configuración Centralizada** - Modal elegante con todas las opciones
- 📱 **Responsive** - Funciona en móviles, tablets y desktop
- 💾 **Persistencia** - Tus configuraciones se guardan en el navegador
- 🎨 **Diseño Cardiotech** - Colores corporativos rojo, negro y blanco

---

## 🚀 Despliegue en GitHub Pages

### Opción 1: Despliegue Automático

1. **Crear repositorio en GitHub**
   ```bash
   # Inicializar git en la carpeta
   git init
   git add .
   git commit -m "Initial commit: Anotador Cardiotech"
   ```

2. **Conectar con GitHub**
   ```bash
   git remote add origin https://github.com/TU-USUARIO/anotador-cardiotech.git
   git branch -M main
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** → **Pages**
   - En **Source**, selecciona **Branch:main** y **/(root)**
   - Click en **Save**

4. **Acceder a tu app**
   - Espera 1-2 minutos
   - Tu app estará en: `https://TU-USUARIO.github.io/anotador-cardiotech/`

---

### Opción 2: Crear Repositorio desde GitHub

1. **Crear repositorio nuevo en GitHub**
   - Nombre: `anotador-cardiotech`
   - Public o Private (GitHub Pages funciona en ambos)
   - NO inicialices con README

2. **Subir archivos**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU-USUARIO/anotador-cardiotech.git
   git push -u origin main
   ```

3. **Activar Pages** (mismo paso 3 de Opción 1)

---

## 📁 Estructura del Proyecto

```
domino_cardiotech/
├── index.html          # Página principal (antes en views/index.erb)
├── style.css           # Estilos (antes en public/)
├── logic.js            # Lógica de la app (antes en public/)
├── logo.jpg            # Logo Cardiotech (antes en public/)
├── manifest.json       # PWA manifest (antes en public/)
├── README.md           # Este archivo
└── .gitignore          # Archivos a ignorar
```

**Archivos removibles** (ya no necesarios para GitHub Pages):
- `app.rb` - Servidor Sinatra (ya no se usa)
- `views/` - Carpeta de vistas ERB (reemplazada por index.html)
- `public/` - Carpeta movida al raíz

---

## 🛠️ Desarrollo Local

### Probar la App Localmente

**Opción 1: Extensión Live Server (VS Code)**
1. Instala la extensión "Live Server"
2. Click derecho en `index.html` → "Open with Live Server"
3. Se abrirá en `http://127.0.0.1:5500`

**Opción 2: Python SimpleHTTPServer**
```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

**Opción 3: Node.js http-server**
```bash
npx http-server -p 8000
```

---

## 📝 Cómo Usar la Aplicación

### Configuración Inicial
1. Click en el ícono ⚙️ (arriba derecha)
2. Selecciona la **Meta** (100, 200 o 500 puntos)
3. Configura el **Valor del Premio** (capicúa, pase, etc.)
4. Cierra el modal

### Durante el Juego
1. **Sumar Puntos:**
   - Escribe el número en el teclado
   - Click en "Sumar a NOSOTROS" o "Sumar a ELLOS"

2. **Usar Premio:**
   - Click en "+25 Premio" (o el valor configurado)

3. **Ver Historial:**
   - Scroll en la sección de historial
   - Edita (✏️) o elimina (🗑️) jugadas individuales

4. **Nueva Partida:**
   - Click en ⚙️ → "🔄 Nueva Partida"

---

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `style.css`:
```css
:root {
    --brand-red: #D81E28;      /* Rojo Cardiotech */
    --brand-black: #1A1A1A;    /* Negro principal */
    --success-green: #10B981;  /* Verde premios */
}
```

### Cambiar Logo
Reemplaza `logo.jpg` con tu propio logo.

### Modificar Límites por Defecto
En `logic.js`, línea 9:
```javascript
let gameLimit = localStorage.getItem('cardiotechLimit') 
    ? parseInt(localStorage.getItem('cardiotechLimit'))  
    : 200; // <-- Cambia este valor
```

---

## 🔧 Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos con glassmorphism
- **JavaScript ES6** - Lógica de la aplicación
- **localStorage** - Persistencia de configuraciones
- **Material Icons** - Íconos
- **GitHub Pages** - Hosting gratuito

---

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (iOS y macOS)
- ✅ Navegadores móviles
- ✅ Tablets y desktop

---

## 📄 Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 👤 Créditos

**Desarrollado para Cardiotech Pharmaceutical**

---

## 📞 Soporte

Para reportar problemas o sugerencias, crea un [Issue](../../issues) en GitHub.

---

**¡Disfruta llevando el puntaje de tus partidas de dominó!** 🎲
