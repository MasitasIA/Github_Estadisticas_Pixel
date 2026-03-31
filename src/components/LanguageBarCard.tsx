/** @jsxImportSource react */

interface LanguageData {
    name: string;
    color: string;
    percentage: number;
}

interface LanguageBarProps {
    username: string;
    languages: LanguageData[];
}

export function LanguageBarCard({ username, languages }: LanguageBarProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1a1b27",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                color: "#70a5fd",
                padding: "25px",
                borderRadius: "10px",
                width: "550px",
                height: "220px", // Altura fija suficiente para la barra y leyenda
                border: "1px solid rgba(112, 165, 253, 0.18)",
                fontFamily: "CustomFont",
            }}
        >
            <h1
                style={{
                    fontSize: "22px",
                    color: "#bf91f3",
                    marginBottom: "20px",
                    borderBottom: "2px solid #414868",
                    paddingBottom: "5px",
                }}
            >
                {username.toUpperCase()} DISTRIBUCIÓN DE LENGUAJES
            </h1>

            {/* Contenedor de la barra horizontal */}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "15px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: "20px",
                }}
            >
                {languages.map((lang) => (
                    <div
                        key={lang.name}
                        style={{
                            backgroundColor: lang.color,
                            width: `${lang.percentage}%`,
                            height: "100%",
                        }}
                    />
                ))}
            </div>

            {/* Leyenda de los lenguajes */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    width: "100%",
                }}
            >
                {languages.map((lang) => (
                    <div
                        key={lang.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "16px",
                            color: "white",
                        }}
                    >
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                backgroundColor: lang.color,
                                borderRadius: "50%",
                                marginRight: "8px",
                            }}
                        />
                        <span
                            style={{ fontWeight: "bold", marginRight: "5px" }}
                        >
                            {lang.name}
                        </span>
                        <span style={{ opacity: 0.7 }}>
                            {lang.percentage.toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
