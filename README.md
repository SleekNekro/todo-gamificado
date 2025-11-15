# 🌱 Mi Jardín Productivo

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Una aplicación web gamificada que convierte tus tareas diarias en un hermoso jardín virtual** 🌻

[Demo en Vivo](#) · [Reportar Bug](#) · [Solicitar Feature](#)

</div>

---

## 📖 Sobre el Proyecto

**Mi Jardín Productivo** es una aplicación de gestión de tareas con un enfoque único: cada tarea que creas se convierte en una planta en tu jardín virtual. Completa tus tareas para hacer crecer tus plantas, cosecha los frutos y gana recompensas mientras mantienes tu productividad.

### 🎯 Concepto Principal

- **🌱 Planta Semillas**: Cada tarea nueva es una semilla que plantas en tu jardín
- **💧 Riega tus Plantas**: Completa tus tareas para hacer crecer tus plantas
- **🌸 Cosecha Recompensas**: Las plantas maduras te dan frutas y monedas
- **📈 Sube de Nivel**: Gana experiencia y expande tu jardín

### ✨ Características

- 🎮 **Sistema de Gamificación**: Convierte tu productividad en un juego divertido
- 🌿 **Tipos de Plantas Variados**: Diferentes tareas generan diferentes plantas
  - 🌿 **Albahaca** - Tareas rutinarias (ej: hacer ejercicio diario)
  - 🌻 **Girasol** - Tareas ocasionales (ej: leer un capítulo)
  - 🥬 **Rábano** - Tareas urgentes (ej: llamada importante)
  - 🌳 **Manzano** - Metas a largo plazo (ej: aprender un idioma)
- 📊 **Sistema de Progreso**: Niveles, experiencia y monedas virtuales
- 🏡 **Múltiples Vistas**: Jardín, Casa, Lista de Tareas y Tienda
- 💾 **Persistencia Local**: Tus datos se guardan automáticamente en el navegador
- 📱 **Diseño Responsivo**: Funciona en móviles, tablets y escritorio

---

## 🚀 Comenzando

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** (versión 20.19 o superior)
- **npm** (viene incluido con Node.js)

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/todo-gamificado.git
cd todo-gamificado
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador**
```
http://localhost:5173
```

### Scripts Disponibles
```bash
npm run dev      # Inicia el servidor de desarrollo con hot-reload
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta el linter para verificar el código
```

---

## 🎮 Cómo Usar

### 1️⃣ Crear tu Primera Tarea

1. Ve a la pestaña **📋 Tareas**
2. Haz clic en **"🌱 Plantar Nueva Semilla"**
3. Selecciona el tipo de planta según tu tarea:
   - **Rutina**: Para hábitos diarios (crece en 3 días)
   - **Ocasional**: Para tareas puntuales (crece en 5 días)
   - **Urgente**: Para tareas rápidas (crece en 1 día)
   - **Meta**: Para objetivos grandes (crece en 14 días)
4. Escribe el título y detalles de tu tarea
5. ¡Haz clic en "Añadir"!

### 2️⃣ Hacer Crecer tus Plantas

- Ve a la pestaña **🌱 Jardín** para ver todas tus plantas
- Marca tareas como completadas para que crezcan
- Las tareas rutinarias necesitan completarse múltiples veces
- Observa cómo tus plantas pasan por diferentes etapas: 🌱 Semilla → 🌿 Creciendo → 🌸 Madura

### 3️⃣ Cosechar y Ganar Recompensas

- Cuando una planta brille (✨), ¡está lista para cosechar!
- Haz clic en la planta madura en tu jardín
- Ganarás:
  - 🍎 Frutas para tu inventario
  - 💰 Monedas para gastar
  - ⭐ Experiencia para subir de nivel

### 4️⃣ Expandir tu Jardín

- Comienza con un jardín de 3x3 (9 parcelas)
- Al subir de nivel, desbloqueas más espacio:
  - Nivel 3: 4x4 (16 parcelas)
  - Nivel 5: 5x5 (25 parcelas)
  - Nivel 8: 6x6 (36 parcelas)

---

## 🏗️ Estructura del Proyecto
```
todo-gamificado/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── garden/       # Componentes del jardín
│   │   ├── tasks/        # Componentes de tareas
│   │   └── ui/           # Componentes de interfaz
│   ├── data/             # Datos estáticos (plantas, etc.)
│   ├── hooks/            # Custom hooks de React
│   ├── styles/           # Archivos CSS
│   ├── types/            # Definiciones de TypeScript
│   ├── utils/            # Funciones auxiliares
│   ├── views/            # Vistas principales de la app
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── public/               # Recursos estáticos
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```

---

## 🛠️ Tecnologías Utilizadas

### Core
- **[React 19.1.1](https://react.dev/)** - Librería de UI
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Tipado estático
- **[Vite 7.1.7](https://vitejs.dev/)** - Build tool y dev server

### Desarrollo
- **[ESLint](https://eslint.org/)** - Linter de código
- **[TypeScript ESLint](https://typescript-eslint.io/)** - Reglas de ESLint para TS

### Características Técnicas
- ✅ **Hooks personalizados** para localStorage y manejo de estado
- ✅ **Sistema de tipos completo** con TypeScript
- ✅ **Arquitectura modular** y escalable
- ✅ **CSS puro** sin dependencias de frameworks
- ✅ **Responsive design** mobile-first

---

## 🎨 Características del Sistema

### Sistema de Plantas

| Tipo | Planta | Tiempo de Crecimiento | Valor | Uso |
|------|--------|----------------------|-------|-----|
| Rutina | 🌿 Albahaca | 3 días | 10 💰 | Hábitos diarios |
| Ocasional | 🌻 Girasol | 5 días | 25 💰 | Tareas puntuales |
| Urgente | 🥬 Rábano | 1 día | 15 💰 (+ 10 bonus) | Tareas rápidas |
| Meta | 🌳 Manzano | 14 días | 100 💰 | Objetivos grandes |

### Sistema de Niveles

- **Nivel 1-2**: 9 parcelas (3x3)
- **Nivel 3-4**: 16 parcelas (4x4)
- **Nivel 5-7**: 25 parcelas (5x5)
- **Nivel 8+**: 36 parcelas (6x6)

**Fórmula de experiencia**: Cada nivel requiere `nivel × 100` EXP

---

## 🗺️ Roadmap

### ✅ Versión 1.0 (Actual)
- [x] Sistema básico de tareas y plantas
- [x] Jardín visual con grid
- [x] Sistema de niveles y experiencia
- [x] Persistencia con localStorage
- [x] 4 tipos de plantas diferentes

### 🚧 Próximas Features
- [ ] 🏠 **Sistema de Casa**: Interior personalizable
- [ ] 🏪 **Tienda funcional**: Compra decoraciones y mejoras
- [ ] 🎨 **Pixel Art**: Sprites animados para plantas
- [ ] 👤 **Personalización**: Avatar y outfits del jugador
- [ ] 📊 **Estadísticas**: Gráficos de productividad
- [ ] 🏆 **Logros**: Sistema de achievements
- [ ] 🌙 **Modo Oscuro**: Tema nocturno
- [ ] 🔔 **Notificaciones**: Recordatorios de tareas
- [ ] ☁️ **Sincronización**: Guarda en la nube (opcional)

---

## 🤝 Contribuir

Las contribuciones son lo que hacen que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. ¡Cualquier contribución que hagas será **muy apreciada**!

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: alguna característica increíble'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo
- Usa TypeScript para todo el código nuevo
- Sigue las convenciones de nombres existentes
- Comenta el código complejo
- Asegúrate de que `npm run lint` pase sin errores

---

## 📝 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 👤 Autor

**Tu Nombre**

- GitHub: [SleekNekro](https://github.com/SleekNekro)
- LinkedIn: [Mi Perfil](www.linkedin.com/in/iker-perez-mata03)
- Email: ikerperezmata03@gmail.com

---

## 🙏 Agradecimientos

- Inspirado en juegos como Stardew Valley y Habitica
- Iconos de emoji nativos
- Comunidad de React y TypeScript
- A mis amigos que se aburren y me dan ideas

---

## 📸 Screenshots -- Pronto

### Jardín Principal
![Jardín](https://via.placeholder.com/800x400?text=Captura+del+Jardín)

### Lista de Tareas
![Tareas](https://via.placeholder.com/800x400?text=Captura+de+Tareas)

### Sistema de Niveles
![Progreso](https://via.placeholder.com/800x400?text=Captura+de+Progreso)

---

<div align="center">

**¿Te gusta el proyecto? ¡Dale una ⭐️!**

Hecho con ❤️ y mucho ☕

</div>
