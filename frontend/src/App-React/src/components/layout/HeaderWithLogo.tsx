const HeaderWithLogo = () => (
    <div className="flex items-center justify-center gap-4 mb-12 flex-wrap text-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-16 h-16 object-contain drop-shadow-md"
      />
      <h1 className="text-6xl font-extrabold text-indigo-700 drop-shadow-xl">
        TRIVIADOS
      </h1>
    </div>
  );
  
  export default HeaderWithLogo;
  