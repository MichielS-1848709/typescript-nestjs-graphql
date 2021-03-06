import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import User from './models/user';
import { UsersService } from './users.service';
import GetUserArgs from './dto/args/get-user.args';
import GetUsersArgs from './dto/args/get-users.args';
import CreateUserInput from './dto/input/create-user.input';
import UpdateUserInput from './dto/input/update-user.input';
import DeleteUserInput from './dto/input/delete-user.input';
import { UseGuards } from '@nestjs/common';
import GqlAuthGuard from '../auth/guards/gql-auth.guard';
import CurrentUser from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  public getUser(
    @CurrentUser() user: User,
    @Args() getUserArgs: GetUserArgs,
  ): User {
    console.log(user);
    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  public getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  public createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): User {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  public updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): User {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  public deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): User {
    return this.usersService.deleteUser(deleteUserData);
  }
}

export default UsersResolver;
