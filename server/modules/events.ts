import log from '../helpers/log';
import $u from '../helpers/utils';

const players: any = {};

mp.events.add('playerJoin', async player => {
    try {
        player.db = 
            await $u.getUserFromQ({ playerId: player.id }) 
            || $u.createUser({ playerId: player.id, name: player.name });
        
        player.customData = {};
        console.log('Join ' + player.name);
        players[player.id] = player;
        // player.id, player.name
        // player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
        // player.model = skins[Math.floor(Math.random() * skins.length)];
        player.health = 100;
        player.armour = 100;
    } catch (e) {
        log.error('playerJoin:' + e)
    }
});

mp.events.add('playerQuit', async (player, reason) => {
    try {
        await player.db.save();
        delete players[player.id];
        console.log('Quit', player.name, reason);
    } catch (e) {
        log.error('playerQuit:' + e);
    }
});

mp.events.add('playerDeath', async (player, reason, killer) => {
    try {
        console.log('Death', player.name, reason, killer);
    } catch (e) {
        log.error('playerQuit:' + e);
    }
});

// let dynamicPed = mp.peds.new(mp.joaat('mp_m_freemode_01'), new mp.Vector3(10, 10, 10), 270, 0, 10, { dynamic: true });
// dynamicPed.controller = mp.players.at(0);

// const ped = mp.game.ped.createPed(mp.joaat('mp_m_freemode_01'), new mp.Vector3(10, 10, 10));
// console.log('>>', mp.peds);

// let staticPed = mp.peds.new(mp.joaat('player_zero'), mp.players.at(0).position,
// {    
//       dynamic: false, // still server-side but not sync'ed anymore
//       frozen: true,
//       invincible: true
// });