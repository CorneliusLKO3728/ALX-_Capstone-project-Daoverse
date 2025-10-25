
function Loading({ message = "Loading cultivation novels...", size = "large" }) {
  const sizeClasses = {
    small: "text-4xl",
    medium: "text-5xl",
    large: "text-6xl"
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className={`${sizeClasses[size]} mb-4 animate-spin`}>⚔️</div>
        <div className="text-xl text-white">
          {message}
          <span className="inline-flex ml-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Loading;