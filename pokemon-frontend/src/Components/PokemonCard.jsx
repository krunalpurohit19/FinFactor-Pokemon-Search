export default function PokemonCard({ pokemon }) {

    const statNames = [
        "HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"
    ];

    // Pastel color palette
    const typeColors = {
        bug: "#e8f2c7",
        fire: "#f9d7c3",
        water: "#cfe7fa",
        grass: "#d7f4dd",
        psychic: "#f1d9ff",
        electric: "#fae9b6",
        poison: "#efd9f7",
        flying: "#edf5ff",
        normal: "#e4e1d7",
        fighting: "#f6d2d2",
        ice: "#dff7ff",
        rock: "#ebe3d1",
        ground: "#f0e5c7",
        ghost: "#f1eaff",
        fairy: "#ffe8f6",
        dragon: "#dce6ff",
        steel: "#e3e8ed",
        dark: "#e0e0e0"
    };

    const mainType = pokemon.types[0].toLowerCase();
    const pastel = typeColors[mainType] || "#f3f4f6";

    return (
        <div
            className="p-8 rounded-2xl shadow-md w-[500px] border mx-auto"
            style={{
                backgroundColor: "#ffffff",
                borderColor: pastel,
            }}
        >
            {/* NAME */}
            <h2 className="text-3xl font-semibold text-gray-800 text-center capitalize mb-5">
                {pokemon.name}
            </h2>

            {/* IMAGE BOX */}
            <div className="flex justify-center mb-5">
                <div
                    className="p-6 rounded-2xl flex items-center justify-center"
                    style={{
                        backgroundColor: pastel,
                        opacity: 0.6,
                    }}
                >
                    <img src={pokemon.imageUrl} alt={pokemon.name} className="w-32 h-32" />
                </div>
            </div>

            {/* HEIGHT & WEIGHT */}
            <div className="flex justify-between text-gray-700 mb-3 text-sm font-medium">
                <p><span className="font-semibold">Height:</span> {pokemon.height}</p>
                <p><span className="font-semibold">Weight:</span> {pokemon.weight}</p>
            </div>

            {/* TYPES */}
            <p className="mb-3 text-sm flex items-center gap-2">
                <strong className="text-gray-800">Types:</strong>
                {pokemon.types.map((t, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs capitalize"
                        style={{ backgroundColor: pastel }}
                    >
                        {t}
                    </span>
                ))}
            </p>

            {/* ABILITIES */}
            <p className="mb-6 text-sm flex items-center gap-2 flex-wrap">
                <strong className="text-gray-800">Abilities:</strong>
                {pokemon.abilities.map((a, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs capitalize"
                        style={{ backgroundColor: "#eef0f3" }}
                    >
                        {a}
                    </span>
                ))}
            </p>

            {/* STATS */}
            <h3 className="font-semibold text-gray-800 text-lg mb-4">Stats</h3>

            <div className="grid grid-cols-2 gap-6">
                {pokemon.stats.map((value, i) => (
                    <div key={i}>

                        {/* NAME + VALUE */}
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                            <span>{statNames[i]}</span>
                            <span>{value}</span>
                        </div>

                        {/* BAR */}
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    backgroundColor: pastel,
                                    width: `${(value / 160) * 100}%`,
                                }}
                            ></div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

