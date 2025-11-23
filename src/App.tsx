import "./App.css";

function App() {
  return (
    <>
      <div className="p-6 space-y-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind fonctionne 🎉
        </h1>

        <p className="text-green-600 p-3 bg-green-100 rounded">
          Si tu vois ce bloc en vert, c’est que Tailwind est bien installé !
        </p>

        <p className="text-red-600 p-3 bg-red-100 rounded">
          Et si ce texte est en rouge, tout est parfait ✔️
        </p>
      </div>
    </>
  );
}

export default App;
