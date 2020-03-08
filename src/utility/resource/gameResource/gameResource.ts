import { RouteUrl } from '@/utility/configuration/RouteUrl';

export const GameResource = {
    getConfiguration: { method: 'GET', url: `${ RouteUrl.configuration }` },
    getNextGame: { method: 'GET', url: `${ RouteUrl.nextGame }` },
    getCurrentStats: { method: 'GET', url: `${ RouteUrl.stats }{=limit}` },
    getGame: { method: 'GET', url: `${ RouteUrl.game }{/gameId}` }
}; 
  