import { Injectable } from '@nestjs/common';
import { FriendsDto } from './friends.dto';
import { FriendsRepository } from './friends.repository';

@Injectable()
export class FriendsService {
    constructor(private friendsRepository : FriendsRepository)
    {}
    addFriend(friendsDto : FriendsDto)
    {
        return this.friendsRepository.addFriend(friendsDto)
    }

}
