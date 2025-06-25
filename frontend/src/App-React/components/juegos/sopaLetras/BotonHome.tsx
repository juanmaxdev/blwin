const BotonHome = () => {
  return (
    <div className="absolute top-4 left-4 z-50 group">
      <button
        onClick={() => window.parent.location.reload()}
        className="p-3 bg-white bg-opacity-70 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5V20.25h15V10.5" />
        </svg>
      </button>
    </div>
  );
};

export default BotonHome;
