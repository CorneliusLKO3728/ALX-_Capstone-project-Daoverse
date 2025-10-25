
function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">Warning</div>
        <h2 className="text-2xl font-bold mb-3 text-red-400">
          Cultivation path severed.You have suffered from qi deviation
        </h2>
        <p className="text-white mb-6">
          {error || "An unexpected error occurred"}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;