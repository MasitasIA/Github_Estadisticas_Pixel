/** @jsxImportSource react */
import { NextRequest } from 'next/server';
import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StatsCard } from '@/components/Card';
import { GeneralStatsCard } from '@/components/GeneralStatsCard';

// Interfaz para la tipar los nodos de repositorios
interface GitHubRepo {
  stargazerCount: number;
  languages: {
    nodes: {
      name: string;
      color: string;
    }[];
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // Detectamos si pide 'general'

  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
            totalCount
            nodes {
              stargazerCount
              languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                nodes { name, color }
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const result = await response.json();

    if (!result.data || !result.data.user) {
      throw new Error('No se encontraron datos');
    }

    const { data } = result;

    // --- LÓGICA 1: PROCESAR LENGUAJES ---
    const langStats: Record<string, { count: number; color: string }> = {};
    let totalStars = 0;

    data.user.repositories.nodes.forEach((repo: GitHubRepo) => {
      totalStars += repo.stargazerCount; // Sumamos estrellas para las stats generales
      repo.languages.nodes.forEach((lang) => {
        if (!langStats[lang.name]) {
          langStats[lang.name] = { count: 0, color: lang.color };
        }
        langStats[lang.name].count++;
      });
    });

    const top3 = Object.entries(langStats)
      .map(([name, info]) => ({ name, ...info }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // --- LÓGICA 2: PROCESAR STATS GENERALES ---
    const globalStats = {
      stars: totalStars,
      repos: data.user.repositories.totalCount,
      commits: data.user.contributionsCollection.totalCommitContributions,
      prs: data.user.contributionsCollection.totalPullRequestContributions,
    };

    // --- CONFIGURACIÓN DE IMAGEN ---
    const fontPath = join(process.cwd(), 'src/assets/font.ttf');
    const fontData = readFileSync(fontPath);

    // Seleccionamos el componente basado en el parámetro 'type'
    const SelectedCard = type === 'general' 
      ? <GeneralStatsCard username={username} stats={globalStats} />
      : <StatsCard username={username} top3={top3} />;

    const svg = await satori(
      SelectedCard,
      {
        width: 400,
        height: 200,
        fonts: [{ name: 'CustomFont', data: fontData, weight: 400, style: 'normal' }],
      }
    );

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });

  } catch (err) {
    console.error(err);
    return new Response(
      `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1b27" />
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#ff4444" text-anchor="middle">
          Error: Verifica el usuario o el Token
        </text>
      </svg>`,
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}