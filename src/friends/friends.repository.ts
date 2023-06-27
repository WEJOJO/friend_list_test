import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FriendsDto } from "./friends.dto";
import { Friends } from "./friends.entity";

@Injectable()
export class FriendsRepository extends Repository<Friends>
{
    constructor(private dataSource : DataSource)
    {
        super(Friends, dataSource.createEntityManager());
    }
    async addFriend(friendsDto : FriendsDto)
    {
        const {user1, user2} = friendsDto;
        const friend = this.create({
            user1,
            user2
        })
        console.log(friend);
        await this.save(friend);
        return friend;
    }

    
}