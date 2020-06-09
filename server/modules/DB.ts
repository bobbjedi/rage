import modelDb from '../helpers/modelNedb';

export const usersDb = modelDb({
    filename: 'db/users',
    compact: 10
});

 const Db:any = {
    usersDb
};

export default Db;
