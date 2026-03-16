/** @jsxImportSource react */

// Interfaz para recibir los props del componente
interface CardProps {
    username: string;
    top3: Array<{ name: string; color: string; count: number }>;
}

// Creación de la tarjeta de estadísticas de lenguajes
export function StatsCard({ username, top3 }: CardProps) {
    return (
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1b27', 
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',  
        color: '#70a5fd',
        padding: '20px',
        borderRadius: '10px', 
        width: '400px',
        height: '200px',
        border: '1px solid rgba(112, 165, 253, 0.18)', 
        fontFamily: 'CustomFont'
        }}>
            <h1 style={{ 
                fontSize: '26px', 
                color: '#bf91f3', 
                marginBottom: '15px',
                borderBottom: '2px solid #414868',
                paddingBottom: '5px'
            }}>
                {username.toUpperCase()} LENGUAJES TOP 3
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {top3.map(lang => (
                <div key={lang.name} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    margin: '6px 0', 
                    fontSize: '20px' 
                }}>
                    <span style={{ color: lang.color }}>{'>'} {lang.name}</span>
                    <span style={{ color: 'white', opacity: 0.8 }}>{lang.count} repos</span>
                </div>
                ))}
            </div>
        </div>
    );
}