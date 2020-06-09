
// import
interface IDbTable{
    _id?:boolean|string,
    save:Function,
    update:Function
}
interface IM_User extends IDbTable{
    name?: string,
    lvl?: number,
    
    token?: string,
    login?: string,
    email?: string,
    addresses?: {[key:string]:string},
    timestamp?: number,
    loginLowCase?: string,
    password?: string,
    deposits?: {[key:string]:number},
    refererId?: string,
    isLogged?:boolean
};



interface IM_Firebase extends IDbTable{
    address: string,
    tokens: string[]
}
interface IM_Withdraw extends IDbTable{
    coinName: string,
    amount: number,
    address?: string
}

interface IM_refsBonus extends IDbTable {
    refererId?:string, // id referel
    bonuses?: {
        [key: string]: {// login
            [key: string]: number // bonus
        }
    }
};

interface IResponse{
    error?:string,
    success?:boolean,
    result?: any
};

interface IObject{
    [key: string]: any;
}

interface IErc20_model {
    sat: number,
    sc: string
}
interface ICryptoApi {
    send: Function,
    address: string
}
