function Button({ text }) {
    return (
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {text}
      </button>
    );
  }
  
  export default Button;
  
