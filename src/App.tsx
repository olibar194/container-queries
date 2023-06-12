function App() {
  return (
    <div className='space-y-12 px-5 py-20 max-w-7xl mx-auto'>
      <div className='grid gap-2 sm:grid-cols-3 '>
        <Category
          intro='Your favorite picks to explore your places. Check out this month'
          image={'/hiking.webp'}
          name='Hiking'
        ></Category>
        <Category
          intro='Your favorite picks to explore your places. Check out this month'
          image={'/trail-running.webp'}
          name='Trail running'
        ></Category>
        <Category
          intro='Your favorite picks to explore your places. Check out this month'
          image={'/climbing.webp'}
          name='Climbing'
        ></Category>
      </div>
      <div className='grid gap-2 sm:grid-cols-2'>
        <Category
          intro='Your favorite picks to explore your places. Check out this month'
          image={'/snow-sports.webp'}
          name='Snow sports'
        ></Category>
        <Category
          intro='Your favorite picks to explore your places. Check out this month'
          image={'/mountainbiking.webp'}
          name='Mountainbiking'
        ></Category>
      </div>
      <Category
        intro='Your favorite picks to explore your places. Check out this month'
        image={'/most-wanted.webp'}
        name='Most Wanted'
      ></Category>
    </div>
  )
}

type CategoryProps = {
  name: string
  image: string
  intro: string
}

const Category = ({ name, image, intro }: CategoryProps) => {
  return (
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
  )
}
export default App
