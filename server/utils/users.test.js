const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'User1',
            room: 'Room1'
        },{
            id: 2,
            name: 'User2',
            room: 'Room2'
        },{
            id: 3,
            name: 'User3',
            room: 'Room1'
        }];
    });
    
    it('Should add a new user', () => {
        const users = new Users();
        const user = {
            id: 1,
            name: 'User1',
            room: 'Room1'
        };
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should return names for Room1', () => {
        const userList = users.getUserList('Room1');
        expect(userList).toEqual(['User1', 'User3']);
    });
    it('Should return names for Room2', () => {
        const userList = users.getUserList('Room2');
        expect(userList).toEqual(['User2']);
    });

    it('Should remove user by id', () => {
        const user = users.removeUser(2);
        expect(user.id).toBe(2);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove user', () => {
        const user = users.removeUser(234);
        expect(user).toBeFalsy;
        expect(users.users).toEqual(users.users);
    });

    it('Should find user', () => {
        const user = users.getUser(1);
        expect(user).toEqual(users.users[0]);
    });

    it('Should not find user', () => {
        const user = users.getUser(6435);
        expect(user).toBeFalsy;
    });
});