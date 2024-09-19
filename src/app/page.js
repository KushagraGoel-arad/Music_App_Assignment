import Image from "next/image";

export default function Home() {
  return (
    <main className='p-4 bg-gray-100 h-screen'>
      <h1 className='font-bold text-xl'>Hello, Sprinter</h1>
      <p>
        Find your way to the <a className='text-blue-500 hover:underline' href='https://www.notion.so/sprintocom/Onboarding-Checklist-Frontend-0d2d0cc032234227933a3e353946fdb6' target='_blank'>Notion Doc here</a> 
         - for the onboarding checklist. This will help you get started with the project.
      </p>

      <div className='mt-4'>
        <div className='mb-2'>Find some of the important links here, this is where you'll be working on the exercises
          you can find the links in the code inside the src/app folder. For instance, the react primer exercise can be found inside src/app/react-primer
        </div>
        <ul className='list-disc list-inside'>
          <li><a className='text-blue-500 hover:underline' href='/react-primer'>React Primer</a></li>
          <li><a className='text-blue-500 hover:underline' href='/css-primer'>CSS Primer</a></li>
        </ul>
        <div className='mt-4'>
          Projects
        </div>
        <ul className='list-disc list-inside'>
          <li><a className='text-blue-500 hover:underline' href='/projects/music'>Music App</a></li>
          <li><a className='text-blue-500 hover:underline' href='/projects/todo'>Todo App</a></li>
        </ul>

      </div>
    </main>
  );
}
