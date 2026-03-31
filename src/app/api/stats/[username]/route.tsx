/** @jsxImportSource react */
import { NextRequest } from "next/server";
import satori from "satori";
import { readFileSync } from "fs";
import { join } from "path";
import { StatsCard } from "@/components/Card";
import { GeneralStatsCard } from "@/components/GeneralStatsCard";
import { LanguageBarCard } from "@/components/LanguageBarCard";

// Interfaz para tipar los nodos de repositorios
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
    { params }: { params: Promise<{ username: string }> },
) {
    const { username } = await params;
    const { searchParams } = new URL(request.url);

    // Parámetros de la URL
    const type = searchParams.get("type"); // Puede ser 'general', 'bar', o null
    const langsParam = searchParams.get("langs");
    const defaultLimit = type === "bar" ? 10 : 5;
    const limit = langsParam ? parseInt(langsParam, 10) : defaultLimit;

    const excludeParam = searchParams.get("exclude");

    const userExcludedLangs = excludeParam
        ? excludeParam
              .toLowerCase()
              .split(",")
              .map((lang) => lang.trim())
        : [];

    const excludedLangs = [...new Set([...userExcludedLangs, "html", "css"])];

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

        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, variables: { login: username } }),
        });

        const result = await response.json();

        if (!result.data || !result.data.user) {
            throw new Error("No se encontraron datos");
        }

        const { data } = result;

        const langStats: Record<string, { count: number; color: string }> = {};
        let totalStars = 0;

        data.user.repositories.nodes.forEach((repo: GitHubRepo) => {
            totalStars += repo.stargazerCount;
            repo.languages.nodes.forEach((lang) => {
                if (excludedLangs.includes(lang.name.toLowerCase())) {
                    return;
                }

                if (!langStats[lang.name]) {
                    langStats[lang.name] = { count: 0, color: lang.color };
                }
                langStats[lang.name].count++;
            });
        });

        const topLangs = Object.entries(langStats)
            .map(([name, info]) => ({ name, ...info }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);

        // --- CÁLCULO DE PORCENTAJES PARA LA BARRA ---
        const totalValidLangsCount = topLangs.reduce(
            (acc, lang) => acc + lang.count,
            0,
        );
        const langsWithPercentage = topLangs.map((lang) => ({
            ...lang,
            percentage: (lang.count / totalValidLangsCount) * 100,
        }));

        const globalStats = {
            stars: totalStars,
            repos: data.user.repositories.totalCount,
            commits: data.user.contributionsCollection.totalCommitContributions,
            prs: data.user.contributionsCollection
                .totalPullRequestContributions,
        };

        const fontPath = join(process.cwd(), "src/assets/font.ttf");
        const fontData = readFileSync(fontPath);

        // --- SELECCIÓN DEL COMPONENTE Y LA ALTURA ---
        let SelectedCard;
        let svgHeight;

        if (type === "general") {
            SelectedCard = (
                <GeneralStatsCard username={username} stats={globalStats} />
            );
            svgHeight = 200;
        } else if (type === "bar") {
            SelectedCard = (
                <LanguageBarCard
                    username={username}
                    languages={langsWithPercentage}
                />
            );
            svgHeight = 220;
        } else {
            SelectedCard = (
                <StatsCard username={username} topLangs={topLangs} />
            );
            svgHeight = 120 + topLangs.length * 35;
        }

        const svg = await satori(SelectedCard, {
            width: 550,
            height: svgHeight,
            fonts: [
                {
                    name: "CustomFont",
                    data: fontData,
                    weight: 400,
                    style: "normal",
                },
            ],
        });

        return new Response(svg, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "s-maxage=3600, stale-while-revalidate",
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
            { headers: { "Content-Type": "image/svg+xml" } },
        );
    }
}
