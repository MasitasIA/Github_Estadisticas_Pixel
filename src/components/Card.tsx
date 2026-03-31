/** @jsxImportSource react */

// Interfaz actualizada para recibir una cantidad dinámica de lenguajes
interface CardProps {
    username: string;
    topLangs: Array<{ name: string; color: string; count: number }>;
}

// Creación de la tarjeta de estadísticas de lenguajes
export function StatsCard({ username, topLangs }: CardProps) {
    // Calculamos el alto dinámicamente para que la tarjeta crezca si hay 5 lenguajes
    // Base de ~120px para el padding y el título + ~35px por cada fila de lenguaje
    const cardHeight = 120 + topLangs.length * 35;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1a1b27",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                color: "#70a5fd",
                padding: "20px",
                borderRadius: "10px",
                width: "550px",
                height: `${cardHeight}px`, // Usamos el alto dinámico acá
                border: "1px solid rgba(112, 165, 253, 0.18)",
                fontFamily: "CustomFont",
            }}
        >
            <h1
                style={{
                    fontSize: "24px",
                    color: "#bf91f3",
                    marginBottom: "15px",
                    borderBottom: "2px solid #414868",
                    paddingBottom: "5px",
                }}
            >
                {/* El título ahora dice "TOP 5" o la cantidad que le pases */}
                {username.toUpperCase()} LENGUAJES TOP {topLangs.length}
            </h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {topLangs.map((lang) => (
                    <div
                        key={lang.name}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "6px 0",
                            fontSize: "20px",
                        }}
                    >
                        <span style={{ color: lang.color }}>
                            {">"} {lang.name}
                        </span>
                        <span style={{ color: "white", opacity: 0.8 }}>
                            {lang.count} repos
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
