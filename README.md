# CSS Container Queries — It Was Worth the Long Wait! - @frontendfyi

Las CSS Container Queries (consultas de contenedor) son una característica en desarrollo para CSS que permitirá a los estilos de los elementos responder a las características y dimensiones de su contenedor en lugar de la ventana del navegador. Esta es una adición significativa a las CSS, ya que actualmente las consultas de medios solo pueden responder a las características de la ventana del navegador.

Algunas características y aplicaciones de las CSS Container Queries incluyen:

1. Diseño adaptable a nivel de componente: Con las CSS Container Queries, puedes aplicar estilos diferentes a un componente según las dimensiones y características de su contenedor. Esto facilita el diseño y desarrollo de componentes que se ajustan automáticamente a diferentes tamaños de contenedor, lo que resulta en una experiencia de usuario más consistente y adaptable.
2. Mejor control sobre el diseño: Con las Container Queries, puedes establecer reglas de estilo más precisas para componentes específicos. Por ejemplo, puedes aplicar estilos diferentes cuando un contenedor alcanza un ancho específico o cuando ciertos elementos internos ocupan cierto espacio. Esto permite un mayor control sobre cómo se visualizan y comportan los componentes en diferentes contextos.
3. Reutilización de componentes: Al permitir que los estilos de un componente respondan a su contenedor, se facilita la reutilización de componentes en diferentes diseños y contextos. Los componentes pueden adaptarse automáticamente a su entorno sin necesidad de modificar su código o aplicar estilos adicionales.
4. Diseño de cuadrículas flexibles: Las CSS Container Queries pueden ayudar a crear diseños de cuadrículas flexibles y adaptables. Puedes establecer reglas de estilo en función de la cantidad de columnas o filas que se ajustan al contenedor, lo que permite crear diseños de cuadrícula más fluidos y responsivos.
5. Mejor legibilidad y mantenibilidad del código: Al mover la responsabilidad del diseño adaptable a nivel de componente, las CSS Container Queries pueden mejorar la legibilidad y mantenibilidad del código CSS. Los estilos relacionados con el contenedor se pueden definir y mantener junto con el componente, lo que hace que el código sea más modular y comprensible.

Desde aquí comenzaremos creando un componente para cada categoría y aplicar los Container Queries:

Antes:

```tsx
return (
    <div className='space-y-12 px-5 py-20'>
      <div className='grid gap-2 sm:grid-cols-3'>
        <div>Hiking</div>
        <div>Trail running</div>
        <div>Climbing</div>
      </div>
      <div className='grid gap-2 sm:grid-cols-2'>
        <div>Snow sports</div>
        <div>Mountainbiking</div>
      </div>
      <div>Most Wanted</div>
    </div>
  )
```

Después:

```tsx
function App() {
  return (
    <div className='space-y-12 px-5 py-20'>
      <div className='grid gap-2 sm:grid-cols-3'>
        <Category name='Hiking'></Category>
        <Category name='Trail running'></Category>
        <Category name='Climbing'></Category>
      </div>
      <div className='grid gap-2 sm:grid-cols-2'>
        <Category name='Snow sports'></Category>
        <Category name='Mountainbiking'></Category>
      </div>
      <Category name='Most Wanted'></Category>
    </div>
  )
}

type CategoryProps = {
  name: string
}

const Category = ({ name }: CategoryProps) => {
  return (
    <div className='rounded-md bg-black text-white aspect-square'> {name}</div>
  )
}
```

<aside>
🔰 En este punto vamos a considerar el hecho de que los ‘breakpoints’ para transformar los elementos en una grilla va a diferir de aquellos donde se utilicen las Container Queries, ya que:
- Container Queries → breakpoint basado en el tamaño del container
- Media Queries → basados en el tamaño de la página o screen

</aside>

- overflow-clip y position relative para el fondo del div

```
const Category = ({ name, image }: CategoryProps) => {
  return (
    <div className='rounded-md bg-black text-white aspect-square overflow-clip '> 
    <img src={image} alt="" className="absolute h-full w-full object-cover" />
    {name}</div>
  )
```

---

Para comenzar con las Container Queries:

[https://github.com/tailwindlabs/tailwindcss-container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries)

```jsx
npm install @tailwindcss/container-queries
```

En tailwind.config.js se debe agregar el plugin:

```jsx
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [containerQueries],
}
```

- Al elemento div parent se le agrega la className @container
- Al elemento hijo u sub-hijos se le puede agregar el container query con valores asignado (no se va a usar por ejemplo @sm:items-start ya que convinaría valores de Media Queries con los Container y quedaría raro)
    
    ```jsx
    <div className='relative z-10 w-full flex items-center justify-center
     flex-col h-full p-5 @[350px]:items-start'>
    ```
    
- Para el caso del último elemento, donde queremos que interactúe con el <div> inmediatamente superior y no el de la totalidad de la tarjeta, tendremos que usar un nombre para el Container Query personalizado en vez del genérico @container, en Tailwind lo definiremos de la sig. manera:

```jsx
@container/text-wrapper
```

<aside>
🔰 Si no se define en la clase el container con el nombre va a hacer referencia al container que se descubra primero como padre

</aside>

Los container query posibilitan la disiminución de código duplicado y tienen la posibilidad de ser usados ademas de con el ancho del elemento, con el alto y también con la relación de aspecto.

### Resultado:

```tsx
<div className='relative flex rounded-md bg-black text-white aspect-square overflow-clip @container/category'>
      <img
        src={image}
        alt=''
        className='absolute h-full w-full object-cover @[700px]:w-[70%]'
      />
      <div className='@container relative z-10 w-full flex items-center justify-center flex-col h-full p-5 @[350px]:items-start @[350px]:justify-end @[700px]:left-[70%] @[700px]:justify-start @[700px]:w-[30%]'>
        <p className='text-xl @[350px]:text-3xl'>{name}</p>
        <p className='hidden @[350px]/category:block mt-2 @[700px]/category:mt-5 object-contain whitespace-wrap'>
          {intro}
        </p>
      </div>
    </div>
```