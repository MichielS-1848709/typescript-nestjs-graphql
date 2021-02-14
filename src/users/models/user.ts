import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class User {
  @Field()
  userId: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  isSubscribed?: boolean;
}

export default User;