import { usersDb, } from '../../modules/DB';
import log from '../log';
import * as _ from 'underscore';
// import config from '../configReader';

export default {
    round(n: number): Number {
        return Number(n.toFixed(0));
    },
    unix(): Number {
        return new Date().getTime();
    },
    async getUserFromQ(q: any): Promise<IM_User> {
        return await usersDb.findOne(q);
    },

    /**
     * @param params параметры GET
     */
    async createUser(params: { name:string, playerId: string }): Promise<IResponse> {

        // const checkUser: boolean = Boolean(await usersDb.findOne({
        //     $or: [{login}, {email}, {loginLowCase: login.toLowerCase()}]
        // }));
        // if (checkUser){
        //     return {error: 'Логин или адрес уже занят.'};
        // }
        const user: IM_User = new usersDb({
           _id: params.playerId,
            name: params.name,
            lvl: 1,
            weapons: [],
            currentExp: 0
        });
      
        return { success: true, result: user };
    },

    async updateUserDeposit(user:IM_User, amount:number, coinName:string, isNoNeedSave?:Boolean){
        console.log('updateUserDeposit>', user.deposits[coinName], amount, coinName);
        if (!coinName){
            return log.error('updateUserDeposit NO_coinName: ' + user.login + ': ' + coinName);
        }
        try {
            if (_.isNumber(amount) && amount !== 0){
                user.deposits[coinName] = this.round(user.deposits[coinName] + amount);
                this.updateChipsUserPlayers(user, coinName); // обновим инфу у всех Player
                if (!isNoNeedSave){
                    await user.save();
                }
                return;
            }
            log.warn('updateUserDeposit amount isNOtNUMBER: ' + coinName + ' ' + amount);
        } catch (e){
            console.log(e);
            log.error('updateUserDeposit(c): ' + e);
        }
        console.log('updateUserDeposit2>', user, amount, coinName, isNoNeedSave);
    },
};
