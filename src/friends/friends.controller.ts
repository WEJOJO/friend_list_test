import { Body, Controller, Post } from '@nestjs/common';
import { FriendsDto } from './friends.dto';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
    constructor(private friendsService : FriendsService)
    {}

    @Post('/add')
    addFriend(@Body() friendsDto : FriendsDto) //need getUser
    {
        return this.friendsService.addFriend(friendsDto);
    }
}
