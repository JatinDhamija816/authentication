import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className='bg-gray-700 flex justify-between py-3 text-white px-5'>
        <h2 className="uppercase">Welcome</h2>
        <div>
          <button className="text-white hover:bg-slate-400 rounded-2xl px-5 py-1"><Link href='/login'>Login</Link></button>
          <button className="text-white hover:bg-slate-400 rounded-2xl px-5 py-1"><Link href='/register'>Register</Link></button>
        </div>
      </nav>
    </main >
  );
}
