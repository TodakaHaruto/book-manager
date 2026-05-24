'use client';

export default function Error({ error, reset }) {
  return (
    <div className="pt-32 text-center text-white">
      <p>エラーが発生しました</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        再試行
      </button>
    </div>
  );
}
