import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    // *this should make the builder unable to allow the use of different actions or subjects than what we have defined
    // TODO: fix the issue when  figured out
    // const builder = new AbilityBuilder(createMongoAbility as AbilityClass<AppAbility>);
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    can(Action.Read, 'all');
  }
}
