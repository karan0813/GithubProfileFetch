// src/components/Loader.tsx

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
