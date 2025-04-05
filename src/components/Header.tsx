export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className="text-xl font-bold flex items-center">
          📝 <span className="ml-2">Get Done App</span>
        </div>

        {/* <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
          Login
        </button> */}
      </div>
    </header>
  );
}
