import log from '../helpers/log';
import $u from '../helpers/utils';

mp.events.add('contentEmit', (player: any, action: string, data: any) => {
    console.log(player);
// switch/case action
});


export default (action: string, data: any) => {
    mp.events.call('serverEmit', action, data);
};