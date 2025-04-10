function Input({ label, type, value, onChange }) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  }
  
  export default Input;
   
