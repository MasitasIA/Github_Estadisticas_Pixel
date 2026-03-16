/** @jsxImportSource react */
import { Star, Package, GitCommit, GitPullRequest } from 'lucide-react';

// Interfaz para recibir los props del componente
interface GeneralProps {
    username: string;
    stats: {
        stars: number;
        repos: number;
        commits: number;
        prs: number;
    };
}

// Creación de la tarjeta de estadísticas generales
export function GeneralStatsCard({ username, stats }: GeneralProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1b27',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', 
            color: '#70a5fd',
            padding: '20px',
            borderRadius: '10px', 
            width: '550px',
            height: '200px',
            border: '1px solid rgba(112, 165, 253, 0.18)', 
            fontFamily: 'CustomFont'
        }}>
            <h1 style={{ 
                fontSize: '24px', 
                color: '#bf91f3', 
                marginBottom: '15px', 
                borderBottom: '2px solid #414868',
                display: 'flex',
                alignItems: 'center'
            }}>
                {username.toUpperCase()} ESTADISTICAS
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                
                {/* Fila: Estrellas */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Star size={18} color="#70a5fd" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '18px' }}>Estrellas Totales:</span>
                    </div>
                        <span style={{ color: '#e3b341', fontSize: '18px' }}>{stats.stars}</span>
                </div>

                {/* Fila: Repositorios */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Package size={18} color="#70a5fd" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '18px' }}>Repositorios:</span>
                        </div>
                        <span style={{ color: 'white', fontSize: '18px' }}>{stats.repos}</span>
                </div>

                {/* Fila: Commits */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <GitCommit size={18} color="#70a5fd" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '18px' }}>Contribuciones:</span>
                    </div>
                        <span style={{ color: 'white', fontSize: '18px' }}>{stats.commits}</span>
                </div>

                {/* Fila: Pull Requests */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <GitPullRequest size={18} color="#70a5fd" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '18px' }}>Peticiones de Pull:</span>
                    </div>
                        <span style={{ color: 'white', fontSize: '18px' }}>{stats.prs}</span>
                </div>
            </div>
        </div>
    );
}